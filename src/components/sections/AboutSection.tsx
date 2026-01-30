import { User, Target, Lock } from "lucide-react";
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
                Technically curious and ethically driven professional skilled in{" "}
                <span className="text-neon-green font-semibold">vulnerability identification</span>,{" "}
                <span className="text-electric-purple font-semibold">threat analysis</span>, and{" "}
                <span className="text-signal-red font-semibold">evidence awareness</span>.
              </p>
              <p className="text-lg leading-relaxed text-foreground/90">
                Focused on <span className="text-neon-green">Network Security</span>,{" "}
                <span className="text-neon-green">Linux Administration</span>, and{" "}
                <span className="text-electric-purple">Dark Web Investigations</span>.
              </p>
            </div>
          </TerminalCard>

          {/* Mission cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-card border border-border/50 rounded-lg hover:border-neon-green/50 transition-colors group">
              <Target className="w-8 h-8 text-neon-green mb-4 group-hover:animate-pulse" />
              <h3 className="font-mono font-semibold mb-2">Objective</h3>
              <p className="text-sm text-muted-foreground">
                Secure digital infrastructure through proactive threat hunting and vulnerability assessment.
              </p>
            </div>

            <div className="p-6 bg-card border border-border/50 rounded-lg hover:border-electric-purple/50 transition-colors group">
              <Lock className="w-8 h-8 text-electric-purple mb-4 group-hover:animate-pulse" />
              <h3 className="font-mono font-semibold mb-2">Specialization</h3>
              <p className="text-sm text-muted-foreground">
                Digital Forensics & OSINT investigations with a focus on evidence preservation.
              </p>
            </div>

            <div className="p-6 bg-card border border-border/50 rounded-lg hover:border-signal-red/50 transition-colors group">
              <div className="w-8 h-8 text-signal-red mb-4 group-hover:animate-pulse flex items-center justify-center font-mono font-bold text-xl">
                &gt;_
              </div>
              <h3 className="font-mono font-semibold mb-2">Approach</h3>
              <p className="text-sm text-muted-foreground">
                Ethical hacking mindset with a defensive-first security strategy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
