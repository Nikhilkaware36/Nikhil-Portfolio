import { Cpu, Shield, Code, Wrench, Database, Terminal } from "lucide-react";
import SkillBar from "../SkillBar";

const skillCategories = [
  {
    title: "Security",
    icon: Shield,
    color: "text-neon-green",
    skills: [
      { name: "Network Security", level: 90, variant: "green" as const },
      { name: "Digital Forensics", level: 85, variant: "green" as const },
      { name: "Bug Bounty", level: 80, variant: "green" as const },
    ],
  },
  {
    title: "Operations",
    icon: Cpu,
    color: "text-electric-purple",
    skills: [
      { name: "OSINT Investigation", level: 90, variant: "purple" as const },
      { name: "Dark Web Intel", level: 85, variant: "purple" as const },
      { name: "Blue Team Ops", level: 80, variant: "purple" as const },
    ],
  },
  {
    title: "Development",
    icon: Code,
    color: "text-signal-red",
    skills: [
      { name: "Python", level: 92, variant: "red" as const },
      { name: "Bash/Shell", level: 88, variant: "red" as const },
      { name: "Rust", level: 65, variant: "red" as const },
    ],
  },
];

const techStack = [
  // Languages
  "Python", "Rust", "Bash", "PowerShell", "C",
  // Security Tools
  "Kali Linux", "Kali NetHunter", "Burp Suite", "Metasploit", "Wireshark", "Nmap",
  // Forensics
  "Autopsy", "Volatility", "TheHive",
  // Platforms
  "Linux (Arch/Debian)", "Docker", "Git",
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="flex items-center gap-3 mb-12">
            <Cpu className="w-6 h-6 text-neon-green" />
            <h2 className="text-3xl md:text-4xl font-mono font-bold">
              <span className="text-muted-foreground">//</span> Tech_Stack
            </h2>
          </div>

          {/* Skills grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={category.title}
                className="p-6 bg-card border border-border/50 rounded-lg hover:border-neon-green/30 transition-all opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${categoryIndex * 150}ms`, animationFillMode: "forwards" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <category.icon className={`w-6 h-6 ${category.color}`} />
                  <h3 className={`font-mono font-bold text-lg ${category.color}`}>
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      variant={skill.variant}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Tech tags */}
          <div className="mt-12">
            <h3 className="text-sm font-mono text-muted-foreground mb-4 flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              {">"} cat ~/tools_and_tech.txt
            </h3>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tool, index) => (
                <span
                  key={tool}
                  className="px-3 py-1 text-sm font-mono bg-muted/50 border border-border/50 rounded hover:border-neon-green/50 hover:text-neon-green transition-colors cursor-default opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${index * 30}ms`, animationFillMode: "forwards" }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
