import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

// Mock no limite da rede: fake do cliente com a mesma regra UNIQUE do banco.
const rows: Record<string, unknown>[] = [];
const insert = vi.fn(async (row: Record<string, unknown>) => {
  if (rows.some((r) => r.idempotency_key === row.idempotency_key)) {
    return { error: { code: "23505", message: 'duplicate key value violates unique constraint "leads_idempotency_key_unique"', details: null } };
  }
  rows.push(row);
  return { error: null };
});
vi.mock("@/integrations/supabase/client", () => ({
  supabase: { from: () => ({ insert }) },
}));

import { insertLead } from "./leadService";
import { useSubmitLead } from "./useSubmitLead";
import { whatsappLink, buildLeadWhatsappText } from "./whatsapp";
import { maskPhone } from "./phone";

const base = { nome: "João", telefone: "(11) 98537-0952", origem: "formulario_site" };

beforeEach(() => {
  rows.length = 0;
  insert.mockClear();
});

describe("leads", () => {
  it("grava um lead válido", async () => {
    const r = await insertLead({ ...base, idempotency_key: crypto.randomUUID() });
    expect(r.duplicate).toBe(false);
    expect(rows).toHaveLength(1);
    expect(rows[0].telefone).toBe("(11) 98537-0952");
  });

  it("rejeita telefone com menos de 10 dígitos sem chamar o banco", async () => {
    await expect(insertLead({ ...base, telefone: "1199999", idempotency_key: crypto.randomUUID() })).rejects.toThrow("invalid_lead");
    expect(insert).not.toHaveBeenCalled();
  });

  it("rejeita telefone com 12 dígitos", async () => {
    await expect(insertLead({ ...base, telefone: "551198537095", idempotency_key: crypto.randomUUID() })).rejects.toThrow("invalid_lead");
  });

  it("reenvio com a mesma idempotency_key não duplica e conta como sucesso", async () => {
    const key = crypto.randomUUID();
    await insertLead({ ...base, idempotency_key: key });
    const again = await insertLead({ ...base, idempotency_key: key });
    expect(again.duplicate).toBe(true);
    expect(rows).toHaveLength(1);
  });

  it("hook: duplo clique simultâneo grava só um lead", async () => {
    const { result } = renderHook(() => useSubmitLead());
    await act(async () => {
      await Promise.all([result.current.submit(base), result.current.submit(base)]);
    });
    expect(rows).toHaveLength(1);
    expect(result.current.status).toBe("success");
  });

  it("hook: retry após falha de rede reusa a mesma chave", async () => {
    insert.mockImplementationOnce(async (row) => {
      rows.push(row); // gravou, mas a resposta se perdeu
      throw new Error("network");
    });
    const { result } = renderHook(() => useSubmitLead());
    await act(async () => { await result.current.submit(base); });
    expect(result.current.status).toBe("error");
    await act(async () => { await result.current.submit(base); });
    expect(result.current.status).toBe("success");
    expect(rows).toHaveLength(1);
  });

  it("hook: telefone inválido expõe erro no campo", async () => {
    const { result } = renderHook(() => useSubmitLead());
    await act(async () => { await result.current.submit({ ...base, telefone: "123" }); });
    expect(result.current.errors.telefone).toBeTruthy();
    expect(rows).toHaveLength(0);
  });

  it("mensagem do WhatsApp é codificada (&, #, acentos, quebras)", () => {
    const text = buildLeadWhatsappText({ nome: "José & Cia #1", servico: "Revisão" });
    const url = whatsappLink(text);
    expect(url).toContain("Jos%C3%A9%20%26%20Cia%20%231");
    expect(url).toContain("%0A");
    expect(url).not.toMatch(/[ &#](?!.*\?text=)/.source ? /text=.*[ #]/ : /x/);
    expect(decodeURIComponent(url.split("?text=")[1])).toBe(text);
  });

  it("máscara de telefone", () => {
    expect(maskPhone("11985370952")).toBe("(11) 98537-0952");
    expect(maskPhone("1126679953")).toBe("(11) 2667-9953");
  });
});
