import { motion, useScroll, useTransform } from "framer-motion";
import GlitchText from "../GlitchText";
import TypewriterText from "../TypewriterText";
import { Terminal, Shield, ChevronRight, Github, Linkedin, Instagram, Download, MapPin, Mail, Zap } from "lucide-react";
import { useSound } from "@/hooks/useSound";

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);
  const { playHover, playClick } = useSound();

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Grid background with parallax */}
      <motion.div className="absolute inset-0 grid-bg opacity-50" style={{ y }} />
      
      {/* Scanlines overlay */}
      <div className="absolute inset-0 scanlines pointer-events-none" />
      
      {/* Animated gradient blobs */}
      <motion.div 
        className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-neon-green/5 to-transparent blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-electric-purple/5 to-transparent blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating code snippets */}
      <motion.div
        className="absolute top-20 left-10 font-mono text-xs text-neon-green/20 hidden lg:block"
        animate={{ y: [0, -20, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        {"const hack = () => {...}"}
      </motion.div>
      <motion.div
        className="absolute bottom-32 right-10 font-mono text-xs text-electric-purple/20 hidden lg:block"
        animate={{ y: [0, 20, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        {"sudo rm -rf vulnerability"}
      </motion.div>
      <motion.div
        className="absolute top-1/3 right-20 font-mono text-xs text-neon-green/15 hidden lg:block"
        animate={{ x: [0, 10, 0], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        {"[*] Scanning ports..."}
      </motion.div>

      <motion.div 
        className="container mx-auto px-4 relative z-10"
        style={{ opacity, scale }}
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Terminal prompt */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0 }}
            className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground bg-card/50 px-4 py-2 rounded-lg border border-border/50"
          >
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Terminal className="w-4 h-4 text-neon-green" />
            </motion.div>
            <span>root@kaware-sec:~$</span>
            <span className="text-neon-green">whoami</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="w-2 h-4 bg-neon-green inline-block ml-1"
            />
          </motion.div>

          {/* Main name with glitch effect */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold font-mono tracking-tight"
          >
            <GlitchText text="Nikhil Santosh Kaware" className="text-glow-green" />
          </motion.h1>

          {/* Typewriter subtitle */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground"
          >
            <TypewriterText 
              text="Cybersecurity Analyst | Digital Forensics | OSINT Investigator" 
              speed={40}
              delay={800}
            />
          </motion.div>

          {/* Location and Contact */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground flex-wrap"
          >
            <motion.span 
              className="flex items-center gap-1 px-3 py-1 bg-card/50 rounded-full border border-border/50"
              whileHover={{ scale: 1.05, borderColor: "hsl(120 100% 50% / 0.5)" }}
            >
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-neon-green" />
              India
            </motion.span>
            <motion.span 
              className="flex items-center gap-1 px-3 py-1 bg-card/50 rounded-full border border-border/50"
              whileHover={{ scale: 1.05, borderColor: "hsl(270 100% 65% / 0.5)" }}
            >
              <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-electric-purple" />
              nikhilkaware8236@gmail.com
            </motion.span>
          </motion.div>

          {/* Tagline */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="text-base sm:text-lg text-muted-foreground/80 max-w-2xl mx-auto font-mono space-y-2"
          >
            <motion.p
              className="flex items-center justify-center gap-2"
              whileHover={{ x: 5 }}
            >
              <span className="text-neon-green">👾</span> 
              <span>Breaking barriers to uncover hidden vulnerabilities</span>
            </motion.p>
            <motion.p
              className="flex items-center justify-center gap-2"
              whileHover={{ x: 5 }}
            >
              <span className="text-electric-purple">💻</span> 
              <span>Automating the art of hacking with powerful scripts</span>
            </motion.p>
          </motion.div>

          {/* Status badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap"
          >
            <motion.div 
              className="status-online"
              whileHover={{ scale: 1.05 }}
              animate={{ boxShadow: ["0 0 0px hsl(120 100% 50% / 0)", "0 0 20px hsl(120 100% 50% / 0.3)", "0 0 0px hsl(120 100% 50% / 0)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Shield className="w-4 h-4" />
              Open for Entry-Level Roles
            </motion.div>
            <motion.span 
              className="px-3 py-1 text-xs font-mono bg-electric-purple/10 border border-electric-purple/50 rounded-full text-electric-purple flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
            >
              <Zap className="w-3 h-3" />
              Asura Legion
            </motion.span>
          </motion.div>

          {/* Social links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center justify-center gap-3 sm:gap-4"
          >
            {[
              { href: "https://github.com/Nikhilkaware36", icon: Github, label: "GitHub", hoverColor: "hover:text-neon-green hover:border-neon-green/50 hover:shadow-[0_0_20px_hsl(120_100%_50%/0.3)]" },
              { href: "https://www.linkedin.com/in/nikhil-kaware-0709482b5", icon: Linkedin, label: "LinkedIn", hoverColor: "hover:text-electric-purple hover:border-electric-purple/50 hover:shadow-[0_0_20px_hsl(270_100%_65%/0.3)]" },
              { href: "https://www.instagram.com/nikhil.kaware.3/", icon: Instagram, label: "Instagram", hoverColor: "hover:text-signal-red hover:border-signal-red/50 hover:shadow-[0_0_20px_hsl(0_85%_55%/0.3)]" },
            ].map((social, index) => (
              <motion.a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`p-3 bg-card border border-border/50 rounded-lg text-muted-foreground transition-all ${social.hoverColor}`}
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                onMouseEnter={playHover}
                onClick={playClick}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="pt-4 flex items-center justify-center gap-3 sm:gap-4 flex-wrap"
          >
            <motion.a
              href="mailto:nikhilkaware8236@gmail.com"
              className="terminal-btn group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={playHover}
              onClick={playClick}
            >
              <span>Initialize_Connection()</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              href="/Nikhil_Kaware_Resume.pdf"
              download="Nikhil_Kaware_Resume.pdf"
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-3 font-mono text-xs sm:text-sm bg-electric-purple/10 border border-electric-purple/50 text-electric-purple rounded hover:bg-electric-purple/20 hover:border-electric-purple transition-all hover:shadow-[0_0_20px_hsl(270_100%_65%/0.3)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={playHover}
              onClick={playClick}
            >
              <Download className="w-4 h-4" />
              <span>Download_Resume.pdf</span>
            </motion.a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="pt-8 sm:pt-12"
          >
            <motion.a 
              href="#about"
              className="flex flex-col items-center gap-2 text-muted-foreground hover:text-neon-green transition-colors cursor-pointer"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              onMouseEnter={playHover}
              onClick={playClick}
            >
              <span className="text-xs font-mono">scroll_down</span>
              <div className="w-5 h-8 border border-current/30 rounded-full flex justify-center pt-2">
                <motion.div 
                  className="w-1 h-2 bg-neon-green rounded-full"
                  animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
