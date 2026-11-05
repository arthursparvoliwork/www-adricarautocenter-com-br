import { forwardRef, useEffect, useState, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { SERVICES } from "@/data/services";
import { DURATION, EASE_BRAND, SPRING } from "@/lib/motion";

/** Reaplica a classe de shake toda vez que um novo erro aparece. */
const useShake = (error?: string) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (error) setN((v) => v + 1);
  }, [error]);
  return n;
};

const ErrorMsg = ({ id, error }: { id: string; error?: string }) => (
  <div id={id} aria-live="polite" className="min-h-[1.1rem]">
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DURATION.micro }}
          className="mt-1 text-xs font-semibold text-destructive"
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

type FieldProps = InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; name: string };

export const FloatingInput = forwardRef<HTMLInputElement, FieldProps>(({ label, error, name, className, ...props }, ref) => {
  const shake = useShake(error);
  const id = props.id ?? `f-${name}`;
  return (
    <div className={cn("field", className)}>
      <div key={shake} className={cn(shake > 0 && error && "shake")}>
        <input
          ref={ref}
          id={id}
          name={name}
          placeholder={label}
          aria-invalid={error ? true : undefined}
          aria-describedby={`${id}-err`}
          className="field-input"
          {...props}
        />
        <label htmlFor={id} className="field-label">{label}</label>
      </div>
      <ErrorMsg id={`${id}-err`} error={error} />
    </div>
  );
});
FloatingInput.displayName = "FloatingInput";

type AreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; error?: string; name: string };

export const FloatingTextarea = ({ label, error, name, className, ...props }: AreaProps) => {
  const id = props.id ?? `f-${name}`;
  return (
    <div className={cn("field", className)}>
      <textarea
        id={id}
        name={name}
        placeholder={label}
        aria-invalid={error ? true : undefined}
        aria-describedby={`${id}-err`}
        className="field-input min-h-[96px] resize-y"
        {...props}
      />
      <label htmlFor={id} className="field-label">{label}</label>
      <ErrorMsg id={`${id}-err`} error={error} />
    </div>
  );
};

export const SERVICE_OPTIONS = [...SERVICES.map((s) => s.shortTitle), "Revisão / Outro"];

/** Seleção de serviço em chips (lista de src/data/services.ts). */
export const ServiceChips = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <fieldset>
    <legend className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Serviço desejado</legend>
    <div className="flex flex-wrap gap-2" role="radiogroup">
      {SERVICE_OPTIONS.map((opt) => {
        const on = value === opt;
        return (
          <motion.button
            key={opt}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(on ? "" : opt)}
            whileTap={{ scale: 0.94 }}
            transition={SPRING}
            className={cn(
              "relative inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary",
              on ? "border-secondary text-secondary-foreground" : "border-border text-muted-foreground hover:border-secondary/60 hover:text-foreground",
            )}
          >
            {on && (
              <motion.span
                layoutId="service-chip"
                className="absolute inset-0 rounded-full bg-gradient-yellow"
                transition={{ ...SPRING }}
                aria-hidden="true"
              />
            )}
            <span className="relative z-10 inline-flex items-center gap-1">
              <AnimatePresence initial={false}>
                {on && (
                  <motion.span initial={{ width: 0, opacity: 0 }} animate={{ width: "auto", opacity: 1 }} exit={{ width: 0, opacity: 0 }} transition={{ duration: DURATION.micro, ease: EASE_BRAND }}>
                    <Check className="h-3 w-3" />
                  </motion.span>
                )}
              </AnimatePresence>
              {opt}
            </span>
          </motion.button>
        );
      })}
    </div>
  </fieldset>
);
