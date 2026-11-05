/** Regras puras da roda 3D (sem React/three) — fáceis de testar. */
export const WHEEL_STEPS = ["Pneus", "Rodas de liga", "Freios", "Alinhamento e balanceamento"] as const;

/** Rotação total (rad) conforme progresso 0..1 do scroll: 4 voltas completas. */
export const spinFor = (p: number) => p * Math.PI * 8;

/** Intensidade do "exploded view": 0 fora de 0.35..0.75, sobe e desce suave até 1 no meio. */
export const explodeFor = (p: number) => {
  if (p <= 0.35 || p >= 0.75) return 0;
  const t = (p - 0.35) / 0.4;
  return Math.sin(t * Math.PI);
};

/** Passo de texto ativo para o progresso. */
export const stepFor = (p: number) => Math.min(WHEEL_STEPS.length - 1, Math.max(0, Math.floor(p * WHEEL_STEPS.length)));
