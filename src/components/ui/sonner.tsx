import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

/** Toasts no estilo da marca: placa metálica chanfrada, filete fogo, ícones por tipo. */
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "dark" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="top-center"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast chamfer group-[.toaster]:bg-card/95 group-[.toaster]:backdrop-blur-xl group-[.toaster]:text-foreground group-[.toaster]:border group-[.toaster]:border-border group-[.toaster]:border-l-4 group-[.toaster]:border-l-secondary group-[.toaster]:shadow-[0_18px_50px_hsl(var(--primary)/0.25)] group-[.toaster]:font-semibold",
          title: "font-display uppercase tracking-wide text-sm",
          description: "group-[.toast]:text-muted-foreground",
          success: "group-[.toaster]:border-l-whatsapp [&_[data-icon]]:text-whatsapp",
          error: "group-[.toaster]:border-l-primary [&_[data-icon]]:text-primary",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
