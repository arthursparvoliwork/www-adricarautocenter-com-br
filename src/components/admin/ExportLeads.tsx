import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Papa from "papaparse";
import { toast } from "sonner";
import { format } from "date-fns";

interface Lead {
  id: string;
  nome: string;
  telefone: string;
  modelo_carro: string | null;
  servico: string | null;
  mensagem: string | null;
  origem: string | null;
  status: string;
  created_at: string;
}

export const ExportLeads = ({ leads }: { leads: Lead[] }) => {
  const [busy, setBusy] = useState(false);

  const exportCSV = () => {
    if (leads.length === 0) {
      toast.error("Nenhum lead pra exportar");
      return;
    }
    setBusy(true);
    try {
      const rows = leads.map((l) => ({
        Data: format(new Date(l.created_at), "dd/MM/yyyy HH:mm"),
        Nome: l.nome,
        Telefone: l.telefone,
        Carro: l.modelo_carro ?? "",
        Servico: l.servico ?? "",
        Mensagem: l.mensagem ?? "",
        Origem: l.origem ?? "",
        Status: l.status,
      }));
      const csv = Papa.unparse(rows, { delimiter: ";" });
      // BOM pro Excel reconhecer UTF-8 com acentos
      const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `leads-adricar-${format(new Date(), "yyyy-MM-dd")}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`${leads.length} leads exportados!`);
    } catch (e) {
      console.error(e);
      toast.error("Erro ao exportar");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={exportCSV} disabled={busy}>
      <Download className="w-4 h-4" /> Exportar CSV ({leads.length})
    </Button>
  );
};
