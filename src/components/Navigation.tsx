import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Terminal, Wifi } from "lucide-react";
import { useSound } from "@/hooks/useSound";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Arsenal" },
  { href: "#skills", label: "Skills" },
  { href: "#certifications", label: "Vault" },
  { href: "#asura-legion", label: "Legion" },
  { href: "#hobbies", label: "Human" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { playHover, playClick } = useSound();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Detect active section
      const sections = navLinks.map(link => link.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-neon-green/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a 
            href="#" 
            className="flex items-center gap-2 font-mono font-bold text-neon-green group"
            whileHover={{ scale: 1.05 }}
            onMouseEnter={playHover}
            onClick={playClick}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Terminal className="w-5 h-5" />
            </motion.div>
            <span className="hidden sm:inline relative">
              NSK
              <motion.span
                className="absolute -right-3 top-0 w-1.5 h-1.5 bg-neon-green rounded-full"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </span>
          </motion.a>

          {/* Status indicator */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Wifi className="w-3 h-3 text-neon-green" />
            </motion.div>
            <span>SECURE</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onMouseEnter={playHover}
                onClick={playClick}
                className={`px-3 py-2 font-mono text-xs rounded-md transition-all relative group ${
                  activeSection === link.href.slice(1)
                    ? "text-neon-green bg-neon-green/10"
                    : "text-muted-foreground hover:text-neon-green hover:bg-muted/50"
                }`}
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-neon-green absolute -left-1">
                  {">"}
                </span>
                <span className="relative">
                  {link.label}
                  {activeSection === link.href.slice(1) && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-neon-green"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </span>
              </motion.a>
            ))}
          </div>

          {/* Mobile menu button */}
          <motion.button
            onClick={() => {
              setIsOpen(!isOpen);
              playClick();
            }}
            className="md:hidden p-2 text-foreground hover:text-neon-green transition-colors border border-border/50 rounded-lg hover:border-neon-green/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>

        {/* Mobile nav */}
        <motion.div 
          initial={false}
          animate={{ 
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0
          }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 border-t border-border/50">
            <div className="flex flex-col gap-1">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: isOpen ? 0 : -20, opacity: isOpen ? 1 : 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    setIsOpen(false);
                    playClick();
                  }}
                  className={`font-mono text-sm py-3 px-4 rounded-lg transition-colors ${
                    activeSection === link.href.slice(1)
                      ? "text-neon-green bg-neon-green/10"
                      : "text-muted-foreground hover:text-neon-green hover:bg-muted/50"
                  }`}
                >
                  <span className="text-neon-green mr-2">{">"}</span>
                  {link.label}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative line */}
      {scrolled && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/50 to-transparent"
        />
      )}
    </motion.nav>
  );
};

export default Navigation;
