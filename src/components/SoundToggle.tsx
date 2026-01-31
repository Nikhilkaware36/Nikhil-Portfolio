import { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "@/hooks/useSound";

const SoundToggle = () => {
  const { setEnabled, isEnabled, playClick } = useSound();
  const [enabled, setEnabledState] = useState(isEnabled());

  const toggle = () => {
    const newState = !enabled;
    setEnabledState(newState);
    setEnabled(newState);
    if (newState) {
      playClick();
    }
  };

  return (
    <motion.button
      onClick={toggle}
      className="fixed bottom-6 left-6 z-50 p-3 bg-card/80 backdrop-blur-sm border border-neon-green/30 rounded-lg text-neon-green hover:border-neon-green/60 transition-all group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={{
        boxShadow: enabled ? "0 0 20px hsl(120 100% 50% / 0.2)" : "none",
      }}
      title={enabled ? "Mute sounds" : "Enable sounds"}
    >
      {enabled ? (
        <Volume2 className="w-5 h-5" />
      ) : (
        <VolumeX className="w-5 h-5 opacity-50" />
      )}
      <span className="absolute left-full ml-2 px-2 py-1 bg-card border border-border rounded text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {enabled ? "Sound ON" : "Sound OFF"}
      </span>
    </motion.button>
  );
};

export default SoundToggle;
