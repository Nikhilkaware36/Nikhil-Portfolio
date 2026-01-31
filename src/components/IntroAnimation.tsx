import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ChevronRight } from "lucide-react";
import asuraLogo from "@/assets/asura-legion-logo.png";

interface IntroAnimationProps {
  onComplete: () => void;
}

const bootSequence = [
  { text: "[BOOT] Initializing security protocols...", delay: 0 },
  { text: "[BOOT] Loading kernel modules...", delay: 300 },
  { text: "[BOOT] Mounting encrypted filesystem...", delay: 600 },
  { text: "[BOOT] Establishing secure connection...", delay: 900 },
  { text: "[BOOT] Verifying identity: NIKHIL KAWARE", delay: 1200 },
  { text: "[BOOT] Access level: FOUNDER | ASURA LEGION", delay: 1500 },
  { text: "[BOOT] Loading portfolio interface...", delay: 1800 },
  { text: "[SUCCESS] System ready. Welcome, Operator.", delay: 2100 },
];

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [showEnter, setShowEnter] = useState(false);

  useEffect(() => {
    if (currentLine < bootSequence.length) {
      const timer = setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
      }, bootSequence[currentLine].delay + 200);
      return () => clearTimeout(timer);
    } else {
      setShowLogo(true);
      setTimeout(() => setShowEnter(true), 500);
    }
  }, [currentLine]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-background flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      {/* Scanlines */}
      <div className="absolute inset-0 scanlines opacity-50" />

      {/* Skip button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={onComplete}
        className="absolute top-6 right-6 px-4 py-2 text-xs font-mono text-muted-foreground border border-border/50 rounded hover:border-neon-green/50 hover:text-neon-green transition-colors z-10"
      >
        SKIP {">>"}
      </motion.button>

      <div className="max-w-2xl w-full px-8">
        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card border border-neon-green/30 rounded-lg overflow-hidden shadow-[0_0_50px_hsl(120_100%_50%/0.1)]"
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border/50">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-signal-red" />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-neon-green" />
            </div>
            <span className="ml-2 text-xs font-mono text-muted-foreground flex items-center gap-2">
              <Terminal className="w-3 h-3" />
              kaware-sec@asura-legion:~
            </span>
          </div>

          {/* Terminal content */}
          <div className="p-6 font-mono text-sm space-y-1 min-h-[300px]">
            <AnimatePresence>
              {bootSequence.slice(0, currentLine).map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`${
                    line.text.includes("[SUCCESS]")
                      ? "text-neon-green"
                      : line.text.includes("ASURA LEGION")
                      ? "text-electric-purple"
                      : "text-foreground/80"
                  }`}
                >
                  {line.text}
                </motion.div>
              ))}
            </AnimatePresence>

            {currentLine < bootSequence.length && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-2 h-4 bg-neon-green"
              />
            )}
          </div>
        </motion.div>

        {/* Logo reveal */}
        <AnimatePresence>
          {showLogo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 flex flex-col items-center"
            >
              <motion.img
                src={asuraLogo}
                alt="Asura Legion"
                className="w-32 h-32 object-contain"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                style={{
                  filter: "drop-shadow(0 0 20px hsl(270 100% 65% / 0.5))",
                }}
              />
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 text-2xl font-mono font-bold text-electric-purple text-glow-purple"
              >
                ASURA LEGION
              </motion.h2>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enter button */}
        <AnimatePresence>
          {showEnter && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={onComplete}
              className="mt-8 w-full py-4 font-mono text-sm bg-neon-green/10 border border-neon-green/50 text-neon-green rounded-lg hover:bg-neon-green/20 hover:border-neon-green transition-all flex items-center justify-center gap-2 group"
              style={{
                boxShadow: "0 0 30px hsl(120 100% 50% / 0.2)",
              }}
            >
              <span>{">"} ENTER PORTFOLIO</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default IntroAnimation;
