/** Tokens de motion da marca Adricar. Use sempre estes valores. */
export const EASE_BRAND = [0.16, 1, 0.3, 1] as const;
export const SPRING = { type: "spring", stiffness: 260, damping: 26 } as const;
export const DURATION = { micro: 0.2, enter: 0.6, hero: 0.9 } as const;
export const STAGGER = 0.06;
export const DEFAULT_TRANSITION = { duration: DURATION.enter, ease: EASE_BRAND };
