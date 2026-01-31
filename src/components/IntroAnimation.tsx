import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ChevronRight, Skull, Shield, Wifi, Lock, Eye, Zap, Bug, Server } from "lucide-react";
import asuraLogo from "@/assets/asura-legion-logo.png";

interface IntroAnimationProps {
  onComplete: () => void;
}

const bootSequence = [
  { text: "█ INITIALIZING SYSTEM...", type: "header" },
  { text: "[OK] Kernel loaded", type: "success" },
  { text: "[OK] Encrypted tunnel established", type: "success" },
  { text: "[OK] Security protocols active", type: "success" },
  { text: "[OK] Neural network online", type: "success" },
  { text: "█ AUTHENTICATING...", type: "header" },
  { text: "[USR] NIKHIL SANTOSH KAWARE", type: "user" },
  { text: "[GRP] ASURA LEGION // FOUNDER", type: "purple" },
  { text: "[LVL] ACCESS: UNRESTRICTED", type: "success" },
  { text: "█ SYSTEM READY", type: "final" },
];

// Cyber glitch characters
const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`アイウエオカキクケコサシスセソ";

// Animated ASCII skull
const skullFrames = [
  `
   ▄▄▄▄▄▄▄▄▄
  █░░░░░░░░░█
  █░▀░░░░▀░░█
  █░░░░▄░░░░█
  █░░░███░░░█
  █░░░░░░░░░█
   ▀▀▀▀▀▀▀▀▀
  `,
  `
   ▄▄▄▄▄▄▄▄▄
  █▒▒▒▒▒▒▒▒▒█
  █▒▀▒▒▒▒▀▒▒█
  █▒▒▒▒▄▒▒▒▒█
  █▒▒▒███▒▒▒█
  █▒▒▒▒▒▒▒▒▒█
   ▀▀▀▀▀▀▀▀▀
  `,
];

// Matrix rain component
const MatrixRain = () => {
  const columns = useMemo(() => Array.from({ length: 25 }), []);
  const chars = "ニホンゴアイウエオカキクケコ01";
  
  return (
    <div className="absolute inset-0 overflow-hidden opacity-15">
      {columns.map((_, i) => (
        <motion.div
          key={`matrix-${i}`}
          className="absolute text-neon-green font-mono text-xs leading-tight"
          style={{ left: `${i * 4}%` }}
          initial={{ y: -200 }}
          animate={{ y: "100vh" }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "linear",
          }}
        >
          {Array.from({ length: 20 }).map((_, j) => (
            <div key={j} style={{ opacity: 1 - j * 0.04 }}>
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

// Animated skull
const AnimatedSkull = () => {
  const [frame, setFrame] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => setFrame(f => (f + 1) % 2), 400);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <motion.pre
      className="text-neon-green font-mono text-[8px] leading-none"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{ textShadow: "0 0 10px hsl(120 100% 50% / 0.8)" }}
    >
      {skullFrames[frame]}
    </motion.pre>
  );
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

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [phase, setPhase] = useState<"skull" | "boot" | "reveal" | "doors">("skull");
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
    const timer = setTimeout(() => setPhase("boot"), 2000);
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
      <FloatingIcon Icon={Eye} delay={1} x="12%" y="78%" color="text-electric-purple/40" />
      <FloatingIcon Icon={Wifi} delay={1.5} x="85%" y="75%" color="text-neon-green/40" />
      <FloatingIcon Icon={Skull} delay={2} x="50%" y="8%" color="text-signal-red/40" />
      <FloatingIcon Icon={Zap} delay={2.5} x="20%" y="45%" color="text-neon-green/40" />
      <FloatingIcon Icon={Bug} delay={3} x="78%" y="40%" color="text-electric-purple/40" />
      <FloatingIcon Icon={Server} delay={3.5} x="35%" y="85%" color="text-neon-green/40" />

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 text-xs font-mono text-neon-green/50 flex items-center gap-2">
        <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }}>●</motion.span>
        SECURE_CONNECTION
      </div>
      <div className="absolute top-4 right-20 text-xs font-mono text-electric-purple/50">
        v2.0.26
      </div>
      <div className="absolute bottom-4 left-4 text-xs font-mono text-muted-foreground/50">
        [ENCRYPTED] AES-256
      </div>
      <div className="absolute bottom-4 right-4 text-xs font-mono text-muted-foreground/50">
        ASURA://LEGION.SYS
      </div>

      {/* Skip button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={onComplete}
        className="absolute top-4 right-4 px-4 py-2 text-xs font-mono text-muted-foreground border border-border/50 rounded hover:border-neon-green/50 hover:text-neon-green transition-colors z-50 backdrop-blur-sm"
      >
        SKIP {">>"}
      </motion.button>

      {/* Main content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-2xl w-full px-8 relative z-10">
          
          {/* Skull phase */}
          <AnimatePresence mode="wait">
            {phase === "skull" && (
              <motion.div
                key="skull"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -50 }}
                className="flex flex-col items-center gap-4"
              >
                <AnimatedSkull />
                <motion.div
                  className="flex items-center gap-2 font-mono text-sm text-neon-green"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    ⟳
                  </motion.span>
                  BREACHING FIREWALL...
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
                className="bg-card/80 backdrop-blur-md border border-neon-green/30 rounded-lg overflow-hidden"
                style={{ boxShadow: "0 0 80px hsl(120 100% 50% / 0.1), inset 0 1px 0 hsl(120 100% 50% / 0.1)" }}
              >
                {/* Terminal header */}
                <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-b border-border/30">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <motion.span className="w-2.5 h-2.5 rounded-full bg-signal-red" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                      <motion.span className="w-2.5 h-2.5 rounded-full bg-amber-500" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, delay: 0.2, repeat: Infinity }} />
                      <motion.span className="w-2.5 h-2.5 rounded-full bg-neon-green" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, delay: 0.4, repeat: Infinity }} />
                    </div>
                    <Terminal className="w-3 h-3 text-neon-green ml-2" />
                    <GlitchText text="root@asura-legion" className="text-xs font-mono text-muted-foreground" />
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground/50">bash</span>
                </div>

                {/* Terminal content */}
                <div className="p-5 font-mono text-xs space-y-0.5 min-h-[260px] bg-gradient-to-b from-transparent to-neon-green/5">
                  {bootSequence.slice(0, currentLine).map((line, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.1 }}
                      className={`flex items-center gap-2 ${
                        line.type === "header" ? "text-neon-green font-bold mt-2" :
                        line.type === "success" ? "text-neon-green/80" :
                        line.type === "user" ? "text-foreground font-semibold" :
                        line.type === "purple" ? "text-electric-purple font-semibold" :
                        line.type === "final" ? "text-neon-green font-bold text-sm mt-3" :
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
                      className="inline-block w-2 h-3 bg-neon-green mt-1"
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
                  Breaking barriers • Securing the digital realm
                </motion.p>

                {/* Enter button */}
                <motion.button
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  onClick={handleEnter}
                  className="mt-10 px-10 py-4 font-mono text-sm bg-gradient-to-r from-neon-green/10 via-electric-purple/10 to-neon-green/10 border border-neon-green/40 text-neon-green rounded-lg hover:border-neon-green transition-all flex items-center gap-3 group relative overflow-hidden"
                  style={{ boxShadow: "0 0 50px hsl(120 100% 50% / 0.15)" }}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 60px hsl(120 100% 50% / 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-green/10 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="relative">{">"} INITIALIZE</span>
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
              <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-l from-neon-green/50 to-transparent" />
              <motion.div
                className="absolute right-8 top-1/2 -translate-y-1/2 text-8xl font-mono font-bold text-neon-green/10"
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
              style={{ background: "radial-gradient(circle, hsl(120 100% 50% / 0.2) 0%, transparent 50%)" }}
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
