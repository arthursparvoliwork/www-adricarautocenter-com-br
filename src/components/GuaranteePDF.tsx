import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, ShieldCheck, Loader2 } from "lucide-react";
import { jsPDF } from "jspdf";
import { toast } from "sonner";

/** Gera e baixa o PDF do termo de garantia 90 dias da Adricar. */
export const GuaranteePDF = ({ variant = "outlineNeon", size = "lg" }: { variant?: "hero" | "outlineNeon" | "racing"; size?: "default" | "lg" | "xl" }) => {
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const w = doc.internal.pageSize.getWidth();
      const margin = 20;

      // Header
      doc.setFillColor(180, 30, 30);
      doc.rect(0, 0, w, 35, "F");
      doc.setFillColor(245, 200, 30);
      doc.rect(0, 35, w, 3, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.text("ADRICAR", margin, 18);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("CENTRO AUTOMOTIVO", margin, 25);
      doc.setFontSize(9);
      doc.text("Av. Dona Belmira Marin, 1670/1674 - Grajau, Sao Paulo/SP", margin, 31);

      // Title
      doc.setTextColor(20, 20, 20);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.text("TERMO DE GARANTIA DE SERVICO", margin, 55);
      doc.setDrawColor(180, 30, 30);
      doc.setLineWidth(0.8);
      doc.line(margin, 58, w - margin, 58);

      // Body
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      const text = `A Adricar Centro Automotivo, com mais de 30 anos de tradicao no Grajau - Sao Paulo, garante todos os servicos prestados em suas dependencias, conforme as condicoes abaixo:

1. PRAZO DE GARANTIA
A garantia de mao de obra tem validade de 90 (noventa) dias corridos a partir da data de saida do veiculo, ou 5.000 km rodados, prevalecendo o que ocorrer primeiro.

2. ITENS COBERTOS
- Defeitos de execucao do servico realizado.
- Pecas e componentes instalados pela Adricar (de acordo com a garantia do fabricante da peca).
- Vazamentos, ruidos anormais ou falhas decorrentes diretamente do servico executado.

3. ITENS NAO COBERTOS
- Desgaste natural por uso (pastilhas, pneus, oleo apos quilometragem prevista).
- Danos causados por mau uso, batidas, alagamentos ou alteracoes posteriores feitas em outras oficinas.
- Pecas de terceiros nao fornecidas pela Adricar.
- Veiculos com adulteracoes nao informadas no diagnostico inicial.

4. COMO ACIONAR A GARANTIA
Apresente este termo, a nota fiscal do servico e o veiculo na oficina, dentro do prazo. Faremos a avaliacao em ate 24h e, se confirmado defeito coberto, o reparo sera feito sem custo.

5. CONTATO
WhatsApp / Telefone: (11) 98537-0952
Endereco: Av. Dona Belmira Marin, 1670 - Grajau, Sao Paulo/SP
Horario: Seg a Sab, 08:00 as 18:00 | Dom 10:00 as 15:00

Este termo nao substitui as garantias legais previstas no Codigo de Defesa do Consumidor (Lei 8.078/90).`;

      const lines = doc.splitTextToSize(text, w - margin * 2);
      doc.text(lines, margin, 70);

      // Footer
      const date = new Date().toLocaleDateString("pt-BR");
      doc.setFontSize(9);
      doc.setTextColor(120, 120, 120);
      doc.text(`Documento gerado em ${date} - adricarautocenter.com.br`, margin, 285);

      doc.setDrawColor(245, 200, 30);
      doc.setLineWidth(2);
      doc.line(margin, 290, w - margin, 290);

      doc.save("garantia-adricar.pdf");
      toast.success("Termo de garantia baixado!");
    } catch (e) {
      console.error(e);
      toast.error("Erro ao gerar PDF.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant={variant} size={size} onClick={generate} disabled={loading}>
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
      Baixar termo de garantia
      <ShieldCheck className="w-4 h-4" />
    </Button>
  );
};
