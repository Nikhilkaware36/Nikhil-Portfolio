import { motion } from "framer-motion";
import { Terminal, Github, Linkedin, Mail, Instagram, Phone, Heart, Skull, Shield, Code, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useSound } from "@/hooks/useSound";

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "CTF Writeups", href: "/ctf-writeups", isPage: true },
  { label: "Contact", href: "/contact", isPage: true },
];

const FooterSection = () => {
  const { playHover, playClick } = useSound();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 border-t border-border/30 bg-gradient-to-b from-background to-card/50 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-neon-green/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-electric-purple/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main footer content */}
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand section */}
            <div className="space-y-4">
              <motion.div 
                className="flex items-center gap-3"
                whileHover={{ x: 5 }}
              >
                <div className="w-12 h-12 rounded-xl bg-neon-green/10 border border-neon-green/30 flex items-center justify-center">
                  <Skull className="w-6 h-6 text-neon-green" />
                </div>
                <div>
                  <h3 className="font-mono font-bold text-lg">NSK</h3>
                  <p className="text-xs text-muted-foreground font-mono">Cybersecurity Expert</p>
                </div>
              </motion.div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Breaking barriers to uncover hidden vulnerabilities. Passionate about digital forensics, OSINT, and making the digital world safer.
              </p>
              
              {/* Status indicator */}
              <div className="flex items-center gap-2 text-sm font-mono">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green"></span>
                </span>
                <span className="text-neon-green">Available for opportunities</span>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-mono font-bold text-sm text-muted-foreground mb-4 flex items-center gap-2">
                <Code className="w-4 h-4 text-electric-purple" />
                QUICK_LINKS
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {quickLinks.map((link) => (
                  link.isPage ? (
                    <Link
                      key={link.label}
                      to={link.href}
                      onMouseEnter={playHover}
                      onClick={playClick}
                      className="text-sm text-muted-foreground hover:text-neon-green transition-colors flex items-center gap-1 group"
                    >
                      <span className="text-neon-green opacity-0 group-hover:opacity-100 transition-opacity">{">"}</span>
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      onMouseEnter={playHover}
                      onClick={playClick}
                      className="text-sm text-muted-foreground hover:text-neon-green transition-colors flex items-center gap-1 group"
                    >
                      <span className="text-neon-green opacity-0 group-hover:opacity-100 transition-opacity">{">"}</span>
                      {link.label}
                    </a>
                  )
                ))}
              </div>
            </div>

            {/* Contact section */}
            <div>
              <h4 className="font-mono font-bold text-sm text-muted-foreground mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-signal-red" />
                CONNECT
              </h4>
              <div className="space-y-3">
                <motion.a
                  href="tel:+918928613738"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-neon-green transition-colors group"
                  whileHover={{ x: 5 }}
                  onMouseEnter={playHover}
                >
                  <Phone className="w-4 h-4 text-neon-green" />
                  <span>+91 8928613738</span>
                </motion.a>
                <motion.a
                  href="mailto:nikhilkaware8236@gmail.com"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-electric-purple transition-colors group"
                  whileHover={{ x: 5 }}
                  onMouseEnter={playHover}
                >
                  <Mail className="w-4 h-4 text-electric-purple" />
                  <span>nikhilkaware8236@gmail.com</span>
                </motion.a>
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-3 mt-6">
                {[
                  { href: "https://github.com/nikhilkaware36", icon: Github, label: "GitHub", hoverColor: "hover:text-neon-green hover:border-neon-green/50" },
                  { href: "https://www.linkedin.com/in/nikhil-kaware-0709482b5", icon: Linkedin, label: "LinkedIn", hoverColor: "hover:text-electric-purple hover:border-electric-purple/50" },
                  { href: "https://instagram.com/nikhil.kaware.3", icon: Instagram, label: "Instagram", hoverColor: "hover:text-signal-red hover:border-signal-red/50" },
                ].map((social) => (
                  <motion.a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`p-2.5 bg-card border border-border/50 rounded-lg text-muted-foreground transition-all ${social.hoverColor}`}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={playHover}
                    onClick={playClick}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Divider with terminal style */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/30"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-4 text-xs font-mono text-muted-foreground">
                {"< EOF />"}
              </span>
            </div>
          </div>

          {/* Bottom section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Terminal prompt */}
            <div className="flex items-center gap-3 font-mono text-sm">
              <Terminal className="w-4 h-4 text-neon-green" />
              <span className="text-muted-foreground">root@kaware-sec:~$</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="w-2 h-4 bg-neon-green inline-block"
              />
            </div>

            {/* Copyright */}
            <p className="font-mono text-sm text-muted-foreground flex items-center gap-2">
              <span>© {currentYear}</span>
              <span className="text-neon-green">Nikhil Santosh Kaware</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                Made with <Heart className="w-3 h-3 text-signal-red inline animate-pulse" /> & Code
              </span>
            </p>

            {/* Back to top */}
            <motion.a
              href="#"
              className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-neon-green transition-colors"
              whileHover={{ y: -3 }}
              onMouseEnter={playHover}
              onClick={playClick}
            >
              <span>scroll_to_top</span>
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ↑
              </motion.span>
            </motion.a>
          </div>

          {/* Easter egg terminal command */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 text-center"
          >
            <p className="font-mono text-xs text-muted-foreground/40">
              <span className="text-neon-green/40">$</span> echo "Stay secure, stay curious, keep hacking." 🐀
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
