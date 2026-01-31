import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Radio } from "lucide-react";
import { useSound } from "@/hooks/useSound";
import AudioVisualizer from "./AudioVisualizer";

const SoundToggle = () => {
  const { setEnabled, isEnabled, playClick, startAmbient, stopAmbient, getAudioContext, getAmbientMasterGain, isAmbientPlaying } = useSound();
  const [enabled, setEnabledState] = useState(isEnabled());
  const [ambientOn, setAmbientOn] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [masterGain, setMasterGain] = useState<GainNode | null>(null);

  // Update visualizer refs when ambient starts
  useEffect(() => {
    if (ambientOn) {
      // Small delay to ensure nodes are created
      const timer = setTimeout(() => {
        setAudioContext(getAudioContext());
        setMasterGain(getAmbientMasterGain());
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAudioContext(null);
      setMasterGain(null);
    }
  }, [ambientOn, getAudioContext, getAmbientMasterGain]);

  const toggleSound = () => {
    const newState = !enabled;
    setEnabledState(newState);
    setEnabled(newState);
    if (newState) {
      playClick();
    } else {
      stopAmbient();
      setAmbientOn(false);
    }
  };

  const toggleAmbient = () => {
    if (!enabled) return;
    if (ambientOn) {
      stopAmbient();
      setAmbientOn(false);
    } else {
      startAmbient();
      setAmbientOn(true);
    }
  };

  return (
    <>
      <AudioVisualizer 
        isPlaying={ambientOn} 
        audioContext={audioContext} 
        masterGain={masterGain} 
      />
      
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2">
        {/* Ambient toggle */}
        <motion.button
          onClick={toggleAmbient}
          className={`p-3 bg-card/80 backdrop-blur-sm border rounded-lg transition-all group ${
            ambientOn 
              ? "border-electric-purple/60 text-electric-purple" 
              : "border-border/50 text-muted-foreground hover:text-electric-purple hover:border-electric-purple/30"
          } ${!enabled ? "opacity-50 cursor-not-allowed" : ""}`}
          whileHover={enabled ? { scale: 1.1 } : {}}
          whileTap={enabled ? { scale: 0.9 } : {}}
          style={{
            boxShadow: ambientOn ? "0 0 20px hsl(270 100% 65% / 0.3)" : "none",
          }}
          title={ambientOn ? "Stop ambient sound" : "Play ambient sound"}
        >
          <Radio className={`w-5 h-5 ${ambientOn ? "animate-pulse" : ""}`} />
          <span className="absolute left-full ml-2 px-2 py-1 bg-card border border-border rounded text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {ambientOn ? "Ambient ON" : "Ambient OFF"}
          </span>
        </motion.button>

        {/* Sound toggle */}
        <motion.button
          onClick={toggleSound}
          className="p-3 bg-card/80 backdrop-blur-sm border border-neon-green/30 rounded-lg text-neon-green hover:border-neon-green/60 transition-all group"
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
      </div>
    </>
  );
};

export default SoundToggle;
