import { motion } from "framer-motion";
import GlitchText from "../GlitchText";
import TypewriterText from "../TypewriterText";
import { Terminal, Shield, ChevronRight, Github, Linkedin, Instagram, Download, MapPin, Mail } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      
      {/* Scanlines overlay */}
      <div className="absolute inset-0 scanlines pointer-events-none" />
      
      {/* Animated gradient blobs */}
      <motion.div 
        className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-neon-green/5 to-transparent blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-electric-purple/5 to-transparent blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Terminal prompt */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0 }}
            className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground"
          >
            <Terminal className="w-4 h-4 text-neon-green" />
            <span>root@kaware-sec:~$</span>
            <span className="text-neon-green">whoami</span>
          </motion.div>

          {/* Main name with glitch effect */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold font-mono tracking-tight"
          >
            <GlitchText text="Nikhil Santosh Kaware" className="text-glow-green" />
          </motion.h1>

          {/* Typewriter subtitle */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground"
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
            className="flex items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-neon-green" />
              India
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-4 h-4 text-electric-purple" />
              nikhilkaware8236@gmail.com
            </span>
          </motion.div>

          {/* Tagline from GitHub */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="text-lg text-muted-foreground/80 max-w-2xl mx-auto font-mono"
          >
            <span className="text-neon-green">👾</span> Breaking barriers to uncover hidden vulnerabilities
            <br />
            <span className="text-electric-purple">💻</span> Automating the art of hacking with powerful scripts
          </motion.p>

          {/* Status badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <div className="status-online">
              <Shield className="w-4 h-4" />
              Open for Entry-Level Roles
            </div>
            <span className="px-3 py-1 text-xs font-mono bg-electric-purple/10 border border-electric-purple/50 rounded-full text-electric-purple">
              Asura Legion
            </span>
          </motion.div>

          {/* Social links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center justify-center gap-4"
          >
            {[
              { href: "https://github.com/Nikhilkaware36", icon: Github, hoverColor: "hover:text-neon-green hover:border-neon-green/50 hover:shadow-[0_0_15px_hsl(120_100%_50%/0.2)]" },
              { href: "https://www.linkedin.com/in/nikhil-kaware-0709482b5", icon: Linkedin, hoverColor: "hover:text-electric-purple hover:border-electric-purple/50 hover:shadow-[0_0_15px_hsl(270_100%_65%/0.2)]" },
              { href: "https://www.instagram.com/nikhil.kaware.3/", icon: Instagram, hoverColor: "hover:text-signal-red hover:border-signal-red/50 hover:shadow-[0_0_15px_hsl(0_85%_55%/0.2)]" },
            ].map((social, index) => (
              <motion.a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 bg-card border border-border/50 rounded-lg text-muted-foreground transition-all ${social.hoverColor}`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
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
            className="pt-4 flex items-center justify-center gap-4 flex-wrap"
          >
            <motion.a
              href="mailto:nikhilkaware8236@gmail.com"
              className="terminal-btn group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Initialize_Connection()</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              href="/Nikhil_Kaware_Resume.pdf"
              download="Nikhil_Kaware_Resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 font-mono text-sm bg-electric-purple/10 border border-electric-purple/50 text-electric-purple rounded hover:bg-electric-purple/20 hover:border-electric-purple transition-all hover:shadow-[0_0_15px_hsl(270_100%_65%/0.3)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
            className="pt-12"
          >
            <motion.div 
              className="flex flex-col items-center gap-2 text-muted-foreground"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-xs font-mono">scroll_down</span>
              <div className="w-5 h-8 border border-muted-foreground/30 rounded-full flex justify-center pt-2">
                <motion.div 
                  className="w-1 h-2 bg-neon-green rounded-full"
                  animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
