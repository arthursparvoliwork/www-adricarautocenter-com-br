import { useEffect, useState } from "react";

/** Hook simples para pedir permissão e enviar notificações nativas do navegador. */
export const usePushNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof window !== "undefined" && "Notification" in window ? Notification.permission : "default"
  );

  const isSupported = typeof window !== "undefined" && "Notification" in window;

  const request = async () => {
    if (!isSupported) return "denied" as NotificationPermission;
    const result = await Notification.requestPermission();
    setPermission(result);
    return result;
  };

  const notify = (title: string, options?: NotificationOptions) => {
    if (!isSupported || permission !== "granted") return;
    try {
      const n = new Notification(title, {
        icon: "/favicon.ico",
        badge: "/favicon.ico",
        ...options,
      });
      n.onclick = () => {
        window.focus();
        n.close();
      };
    } catch (e) {
      console.warn("Notification failed:", e);
    }
  };

  return { permission, request, notify, isSupported };
};

/** Hook que monitora a tabela `leads` em realtime e dispara notificações. */
export const useLeadNotifications = (enabled: boolean, onNewLead: (lead: { nome: string; telefone: string; servico: string | null }) => void) => {
  useEffect(() => {
    if (!enabled) return;
    let channel: any;
    (async () => {
      const { supabase } = await import("@/integrations/supabase/client");
      channel = supabase
        .channel("leads-realtime")
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "leads" }, (payload) => {
          const lead = payload.new as { nome: string; telefone: string; servico: string | null };
          onNewLead(lead);
        })
        .subscribe();
    })();
    return () => {
      if (channel) {
        import("@/integrations/supabase/client").then(({ supabase }) => supabase.removeChannel(channel));
      }
    };
  }, [enabled, onNewLead]);
};
