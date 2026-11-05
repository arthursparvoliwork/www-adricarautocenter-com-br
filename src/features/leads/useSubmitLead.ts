import { useCallback, useRef, useState } from "react";
import { insertLead, LeadValidationError, type LeadFieldErrors, type LeadInput } from "./leadService";

export type SubmitStatus = "idle" | "loading" | "success" | "error";

const newKey = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
        (+c ^ (Math.random() * 16) >> (+c / 4)).toString(16),
      );

/**
 * Envia um lead com idempotência: a mesma chave é reaproveitada em reenvios
 * (duplo clique, retry após erro de rede) até o envio dar certo.
 */
export const useSubmitLead = () => {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errors, setErrors] = useState<LeadFieldErrors>({});
  const keyRef = useRef<string | null>(null);
  const inflight = useRef(false);

  const submit = useCallback(async (input: Omit<LeadInput, "idempotency_key">) => {
    if (inflight.current) return { ok: false as const, reason: "busy" as const };
    inflight.current = true;
    keyRef.current ??= newKey();
    setStatus("loading");
    setErrors({});
    try {
      await insertLead({ ...input, idempotency_key: keyRef.current });
      keyRef.current = null;
      setStatus("success");
      return { ok: true as const };
    } catch (err) {
      if (err instanceof LeadValidationError) {
        setErrors(err.fields);
        setStatus("idle");
        return { ok: false as const, reason: "invalid" as const };
      }
      setStatus("error");
      return { ok: false as const, reason: "network" as const };
    } finally {
      inflight.current = false;
    }
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setErrors({});
  }, []);

  return { submit, status, errors, setErrors, reset };
};
