/** Apenas dígitos, no máximo 11 (DDD + 9 dígitos). */
export const phoneDigits = (v: string) => v.replace(/\D/g, "").slice(0, 11);

/** Máscara (11) 99999-9999 / (11) 9999-9999 enquanto digita. */
export const maskPhone = (v: string) => {
  const d = phoneDigits(v);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  const ddd = d.slice(0, 2);
  const rest = d.slice(2);
  if (rest.length <= 4) return `(${ddd}) ${rest}`;
  const split = d.length === 11 ? 5 : 4;
  return `(${ddd}) ${rest.slice(0, split)}-${rest.slice(split)}`;
};

/** Mesma regra do banco: 10 ou 11 dígitos. */
export const isValidPhone = (v: string) => {
  const n = v.replace(/\D/g, "").length;
  return n === 10 || n === 11;
};
