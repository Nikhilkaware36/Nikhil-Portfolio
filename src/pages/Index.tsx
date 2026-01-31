import { useState } from "react";
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
import CustomCursor from "../components/CustomCursor";
import Background3D from "../components/Background3D";
import IntroAnimation from "../components/IntroAnimation";
import TerminalPopup from "../components/TerminalPopup";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <IntroAnimation onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      <div className={`min-h-screen bg-background text-foreground cursor-none ${showIntro ? "hidden" : ""}`}>
        <Background3D />
        <CustomCursor />
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
