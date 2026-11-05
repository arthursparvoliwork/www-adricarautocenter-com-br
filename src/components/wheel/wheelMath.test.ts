import { describe, it, expect } from "vitest";
import { explodeFor, stepFor, spinFor } from "./wheelMath";

describe("roda 3D", () => {
  it("exploded view fica fechado no início e no fim", () => {
    expect(explodeFor(0.1)).toBe(0);
    expect(explodeFor(0.9)).toBe(0);
  });
  it("exploded view abre ao máximo no meio do scroll", () => {
    expect(explodeFor(0.55)).toBeCloseTo(1);
  });
  it("quatro textos sincronizados: Pneus → Alinhamento", () => {
    expect(stepFor(0)).toBe(0);
    expect(stepFor(0.3)).toBe(1);
    expect(stepFor(0.6)).toBe(2);
    expect(stepFor(1)).toBe(3);
  });
  it("gira 4 voltas ao longo da seção", () => {
    expect(spinFor(1)).toBeCloseTo(Math.PI * 8);
  });
});
