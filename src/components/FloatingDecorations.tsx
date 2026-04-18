import { Cog, Wrench, Car, Settings, Zap, CircleDot, Disc3, Gauge } from "lucide-react";
import logo from "@/assets/adricar-logo.png";

type IconType = typeof Cog;

interface FloatingItem {
  Icon?: IconType;
  isLogo?: boolean;
  top: string;
  left?: string;
  right?: string;
  size: number;
  rotate: number;
  opacity: number;
  duration: number;
  delay: number;
  spin?: boolean;
  color?: "white" | "primary" | "secondary";
}

const items: FloatingItem[] = [
  // Around About
  { Icon: Cog, top: "105vh", left: "3%", size: 100, rotate: 0, opacity: 0.07, duration: 30, delay: 0, spin: true, color: "white" },
  { Icon: Wrench, top: "125vh", right: "6%", size: 70, rotate: 35, opacity: 0.09, duration: 14, delay: 1, color: "secondary" },
  { isLogo: true, top: "155vh", left: "-40px", size: 200, rotate: -15, opacity: 0.06, duration: 10, delay: 0 },

  // Around Services
  { Icon: Settings, top: "215vh", right: "4%", size: 130, rotate: 0, opacity: 0.06, duration: 35, delay: 2, spin: true, color: "primary" },
  { Icon: Disc3, top: "245vh", left: "6%", size: 85, rotate: 0, opacity: 0.08, duration: 22, delay: 0, spin: true, color: "white" },
  { Icon: Gauge, top: "275vh", right: "10%", size: 75, rotate: 12, opacity: 0.09, duration: 12, delay: 3, color: "secondary" },

  // Around Gallery
  { isLogo: true, top: "320vh", right: "-40px", size: 220, rotate: 18, opacity: 0.05, duration: 12, delay: 1 },
  { Icon: Car, top: "345vh", left: "8%", size: 100, rotate: -8, opacity: 0.08, duration: 16, delay: 2, color: "primary" },
  { Icon: CircleDot, top: "365vh", left: "45%", size: 60, rotate: 0, opacity: 0.07, duration: 10, delay: 0, color: "white" },

  // Around Brands
  { Icon: Zap, top: "420vh", left: "5%", size: 85, rotate: 20, opacity: 0.08, duration: 14, delay: 1, color: "secondary" },
  { Icon: Cog, top: "455vh", right: "8%", size: 140, rotate: 0, opacity: 0.06, duration: 40, delay: 0, spin: true, color: "white" },

  // Around Testimonials
  { isLogo: true, top: "510vh", left: "3%", size: 180, rotate: -20, opacity: 0.06, duration: 11, delay: 2 },
  { Icon: Wrench, top: "545vh", right: "6%", size: 90, rotate: -25, opacity: 0.08, duration: 15, delay: 1, color: "primary" },

  // Around Contact
  { Icon: Settings, top: "625vh", left: "5%", size: 110, rotate: 0, opacity: 0.06, duration: 28, delay: 0, spin: true, color: "secondary" },
  { Icon: Disc3, top: "660vh", right: "8%", size: 80, rotate: 0, opacity: 0.07, duration: 18, delay: 1, spin: true, color: "white" },
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

        // Outer wrapper handles position + static rotation
        // Inner element handles the animation (so we don't fight the transform)
        const wrapperStyle: React.CSSProperties = {
          top: item.top,
          left: item.left,
          right: item.right,
          opacity: item.opacity,
          width: item.size,
          height: item.size,
          transform: `rotate(${item.rotate}deg)`,
        };

        const innerStyle: React.CSSProperties = {
          animationDuration: `${item.duration}s`,
          animationDelay: `${item.delay}s`,
        };

        const animationClass = item.spin ? "animate-spin-slow" : "animate-float-slow";

        return (
          <div key={i} className="absolute" style={wrapperStyle}>
            <div className={`w-full h-full ${animationClass}`} style={innerStyle}>
              {item.isLogo ? (
                <img
                  src={logo}
                  alt=""
                  className="w-full h-full object-contain drop-shadow-[0_0_30px_hsl(50_100%_55%/0.5)]"
                />
              ) : (
                item.Icon && (
                  <item.Icon className={`w-full h-full ${colorClass}`} strokeWidth={1.2} />
                )
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
