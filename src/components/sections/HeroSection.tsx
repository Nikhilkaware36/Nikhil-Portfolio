import GlitchText from "../GlitchText";
import TypewriterText from "../TypewriterText";
import { Terminal, Shield, ChevronRight, Github, Linkedin, Instagram } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      
      {/* Scanlines overlay */}
      <div className="absolute inset-0 scanlines pointer-events-none" />
      
      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-neon-green/5 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-electric-purple/5 to-transparent blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Terminal prompt */}
          <div className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground animate-fade-in-up opacity-0" style={{ animationDelay: "0ms", animationFillMode: "forwards" }}>
            <Terminal className="w-4 h-4 text-neon-green" />
            <span>root@kaware-sec:~$</span>
            <span className="text-neon-green">whoami</span>
          </div>

          {/* Main name with glitch effect */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-mono tracking-tight animate-fade-in-up opacity-0" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
            <GlitchText text="Nikhil Santosh Kaware" className="text-glow-green" />
          </h1>

          {/* Typewriter subtitle */}
          <div className="text-xl md:text-2xl text-muted-foreground animate-fade-in-up opacity-0" style={{ animationDelay: "400ms", animationFillMode: "forwards" }}>
            <TypewriterText 
              text="Ethical Hacker | OSINT Investigator | Script Developer" 
              speed={40}
              delay={800}
            />
          </div>

          {/* Tagline from GitHub */}
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto animate-fade-in-up opacity-0 font-mono" style={{ animationDelay: "500ms", animationFillMode: "forwards" }}>
            <span className="text-neon-green">👾</span> Breaking barriers to uncover hidden vulnerabilities
            <br />
            <span className="text-electric-purple">💻</span> Automating the art of hacking with powerful scripts
          </p>

          {/* Status badge */}
          <div className="flex items-center justify-center gap-4 animate-fade-in-up opacity-0" style={{ animationDelay: "600ms", animationFillMode: "forwards" }}>
            <div className="status-online">
              <Shield className="w-4 h-4" />
              Open for Entry-Level Roles
            </div>
            <span className="px-3 py-1 text-xs font-mono bg-electric-purple/10 border border-electric-purple/50 rounded-full text-electric-purple">
              Asura Legion
            </span>
          </div>

          {/* Social links */}
          <div className="flex items-center justify-center gap-4 animate-fade-in-up opacity-0" style={{ animationDelay: "700ms", animationFillMode: "forwards" }}>
            <a
              href="https://github.com/Nikhilkaware36"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-card border border-border/50 rounded-lg text-muted-foreground hover:text-neon-green hover:border-neon-green/50 transition-all hover:shadow-[0_0_15px_hsl(120_100%_50%/0.2)]"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/nikhil-kaware-0709482b5"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-card border border-border/50 rounded-lg text-muted-foreground hover:text-electric-purple hover:border-electric-purple/50 transition-all hover:shadow-[0_0_15px_hsl(270_100%_65%/0.2)]"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/nikhil.kaware.3/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-card border border-border/50 rounded-lg text-muted-foreground hover:text-signal-red hover:border-signal-red/50 transition-all hover:shadow-[0_0_15px_hsl(0_85%_55%/0.2)]"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          {/* CTA Button */}
          <div className="pt-4 animate-fade-in-up opacity-0" style={{ animationDelay: "800ms", animationFillMode: "forwards" }}>
            <a
              href="mailto:nikhilkaware8236@gmail.com"
              className="terminal-btn group"
            >
              <span>Initialize_Connection()</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="pt-12 animate-fade-in-up opacity-0" style={{ animationDelay: "1000ms", animationFillMode: "forwards" }}>
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <span className="text-xs font-mono">scroll_down</span>
              <div className="w-5 h-8 border border-muted-foreground/30 rounded-full flex justify-center pt-2">
                <div className="w-1 h-2 bg-neon-green rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
