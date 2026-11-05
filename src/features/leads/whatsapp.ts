export const SHOP_WHATSAPP = "5511985370952";

/** Monta link wa.me com o texto inteiro codificado (acentos, &, #, quebras de linha). */
export const whatsappLink = (text: string, phone = SHOP_WHATSAPP) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

export const buildLeadWhatsappText = (lead: {
  nome: string;
  modelo_carro?: string | null;
  servico?: string | null;
  mensagem?: string | null;
}) =>
  [
    "Olá! Vim pelo site da Adricar.",
    "",
    `*Nome:* ${lead.nome}`,
    `*Carro:* ${lead.modelo_carro || "—"}`,
    `*Serviço:* ${lead.servico || "—"}`,
    `*Mensagem:* ${lead.mensagem || "—"}`,
  ].join("\n");
