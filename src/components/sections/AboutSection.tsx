import { User, Target, Globe, Bug, BookOpen, GraduationCap } from "lucide-react";
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
                Cybersecurity professional with practical experience in{" "}
                <span className="text-signal-red font-semibold">digital forensics</span>,{" "}
                <span className="text-signal-red font-semibold">bug bounty</span>,{" "}
                <span className="text-electric-purple font-semibold">OSINT</span>, and{" "}
                <span className="text-electric-purple font-semibold">dark web investigations</span>.
              </p>
              <p className="text-lg leading-relaxed text-foreground/90">
                Skilled in <span className="text-neon-green">vulnerability identification</span>,{" "}
                <span className="text-neon-green">threat analysis</span>, and{" "}
                <span className="text-neon-green">evidence awareness</span> while supporting real-world cyber investigation workflows.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                Technically curious, ethically driven, and detail-oriented with a strong foundation in networking and Linux security concepts. Seeking a formal entry-level cybersecurity role to apply hands-on expertise in a professional environment.
              </p>
            </div>
          </TerminalCard>

          {/* Education */}
          <div className="mb-8 p-4 bg-card border border-border/50 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="w-5 h-5 text-electric-purple" />
              <h3 className="font-mono font-semibold text-electric-purple">Education</h3>
            </div>
            <div className="space-y-2 text-sm font-mono">
              <div className="flex justify-between items-center">
                <span className="text-foreground">Diploma in Computer Science</span>
                <span className="text-muted-foreground">Jun 2023 - May 2027</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground">10th in SSC</span>
                <span className="text-muted-foreground">Jun 2023</span>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="mb-8 p-4 bg-muted/30 border border-border/50 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-neon-green" />
              <h3 className="font-mono font-semibold text-neon-green">Languages</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {["English", "Hindi", "Marathi", "Latin", "Spanish"].map((lang) => (
                <span
                  key={lang}
                  className="px-3 py-1 text-xs font-mono bg-neon-green/10 border border-neon-green/30 rounded-full text-neon-green"
                >
                  {lang}
                </span>
              ))}
            </div>
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
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
