/** Rastreamento de conversões + captura de campanha (UTM) para anúncios. */

type AnyWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

const KEY = "adricar_campaign";

export type Campaign = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  gclid?: string;
  referrer?: string;
  landing?: string;
};

/** Guarda a origem da visita na primeira carga (usada no campo `origem` dos leads). */
export const captureCampaign = () => {
  try {
    if (sessionStorage.getItem(KEY)) return;
    const p = new URLSearchParams(window.location.search);
    const data: Campaign = {
      utm_source: p.get("utm_source") || undefined,
      utm_medium: p.get("utm_medium") || undefined,
      utm_campaign: p.get("utm_campaign") || undefined,
      gclid: p.get("gclid") || undefined,
      referrer: document.referrer || undefined,
      landing: window.location.pathname,
    };
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* storage bloqueado */
  }
};

export const getCampaign = (): Campaign => {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || "{}") as Campaign;
  } catch {
    return {};
  }
};

/** Rótulo curto de origem: "formulario_site · google/cpc · promo-freios" */
export const originLabel = (base: string) => {
  const c = getCampaign();
  const src = c.gclid ? "google/cpc" : [c.utm_source, c.utm_medium].filter(Boolean).join("/");
  return [base, src || undefined, c.utm_campaign || undefined].filter(Boolean).join(" · ");
};

/** Dispara o evento de conversão (Google Ads / GA4 / Meta, quando presentes). */
export const trackLead = (source: string, value = 1) => {
  const w = window as AnyWindow;
  const payload = { event: "generate_lead", lead_source: source, value, currency: "BRL", ...getCampaign() };
  try {
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push(payload);
    w.gtag?.("event", "generate_lead", payload);
    w.fbq?.("track", "Lead", { content_name: source, value, currency: "BRL" });
  } catch {
    /* sem tag instalada */
  }
};
