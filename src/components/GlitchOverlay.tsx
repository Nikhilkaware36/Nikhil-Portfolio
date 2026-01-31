import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GlitchOverlay = () => {
  const [glitching, setGlitching] = useState(false);
  const [glitchType, setGlitchType] = useState(0);

  useEffect(() => {
    const triggerGlitch = () => {
      if (Math.random() > 0.92) {
        setGlitchType(Math.floor(Math.random() * 3));
        setGlitching(true);
        setTimeout(() => setGlitching(false), 100 + Math.random() * 150);
      }
    };

    const interval = setInterval(triggerGlitch, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {glitching && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none z-[60]"
        >
          {glitchType === 0 && (
            // Horizontal slice glitch
            <div className="absolute inset-0">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute left-0 right-0 bg-neon-green/10"
                  style={{
                    top: `${20 + i * 15 + Math.random() * 10}%`,
                    height: `${2 + Math.random() * 5}px`,
                    transform: `translateX(${(Math.random() - 0.5) * 20}px)`,
                  }}
                />
              ))}
            </div>
          )}
          
          {glitchType === 1 && (
            // Color shift glitch
            <div className="absolute inset-0 mix-blend-screen">
              <div className="absolute inset-0 bg-signal-red/5 translate-x-1" />
              <div className="absolute inset-0 bg-neon-green/5 -translate-x-1" />
              <div className="absolute inset-0 bg-electric-purple/5 translate-y-0.5" />
            </div>
          )}
          
          {glitchType === 2 && (
            // Noise glitch
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlitchOverlay;
