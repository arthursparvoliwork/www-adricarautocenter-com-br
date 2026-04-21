import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend } from "recharts";
import { format, subDays, startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { TrendingUp, MessageCircle, CheckCircle2, Users } from "lucide-react";

interface Lead {
  id: string;
  nome: string;
  servico: string | null;
  status: string;
  origem: string | null;
  created_at: string;
}

const COLORS = ["hsl(0 90% 55%)", "hsl(50 100% 55%)", "hsl(15 100% 55%)", "hsl(140 70% 45%)", "hsl(220 80% 55%)"];

export const AdminDashboard = ({ leads }: { leads: Lead[] }) => {
  // Leads por dia (últimos 14 dias)
  const leadsByDay = useMemo(() => {
    const days: { day: string; date: Date; count: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const d = startOfDay(subDays(new Date(), i));
      days.push({ day: format(d, "dd/MM", { locale: ptBR }), date: d, count: 0 });
    }
    leads.forEach((l) => {
      const lead = startOfDay(new Date(l.created_at));
      const slot = days.find((d) => d.date.getTime() === lead.getTime());
      if (slot) slot.count++;
    });
    return days;
  }, [leads]);

  // Top 5 serviços
  const topServices = useMemo(() => {
    const map = new Map<string, number>();
    leads.forEach((l) => {
      const key = (l.servico?.trim() || "Não especificado").slice(0, 30);
      map.set(key, (map.get(key) || 0) + 1);
    });
    return Array.from(map.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [leads]);

  // Status distribution
  const statusData = useMemo(() => {
    const map = new Map<string, number>();
    leads.forEach((l) => map.set(l.status, (map.get(l.status) || 0) + 1));
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [leads]);

  // Conversão (fechados / total)
  const conversion = leads.length > 0 ? Math.round((leads.filter((l) => l.status === "fechado").length / leads.length) * 100) : 0;
  const last7 = leads.filter((l) => new Date(l.created_at) > subDays(new Date(), 7)).length;
  const avgPerDay = (last7 / 7).toFixed(1);

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Leads (7d)", value: last7, icon: Users, color: "text-primary" },
          { label: "Média/dia", value: avgPerDay, icon: TrendingUp, color: "text-secondary" },
          { label: "Conversão", value: `${conversion}%`, icon: CheckCircle2, color: "text-green-500" },
          { label: "Total", value: leads.length, icon: MessageCircle, color: "text-foreground" },
        ].map((k) => (
          <div key={k.label} className="bg-card border border-border rounded-xl p-4 flex items-start justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{k.label}</div>
              <div className={`font-display text-3xl ${k.color} mt-1`}>{k.value}</div>
            </div>
            <k.icon className={`w-5 h-5 ${k.color} opacity-60`} />
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Leads/dia */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-display text-lg mb-4">Leads nos últimos 14 dias</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={leadsByDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 18%)" />
              <XAxis dataKey="day" stroke="hsl(50 15% 70%)" fontSize={11} />
              <YAxis stroke="hsl(50 15% 70%)" fontSize={11} allowDecimals={false} />
              <Tooltip
                contentStyle={{ background: "hsl(0 0% 7%)", border: "1px solid hsl(0 0% 18%)", borderRadius: 8 }}
                labelStyle={{ color: "hsl(50 100% 95%)" }}
              />
              <Line type="monotone" dataKey="count" stroke="hsl(0 90% 55%)" strokeWidth={2.5} dot={{ fill: "hsl(50 100% 55%)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Status */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-display text-lg mb-4">Distribuição por status</h3>
          {statusData.length === 0 ? (
            <div className="h-[220px] flex items-center justify-center text-sm text-muted-foreground">Sem dados ainda</div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                  {statusData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(0 0% 7%)", border: "1px solid hsl(0 0% 18%)", borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Top serviços */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-display text-lg mb-4">Top 5 serviços mais pedidos</h3>
        {topServices.length === 0 ? (
          <div className="h-[180px] flex items-center justify-center text-sm text-muted-foreground">Sem dados ainda</div>
        ) : (
          <ResponsiveContainer width="100%" height={Math.max(180, topServices.length * 40)}>
            <BarChart data={topServices} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 18%)" />
              <XAxis type="number" stroke="hsl(50 15% 70%)" fontSize={11} allowDecimals={false} />
              <YAxis type="category" dataKey="name" stroke="hsl(50 15% 70%)" fontSize={11} width={150} />
              <Tooltip contentStyle={{ background: "hsl(0 0% 7%)", border: "1px solid hsl(0 0% 18%)", borderRadius: 8 }} />
              <Bar dataKey="value" fill="hsl(50 100% 55%)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
