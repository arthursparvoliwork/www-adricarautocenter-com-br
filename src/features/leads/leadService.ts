import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import type { TablesInsert } from "@/integrations/supabase/types";
import { isValidPhone } from "./phone";

const opt = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .nullable()
    .transform((v) => (v ? v : null));

export const leadSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  telefone: z
    .string()
    .trim()
    .max(20)
    .refine(isValidPhone, "WhatsApp inválido — use (11) 99999-9999"),
  modelo_carro: opt(100),
  servico: opt(100),
  mensagem: opt(2000),
  origem: z.string().trim().max(50),
  idempotency_key: z.string().uuid(),
});

export type LeadInput = z.input<typeof leadSchema>;
export type LeadFieldErrors = Partial<Record<keyof LeadInput, string>>;

export class LeadValidationError extends Error {
  constructor(public fields: LeadFieldErrors) {
    super("invalid_lead");
  }
}

export const validateLead = (input: LeadInput) => {
  const r = leadSchema.safeParse(input);
  if (!r.success) {
    const fields: LeadFieldErrors = {};
    for (const i of r.error.issues) {
      const k = i.path[0] as keyof LeadInput;
      if (!fields[k]) fields[k] = i.message;
    }
    throw new LeadValidationError(fields);
  }
  return r.data;
};

/**
 * Insere o lead. Visitantes anônimos não podem ler a tabela, então não usamos `.select()`.
 * Violação de UNIQUE em idempotency_key (23505) = mesmo envio já gravado → sucesso.
 * A notificação ao dono é disparada pelo banco (trigger), não pelo navegador.
 */
export const insertLead = async (input: LeadInput): Promise<{ duplicate: boolean }> => {
  const lead = validateLead(input);
  const { error } = await supabase.from("leads").insert(lead as TablesInsert<"leads">);
  if (!error) return { duplicate: false };
  if (error.code === "23505" && /idempotency/i.test(`${error.message} ${error.details ?? ""}`)) {
    return { duplicate: true };
  }
  throw error;
};
