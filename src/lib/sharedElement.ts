/** Shared element entre rotas: guarda o retângulo do card clicado para a página seguinte "crescer" a partir dele. */
type Snap = { key: string; rect: DOMRect; at: number };
let snap: Snap | null = null;

export const rememberRect = (key: string, el: Element | null) => {
  if (el) snap = { key, rect: el.getBoundingClientRect(), at: performance.now() };
};

/** Consome o snapshot se for da mesma chave e recente. */
export const takeRect = (key: string): DOMRect | null => {
  const s = snap;
  snap = null;
  return s && s.key === key && performance.now() - s.at < 2000 ? s.rect : null;
};
