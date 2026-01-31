import { useCallback, useRef } from "react";

// Web Audio API based sound generator for hacker-themed sounds
class HackerSoundEngine {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  private getContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  isEnabled() {
    return this.enabled;
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
    setEnabled,
    isEnabled,
  };
};

export default useSound;
