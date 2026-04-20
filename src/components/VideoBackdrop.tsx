import heroVideo from "@/assets/hero-bg.mp4";
import workshopVideoMeta from "@/assets/workshop-bg.mp4.asset.json";

interface VideoBackdropProps {
  /** Overlay opacity 0-1 over the video. Higher = darker / less video visible. */
  overlay?: number;
  /** Additional className for the wrapper. */
  className?: string;
  /** Mirror the video horizontally. */
  flip?: boolean;
  /** Which video source to use. Defaults to "pagani". */
  source?: "pagani" | "workshop";
  /** Tint accent color over the video. */
  tint?: "fire" | "white" | "yellow" | "none";
}

/**
 * Subtle full-section video backdrop. Sits behind content (z-0).
 * Parent section must be `relative` and content wrapped with `relative z-10`.
 */
export const VideoBackdrop = ({
  overlay = 0.85,
  className = "",
  flip = false,
  source = "pagani",
  tint = "fire",
}: VideoBackdropProps) => {
  const videoSrc = source === "workshop" ? workshopVideoMeta.url : heroVideo;

  const tintClass =
    tint === "white"
      ? "bg-gradient-to-br from-white/[0.04] via-transparent to-white/[0.02]"
      : tint === "yellow"
      ? "bg-gradient-to-br from-secondary/15 via-transparent to-primary/5"
      : tint === "none"
      ? ""
      : "bg-gradient-to-br from-primary/10 via-transparent to-secondary/5";

  return (
    <div className={`absolute inset-0 overflow-hidden z-0 pointer-events-none ${className}`} aria-hidden="true">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: flip ? "scaleX(-1)" : undefined }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      {/* Heavy dark overlay for content legibility */}
      <div
        className="absolute inset-0 bg-background"
        style={{ opacity: overlay }}
      />
      {/* Tint accent */}
      {tintClass && <div className={`absolute inset-0 ${tintClass}`} />}
      {/* Subtle scanline / white grain texture */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 2px, hsl(0 0% 100% / 0.4) 2px 3px)",
        }}
      />
    </div>
  );
};
