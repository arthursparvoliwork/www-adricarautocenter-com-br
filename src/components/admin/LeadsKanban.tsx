import { useMemo, useState } from "react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useDraggable, useDroppable, useSensor, useSensors } from "@dnd-kit/core";
import { Phone, MessageCircle, Star } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Lead {
  id: string;
  nome: string;
  telefone: string;
  modelo_carro: string | null;
  servico: string | null;
  status: string;
  created_at: string;
}

const COLUMNS = [
  { id: "novo", label: "Novos", color: "border-primary/40 bg-primary/5" },
  { id: "atendido", label: "Atendidos", color: "border-secondary/40 bg-secondary/5" },
  { id: "fechado", label: "Fechados", color: "border-green-500/40 bg-green-500/5" },
] as const;

const LeadCard = ({ lead, dragging }: { lead: Lead; dragging?: boolean }) => (
  <div className={`bg-card border border-border rounded-lg p-3 space-y-2 ${dragging ? "shadow-2xl rotate-2" : "hover:border-primary/50"} transition-all cursor-grab active:cursor-grabbing`}>
    <div className="flex items-start justify-between gap-2">
      <div className="font-semibold text-sm">{lead.nome}</div>
      <div className="text-[10px] text-muted-foreground whitespace-nowrap">{format(new Date(lead.created_at), "dd/MM HH:mm", { locale: ptBR })}</div>
    </div>
    <div className="text-xs text-muted-foreground font-mono">{lead.telefone}</div>
    {lead.modelo_carro && <div className="text-xs text-foreground/80">🚗 {lead.modelo_carro}</div>}
    {lead.servico && <div className="text-xs text-secondary truncate">{lead.servico}</div>}
    <div className="flex gap-1 pt-1" onPointerDown={(e) => e.stopPropagation()}>
      <a href={`tel:${lead.telefone.replace(/\D/g, "")}`} className="p-1.5 rounded bg-muted hover:bg-primary/20 transition-colors" title="Ligar">
        <Phone className="w-3 h-3" />
      </a>
      <a
        href={`https://wa.me/55${lead.telefone.replace(/\D/g, "")}?text=${encodeURIComponent(`Olá ${lead.nome}, sou da Adricar!`)}`}
        target="_blank"
        rel="noopener"
        className="p-1.5 rounded bg-muted hover:bg-secondary/20 transition-colors"
        title="WhatsApp"
      >
        <MessageCircle className="w-3 h-3" />
      </a>
      {lead.status === "fechado" && (
        <a
          href={`https://wa.me/55${lead.telefone.replace(/\D/g, "")}?text=${encodeURIComponent(`Olá ${lead.nome}! Aqui é da Adricar. Pode nos avaliar no Google? https://g.page/r/AdricarCentroAutomotivo`)}`}
          target="_blank"
          rel="noopener"
          className="p-1.5 rounded bg-muted hover:bg-secondary/20 transition-colors text-secondary"
          title="Pedir avaliação"
        >
          <Star className="w-3 h-3" />
        </a>
      )}
    </div>
  </div>
);

const DraggableCard = ({ lead }: { lead: Lead }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: lead.id });
  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={{ opacity: isDragging ? 0.3 : 1 }}>
      <LeadCard lead={lead} />
    </div>
  );
};

const Column = ({ id, label, color, leads }: { id: string; label: string; color: string; leads: Lead[] }) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className={`flex-1 min-w-[260px] rounded-xl border-2 ${color} p-3 transition-all ${isOver ? "ring-2 ring-primary scale-[1.01]" : ""}`}
    >
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="font-display text-sm uppercase tracking-wider">{label}</h3>
        <span className="text-xs px-2 py-0.5 rounded-full bg-background/50">{leads.length}</span>
      </div>
      <div className="space-y-2 min-h-[100px]">
        {leads.map((l) => (
          <DraggableCard key={l.id} lead={l} />
        ))}
        {leads.length === 0 && <div className="text-center text-xs text-muted-foreground py-6">Arraste leads aqui</div>}
      </div>
    </div>
  );
};

export const LeadsKanban = ({ leads, onStatusChange }: { leads: Lead[]; onStatusChange: (id: string, status: string) => void }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const grouped = useMemo(() => {
    const g: Record<string, Lead[]> = { novo: [], atendido: [], fechado: [] };
    leads.forEach((l) => {
      if (g[l.status]) g[l.status].push(l);
      else g.novo.push(l);
    });
    return g;
  }, [leads]);

  const activeLead = leads.find((l) => l.id === activeId);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(e: DragStartEvent) => setActiveId(String(e.active.id))}
      onDragEnd={(e: DragEndEvent) => {
        setActiveId(null);
        if (!e.over) return;
        const newStatus = String(e.over.id);
        const lead = leads.find((l) => l.id === String(e.active.id));
        if (lead && lead.status !== newStatus) {
          onStatusChange(lead.id, newStatus);
        }
      }}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {COLUMNS.map((c) => (
          <Column key={c.id} id={c.id} label={c.label} color={c.color} leads={grouped[c.id] ?? []} />
        ))}
      </div>
      <DragOverlay>{activeLead ? <LeadCard lead={activeLead} dragging /> : null}</DragOverlay>
    </DndContext>
  );
};
