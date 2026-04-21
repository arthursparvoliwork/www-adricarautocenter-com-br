import { useCallback } from "react";
import { Bell, BellOff, BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { usePushNotifications, useLeadNotifications } from "@/hooks/usePushNotifications";

export const PushNotifyToggle = ({ enabled, setEnabled }: { enabled: boolean; setEnabled: (v: boolean) => void }) => {
  const { permission, request, notify, isSupported } = usePushNotifications();

  const onNewLead = useCallback(
    (lead: { nome: string; telefone: string; servico: string | null }) => {
      notify("🔔 Novo lead na Adricar!", {
        body: `${lead.nome} — ${lead.telefone}${lead.servico ? ` (${lead.servico})` : ""}`,
        tag: "new-lead",
      });
      // Som de sino sutil (data URI - beep curto)
      try {
        const audio = new Audio("data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQA=");
        audio.volume = 0.3;
        audio.play().catch(() => {});
      } catch {}
    },
    [notify]
  );

  useLeadNotifications(enabled && permission === "granted", onNewLead);

  const handleToggle = async () => {
    if (!isSupported) {
      toast.error("Seu navegador não suporta notificações");
      return;
    }
    if (enabled) {
      setEnabled(false);
      toast.info("Notificações desativadas");
      return;
    }
    if (permission === "default") {
      const result = await request();
      if (result === "granted") {
        setEnabled(true);
        notify("✅ Notificações ativadas!", { body: "Você será avisado quando entrar um novo lead." });
        toast.success("Notificações ativadas!");
      } else {
        toast.error("Permissão negada");
      }
    } else if (permission === "granted") {
      setEnabled(true);
      toast.success("Notificações ativadas!");
    } else {
      toast.error("Permissão bloqueada — habilite nas configurações do navegador");
    }
  };

  const Icon = !enabled ? BellOff : permission === "granted" ? BellRing : Bell;

  return (
    <Button variant={enabled ? "default" : "outline"} size="sm" onClick={handleToggle}>
      <Icon className="w-4 h-4" />
      <span className="hidden sm:inline">{enabled ? "Notif. ON" : "Notif."}</span>
    </Button>
  );
};
