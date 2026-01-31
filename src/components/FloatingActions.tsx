import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUp, 
  Download, 
  Share2, 
  Maximize, 
  Minimize,
  Copy,
  Check,
  Sparkles,
  Zap
} from "lucide-react";
import { useSound } from "@/hooks/useSound";
import { toast } from "sonner";

const FloatingActions = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showRipple, setShowRipple] = useState<string | null>(null);
  const { playClick, playSuccess } = useSound();

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
    triggerRipple("top");
  };

  const downloadResume = () => {
    playClick();
    const link = document.createElement("a");
    link.href = "/Nikhil_Kaware_Resume.pdf";
    link.download = "Nikhil_Kaware_Resume.pdf";
    link.click();
    playSuccess();
    toast.success("Resume download started!");
    triggerRipple("download");
  };

  const copyLink = async () => {
    playClick();
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    playSuccess();
    toast.success("Link copied to clipboard!");
    triggerRipple("copy");
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFullscreen = () => {
    playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
      toast.success("Entered fullscreen mode");
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
      toast.success("Exited fullscreen mode");
    }
    triggerRipple("fullscreen");
  };

  const triggerRipple = (id: string) => {
    setShowRipple(id);
    setTimeout(() => setShowRipple(null), 600);
  };

  const actions = [
    { 
      id: "top", 
      icon: ArrowUp, 
      label: "Back to Top", 
      onClick: scrollToTop,
      color: "neon-green"
    },
    { 
      id: "download", 
      icon: Download, 
      label: "Download CV", 
      onClick: downloadResume,
      color: "electric-purple"
    },
    { 
      id: "copy", 
      icon: copied ? Check : Share2, 
      label: copied ? "Copied!" : "Share Link", 
      onClick: copyLink,
      color: "signal-red"
    },
    { 
      id: "fullscreen", 
      icon: isFullscreen ? Minimize : Maximize, 
      label: isFullscreen ? "Exit Fullscreen" : "Fullscreen", 
      onClick: toggleFullscreen,
      color: "neon-green"
    },
  ];

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3"
    >
      {/* Decorative line */}
      <div className="absolute -left-3 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-green/30 to-transparent" />
      
      {actions.map((action, index) => (
        <motion.div
          key={action.id}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.2 + index * 0.1 }}
          className="relative group"
        >
          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="hidden group-hover:block bg-background/90 backdrop-blur-sm border border-border/50 rounded-md px-2 py-1 whitespace-nowrap"
            >
              <span className="text-xs font-mono text-foreground">{action.label}</span>
            </motion.div>
          </div>

          {/* Button */}
          <motion.button
            onClick={action.onClick}
            whileHover={{ scale: 1.15, x: -5 }}
            whileTap={{ scale: 0.9 }}
            className={`
              relative w-10 h-10 rounded-lg
              bg-background/80 backdrop-blur-sm
              border border-border/50
              flex items-center justify-center
              transition-all duration-300
              hover:border-${action.color}/50
              hover:shadow-[0_0_20px_rgba(var(--${action.color}),0.3)]
              overflow-hidden
              group
            `}
            style={{
              boxShadow: showRipple === action.id 
                ? `0 0 30px hsl(var(--${action.color}) / 0.5)` 
                : undefined
            }}
          >
            {/* Glow background on hover */}
            <div className={`
              absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300
              bg-gradient-to-br from-${action.color} to-transparent
            `} />
            
            {/* Icon */}
            <action.icon className={`
              w-4 h-4 relative z-10 transition-colors duration-300
              text-muted-foreground group-hover:text-${action.color}
            `} />

            {/* Ripple effect */}
            <AnimatePresence>
              {showRipple === action.id && (
                <motion.div
                  initial={{ scale: 0, opacity: 0.5 }}
                  animate={{ scale: 3, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className={`absolute inset-0 rounded-full bg-${action.color}`}
                />
              )}
            </AnimatePresence>

            {/* Corner accents */}
            <div className={`absolute top-0 left-0 w-2 h-px bg-${action.color}/50 opacity-0 group-hover:opacity-100 transition-opacity`} />
            <div className={`absolute top-0 left-0 w-px h-2 bg-${action.color}/50 opacity-0 group-hover:opacity-100 transition-opacity`} />
            <div className={`absolute bottom-0 right-0 w-2 h-px bg-${action.color}/50 opacity-0 group-hover:opacity-100 transition-opacity`} />
            <div className={`absolute bottom-0 right-0 w-px h-2 bg-${action.color}/50 opacity-0 group-hover:opacity-100 transition-opacity`} />
          </motion.button>

          {/* Pulse indicator for special actions */}
          {action.id === "download" && (
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-2 h-2 bg-electric-purple rounded-full"
            />
          )}
        </motion.div>
      ))}

      {/* Bottom sparkle decoration */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="mt-2 flex justify-center"
      >
        <Sparkles className="w-3 h-3 text-neon-green/30" />
      </motion.div>
    </motion.div>
  );
};

export default FloatingActions;
