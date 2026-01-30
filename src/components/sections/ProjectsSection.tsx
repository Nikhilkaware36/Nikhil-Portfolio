import { Folder, ExternalLink, Code, Shield, Eye, Network, Search, Key, Users, Globe, Skull, FileSearch, Link } from "lucide-react";
import TerminalCard from "../TerminalCard";

const projects = [
  {
    name: "PyPop",
    description: "Automated Security & Utility Toolkit",
    tech: "Python",
    icon: Code,
    variant: "default" as const,
    color: "text-neon-green",
    stars: 3,
    repo: "https://github.com/Nikhilkaware36/PyPop",
  },
  {
    name: "DomineGhost",
    description: "Domain & DNS Security Scanner with WHOIS, NMAP, phishing & vulnerability testing",
    tech: "Python",
    icon: Globe,
    variant: "purple" as const,
    color: "text-electric-purple",
    stars: 1,
    repo: "https://github.com/Nikhilkaware36/DomineGhost",
  },
  {
    name: "CipherSherlock",
    description: "Cryptographic Analysis & Security Tool",
    tech: "Python",
    icon: Search,
    variant: "default" as const,
    color: "text-neon-green",
    stars: 0,
    repo: "https://github.com/Nikhilkaware36/CipherSherlock",
  },
  {
    name: "Shadowsender",
    description: "Anonymous mail tool for cybersecurity awareness & red team simulations",
    tech: "Python",
    icon: Skull,
    variant: "red" as const,
    color: "text-signal-red",
    stars: 1,
    repo: "https://github.com/Nikhilkaware36/Shadowsender",
  },
  {
    name: "File-BLACKRAT",
    description: "Secure file transfer tool for ethical hackers & cybersecurity professionals",
    tech: "Python",
    icon: FileSearch,
    variant: "red" as const,
    color: "text-signal-red",
    stars: 0,
    repo: "https://github.com/Nikhilkaware36/File-BLACKRAT",
  },
  {
    name: "Linklens",
    description: "URL Analysis & Security Scanner",
    tech: "TypeScript",
    icon: Link,
    variant: "purple" as const,
    color: "text-electric-purple",
    stars: 0,
    repo: "https://github.com/Nikhilkaware36/Linklens",
  },
  {
    name: "TruthScan Pro",
    description: "Advanced Verification & Analysis Tool",
    tech: "TypeScript",
    icon: Eye,
    variant: "default" as const,
    color: "text-neon-green",
    stars: 0,
    repo: "https://github.com/Nikhilkaware36/truthscan-pro",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 relative bg-gradient-to-b from-transparent via-muted/5 to-transparent">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="flex items-center gap-3 mb-12">
            <Folder className="w-6 h-6 text-electric-purple" />
            <h2 className="text-3xl md:text-4xl font-mono font-bold">
              <span className="text-muted-foreground">//</span> The_Arsenal
            </h2>
          </div>

          {/* Projects grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <a
                key={project.name}
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <TerminalCard
                  title={`${project.name.toLowerCase().replace(/\s+/g, '-')}.py`}
                  variant={project.variant}
                  className="h-full opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" } as React.CSSProperties}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <project.icon className={`w-10 h-10 ${project.color} transition-transform group-hover:scale-110`} />
                      <div className="flex items-center gap-2">
                        {project.stars > 0 && (
                          <span className="text-xs font-mono px-2 py-1 bg-muted rounded text-yellow-500 flex items-center gap-1">
                            ⭐ {project.stars}
                          </span>
                        )}
                        <span className="text-xs font-mono px-2 py-1 bg-muted rounded text-muted-foreground">
                          {project.tech}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className={`font-mono font-bold text-xl ${project.color} group-hover:text-glow-green transition-all`}>
                        {project.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pt-2 border-t border-border/30">
                      <div className="flex items-center gap-2">
                        <span className={project.color}>●</span>
                        <span>View on GitHub</span>
                      </div>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </TerminalCard>
              </a>
            ))}
          </div>

          {/* View all repos link */}
          <div className="mt-8 text-center">
            <a
              href="https://github.com/Nikhilkaware36?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-neon-green transition-colors"
            >
              <span>{">"} View all repositories</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
