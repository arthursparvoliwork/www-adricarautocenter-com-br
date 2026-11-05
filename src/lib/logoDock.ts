import { useSyncExternalStore } from "react";
/** Estado compartilhado: o logo do hero já "encaixou" na navbar? */
let docked = true;
const subs = new Set<() => void>();
export const setLogoDocked = (v: boolean) => {
  if (v === docked) return;
  docked = v;
  subs.forEach((f) => f());
};
export const useLogoDocked = () =>
  useSyncExternalStore((f) => (subs.add(f), () => subs.delete(f)), () => docked, () => true);
