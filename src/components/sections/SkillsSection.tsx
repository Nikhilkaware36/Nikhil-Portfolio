import { Cpu, Shield, Code, Terminal, Server, Search, Bug, Lock } from "lucide-react";
import SkillBar from "../SkillBar";

const skillCategories = [
  {
    title: "Security",
    icon: Shield,
    color: "text-neon-green",
    skills: [
      { name: "Network Security & Protocols", level: 90, variant: "green" as const },
      { name: "Digital Forensics & Evidence", level: 85, variant: "green" as const },
      { name: "Blue Team Operations", level: 85, variant: "green" as const },
    ],
  },
  {
    title: "Investigation",
    icon: Search,
    color: "text-electric-purple",
    skills: [
      { name: "OSINT", level: 92, variant: "purple" as const },
      { name: "Dark Web Investigation", level: 85, variant: "purple" as const },
      { name: "Malware & Threat Analysis", level: 75, variant: "purple" as const },
    ],
  },
  {
    title: "Development",
    icon: Code,
    color: "text-signal-red",
    skills: [
      { name: "Python", level: 92, variant: "red" as const },
      { name: "Bash Scripting", level: 88, variant: "red" as const },
      { name: "Rust", level: 65, variant: "red" as const },
    ],
  },
];

const technicalSkills = [
  { name: "Network Security & Protocols", category: "core" },
  { name: "Bug Bounty & Vulnerability Assessment", category: "offensive" },
  { name: "Blue Team Operations & Defensive Security", category: "defensive" },
  { name: "Linux Administration & Security", category: "core" },
  { name: "Malware & Threat Analysis", category: "analysis" },
  { name: "Digital Forensics & Evidence Handling", category: "forensics" },
  { name: "Dark Web Investigation Techniques", category: "investigation" },
  { name: "OSINT", category: "investigation" },
];

const techStack = [
  // Languages
  "Python", "Rust", "Bash", "PowerShell",
  // Security Tools
  "Kali Linux", "Kali NetHunter", "Burp Suite", "Metasploit", "Wireshark", "Nmap",
  // Forensics
  "Autopsy", "Volatility", "TheHive", "MISP",
  // Platforms
  "Linux (Arch/Debian)", "Docker", "Git", "TryHackMe",
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
              <span className="text-muted-foreground">//</span> Skill_Matrix
            </h2>
          </div>

          {/* Technical Skills Tags */}
          <div className="mb-12">
            <h3 className="text-sm font-mono text-muted-foreground mb-4 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              {">"} Technical Expertise
            </h3>
            <div className="flex flex-wrap gap-3">
              {technicalSkills.map((skill, index) => (
                <span
                  key={skill.name}
                  className="px-4 py-2 text-sm font-mono bg-card border border-border/50 rounded-lg hover:border-neon-green/50 hover:text-neon-green transition-colors cursor-default opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms`, animationFillMode: "forwards" }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          {/* Skills grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
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
          <div>
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
