interface SkillBarProps {
  name: string;
  level: number;
  variant?: "green" | "purple" | "red";
}

const SkillBar = ({ name, level, variant = "green" }: SkillBarProps) => {
  const gradients = {
    green: "from-neon-green to-emerald-400",
    purple: "from-electric-purple to-violet-400",
    red: "from-signal-red to-orange-400",
  };

  const glows = {
    green: "shadow-[0_0_10px_hsl(120_100%_50%/0.5)]",
    purple: "shadow-[0_0_10px_hsl(270_100%_65%/0.5)]",
    red: "shadow-[0_0_10px_hsl(0_85%_55%/0.5)]",
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm font-mono">
        <span className="text-foreground">{name}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>
      <div className="skill-bar">
        <div
          className={`skill-bar-fill bg-gradient-to-r ${gradients[variant]} ${glows[variant]}`}
          style={{ width: `${level}%`, transition: "width 1s ease-out" }}
        />
      </div>
    </div>
  );
};

export default SkillBar;
