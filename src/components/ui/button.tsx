import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-[transform,box-shadow,background-color,color,border-color] duration-300 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "btn-outline-fx border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "btn-fx bg-gradient-fire text-primary-foreground font-display uppercase tracking-wider shadow-[0_0_30px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_50px_hsl(var(--primary)/0.8)]",
        racing: "btn-fx bg-secondary text-secondary-foreground font-display uppercase tracking-wider border-2 border-secondary shadow-[0_0_25px_hsl(var(--secondary)/0.4)] hover:shadow-[0_0_45px_hsl(var(--secondary)/0.7)]",
        outlineNeon: "btn-outline-fx border-2 border-primary text-primary bg-transparent font-display uppercase tracking-wider hover:border-transparent hover:text-foreground hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)]",
        whatsapp: "btn-fx bg-whatsapp text-whatsapp-foreground font-bold shadow-[0_0_30px_hsl(var(--whatsapp)/0.6)] hover:shadow-[0_0_50px_hsl(var(--whatsapp)/0.9)]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-8 text-base",
        xl: "h-14 rounded-md px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonState = "idle" | "loading" | "success";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** loading → spinner, success → check desenhando; a largura não muda. */
  state?: ButtonState;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, state = "idle", children, ...props }, ref) => {
    const cls = cn(buttonVariants({ variant, size, className }));
    if (asChild) return <Slot className={cls} ref={ref} {...props}>{children}</Slot>;
    const busy = state !== "idle";
    return (
      <button className={cn(cls, busy && "relative")} ref={ref} aria-busy={state === "loading"} {...props}>
        <span className={cn("inline-flex items-center gap-2", busy && "invisible")}>{children}</span>
        {state === "loading" && (
          <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <span className="h-5 w-5 rounded-full border-2 border-current border-t-transparent animate-spin" />
          </span>
        )}
        {state === "success" && (
          <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="draw-check !h-6 !w-6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
          </span>
        )}
        {state !== "idle" && <span className="sr-only" role="status">{state === "loading" ? "Enviando" : "Enviado"}</span>}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
