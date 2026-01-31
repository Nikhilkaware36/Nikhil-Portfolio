import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Navigation from "../components/Navigation";
import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import SkillsSection from "../components/sections/SkillsSection";
import CertificationsSection from "../components/sections/CertificationsSection";
import AsuraLegionSection from "../components/sections/AsuraLegionSection";
import HobbiesSection from "../components/sections/HobbiesSection";
import FooterSection from "../components/sections/FooterSection";
import Background3D from "../components/Background3D";
import IntroAnimation from "../components/IntroAnimation";
import TerminalPopup from "../components/TerminalPopup";
import SoundToggle from "../components/SoundToggle";
import ParticleField from "../components/ParticleField";
import ScrollProgress from "../components/ScrollProgress";
import GlitchOverlay from "../components/GlitchOverlay";
import { useSound } from "@/hooks/useSound";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const { playBoot, playSuccess, startAmbient } = useSound();

  useEffect(() => {
    if (!showIntro) {
      // Play boot sound and start ambient when intro completes
      playSuccess();
      // Start ambient sound after a short delay for immersion
      const ambientTimer = setTimeout(() => {
        startAmbient();
      }, 1500);
      return () => clearTimeout(ambientTimer);
    }
  }, [showIntro, playSuccess, startAmbient]);

  const handleIntroComplete = () => {
    playBoot();
    setShowIntro(false);
  };

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <IntroAnimation onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      <div className={`min-h-screen bg-background text-foreground ${showIntro ? "hidden" : ""}`}>
        {/* Background layers */}
        <Background3D />
        <ParticleField />
        <GlitchOverlay />
        
        {/* Progress indicator */}
        <ScrollProgress />
        
        {/* UI Components */}
        <SoundToggle />
        <TerminalPopup />
        <Navigation />
        
        <main>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <CertificationsSection />
          <AsuraLegionSection />
          <HobbiesSection />
        </main>
        <FooterSection />
      </div>
    </>
  );
};

export default Index;
