import { Cog, Wrench, Car, Settings, Zap, CircleDot, Disc3, Gauge } from "lucide-react";
import logo from "@/assets/adricar-logo.png";

interface FloatingItem {
  Icon?: typeof Cog;
  isLogo?: boolean;
  top: string;
  left?: string;
  right?: string;
  size: number;
  rotate: number;
  opacity: number;
  duration: number;
  delay: number;
  color?: string;
}

const items: FloatingItem[] = [
  // Section 1 - About area
  { Icon: Cog, top: "105vh", left: "5%", size: 90, rotate: 0, opacity: 0.06, duration: 20, delay: 0, color: "white" },
  { Icon: Wrench, top: "120vh", right: "8%", size: 70, rotate: 35, opacity: 0.07, duration: 14, delay: 1, color: "secondary" },
  { isLogo: true, top: "150vh", left: "-30px", size: 200, rotate: -15, opacity: 0.05, duration: 10, delay: 0 },

  // Section 2 - Services
  { Icon: Settings, top: "210vh", right: "5%", size: 110, rotate: 0, opacity: 0.05, duration: 25, delay: 2, color: "primary" },
  { Icon: Disc3, top: "240vh", left: "8%", size: 80, rotate: 0, opacity: 0.07, duration: 18, delay: 0, color: "white" },
  { Icon: Gauge, top: "270vh", right: "12%", size: 75, rotate: 12, opacity: 0.08, duration: 12, delay: 3, color: "secondary" },

  // Section 3 - Gallery
  { isLogo: true, top: "320vh", right: "-40px", size: 220, rotate: 18, opacity: 0.04, duration: 12, delay: 1 },
  { Icon: Car, top: "340vh", left: "10%", size: 100, rotate: -8, opacity: 0.07, duration: 16, delay: 2, color: "primary" },
  { Icon: CircleDot, top: "360vh", left: "45%", size: 60, rotate: 0, opacity: 0.06, duration: 10, delay: 0, color: "white" },

  // Section 4 - Brands
  { Icon: Zap, top: "420vh", left: "5%", size: 85, rotate: 20, opacity: 0.07, duration: 14, delay: 1, color: "secondary" },
  { Icon: Cog, top: "450vh", right: "10%", size: 130, rotate: 0, opacity: 0.05, duration: 30, delay: 0, color: "white" },

  // Section 5 - Testimonials
  { isLogo: true, top: "510vh", left: "5%", size: 180, rotate: -20, opacity: 0.05, duration: 11, delay: 2 },
  { Icon: Wrench, top: "540vh", right: "8%", size: 90, rotate: -25, opacity: 0.07, duration: 15, delay: 1, color: "primary" },

  // Section 6 - Contact
  { Icon: Settings, top: "620vh", left: "8%", size: 100, rotate: 0, opacity: 0.05, duration: 22, delay: 0, color: "secondary" },
];

export const FloatingDecorations = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0" aria-hidden="true">
      {items.map((item, i) => {
        const colorClass =
          item.color === "primary"
            ? "text-primary"
            : item.color === "secondary"
            ? "text-secondary"
            : "text-white";

        const style = {
          top: item.top,
          left: item.left,
          right: item.right,
          opacity: item.opacity,
          animationDuration: `${item.duration}s`,
          animationDelay: `${item.delay}s`,
          width: item.size,
          height: item.size,
          transform: `rotate(${item.rotate}deg)`,
        } as React.CSSProperties;

        if (item.isLogo) {
          return (
            <img
              key={i}
              src={logo}
              alt=""
              style={style}
              className="absolute animate-float-slow drop-shadow-[0_0_30px_hsl(50_100%_55%/0.5)]"
            />
          );
        }

        const Icon = item.Icon!;
        return (
          <div key={i} style={style} className={`absolute animate-spin-slow ${colorClass}`}>
            <Icon className="w-full h-full" strokeWidth={1.2} />
          </div>
        );
      })}
    </div>
  );
};
