import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity } from "lucide-react";

interface AudioVisualizerProps {
  isPlaying: boolean;
  audioContext: AudioContext | null;
  masterGain: GainNode | null;
}

const AudioVisualizer = ({ isPlaying, audioContext, masterGain }: AudioVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number>();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!isPlaying || !audioContext || !masterGain) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    // Create analyser if not exists
    if (!analyserRef.current) {
      analyserRef.current = audioContext.createAnalyser();
      analyserRef.current.fftSize = 64;
      analyserRef.current.smoothingTimeConstant = 0.8;
    }

    // Connect master gain to analyser
    try {
      masterGain.connect(analyserRef.current);
    } catch (e) {
      // Already connected
    }

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barCount = 16;
      const barWidth = canvas.width / barCount - 2;
      const step = Math.floor(bufferLength / barCount);

      for (let i = 0; i < barCount; i++) {
        // Get average of frequency range
        let sum = 0;
        for (let j = 0; j < step; j++) {
          sum += dataArray[i * step + j];
        }
        const value = sum / step;
        
        // Amplify the value for visibility (ambient is quiet)
        const amplifiedValue = Math.min(255, value * 3);
        const barHeight = (amplifiedValue / 255) * canvas.height * 0.9;

        // Color gradient from green to purple to red
        const hue = 120 - (i / barCount) * 120; // green to red
        const saturation = 100;
        const lightness = 50 + (amplifiedValue / 255) * 20;

        // Draw bar with glow
        const x = i * (barWidth + 2);
        const y = canvas.height - barHeight;

        // Glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

        // Main bar
        const gradient = ctx.createLinearGradient(x, canvas.height, x, y);
        gradient.addColorStop(0, `hsl(${hue}, ${saturation}%, ${lightness - 20}%)`);
        gradient.addColorStop(1, `hsl(${hue}, ${saturation}%, ${lightness + 10}%)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);

        // Top cap
        ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness + 20}%)`;
        ctx.fillRect(x, y - 2, barWidth, 2);
      }

      ctx.shadowBlur = 0;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, audioContext, masterGain]);

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-24 z-50"
        >
          <motion.div
            className={`bg-card/90 backdrop-blur-sm border border-electric-purple/30 rounded-lg overflow-hidden transition-all ${
              isExpanded ? "p-3" : "p-2"
            }`}
            style={{
              boxShadow: "0 0 30px hsl(270 100% 65% / 0.2)",
            }}
            whileHover={{ borderColor: "hsl(270 100% 65% / 0.6)" }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-2 cursor-pointer mb-2"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Activity className="w-3 h-3 text-electric-purple animate-pulse" />
              <span className="text-[10px] font-mono text-muted-foreground">
                AUDIO_STREAM
              </span>
              <div className="flex gap-0.5 ml-auto">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-2 bg-neon-green rounded-full"
                    animate={{ scaleY: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.1,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Canvas */}
            <motion.div
              initial={false}
              animate={{
                height: isExpanded ? 80 : 40,
                width: isExpanded ? 200 : 120,
              }}
              transition={{ duration: 0.2 }}
            >
              <canvas
                ref={canvasRef}
                width={isExpanded ? 200 : 120}
                height={isExpanded ? 80 : 40}
                className="rounded"
              />
            </motion.div>

            {/* Status bar */}
            <div className="flex items-center justify-between mt-2">
              <span className="text-[8px] font-mono text-neon-green flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse" />
                LIVE
              </span>
              <span className="text-[8px] font-mono text-muted-foreground">
                {isExpanded ? "16-BAND" : "MINI"}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AudioVisualizer;
