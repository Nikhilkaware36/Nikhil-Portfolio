import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, BarChart3, AudioWaveform } from "lucide-react";

interface AudioVisualizerProps {
  isPlaying: boolean;
  audioContext: AudioContext | null;
  masterGain: GainNode | null;
}

type VisualizationMode = "bars" | "waveform";

const AudioVisualizer = ({ isPlaying, audioContext, masterGain }: AudioVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number>();
  const [isExpanded, setIsExpanded] = useState(false);
  const [mode, setMode] = useState<VisualizationMode>("bars");

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
      analyserRef.current.fftSize = mode === "waveform" ? 256 : 64;
      analyserRef.current.smoothingTimeConstant = 0.8;
    }

    // Update fftSize based on mode
    analyserRef.current.fftSize = mode === "waveform" ? 256 : 64;

    // Connect master gain to analyser
    try {
      masterGain.connect(analyserRef.current);
    } catch (e) {
      // Already connected
    }

    const analyser = analyserRef.current;
    const bufferLength = mode === "waveform" ? analyser.fftSize : analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawBars = () => {
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barCount = 16;
      const barWidth = canvas.width / barCount - 2;
      const step = Math.floor(analyser.frequencyBinCount / barCount);

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
    };

    const drawWaveform = () => {
      analyser.getByteTimeDomainData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background grid
      ctx.strokeStyle = "hsl(270 100% 65% / 0.1)";
      ctx.lineWidth = 1;
      const gridLines = 4;
      for (let i = 1; i < gridLines; i++) {
        const y = (canvas.height / gridLines) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Center line
      ctx.strokeStyle = "hsl(270 100% 65% / 0.3)";
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // Draw waveform
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Create gradient for the waveform
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, "hsl(120 100% 50%)"); // neon-green
      gradient.addColorStop(0.5, "hsl(270 100% 65%)"); // electric-purple
      gradient.addColorStop(1, "hsl(0 85% 55%)"); // signal-red

      ctx.strokeStyle = gradient;
      ctx.shadowBlur = 8;
      ctx.shadowColor = "hsl(270 100% 65% / 0.5)";

      ctx.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        // Amplify the waveform for visibility
        const rawValue = dataArray[i] / 128.0 - 1;
        const amplifiedValue = rawValue * 3; // Amplify
        const v = Math.max(-1, Math.min(1, amplifiedValue)); // Clamp
        const y = ((v + 1) / 2) * canvas.height;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.stroke();

      // Draw glow effect (second pass)
      ctx.shadowBlur = 15;
      ctx.shadowColor = "hsl(120 100% 50% / 0.3)";
      ctx.globalAlpha = 0.3;
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      // Draw points at peaks
      ctx.fillStyle = "hsl(120 100% 70%)";
      for (let i = 0; i < bufferLength; i += Math.floor(bufferLength / 8)) {
        const rawValue = dataArray[i] / 128.0 - 1;
        const amplifiedValue = Math.max(-1, Math.min(1, rawValue * 3));
        const y = ((amplifiedValue + 1) / 2) * canvas.height;
        const dotX = i * sliceWidth;
        
        if (Math.abs(amplifiedValue) > 0.1) {
          ctx.beginPath();
          ctx.arc(dotX, y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const draw = () => {
      if (mode === "bars") {
        drawBars();
      } else {
        drawWaveform();
      }
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, audioContext, masterGain, mode]);

  const toggleMode = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMode(mode === "bars" ? "waveform" : "bars");
  };

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
              
              {/* Mode toggle button */}
              <motion.button
                onClick={toggleMode}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="ml-auto p-1 rounded hover:bg-electric-purple/20 transition-colors"
                title={`Switch to ${mode === "bars" ? "waveform" : "bars"} mode`}
              >
                {mode === "bars" ? (
                  <AudioWaveform className="w-3 h-3 text-neon-green" />
                ) : (
                  <BarChart3 className="w-3 h-3 text-electric-purple" />
                )}
              </motion.button>
              
              <div className="flex gap-0.5">
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
              <span className="text-[8px] font-mono text-muted-foreground uppercase">
                {mode === "bars" 
                  ? (isExpanded ? "16-BAND" : "MINI") 
                  : (isExpanded ? "WAVEFORM" : "WAVE")
                }
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AudioVisualizer;
