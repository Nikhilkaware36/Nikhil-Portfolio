import { motion, useScroll, useTransform } from "framer-motion";
import GlitchText from "../GlitchText";
import TypewriterText from "../TypewriterText";
import GitHubStats from "../GitHubStats";
import { Terminal, Shield, ChevronRight, Github, Linkedin, Instagram, Download, MapPin, Mail, Zap, Binary } from "lucide-react";
import { useSound } from "@/hooks/useSound";
import { useEffect, useState } from "react";

// Matrix rain effect component
const MatrixRain = () => {
  const [columns, setColumns] = useState<number[]>([]);
  
  useEffect(() => {
    const cols = Math.floor(window.innerWidth / 20);
    setColumns(Array.from({ length: cols }, (_, i) => i));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {columns.map((col) => (
        <motion.div
          key={col}
          className="absolute text-neon-green font-mono text-xs"
          style={{ left: col * 20 }}
          initial={{ y: -100 }}
          animate={{ y: "100vh" }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        >
          {Array.from({ length: 20 }, () => 
            String.fromCharCode(0x30A0 + Math.random() * 96)
          ).join("\n")}
        </motion.div>
      ))}
    </div>
  );
};

// Floating orbs
const FloatingOrb = ({ delay, color, size, position }: { delay: number; color: string; size: string; position: string }) => (
  <motion.div
    className={`absolute ${position} ${size} rounded-full blur-2xl pointer-events-none`}
    style={{ background: color }}
    animate={{
      scale: [1, 1.3, 1],
      opacity: [0.3, 0.6, 0.3],
      x: [0, 30, 0],
      y: [0, -20, 0],
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);
  const { playHover, playClick } = useSound();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Matrix rain background */}
      <MatrixRain />
      
      {/* Grid background with parallax */}
      <motion.div className="absolute inset-0 grid-bg opacity-50" style={{ y }} />
      
      {/* Scanlines overlay */}
      <div className="absolute inset-0 scanlines pointer-events-none" />
      
      {/* Floating orbs */}
      <FloatingOrb delay={0} color="hsl(120 100% 50% / 0.15)" size="w-96 h-96" position="top-10 -left-48" />
      <FloatingOrb delay={2} color="hsl(270 100% 65% / 0.15)" size="w-80 h-80" position="bottom-20 -right-40" />
      <FloatingOrb delay={4} color="hsl(0 85% 55% / 0.1)" size="w-64 h-64" position="top-1/3 right-10" />
      
      {/* Cyber grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/30 to-transparent"
          animate={{ opacity: [0.3, 0.6, 0.3], scaleX: [0.8, 1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric-purple/30 to-transparent"
          animate={{ opacity: [0.6, 0.3, 0.6], scaleX: [1, 0.8, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      {/* Floating code snippets - enhanced */}
      <motion.div
        className="absolute top-20 left-10 font-mono text-xs text-neon-green/30 hidden lg:block"
        animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2], rotateZ: [0, 2, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <pre className="text-[10px]">
{`class SecurityExpert {
  hack() { return true; }
}`}
        </pre>
      </motion.div>
      <motion.div
        className="absolute bottom-32 right-10 font-mono text-xs text-electric-purple/30 hidden lg:block"
        animate={{ y: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <pre className="text-[10px]">
{`$ nmap -sV target
PORT    STATE SERVICE
22/tcp  open  ssh
443/tcp open  https`}
        </pre>
      </motion.div>
      <motion.div
        className="absolute top-1/3 right-20 font-mono text-[10px] text-signal-red/20 hidden lg:block"
        animate={{ x: [0, 10, 0], opacity: [0.1, 0.4, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <pre>
{`[!] VULNERABILITY DETECTED
CVE-2024-XXXX
Severity: CRITICAL`}
        </pre>
      </motion.div>
      <motion.div
        className="absolute bottom-1/3 left-16 font-mono text-[10px] text-neon-green/20 hidden lg:block"
        animate={{ y: [0, -15, 0], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 7, repeat: Infinity }}
      >
        <pre>
{`#!/bin/bash
while true; do
  scan_network
  exploit_vulns
done`}
        </pre>
      </motion.div>

      {/* Cursor glow effect */}
      <motion.div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-0 hidden lg:block"
        style={{
          background: "radial-gradient(circle, hsl(120 100% 50% / 0.03) 0%, transparent 70%)",
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      <motion.div 
        className="container mx-auto px-4 relative z-10"
        style={{ opacity, scale }}
      >
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Terminal prompt - enhanced */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0 }}
            className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground bg-card/80 backdrop-blur-sm px-6 py-3 rounded-xl border border-neon-green/30 shadow-[0_0_30px_hsl(120_100%_50%/0.1)]"
          >
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Terminal className="w-4 h-4 text-neon-green" />
            </motion.div>
            <span className="text-neon-green">root@kaware-sec</span>
            <span className="text-muted-foreground">:</span>
            <span className="text-electric-purple">~</span>
            <span className="text-muted-foreground">$</span>
            <span className="text-foreground ml-2">./initialize_hacker.sh</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="w-2 h-5 bg-neon-green inline-block ml-1"
            />
          </motion.div>

          {/* Main name with epic glitch effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              className="absolute inset-0 blur-3xl opacity-30"
              style={{
                background: "linear-gradient(135deg, hsl(120 100% 50%), hsl(270 100% 65%), hsl(0 85% 55%))",
              }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold font-mono tracking-tight relative">
              <GlitchText text="Nikhil Santosh Kaware" className="text-glow-green" />
            </h1>
          </motion.div>

          {/* Subtitle with roles carousel */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl"
          >
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {["Cybersecurity Analyst", "Digital Forensics", "OSINT Investigator", "Bug Hunter"].map((role, i) => (
                <motion.span
                  key={role}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className={`px-3 py-1 text-sm font-mono rounded-full border ${
                    i === 0 ? "bg-neon-green/10 border-neon-green/50 text-neon-green" :
                    i === 1 ? "bg-electric-purple/10 border-electric-purple/50 text-electric-purple" :
                    i === 2 ? "bg-signal-red/10 border-signal-red/50 text-signal-red" :
                    "bg-muted border-border text-muted-foreground"
                  }`}
                >
                  {role}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Location and Contact - enhanced */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground flex-wrap"
          >
            <motion.span 
              className="flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full border border-border/50"
              whileHover={{ scale: 1.05, borderColor: "hsl(120 100% 50% / 0.5)" }}
            >
              <MapPin className="w-4 h-4 text-neon-green" />
              <span>India</span>
              <span className="text-neon-green">•</span>
              <span>Remote Ready</span>
            </motion.span>
            <motion.a 
              href="mailto:nikhilkaware8236@gmail.com"
              className="flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full border border-border/50 hover:border-electric-purple/50 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <Mail className="w-4 h-4 text-electric-purple" />
              nikhilkaware8236@gmail.com
            </motion.a>
          </motion.div>

          {/* Tagline - cooler version */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="max-w-2xl mx-auto"
          >
            <div className="p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-neon-green/5 via-transparent to-electric-purple/5"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />
              <div className="relative space-y-2 font-mono text-sm">
                <motion.p className="flex items-center gap-3" whileHover={{ x: 5 }}>
                  <Binary className="w-4 h-4 text-neon-green" />
                  <span className="text-neon-green">[+]</span>
                  <span>Breaking barriers to uncover hidden vulnerabilities</span>
                </motion.p>
                <motion.p className="flex items-center gap-3" whileHover={{ x: 5 }}>
                  <Binary className="w-4 h-4 text-electric-purple" />
                  <span className="text-electric-purple">[+]</span>
                  <span>Automating the art of hacking with powerful scripts</span>
                </motion.p>
                <motion.p className="flex items-center gap-3" whileHover={{ x: 5 }}>
                  <Binary className="w-4 h-4 text-signal-red" />
                  <span className="text-signal-red">[+]</span>
                  <span>Hunting threats in the shadows of the digital realm</span>
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Status badge - enhanced */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap"
          >
            <motion.div 
              className="flex items-center gap-2 px-4 py-2 bg-neon-green/10 border border-neon-green/50 rounded-full text-neon-green font-mono text-sm"
              animate={{ 
                boxShadow: ["0 0 0px hsl(120 100% 50% / 0)", "0 0 30px hsl(120 100% 50% / 0.4)", "0 0 0px hsl(120 100% 50% / 0)"] 
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green"></span>
              </span>
              Open for Entry-Level Roles
            </motion.div>
            <motion.span 
              className="px-4 py-2 text-sm font-mono bg-electric-purple/10 border border-electric-purple/50 rounded-full text-electric-purple flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <Zap className="w-4 h-4" />
              Asura Legion Member
            </motion.span>
          </motion.div>

          {/* GitHub Stats - Auto-synced */}
          <GitHubStats />

          {/* Social links - enhanced with glow */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center justify-center gap-4"
          >
            {[
              { href: "https://github.com/Nikhilkaware36", icon: Github, label: "GitHub", color: "neon-green" },
              { href: "https://www.linkedin.com/in/nikhil-kaware-0709482b5", icon: Linkedin, label: "LinkedIn", color: "electric-purple" },
              { href: "https://www.instagram.com/nikhil.kaware.3/", icon: Instagram, label: "Instagram", color: "signal-red" },
            ].map((social, index) => (
              <motion.a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`relative p-4 bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl text-muted-foreground transition-all hover:text-${social.color} hover:border-${social.color}/50 group`}
                whileHover={{ scale: 1.1, rotate: 5, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                onMouseEnter={playHover}
                onClick={playClick}
                style={{
                  boxShadow: "0 0 0px transparent",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 30px hsl(var(--${social.color}) / 0.3)`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 0px transparent";
                }}
              >
                <social.icon className="w-6 h-6" />
                <motion.span
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                >
                  {social.label}
                </motion.span>
              </motion.a>
            ))}
          </motion.div>

          {/* CTA Buttons - enhanced */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="pt-6 flex items-center justify-center gap-4 flex-wrap"
          >
            <motion.a
              href="mailto:nikhilkaware8236@gmail.com"
              className="relative group px-8 py-4 bg-neon-green/10 border-2 border-neon-green rounded-xl text-neon-green font-mono font-bold overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={playHover}
              onClick={playClick}
            >
              <motion.div
                className="absolute inset-0 bg-neon-green/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative flex items-center gap-2">
                <Terminal className="w-5 h-5" />
                Initialize_Connection()
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </motion.a>
            <motion.a
              href="/Nikhil_Kaware_Resume.pdf"
              download="Nikhil_Kaware_Resume.pdf"
              className="relative group px-8 py-4 bg-electric-purple/10 border-2 border-electric-purple rounded-xl text-electric-purple font-mono font-bold overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={playHover}
              onClick={playClick}
            >
              <motion.div
                className="absolute inset-0 bg-electric-purple/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download_Resume.pdf
              </span>
            </motion.a>
          </motion.div>

          {/* Scroll indicator - enhanced */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="pt-12"
          >
            <motion.a 
              href="#about"
              className="inline-flex flex-col items-center gap-3 text-muted-foreground hover:text-neon-green transition-colors cursor-pointer group"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              onMouseEnter={playHover}
              onClick={playClick}
            >
              <span className="text-xs font-mono px-3 py-1 bg-card/50 rounded-full border border-border/50 group-hover:border-neon-green/50 transition-colors">
                scroll_to_explore
              </span>
              <div className="w-6 h-10 border-2 border-current/30 rounded-full flex justify-center pt-2 group-hover:border-neon-green/50 transition-colors">
                <motion.div 
                  className="w-1.5 h-3 bg-neon-green rounded-full"
                  animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
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
