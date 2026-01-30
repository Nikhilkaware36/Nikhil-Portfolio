import { Folder, ExternalLink, Code, Shield, Eye, Network, Search, Key, Users, Globe, Skull, FileSearch, Link, Bot, Bell, Lock, Brain } from "lucide-react";
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
    name: "Adah",
    description: "AI-Based Intelligent System Controller",
    tech: "Python",
    icon: Brain,
    variant: "purple" as const,
    color: "text-electric-purple",
    stars: 0,
    repo: "https://github.com/Nikhilkaware36",
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
    name: "ShadowLens",
    description: "OSINT Analyzer for intelligence gathering",
    tech: "Python",
    icon: Eye,
    variant: "purple" as const,
    color: "text-electric-purple",
    stars: 0,
    repo: "https://github.com/Nikhilkaware36",
  },
  {
    name: "TraceX",
    description: "Digital Forensics Helper Tool",
    tech: "Python",
    icon: Search,
    variant: "default" as const,
    color: "text-neon-green",
    stars: 0,
    repo: "https://github.com/Nikhilkaware36",
  },
  {
    name: "DefenderBot",
    description: "Blue Team Assistant for defensive security",
    tech: "Python",
    icon: Shield,
    variant: "default" as const,
    color: "text-neon-green",
    stars: 0,
    repo: "https://github.com/Nikhilkaware36",
  },
  {
    name: "NetEye",
    description: "Network Monitoring & Analysis Tool",
    tech: "Python",
    icon: Network,
    variant: "default" as const,
    color: "text-neon-green",
    stars: 0,
    repo: "https://github.com/Nikhilkaware36",
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
    name: "SafeNet Guard",
    description: "Public Cyber Safety Tool",
    tech: "Python",
    icon: Users,
    variant: "default" as const,
    color: "text-neon-green",
    stars: 0,
    repo: "https://github.com/Nikhilkaware36",
  },
  {
    name: "DataLeak Alert",
    description: "Personal Breach Checker for data exposure monitoring",
    tech: "Python",
    icon: Bell,
    variant: "red" as const,
    color: "text-signal-red",
    stars: 0,
    repo: "https://github.com/Nikhilkaware36",
  },
  {
    name: "PhishBlocker",
    description: "Browser Security Plugin for phishing protection",
    tech: "JavaScript",
    icon: Lock,
    variant: "red" as const,
    color: "text-signal-red",
    stars: 0,
    repo: "https://github.com/Nikhilkaware36",
  },
  {
    name: "RajaBabu",
    description: "Password Breaker for security testing",
    tech: "Python",
    icon: Key,
    variant: "red" as const,
    color: "text-signal-red",
    stars: 0,
    repo: "https://github.com/Nikhilkaware36",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 relative bg-gradient-to-b from-transparent via-muted/5 to-transparent">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="flex items-center gap-3 mb-4">
            <Folder className="w-6 h-6 text-electric-purple" />
            <h2 className="text-3xl md:text-4xl font-mono font-bold">
              <span className="text-muted-foreground">//</span> The_Arsenal
            </h2>
          </div>
          
          <p className="text-muted-foreground mb-12 font-mono text-sm">
            {">"} ls -la ~/projects/ <span className="text-neon-green">| {projects.length} tools found</span>
          </p>

          {/* Projects grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                  style={{ animationDelay: `${index * 50}ms`, animationFillMode: "forwards" } as React.CSSProperties}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <project.icon className={`w-8 h-8 ${project.color} transition-transform group-hover:scale-110`} />
                      <div className="flex items-center gap-2">
                        {project.stars > 0 && (
                          <span className="text-xs font-mono px-2 py-0.5 bg-muted rounded text-amber-400 flex items-center gap-1">
                            ⭐ {project.stars}
                          </span>
                        )}
                        <span className="text-xs font-mono px-2 py-0.5 bg-muted rounded text-muted-foreground">
                          {project.tech}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className={`font-mono font-bold text-lg ${project.color}`}>
                        {project.name}
                      </h3>
                      <p className="text-muted-foreground text-xs mt-1 line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pt-2 border-t border-border/30">
                      <div className="flex items-center gap-1">
                        <span className={project.color}>●</span>
                        <span>View</span>
                      </div>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
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
