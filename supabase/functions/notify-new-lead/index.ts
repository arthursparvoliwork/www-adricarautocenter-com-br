// notify-new-lead — disparada SOMENTE pelo banco (trigger AFTER INSERT em public.leads via pg_net).
// - Exige header x-webhook-secret, validado contra o segredo guardado no banco (privado).
// - Não confia no payload: lê o lead pelo id com service role.
// - Escapa HTML de todos os campos antes de montar o e-mail.
// - Sem CORS aberto: não é chamada pelo navegador.
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3";

const ALLOWED_ORIGIN = "https://adricarautocenter.com.br";
const baseHeaders = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Content-Type": "application/json",
  Vary: "Origin",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: baseHeaders });

const escapeHtml = (v: unknown) =>
  String(v ?? "—")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const Body = z.object({ id: z.string().uuid() });

Deno.serve(async (req) => {
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  const secret = req.headers.get("x-webhook-secret");
  if (!secret || secret.length < 32) return json({ error: "unauthorized" }, 401);

  const admin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } },
  );

  const { data: ok, error: vErr } = await admin.rpc("verify_lead_webhook_secret", { _secret: secret });
  if (vErr || ok !== true) return json({ error: "unauthorized" }, 401);

  let parsed;
  try {
    parsed = Body.safeParse(await req.json());
  } catch {
    return json({ error: "invalid_json" }, 400);
  }
  if (!parsed.success) return json({ error: "invalid_body" }, 400);

  const { data: lead, error } = await admin
    .from("leads")
    .select("id, nome, telefone, modelo_carro, servico, mensagem, origem, created_at")
    .eq("id", parsed.data.id)
    .maybeSingle();
  if (error || !lead) return json({ error: "not_found" }, 404);

  console.log("Novo lead", lead.id, lead.origem);

  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  const NOTIFY_EMAIL = Deno.env.get("NOTIFY_EMAIL");
  if (!RESEND_API_KEY || !NOTIFY_EMAIL) {
    console.log("RESEND_API_KEY/NOTIFY_EMAIL não configurados — só log.");
    return json({ ok: true, emailed: false });
  }

  const html = `
    <h2>Novo orçamento — Adricar</h2>
    <p><b>Nome:</b> ${escapeHtml(lead.nome)}</p>
    <p><b>Telefone:</b> ${escapeHtml(lead.telefone)}</p>
    <p><b>Carro:</b> ${escapeHtml(lead.modelo_carro)}</p>
    <p><b>Serviço:</b> ${escapeHtml(lead.servico)}</p>
    <p><b>Mensagem:</b> ${escapeHtml(lead.mensagem)}</p>
    <p><b>Origem:</b> ${escapeHtml(lead.origem)}</p>`;

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Adricar <onboarding@resend.dev>",
      to: [NOTIFY_EMAIL],
      subject: `Novo orçamento de ${String(lead.nome).replace(/[\r\n]/g, " ").slice(0, 80)}`,
      html,
    }),
  });
  console.log("Resend status:", r.status);
  return json({ ok: true, emailed: r.ok });
});
