import { describe, it, expect } from "vitest";
import { getShopStatus } from "./hours";

describe("getShopStatus (America/Sao_Paulo)", () => {
  it("quinta 10h em SP está aberto até 18h", () => {
    expect(getShopStatus(new Date("2026-11-05T13:00:00Z")).label).toBe("Hoje: aberto até 18h");
  });
  it("quinta 18h30 em SP (21h30 UTC) está fechado e abre amanhã às 8h", () => {
    const s = getShopStatus(new Date("2026-11-05T21:30:00Z"));
    expect(s.open).toBe(false);
    expect(s.label).toBe("Fechado · abre amanhã às 8h");
  });
  it("usa o fuso de SP, não UTC: 02h UTC de sexta ainda é quinta 23h em SP", () => {
    expect(getShopStatus(new Date("2026-11-06T02:00:00Z")).open).toBe(false);
  });
  it("domingo 12h em SP está aberto até 15h", () => {
    expect(getShopStatus(new Date("2026-11-08T15:00:00Z")).label).toBe("Hoje: aberto até 15h");
  });
});
