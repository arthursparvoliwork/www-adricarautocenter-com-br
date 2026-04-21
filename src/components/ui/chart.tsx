// Stub minimal: recharts é usado diretamente nos componentes admin (sem wrapper shadcn),
// e a versão atual de recharts tem incompatibilidades com o wrapper original.
import * as React from "react";

export type ChartConfig = Record<string, { label?: React.ReactNode; icon?: React.ComponentType; color?: string }>;

export const ChartContainer: React.FC<{ children?: React.ReactNode; className?: string; config?: ChartConfig }> = ({ children, className }) => (
  <div className={className}>{children}</div>
);

export const ChartTooltip: React.FC<any> = () => null;
export const ChartTooltipContent: React.FC<any> = () => null;
export const ChartLegend: React.FC<any> = () => null;
export const ChartLegendContent: React.FC<any> = () => null;
export const ChartStyle: React.FC<any> = () => null;
