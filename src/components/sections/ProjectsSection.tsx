import { Folder, ExternalLink, Code, Shield, Eye, Network, Search, Key, Users } from "lucide-react";
import TerminalCard from "../TerminalCard";

const projects = [
  {
    name: "PyPop",
    description: "Automated Security & Utility Toolkit",
    tech: "Python",
    icon: Code,
    variant: "default" as const,
    color: "text-neon-green",
  },
  {
    name: "DefenderBot",
    description: "Blue Team Assistant",
    tech: "Python",
    icon: Shield,
    variant: "default" as const,
    color: "text-neon-green",
  },
  {
    name: "ShadowLens",
    description: "OSINT Analyzer",
    tech: "Python",
    icon: Eye,
    variant: "purple" as const,
    color: "text-electric-purple",
  },
  {
    name: "NetEye",
    description: "Network Monitor",
    tech: "Python",
    icon: Network,
    variant: "default" as const,
    color: "text-neon-green",
  },
  {
    name: "TraceX",
    description: "Forensics Helper",
    tech: "Python",
    icon: Search,
    variant: "purple" as const,
    color: "text-electric-purple",
  },
  {
    name: "RajaBabu",
    description: "Password Breaker",
    tech: "Python",
    icon: Key,
    variant: "red" as const,
    color: "text-signal-red",
  },
  {
    name: "SafeNet Guard",
    description: "Public Cyber Safety Tool",
    tech: "Python",
    icon: Users,
    variant: "default" as const,
    color: "text-neon-green",
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
              <TerminalCard
                key={project.name}
                title={`${project.name.toLowerCase()}.py`}
                variant={project.variant}
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" } as React.CSSProperties}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <project.icon className={`w-10 h-10 ${project.color}`} />
                    <span className="text-xs font-mono px-2 py-1 bg-muted rounded text-muted-foreground">
                      {project.tech}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className={`font-mono font-bold text-xl ${project.color}`}>
                      {project.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground pt-2 border-t border-border/30">
                    <span className={project.color}>●</span>
                    <span>Ready to deploy</span>
                  </div>
                </div>
              </TerminalCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
