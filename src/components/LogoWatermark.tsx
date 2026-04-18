import logo from "@/assets/adricar-logo.png";
import { cn } from "@/lib/utils";

interface LogoWatermarkProps {
  className?: string;
  size?: number;
  rotate?: number;
  opacity?: number;
}

/**
 * Decorative floating Adricar logo used as a subtle background accent
 * between sections to reinforce brand identity throughout the site.
 */
export const LogoWatermark = ({
  className,
  size = 120,
  rotate = -12,
  opacity = 0.08,
}: LogoWatermarkProps) => {
  return (
    <img
      src={logo}
      alt=""
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotate}deg)`,
        opacity,
      }}
      className={cn(
        "pointer-events-none select-none absolute drop-shadow-[0_0_25px_hsl(50_100%_55%/0.4)]",
        className
      )}
    />
  );
};
