import heroVideo from "@/assets/hero-bg.mp4";

interface VideoBackdropProps {
  /** Overlay opacity 0-1 over the video. Higher = darker / less video visible. */
  overlay?: number;
  /** Additional className for the wrapper. */
  className?: string;
  /** Mirror the video horizontally. */
  flip?: boolean;
}

/**
 * Subtle full-section video backdrop. Sits behind content (z-0).
 * Parent section must be `relative` and content wrapped with `relative z-10`.
 */
export const VideoBackdrop = ({ overlay = 0.85, className = "", flip = false }: VideoBackdropProps) => {
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
        <source src={heroVideo} type="video/mp4" />
      </video>
      {/* Heavy dark overlay for content legibility */}
      <div
        className="absolute inset-0 bg-background"
        style={{ opacity: overlay }}
      />
      {/* Subtle red/yellow tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/5" />
    </div>
  );
};
