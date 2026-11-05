/** Horário de funcionamento sempre calculado no fuso de São Paulo. */
export const SHOP_TZ = "America/Sao_Paulo";
// 0=dom ... 6=sáb  → [abre, fecha] em horas
export const SHOP_HOURS: Record<number, [number, number]> = {
  0: [10, 15], 1: [8, 18], 2: [8, 18], 3: [8, 18], 4: [8, 18], 5: [8, 18], 6: [8, 18],
};
const WD: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

export const spNow = (date: Date = new Date()) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: SHOP_TZ, weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23",
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  return { day: WD[get("weekday")] ?? 0, hour: Number(get("hour")) % 24, minute: Number(get("minute")) };
};

export interface ShopStatus { open: boolean; closesAt: number; label: string; short: string }

export const getShopStatus = (date: Date = new Date()): ShopStatus => {
  const { day, hour, minute } = spNow(date);
  const [o, c] = SHOP_HOURS[day];
  const t = hour + minute / 60;
  if (t >= o && t < c) return { open: true, closesAt: c, label: `Hoje: aberto até ${c}h`, short: "Aberto agora" };
  if (t < o) return { open: false, closesAt: c, label: `Fechado · abre hoje às ${o}h`, short: "Fechado" };
  const next = SHOP_HOURS[(day + 1) % 7][0];
  return { open: false, closesAt: c, label: `Fechado · abre amanhã às ${next}h`, short: "Fechado" };
};
