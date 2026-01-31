import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ChevronRight, Skull, Shield, Wifi, Lock, Eye } from "lucide-react";
import asuraLogo from "@/assets/asura-legion-logo.png";

interface IntroAnimationProps {
  onComplete: () => void;
}

const bootSequence = [
  { text: "[SYS] Initializing kernel...", delay: 0 },
  { text: "[NET] Establishing encrypted tunnel...", delay: 200 },
  { text: "[SEC] Loading security protocols...", delay: 400 },
  { text: "[AUTH] Verifying credentials...", delay: 600 },
  { text: "[USR] Identity: NIKHIL KAWARE", delay: 800 },
  { text: "[GRP] Affiliation: ASURA LEGION", delay: 1000 },
  { text: "[OK] Access granted. Welcome, Operator.", delay: 1200 },
];

// ASCII Art Hacker Rat
const hackerRatFrames = [
  `
    /\\___/\\
   ( o   o )
   (  =^=  ) 
    (")_(")
  `,
  `
    /\\___/\\
   ( -   - )
   (  =^=  ) 
    (")_(")
  `,
  `
    /\\___/\\
   ( o   o )
   (  =^=  )~
    (")_(")
  `,
];

const matrixChars = "ニホンゴアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF";

const MatrixRain = () => {
  const columns = 30;
  
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      {Array.from({ length: columns }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-neon-green font-mono text-xs"
          style={{
            left: `${(i / columns) * 100}%`,
            top: -100,
          }}
          animate={{
            y: [0, window.innerHeight + 200],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "linear",
          }}
        >
          {Array.from({ length: 15 }).map((_, j) => (
            <div key={j} style={{ opacity: 1 - j * 0.06 }}>
              {matrixChars[Math.floor(Math.random() * matrixChars.length)]}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

const GlitchingText = ({ text, className }: { text: string; className?: string }) => {
  const [glitchText, setGlitchText] = useState(text);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const chars = text.split("");
        const randomIndex = Math.floor(Math.random() * chars.length);
        chars[randomIndex] = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        setGlitchText(chars.join(""));
        setTimeout(() => setGlitchText(text), 100);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [text]);
  
  return <span className={className}>{glitchText}</span>;
};

const HackerRat = () => {
  const [frame, setFrame] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(f => (f + 1) % hackerRatFrames.length);
    }, 300);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <motion.pre
      className="text-neon-green font-mono text-xs leading-none"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{ textShadow: "0 0 10px hsl(120 100% 50% / 0.8)" }}
    >
      {hackerRatFrames[frame]}
    </motion.pre>
  );
};

const FloatingIcon = ({ Icon, delay, x, y }: { Icon: any; delay: number; x: string; y: string }) => (
  <motion.div
    className="absolute text-neon-green/30"
    style={{ left: x, top: y }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 0.5, 0],
      scale: [0.5, 1.2, 0.5],
      rotate: [0, 360],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <Icon className="w-8 h-8" />
  </motion.div>
);

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [phase, setPhase] = useState<"matrix" | "boot" | "reveal" | "doors">("matrix");
  const [currentLine, setCurrentLine] = useState(0);
  const [doorsOpen, setDoorsOpen] = useState(false);

  useEffect(() => {
    // Phase transitions
    const timer1 = setTimeout(() => setPhase("boot"), 1500);
    return () => clearTimeout(timer1);
  }, []);

  useEffect(() => {
    if (phase === "boot" && currentLine < bootSequence.length) {
      const timer = setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
      }, bootSequence[currentLine].delay + 150);
      return () => clearTimeout(timer);
    } else if (phase === "boot" && currentLine >= bootSequence.length) {
      setTimeout(() => setPhase("reveal"), 300);
    }
  }, [phase, currentLine]);

  useEffect(() => {
    if (phase === "reveal") {
      setTimeout(() => setPhase("doors"), 2000);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "doors") {
      setTimeout(() => setDoorsOpen(true), 500);
    }
  }, [phase]);

  const handleEnter = () => {
    setDoorsOpen(true);
    setTimeout(onComplete, 800);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-background overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Matrix rain background */}
      <MatrixRain />
      
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      {/* Scanlines */}
      <div className="absolute inset-0 scanlines opacity-30" />

      {/* Floating security icons */}
      <FloatingIcon Icon={Shield} delay={0} x="10%" y="20%" />
      <FloatingIcon Icon={Lock} delay={0.5} x="85%" y="15%" />
      <FloatingIcon Icon={Eye} delay={1} x="15%" y="75%" />
      <FloatingIcon Icon={Wifi} delay={1.5} x="80%" y="70%" />
      <FloatingIcon Icon={Skull} delay={2} x="50%" y="10%" />

      {/* Skip button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={onComplete}
        className="absolute top-6 right-6 px-4 py-2 text-xs font-mono text-muted-foreground border border-border/50 rounded hover:border-neon-green/50 hover:text-neon-green transition-colors z-50"
      >
        SKIP {">>"}
      </motion.button>

      {/* Main content container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-2xl w-full px-8 relative z-10">
          
          {/* Matrix phase - Hacker rat */}
          <AnimatePresence>
            {phase === "matrix" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center gap-4"
              >
                <HackerRat />
                <motion.p
                  className="font-mono text-neon-green text-sm"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  Initializing secure connection...
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Boot phase - Terminal */}
          <AnimatePresence>
            {phase === "boot" && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-card/90 backdrop-blur-sm border border-neon-green/40 rounded-lg overflow-hidden"
                style={{ boxShadow: "0 0 60px hsl(120 100% 50% / 0.15)" }}
              >
                {/* Terminal header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border/50">
                  <div className="flex gap-1.5">
                    <motion.span 
                      className="w-3 h-3 rounded-full bg-signal-red"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.span 
                      className="w-3 h-3 rounded-full bg-amber-500"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                    />
                    <motion.span 
                      className="w-3 h-3 rounded-full bg-neon-green"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                    />
                  </div>
                  <span className="ml-2 text-xs font-mono text-muted-foreground flex items-center gap-2">
                    <Terminal className="w-3 h-3" />
                    <GlitchingText text="root@kaware-sec:~" />
                  </span>
                </div>

                {/* Terminal content */}
                <div className="p-6 font-mono text-xs space-y-1 min-h-[220px]">
                  {bootSequence.slice(0, currentLine).map((line, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex items-center gap-2 ${
                        line.text.includes("[OK]")
                          ? "text-neon-green"
                          : line.text.includes("ASURA LEGION")
                          ? "text-electric-purple"
                          : "text-foreground/70"
                      }`}
                    >
                      <span>{line.text}</span>
                      {line.text.includes("[OK]") && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-neon-green"
                        >
                          ✓
                        </motion.span>
                      )}
                    </motion.div>
                  ))}

                  {currentLine < bootSequence.length && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.4, repeat: Infinity }}
                      className="inline-block w-2 h-3 bg-neon-green"
                    />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reveal phase - Logo + Enter */}
          <AnimatePresence>
            {(phase === "reveal" || phase === "doors") && !doorsOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                {/* Glowing orb behind logo */}
                <motion.div
                  className="absolute w-64 h-64 bg-electric-purple/20 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                
                {/* Logo */}
                <motion.div
                  className="relative"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 150, damping: 12, delay: 0.2 }}
                >
                  <img
                    src={asuraLogo}
                    alt="Asura Legion"
                    className="w-40 h-40 object-contain relative z-10"
                    style={{ filter: "drop-shadow(0 0 30px hsl(270 100% 65% / 0.7))" }}
                  />
                  
                  {/* Rotating ring */}
                  <motion.div
                    className="absolute inset-0 border-2 border-electric-purple/50 rounded-full"
                    style={{ margin: -20 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute inset-0 border border-neon-green/30 rounded-full"
                    style={{ margin: -35 }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 text-3xl font-mono font-bold text-electric-purple"
                  style={{ textShadow: "0 0 30px hsl(270 100% 65% / 0.5)" }}
                >
                  ASURA LEGION
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-2 text-sm font-mono text-muted-foreground"
                >
                  Breaking barriers. Securing the digital realm.
                </motion.p>

                {/* Enter button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  onClick={handleEnter}
                  className="mt-8 px-8 py-4 font-mono text-sm bg-gradient-to-r from-neon-green/20 to-electric-purple/20 border border-neon-green/50 text-neon-green rounded-lg hover:from-neon-green/30 hover:to-electric-purple/30 hover:border-neon-green transition-all flex items-center gap-3 group"
                  style={{ boxShadow: "0 0 40px hsl(120 100% 50% / 0.2)" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{">"} ENTER_PORTFOLIO</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Door animation overlay */}
      <AnimatePresence>
        {doorsOpen && (
          <>
            {/* Left door */}
            <motion.div
              className="fixed top-0 left-0 w-1/2 h-full bg-background z-[200] border-r-4 border-neon-green/50"
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              style={{
                boxShadow: "inset -20px 0 60px hsl(120 100% 50% / 0.1)",
              }}
            >
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="absolute right-8 top-1/2 -translate-y-1/2">
                <motion.div
                  animate={{ x: [-5, 5, -5] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="text-6xl font-mono font-bold text-neon-green/20"
                >
                  {"<"}
                </motion.div>
              </div>
            </motion.div>
            
            {/* Right door */}
            <motion.div
              className="fixed top-0 right-0 w-1/2 h-full bg-background z-[200] border-l-4 border-electric-purple/50"
              initial={{ x: 0 }}
              animate={{ x: "100%" }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              style={{
                boxShadow: "inset 20px 0 60px hsl(270 100% 65% / 0.1)",
              }}
            >
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="absolute left-8 top-1/2 -translate-y-1/2">
                <motion.div
                  animate={{ x: [5, -5, 5] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="text-6xl font-mono font-bold text-electric-purple/20"
                >
                  {">"}
                </motion.div>
              </div>
            </motion.div>

            {/* Center flash */}
            <motion.div
              className="fixed inset-0 bg-neon-green/10 z-[199]"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default IntroAnimation;
