import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ChevronRight, Skull, Shield, Wifi, Lock, Eye, Zap, Bug, Server, MousePointer2 } from "lucide-react";
import asuraLogo from "@/assets/asura-legion-logo.png";
import cyberRat from "@/assets/cyber-rat.jpg";

interface IntroAnimationProps {
  onComplete: () => void;
}

const bootSequence = [
  { text: "█ RAT PAYLOAD INITIALIZING...", type: "header" },
  { text: "[OK] Remote Access Tunnel established", type: "success" },
  { text: "[OK] Encrypted backdoor active", type: "success" },
  { text: "[OK] Persistence mechanism deployed", type: "success" },
  { text: "[OK] Neural network synced", type: "success" },
  { text: "█ AUTHENTICATING OPERATOR...", type: "header" },
  { text: "[USR] NIKHIL SANTOSH KAWARE", type: "user" },
  { text: "[GRP] ASURA LEGION // FOUNDER", type: "purple" },
  { text: "[LVL] ACCESS: GOD_MODE", type: "success" },
  { text: "█ RAT FULLY OPERATIONAL", type: "final" },
];

// Cyber glitch characters
const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`アイウエオカキクケコサシスセソ";

// Matrix rain component
const MatrixRain = () => {
  const columns = useMemo(() => Array.from({ length: 30 }), []);
  const chars = "ニホンゴアイウエオカキクケコ01RAT";
  
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      {columns.map((_, i) => (
        <motion.div
          key={`matrix-${i}`}
          className="absolute text-neon-green font-mono text-xs leading-tight"
          style={{ left: `${i * 3.33}%` }}
          initial={{ y: -200 }}
          animate={{ y: "100vh" }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "linear",
          }}
        >
          {Array.from({ length: 25 }).map((_, j) => (
            <div key={j} style={{ opacity: 1 - j * 0.03 }}>
              {chars[Math.floor(Math.random() * chars.length)]}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

// Glitching text effect
const GlitchText = ({ text, className }: { text: string; className?: string }) => {
  const [display, setDisplay] = useState(text);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const chars = text.split("");
        const idx = Math.floor(Math.random() * chars.length);
        chars[idx] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        setDisplay(chars.join(""));
        setTimeout(() => setDisplay(text), 80);
      }
    }, 150);
    return () => clearInterval(interval);
  }, [text]);
  
  return <span className={className}>{display}</span>;
};

// Floating icon
const FloatingIcon = ({ Icon, delay, x, y, color }: { Icon: any; delay: number; x: string; y: string; color: string }) => (
  <motion.div
    className={`absolute ${color}`}
    style={{ left: x, top: y }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 0.6, 0],
      scale: [0.5, 1.3, 0.5],
      rotate: [0, 180, 360],
    }}
    transition={{ duration: 5, delay, repeat: Infinity, ease: "easeInOut" }}
  >
    <Icon className="w-6 h-6" />
  </motion.div>
);

// Hexagon grid background
const HexGrid = () => (
  <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="hex" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
        <path d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100" fill="none" stroke="hsl(120 100% 50%)" strokeWidth="0.5"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#hex)" />
  </svg>
);

// Scan line effect
const ScanLine = () => (
  <motion.div
    className="absolute left-0 right-0 h-1 bg-gradient-to-b from-transparent via-neon-green/30 to-transparent"
    animate={{ top: ["0%", "100%"] }}
    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
  />
);

// Circuit lines
const CircuitLines = () => (
  <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
    <motion.path
      d="M0 200 H100 V150 H200 V200 H300"
      stroke="hsl(120 100% 50%)"
      strokeWidth="1"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.path
      d="M400 100 H300 V200 H200 V100 H100"
      stroke="hsl(270 100% 65%)"
      strokeWidth="1"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, delay: 1, repeat: Infinity }}
    />
  </svg>
);

// Red eye glow effect
const EyeGlow = () => (
  <motion.div
    className="absolute inset-0 pointer-events-none"
    style={{
      background: "radial-gradient(circle at 52% 38%, hsl(0 100% 50% / 0.15) 0%, transparent 25%)",
    }}
    animate={{ opacity: [0.3, 0.8, 0.3] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
  />
);

// Cyber Rat component with animated effects
const CyberRatDisplay = () => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
    >
      {/* Outer glow rings */}
      <motion.div
        className="absolute -inset-8 rounded-full"
        style={{ 
          background: "radial-gradient(circle, hsl(0 100% 50% / 0.2) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Rotating tech ring */}
      <motion.div
        className="absolute -inset-6 border-2 border-signal-red/30 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-signal-red rounded-full" 
          style={{ boxShadow: "0 0 15px hsl(0 85% 55%)" }} 
        />
      </motion.div>
      
      <motion.div
        className="absolute -inset-12 border border-neon-green/20 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-neon-green rounded-full" 
          style={{ boxShadow: "0 0 10px hsl(120 100% 50%)" }} 
        />
      </motion.div>
      
      <motion.div
        className="absolute -inset-20 border border-electric-purple/10 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Glitch effect on image */}
      <motion.div
        className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden"
        style={{ 
          boxShadow: "0 0 60px hsl(0 85% 55% / 0.4), inset 0 0 30px hsl(0 85% 55% / 0.2)",
        }}
        animate={{ 
          boxShadow: [
            "0 0 60px hsl(0 85% 55% / 0.4), inset 0 0 30px hsl(0 85% 55% / 0.2)",
            "0 0 80px hsl(0 85% 55% / 0.6), inset 0 0 40px hsl(0 85% 55% / 0.3)",
            "0 0 60px hsl(0 85% 55% / 0.4), inset 0 0 30px hsl(0 85% 55% / 0.2)",
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <img
          src={cyberRat}
          alt="Cyber RAT"
          className="w-full h-full object-cover"
        />
        <EyeGlow />
        
        {/* Scanline overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-green/5 to-transparent" 
          style={{ backgroundSize: "100% 4px" }}
        />
        
        {/* Corner brackets */}
        <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-neon-green/60" />
        <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-neon-green/60" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-neon-green/60" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-neon-green/60" />
      </motion.div>

      {/* RAT label */}
      <motion.div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-4 py-1 bg-signal-red/20 border border-signal-red/50 rounded font-mono text-xs text-signal-red"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ boxShadow: "0 0 20px hsl(0 85% 55% / 0.3)" }}
      >
        <motion.span
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          ●
        </motion.span>
        {" "}REMOTE ACCESS TROJAN
      </motion.div>
    </motion.div>
  );
};

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [phase, setPhase] = useState<"rat" | "boot" | "reveal" | "doors">("rat");
  const [currentLine, setCurrentLine] = useState(0);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  // Random glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 100);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Phase transitions
  useEffect(() => {
    const timer = setTimeout(() => setPhase("boot"), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase === "boot" && currentLine < bootSequence.length) {
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, 180);
      return () => clearTimeout(timer);
    } else if (phase === "boot" && currentLine >= bootSequence.length) {
      setTimeout(() => setPhase("reveal"), 400);
    }
  }, [phase, currentLine]);

  useEffect(() => {
    if (phase === "reveal") {
      setTimeout(() => setPhase("doors"), 2500);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "doors") {
      setTimeout(() => setDoorsOpen(true), 300);
      setTimeout(onComplete, 1100);
    }
  }, [phase, onComplete]);

  const handleEnter = () => {
    setDoorsOpen(true);
    setTimeout(onComplete, 800);
  };

  return (
    <motion.div
      className={`fixed inset-0 z-[100] bg-background overflow-hidden ${glitchActive ? "translate-x-0.5" : ""}`}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Background effects */}
      <HexGrid />
      <MatrixRain />
      <ScanLine />
      <CircuitLines />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      {/* Scanlines */}
      <div className="absolute inset-0 scanlines opacity-40" />

      {/* Floating icons */}
      <FloatingIcon Icon={Shield} delay={0} x="8%" y="15%" color="text-neon-green/40" />
      <FloatingIcon Icon={Lock} delay={0.5} x="88%" y="12%" color="text-electric-purple/40" />
      <FloatingIcon Icon={Eye} delay={1} x="12%" y="78%" color="text-signal-red/40" />
      <FloatingIcon Icon={Wifi} delay={1.5} x="85%" y="75%" color="text-neon-green/40" />
      <FloatingIcon Icon={Skull} delay={2} x="50%" y="8%" color="text-signal-red/40" />
      <FloatingIcon Icon={Zap} delay={2.5} x="20%" y="45%" color="text-neon-green/40" />
      <FloatingIcon Icon={Bug} delay={3} x="78%" y="40%" color="text-electric-purple/40" />
      <FloatingIcon Icon={Server} delay={3.5} x="35%" y="85%" color="text-neon-green/40" />
      <FloatingIcon Icon={MousePointer2} delay={4} x="65%" y="20%" color="text-signal-red/40" />

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 text-xs font-mono text-signal-red/50 flex items-center gap-2">
        <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>●</motion.span>
        RAT_ACTIVE
      </div>
      <div className="absolute top-4 right-20 text-xs font-mono text-electric-purple/50">
        v3.0.RAT
      </div>
      <div className="absolute bottom-4 left-4 text-xs font-mono text-muted-foreground/50">
        [ENCRYPTED] AES-256-GCM
      </div>
      <div className="absolute bottom-4 right-4 text-xs font-mono text-muted-foreground/50">
        ASURA://RAT.LEGION.SYS
      </div>

      {/* Skip button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={onComplete}
        className="absolute top-4 right-4 px-4 py-2 text-xs font-mono text-muted-foreground border border-border/50 rounded hover:border-signal-red/50 hover:text-signal-red transition-colors z-50 backdrop-blur-sm"
      >
        SKIP {">>"}
      </motion.button>

      {/* Main content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-2xl w-full px-8 relative z-10">
          
          {/* RAT phase - showing the cyber rat */}
          <AnimatePresence mode="wait">
            {phase === "rat" && (
              <motion.div
                key="rat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.8, y: -50 }}
                className="flex flex-col items-center gap-8"
              >
                <CyberRatDisplay />
                
                <motion.div
                  className="flex items-center gap-2 font-mono text-sm text-signal-red mt-8"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    ⟳
                  </motion.span>
                  DEPLOYING RAT PAYLOAD...
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Boot phase */}
          <AnimatePresence mode="wait">
            {phase === "boot" && (
              <motion.div
                key="boot"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="bg-card/80 backdrop-blur-md border border-signal-red/30 rounded-lg overflow-hidden"
                style={{ boxShadow: "0 0 80px hsl(0 85% 55% / 0.15), inset 0 1px 0 hsl(0 85% 55% / 0.1)" }}
              >
                {/* Terminal header */}
                <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-b border-border/30">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <motion.span className="w-2.5 h-2.5 rounded-full bg-signal-red" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }} />
                      <motion.span className="w-2.5 h-2.5 rounded-full bg-amber-500" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, delay: 0.2, repeat: Infinity }} />
                      <motion.span className="w-2.5 h-2.5 rounded-full bg-neon-green" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, delay: 0.4, repeat: Infinity }} />
                    </div>
                    <Terminal className="w-3 h-3 text-signal-red ml-2" />
                    <GlitchText text="rat@asura-legion" className="text-xs font-mono text-muted-foreground" />
                  </div>
                  <span className="text-[10px] font-mono text-signal-red/50">RAT.exe</span>
                </div>

                {/* Terminal content */}
                <div className="p-5 font-mono text-xs space-y-0.5 min-h-[280px] bg-gradient-to-b from-transparent to-signal-red/5">
                  {bootSequence.slice(0, currentLine).map((line, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.1 }}
                      className={`flex items-center gap-2 ${
                        line.type === "header" ? "text-signal-red font-bold mt-2" :
                        line.type === "success" ? "text-neon-green/80" :
                        line.type === "user" ? "text-foreground font-semibold" :
                        line.type === "purple" ? "text-electric-purple font-semibold" :
                        line.type === "final" ? "text-signal-red font-bold text-sm mt-3" :
                        "text-foreground/70"
                      }`}
                    >
                      {line.text}
                      {line.type === "success" && <span className="text-neon-green">✓</span>}
                    </motion.div>
                  ))}
                  
                  {currentLine < bootSequence.length && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.3, repeat: Infinity }}
                      className="inline-block w-2 h-3 bg-signal-red mt-1"
                    />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reveal phase */}
          <AnimatePresence mode="wait">
            {(phase === "reveal" || phase === "doors") && !doorsOpen && (
              <motion.div
                key="reveal"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                {/* Pulsing glow */}
                <motion.div
                  className="absolute w-80 h-80 rounded-full"
                  style={{ background: "radial-gradient(circle, hsl(270 100% 65% / 0.2) 0%, transparent 70%)" }}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Logo with orbiting rings */}
                <motion.div
                  className="relative"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.2 }}
                >
                  {/* Orbiting rings */}
                  <motion.div
                    className="absolute -inset-8 border border-electric-purple/40 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute -inset-12 border border-neon-green/20 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute -inset-16 border border-electric-purple/10 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Orbiting dots */}
                  <motion.div
                    className="absolute -inset-8"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="absolute top-0 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-neon-green rounded-full" style={{ boxShadow: "0 0 10px hsl(120 100% 50%)" }} />
                  </motion.div>
                  <motion.div
                    className="absolute -inset-12"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="absolute top-0 left-1/2 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 bg-electric-purple rounded-full" style={{ boxShadow: "0 0 8px hsl(270 100% 65%)" }} />
                  </motion.div>

                  <img
                    src={asuraLogo}
                    alt="Asura Legion"
                    className="w-36 h-36 object-contain relative z-10"
                    style={{ filter: "drop-shadow(0 0 40px hsl(270 100% 65% / 0.8))" }}
                  />
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-10 text-4xl font-mono font-bold tracking-wider"
                  style={{ 
                    background: "linear-gradient(135deg, hsl(120 100% 50%), hsl(270 100% 65%))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 0 60px hsl(270 100% 65% / 0.5)",
                  }}
                >
                  ASURA LEGION
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-3 text-sm font-mono text-muted-foreground text-center"
                >
                  Remote Access • Total Control • Digital Dominance
                </motion.p>

                {/* Enter button */}
                <motion.button
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  onClick={handleEnter}
                  className="mt-10 px-10 py-4 font-mono text-sm bg-gradient-to-r from-signal-red/10 via-electric-purple/10 to-signal-red/10 border border-signal-red/40 text-signal-red rounded-lg hover:border-signal-red transition-all flex items-center gap-3 group relative overflow-hidden"
                  style={{ boxShadow: "0 0 50px hsl(0 85% 55% / 0.15)" }}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 60px hsl(0 85% 55% / 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-signal-red/10 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="relative">{">"} EXECUTE RAT</span>
                  <ChevronRight className="w-5 h-5 relative group-hover:translate-x-2 transition-transform" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Door animation */}
      <AnimatePresence>
        {doorsOpen && (
          <>
            {/* Left door */}
            <motion.div
              className="fixed top-0 left-0 w-1/2 h-full bg-background z-[200]"
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-l from-signal-red/50 to-transparent" />
              <motion.div
                className="absolute right-8 top-1/2 -translate-y-1/2 text-8xl font-mono font-bold text-signal-red/10"
                animate={{ x: [-10, 10, -10] }}
                transition={{ duration: 0.3, repeat: Infinity }}
              >
                {"<"}
              </motion.div>
            </motion.div>
            
            {/* Right door */}
            <motion.div
              className="fixed top-0 right-0 w-1/2 h-full bg-background z-[200]"
              initial={{ x: 0 }}
              animate={{ x: "100%" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-r from-electric-purple/50 to-transparent" />
              <motion.div
                className="absolute left-8 top-1/2 -translate-y-1/2 text-8xl font-mono font-bold text-electric-purple/10"
                animate={{ x: [10, -10, 10] }}
                transition={{ duration: 0.3, repeat: Infinity }}
              >
                {">"}
              </motion.div>
            </motion.div>

            {/* Center flash */}
            <motion.div
              className="fixed inset-0 z-[199]"
              style={{ background: "radial-gradient(circle, hsl(0 85% 55% / 0.3) 0%, transparent 50%)" }}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default IntroAnimation;
