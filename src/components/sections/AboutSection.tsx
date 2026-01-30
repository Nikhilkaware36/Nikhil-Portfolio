import { User, Target, Lock, Globe, Bug, Brain } from "lucide-react";
import TerminalCard from "../TerminalCard";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="flex items-center gap-3 mb-12">
            <User className="w-6 h-6 text-neon-green" />
            <h2 className="text-3xl md:text-4xl font-mono font-bold">
              <span className="text-muted-foreground">//</span> Mission_Data
            </h2>
          </div>

          <TerminalCard title="about.md" className="mb-8">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-foreground/90">
                🔭 Currently working on <span className="text-electric-purple font-semibold">dark web investigations</span>,{" "}
                <span className="text-electric-purple font-semibold">OSINT research</span>, and{" "}
                <span className="text-neon-green font-semibold">real-world AI/ML security projects</span>.
              </p>
              <p className="text-lg leading-relaxed text-foreground/90">
                🌱 Learning <span className="text-neon-green">deep learning for cybersecurity</span>,{" "}
                <span className="text-signal-red">digital forensics</span>, and{" "}
                <span className="text-neon-green">advanced Linux internals</span>.
              </p>
              <p className="text-lg leading-relaxed text-foreground/90">
                💬 Ask me about <span className="text-signal-red">bug bounty</span>,{" "}
                <span className="text-electric-purple">dark web investigations</span>,{" "}
                <span className="text-electric-purple">OSINT</span>,{" "}
                <span className="text-neon-green">Kali NetHunter</span>, and{" "}
                <span className="text-neon-green">security automation tools</span>.
              </p>
              <p className="text-sm text-muted-foreground italic font-mono">
                ⚡ Fun fact: I like building hacker tools for fun before I even think about games 😄
              </p>
            </div>
          </TerminalCard>

          {/* Looking for collaboration */}
          <div className="mb-8 p-4 bg-electric-purple/5 border border-electric-purple/30 rounded-lg">
            <p className="text-sm font-mono text-electric-purple">
              👯 Looking to collaborate on cybersecurity tools, AI-driven security projects, and open-source offensive/defensive tooling
            </p>
          </div>

          {/* Mission cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-card border border-border/50 rounded-lg hover:border-neon-green/50 transition-colors group">
              <Target className="w-8 h-8 text-neon-green mb-4 group-hover:animate-pulse" />
              <h3 className="font-mono font-semibold mb-2">Dark Web Intel</h3>
              <p className="text-sm text-muted-foreground">
                Deep dive investigations and threat intelligence gathering from hidden networks.
              </p>
            </div>

            <div className="p-6 bg-card border border-border/50 rounded-lg hover:border-electric-purple/50 transition-colors group">
              <Globe className="w-8 h-8 text-electric-purple mb-4 group-hover:animate-pulse" />
              <h3 className="font-mono font-semibold mb-2">OSINT Research</h3>
              <p className="text-sm text-muted-foreground">
                Open-source intelligence automation and large-scale data analysis.
              </p>
            </div>

            <div className="p-6 bg-card border border-border/50 rounded-lg hover:border-signal-red/50 transition-colors group">
              <Bug className="w-8 h-8 text-signal-red mb-4 group-hover:animate-pulse" />
              <h3 className="font-mono font-semibold mb-2">Bug Bounty</h3>
              <p className="text-sm text-muted-foreground">
                Vulnerability hunting and responsible disclosure on live targets.
              </p>
            </div>
          </div>

          {/* Seeking help with */}
          <div className="mt-8 p-4 bg-muted/30 border border-border/50 rounded-lg">
            <p className="text-sm font-mono text-muted-foreground">
              <span className="text-signal-red">🤝 Seeking expertise in:</span>{" "}
              Advanced malware analysis, large-scale OSINT automation, and ML for threat detection
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
