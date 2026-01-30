import { ReactNode, CSSProperties } from "react";

interface TerminalCardProps {
  title: string;
  children: ReactNode;
  variant?: "default" | "purple" | "red";
  className?: string;
  style?: CSSProperties;
}

const TerminalCard = ({ title, children, variant = "default", className = "", style }: TerminalCardProps) => {
  const variantStyles = {
    default: "hover:border-neon-green/80 hover:shadow-[0_0_20px_hsl(120_100%_50%/0.3)]",
    purple: "hover:border-electric-purple/80 hover:shadow-[0_0_20px_hsl(270_100%_65%/0.3)]",
    red: "hover:border-signal-red/80 hover:shadow-[0_0_20px_hsl(0_85%_55%/0.3)]",
  };

  const dotColors = {
    default: "bg-neon-green",
    purple: "bg-electric-purple",
    red: "bg-signal-red",
  };

  return (
    <div
      className={`terminal-card transition-all duration-300 ${variantStyles[variant]} ${className}`}
      style={style}
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-terminal-border/30">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-signal-red/80" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80" />
          <span className={`w-3 h-3 rounded-full ${dotColors[variant]}/80`} />
        </div>
        <span className="text-xs font-mono text-muted-foreground ml-2">
          {title}
        </span>
      </div>
      {/* Terminal content */}
      <div className="p-4">{children}</div>
    </div>
  );
};

export default TerminalCard;
