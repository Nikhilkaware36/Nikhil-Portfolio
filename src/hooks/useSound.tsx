import { useCallback, useRef, useEffect } from "react";

// Web Audio API based sound generator for hacker-themed sounds
class HackerSoundEngine {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;
  private ambientNodes: {
    oscillators: OscillatorNode[];
    gains: GainNode[];
    masterGain: GainNode | null;
  } = { oscillators: [], gains: [], masterGain: null };
  private ambientPlaying: boolean = false;

  private getContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (!enabled) {
      this.stopAmbient();
    }
  }

  isEnabled() {
    return this.enabled;
  }

  isAmbientPlaying() {
    return this.ambientPlaying;
  }

  // Start ambient background sound - subtle cyberpunk hum
  startAmbient() {
    if (!this.enabled || this.ambientPlaying) return;
    
    const ctx = this.getContext();
    
    // Master gain for ambient
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.015, ctx.currentTime + 2); // Fade in
    masterGain.connect(ctx.destination);
    
    this.ambientNodes.masterGain = masterGain;

    // Deep bass drone
    const bassOsc = ctx.createOscillator();
    const bassGain = ctx.createGain();
    bassOsc.type = "sine";
    bassOsc.frequency.setValueAtTime(55, ctx.currentTime);
    bassGain.gain.setValueAtTime(0.4, ctx.currentTime);
    bassOsc.connect(bassGain);
    bassGain.connect(masterGain);
    bassOsc.start();
    this.ambientNodes.oscillators.push(bassOsc);
    this.ambientNodes.gains.push(bassGain);

    // Sub harmonic
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(110, ctx.currentTime);
    subGain.gain.setValueAtTime(0.2, ctx.currentTime);
    subOsc.connect(subGain);
    subGain.connect(masterGain);
    subOsc.start();
    this.ambientNodes.oscillators.push(subOsc);
    this.ambientNodes.gains.push(subGain);

    // High frequency shimmer with LFO
    const shimmerOsc = ctx.createOscillator();
    const shimmerGain = ctx.createGain();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    
    shimmerOsc.type = "sine";
    shimmerOsc.frequency.setValueAtTime(880, ctx.currentTime);
    shimmerGain.gain.setValueAtTime(0.05, ctx.currentTime);
    
    lfo.type = "sine";
    lfo.frequency.setValueAtTime(0.1, ctx.currentTime);
    lfoGain.gain.setValueAtTime(0.03, ctx.currentTime);
    
    lfo.connect(lfoGain);
    lfoGain.connect(shimmerGain.gain);
    shimmerOsc.connect(shimmerGain);
    shimmerGain.connect(masterGain);
    
    lfo.start();
    shimmerOsc.start();
    this.ambientNodes.oscillators.push(shimmerOsc, lfo);
    this.ambientNodes.gains.push(shimmerGain, lfoGain);

    // Subtle digital noise using filtered noise
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseData.length; i++) {
      noiseData[i] = (Math.random() * 2 - 1) * 0.01;
    }
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;
    
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "lowpass";
    noiseFilter.frequency.setValueAtTime(200, ctx.currentTime);
    
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.3, ctx.currentTime);
    
    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);
    noiseSource.start();

    this.ambientPlaying = true;
  }

  // Stop ambient sound
  stopAmbient() {
    if (!this.ambientPlaying) return;
    
    const ctx = this.getContext();
    
    // Fade out
    if (this.ambientNodes.masterGain) {
      this.ambientNodes.masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
    }
    
    // Stop after fade
    setTimeout(() => {
      this.ambientNodes.oscillators.forEach(osc => {
        try { osc.stop(); } catch (e) {}
      });
      this.ambientNodes = { oscillators: [], gains: [], masterGain: null };
    }, 600);
    
    this.ambientPlaying = false;
  }

  // Toggle ambient
  toggleAmbient() {
    if (this.ambientPlaying) {
      this.stopAmbient();
    } else {
      this.startAmbient();
    }
    return this.ambientPlaying;
  }

  // Keyboard typing sound
  playKeypress() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(800 + Math.random() * 400, ctx.currentTime);
    
    gainNode.gain.setValueAtTime(0.03, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.05);
  }

  // Hover beep sound
  playHover() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(1200, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.02, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  }

  // Click sound
  playClick() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(150, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  }

  // Success/complete sound
  playSuccess() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    
    [0, 0.1, 0.2].forEach((delay, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime([523, 659, 784][i], ctx.currentTime + delay);
      
      gainNode.gain.setValueAtTime(0.03, ctx.currentTime + delay);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.15);
      
      oscillator.start(ctx.currentTime + delay);
      oscillator.stop(ctx.currentTime + delay + 0.15);
    });
  }

  // Glitch/error sound
  playGlitch() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    
    for (let i = 0; i < 5; i++) {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.type = "sawtooth";
      oscillator.frequency.setValueAtTime(100 + Math.random() * 500, ctx.currentTime + i * 0.02);
      
      gainNode.gain.setValueAtTime(0.02, ctx.currentTime + i * 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.02 + 0.03);
      
      oscillator.start(ctx.currentTime + i * 0.02);
      oscillator.stop(ctx.currentTime + i * 0.02 + 0.03);
    }
  }

  // Scan/sweep sound
  playScan() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(200, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(0.02, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.3);
  }

  // Boot/startup sound
  playBoot() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    
    const frequencies = [100, 150, 200, 300, 400, 600, 800];
    frequencies.forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
      
      gainNode.gain.setValueAtTime(0.02, ctx.currentTime + i * 0.08);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.1);
      
      oscillator.start(ctx.currentTime + i * 0.08);
      oscillator.stop(ctx.currentTime + i * 0.08 + 0.1);
    });
  }

  // Notification blip
  playNotification() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    
    [0, 0.15].forEach((delay) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(880, ctx.currentTime + delay);
      
      gainNode.gain.setValueAtTime(0.03, ctx.currentTime + delay);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.1);
      
      oscillator.start(ctx.currentTime + delay);
      oscillator.stop(ctx.currentTime + delay + 0.1);
    });
  }
}

// Singleton instance
const soundEngine = new HackerSoundEngine();

export const useSound = () => {
  const playKeypress = useCallback(() => soundEngine.playKeypress(), []);
  const playHover = useCallback(() => soundEngine.playHover(), []);
  const playClick = useCallback(() => soundEngine.playClick(), []);
  const playSuccess = useCallback(() => soundEngine.playSuccess(), []);
  const playGlitch = useCallback(() => soundEngine.playGlitch(), []);
  const playScan = useCallback(() => soundEngine.playScan(), []);
  const playBoot = useCallback(() => soundEngine.playBoot(), []);
  const playNotification = useCallback(() => soundEngine.playNotification(), []);
  
  const startAmbient = useCallback(() => soundEngine.startAmbient(), []);
  const stopAmbient = useCallback(() => soundEngine.stopAmbient(), []);
  const toggleAmbient = useCallback(() => soundEngine.toggleAmbient(), []);
  const isAmbientPlaying = useCallback(() => soundEngine.isAmbientPlaying(), []);
  
  const setEnabled = useCallback((enabled: boolean) => {
    soundEngine.setEnabled(enabled);
  }, []);
  
  const isEnabled = useCallback(() => soundEngine.isEnabled(), []);

  return {
    playKeypress,
    playHover,
    playClick,
    playSuccess,
    playGlitch,
    playScan,
    playBoot,
    playNotification,
    startAmbient,
    stopAmbient,
    toggleAmbient,
    isAmbientPlaying,
    setEnabled,
    isEnabled,
  };
};

export default useSound;
