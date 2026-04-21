import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, LogOut, RefreshCw, Search, Phone, MessageCircle, Star } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate("/auth");
    });
    checkAccess();
    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkAccess = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id);
    const isAdmin = roles?.some((r) => r.role === "admin");
    if (!isAdmin) {
      toast.error("Você não é admin. Peça acesso ao dono da conta.");
      setLoading(false);
      return;
    }
    setAuthorized(true);
    fetchLeads();
  };

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error("Erro ao carregar leads");
    else setLeads(data ?? []);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("leads").update({ status }).eq("id", id);
    if (error) return toast.error("Erro ao atualizar");
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    toast.success("Status atualizado");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const filtered = leads.filter((l) => {
    const matchesSearch =
      !search ||
      l.nome.toLowerCase().includes(search.toLowerCase()) ||
      l.telefone.includes(search) ||
      (l.modelo_carro?.toLowerCase().includes(search.toLowerCase()) ?? false);
    const matchesStatus = statusFilter === "all" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: leads.length,
    novos: leads.filter((l) => l.status === "novo").length,
    atendidos: leads.filter((l) => l.status === "atendido").length,
    fechados: leads.filter((l) => l.status === "fechado").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
        <h1 className="font-display text-3xl">Acesso negado</h1>
        <p className="text-muted-foreground">Sua conta não tem permissão de admin.</p>
        <Button variant="outline" onClick={handleLogout}>Sair</Button>
      </div>
    );
  }

  const statusColor = (s: string) =>
    s === "novo" ? "bg-primary text-primary-foreground" :
    s === "atendido" ? "bg-secondary text-secondary-foreground" :
    s === "fechado" ? "bg-green-600 text-white" : "bg-muted";

  return (
    <div className="min-h-screen bg-background p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl lg:text-4xl">Painel Adricar</h1>
            <p className="text-muted-foreground">Gestão de orçamentos do site</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={fetchLeads}><RefreshCw className="w-4 h-4" /> Atualizar</Button>
            <Button variant="outline" onClick={handleLogout}><LogOut className="w-4 h-4" /> Sair</Button>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total", value: stats.total, color: "text-foreground" },
            { label: "Novos", value: stats.novos, color: "text-primary" },
            { label: "Atendidos", value: stats.atendidos, color: "text-secondary" },
            { label: "Fechados", value: stats.fechados, color: "text-green-500" },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-xl p-4">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
              <div className={`font-display text-3xl ${s.color}`}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, telefone ou carro..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="novo">Novos</SelectItem>
              <SelectItem value="atendido">Atendidos</SelectItem>
              <SelectItem value="fechado">Fechados</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Carro</TableHead>
                <TableHead>Serviço</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">Nenhum lead encontrado</TableCell></TableRow>
              ) : filtered.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                    {format(new Date(lead.created_at), "dd/MM HH:mm", { locale: ptBR })}
                  </TableCell>
                  <TableCell className="font-semibold">{lead.nome}</TableCell>
                  <TableCell className="font-mono text-sm">{lead.telefone}</TableCell>
                  <TableCell>{lead.modelo_carro || "—"}</TableCell>
                  <TableCell className="max-w-[200px] truncate" title={lead.servico ?? ""}>{lead.servico || "—"}</TableCell>
                  <TableCell>
                    <Select value={lead.status} onValueChange={(v) => updateStatus(lead.id, v)}>
                      <SelectTrigger className="w-32 h-8">
                        <Badge className={statusColor(lead.status)}>{lead.status}</Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="novo">Novo</SelectItem>
                        <SelectItem value="atendido">Atendido</SelectItem>
                        <SelectItem value="fechado">Fechado</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" asChild>
                        <a href={`tel:${lead.telefone.replace(/\D/g, "")}`} title="Ligar"><Phone className="w-4 h-4" /></a>
                      </Button>
                      <Button size="sm" variant="ghost" asChild>
                        <a
                          href={`https://wa.me/55${lead.telefone.replace(/\D/g, "")}?text=${encodeURIComponent(`Olá ${lead.nome}, sou da Adricar! Recebi seu pedido.`)}`}
                          target="_blank" rel="noopener" title="WhatsApp"
                        ><MessageCircle className="w-4 h-4" /></a>
                      </Button>
                      {lead.status === "fechado" && (
                        <Button size="sm" variant="ghost" asChild className="text-yellow-500 hover:text-yellow-400">
                          <a
                            href={`https://wa.me/55${lead.telefone.replace(/\D/g, "")}?text=${encodeURIComponent(
                              `Olá ${lead.nome}! Aqui é da Adricar Centro Automotivo. Esperamos que tenha gostado do nosso atendimento. 🚗⭐\n\nVocê poderia nos ajudar deixando uma avaliação no Google? Leva só 30 segundos:\n\nhttps://g.page/r/CbADRICAR/review\n\nMuito obrigado pela confiança!`
                            )}`}
                            target="_blank" rel="noopener" title="Pedir avaliação no Google"
                          ><Star className="w-4 h-4" /></a>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {leads.length > 0 && (() => {
          const withMsg = filtered.filter((l) => l.mensagem);
          if (withMsg.length === 0) return null;
          return (
            <div className="space-y-3">
              <h2 className="font-display text-xl">Mensagens detalhadas</h2>
              {withMsg.map((l) => (
                <div key={l.id} className="bg-card border border-border rounded-xl p-4">
                  <div className="text-sm font-semibold mb-1">{l.nome} — {l.telefone}</div>
                  <p className="text-sm text-muted-foreground italic">"{l.mensagem}"</p>
                </div>
              ))}
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default Admin;
