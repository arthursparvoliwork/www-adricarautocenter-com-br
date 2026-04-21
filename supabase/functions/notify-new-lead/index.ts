// Edge function: registra novo lead e (opcionalmente) envia notificação por email ao dono.
// Sem secrets configurados, apenas faz log estruturado no console (visível em Logs do Cloud).
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const lead = await req.json();
    console.log("📥 Novo lead recebido:", JSON.stringify(lead, null, 2));

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const NOTIFY_EMAIL = Deno.env.get("NOTIFY_EMAIL");

    if (RESEND_API_KEY && NOTIFY_EMAIL) {
      const html = `
        <h2>🚗 Novo orçamento — Adricar</h2>
        <p><b>Nome:</b> ${lead.nome ?? "—"}</p>
        <p><b>Telefone:</b> ${lead.telefone ?? "—"}</p>
        <p><b>Carro:</b> ${lead.modelo_carro ?? "—"}</p>
        <p><b>Serviço:</b> ${lead.servico ?? "—"}</p>
        <p><b>Mensagem:</b> ${lead.mensagem ?? "—"}</p>
      `;
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Adricar <onboarding@resend.dev>",
          to: [NOTIFY_EMAIL],
          subject: `Novo orçamento de ${lead.nome ?? "cliente"}`,
          html,
        }),
      });
      console.log("Resend status:", r.status);
    } else {
      console.log("ℹ️ RESEND_API_KEY/NOTIFY_EMAIL não configurados — só log.");
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("notify-new-lead error", err);
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
