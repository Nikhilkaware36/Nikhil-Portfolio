import { motion } from "framer-motion";
import { Search, ExternalLink, Crown, Users, Shield, Sword, Target, Globe, Lock, Zap } from "lucide-react";
import asuraLogo from "@/assets/asura-legion-logo.png";

const AsuraLegionSection = () => {
  const handleGoogleSearch = () => {
    window.open("https://www.google.com/search?q=who+is+founder+of+Asura+Legion", "_blank");
  };

  return (
    <section id="asura-legion" className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-electric-purple/5 via-transparent to-electric-purple/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-electric-purple/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-12"
          >
            <Crown className="w-6 h-6 text-electric-purple" />
            <h2 className="text-3xl md:text-4xl font-mono font-bold">
              <span className="text-muted-foreground">//</span> Asura_Legion
            </h2>
          </motion.div>

          {/* Main card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative p-8 md:p-12 bg-card border border-electric-purple/30 rounded-2xl overflow-hidden group hover:border-electric-purple/60 transition-all duration-500"
            style={{
              boxShadow: "0 0 60px hsl(270 100% 65% / 0.15)",
            }}
          >
            {/* Animated border glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-electric-purple/20 via-transparent to-electric-purple/20 animate-pulse" />
            </div>

            {/* Content */}
            <div className="flex flex-col lg:flex-row items-center gap-8 mb-8">
              {/* Logo */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={asuraLogo}
                  alt="Asura Legion"
                  className="w-40 h-40 object-contain"
                  style={{
                    filter: "drop-shadow(0 0 30px hsl(270 100% 65% / 0.6))",
                  }}
                />
                <div className="absolute -inset-4 bg-electric-purple/20 blur-2xl rounded-full -z-10 animate-pulse" />
              </motion.div>

              <div className="text-center lg:text-left flex-1">
                <h3 className="text-3xl md:text-4xl font-mono font-bold text-electric-purple mb-3 text-glow-purple">
                  ASURA LEGION
                </h3>
                <p className="text-lg text-foreground/80 mb-4 max-w-xl">
                  Elite cybersecurity collective dedicated to ethical hacking, advanced security research, and protecting the digital realm from emerging threats.
                </p>
                
                {/* Badges */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-electric-purple/10 border border-electric-purple/50 rounded-full text-sm font-mono text-electric-purple">
                    <Crown className="w-4 h-4" />
                    Founder & Core Member
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-neon-green/10 border border-neon-green/50 rounded-full text-sm font-mono text-neon-green">
                    <Shield className="w-4 h-4" />
                    Security Researcher
                  </span>
                </div>
              </div>
            </div>

            {/* Mission & Values */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { icon: Sword, title: "Offensive", desc: "Red team operations & penetration testing" },
                { icon: Shield, title: "Defensive", desc: "Blue team security & threat mitigation" },
                { icon: Target, title: "Research", desc: "Vulnerability discovery & CVE hunting" },
                { icon: Globe, title: "OSINT", desc: "Intelligence gathering & dark web monitoring" },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="p-4 bg-muted/30 rounded-lg text-center group/item hover:bg-electric-purple/10 transition-colors"
                >
                  <item.icon className="w-8 h-8 text-electric-purple mx-auto mb-2 group-hover/item:animate-pulse" />
                  <h4 className="font-mono font-semibold text-sm text-foreground mb-1">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Core Values */}
            <div className="p-4 bg-electric-purple/5 border border-electric-purple/20 rounded-lg mb-8">
              <h4 className="font-mono font-semibold text-electric-purple mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Core Values
              </h4>
              <div className="flex flex-wrap gap-3">
                {["Ethics First", "Continuous Learning", "Community Driven", "Open Source", "Knowledge Sharing", "Digital Protection"].map((value) => (
                  <span key={value} className="px-3 py-1 text-xs font-mono bg-electric-purple/10 border border-electric-purple/30 rounded-full text-electric-purple">
                    {value}
                  </span>
                ))}
              </div>
            </div>

            {/* Quote */}
            <div className="p-4 border-l-4 border-electric-purple/50 bg-muted/20 mb-8">
              <p className="font-mono text-foreground/80 italic">
                "Breaking barriers to uncover hidden vulnerabilities. Automating the art of hacking with powerful scripts."
              </p>
              <p className="text-sm text-electric-purple mt-2">— Nikhil Kaware, Founder</p>
            </div>

            {/* Google Search Button */}
            <motion.button
              onClick={handleGoogleSearch}
              className="w-full p-4 bg-gradient-to-r from-electric-purple/20 to-purple-600/20 border border-electric-purple/50 rounded-lg font-mono text-sm flex items-center justify-center gap-3 hover:from-electric-purple/30 hover:to-purple-600/30 hover:border-electric-purple transition-all duration-300 group/btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Search className="w-5 h-5 text-electric-purple" />
              <span className="text-foreground">
                <span className="text-electric-purple">{">"}</span> Search: "Who is the founder of Asura Legion?"
              </span>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover/btn:text-electric-purple transition-colors" />
            </motion.button>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 text-xs font-mono text-muted-foreground/50 flex items-center gap-2">
              <Lock className="w-3 h-3" />
              ENCRYPTED
            </div>
            <div className="absolute bottom-4 left-4 text-xs font-mono text-muted-foreground/50 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              ACTIVE
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex justify-center gap-6"
          >
            <a
              href="https://github.com/Nikhilkaware36/Team-Asura-Legion"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-electric-purple transition-colors"
            >
              <span>{">"} View Team Repository</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/Nikhilkaware36"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-neon-green transition-colors"
            >
              <span>{">"} Founder's GitHub</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AsuraLegionSection;
