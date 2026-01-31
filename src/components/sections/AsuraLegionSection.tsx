import { motion } from "framer-motion";
import { Search, ExternalLink, Crown, Users, Shield } from "lucide-react";

const AsuraLegionSection = () => {
  const handleGoogleSearch = () => {
    window.open("https://www.google.com/search?q=who+is+founder+of+Asura+Legion", "_blank");
  };

  return (
    <section id="asura-legion" className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-electric-purple/5 via-transparent to-electric-purple/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric-purple/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
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
              boxShadow: "0 0 40px hsl(270 100% 65% / 0.1)",
            }}
          >
            {/* Animated border glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-electric-purple/20 via-transparent to-electric-purple/20 animate-pulse" />
            </div>

            {/* Logo placeholder with animated effects */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-electric-purple via-purple-600 to-violet-800 flex items-center justify-center relative overflow-hidden">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] animate-pulse" />
                  
                  {/* Logo text */}
                  <div className="relative z-10 text-center">
                    <span className="text-4xl font-mono font-bold text-white">AL</span>
                    <div className="text-[8px] font-mono text-white/70 tracking-widest">ASURA LEGION</div>
                  </div>
                  
                  {/* Glowing ring */}
                  <div className="absolute inset-2 border-2 border-white/20 rounded-xl" />
                </div>
                
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-electric-purple/20 blur-2xl rounded-full -z-10 animate-pulse" />
              </motion.div>

              <div className="text-center md:text-left flex-1">
                <h3 className="text-2xl md:text-3xl font-mono font-bold text-electric-purple mb-2 text-glow-purple">
                  Asura Legion
                </h3>
                <p className="text-muted-foreground mb-4">
                  Elite cybersecurity collective focused on ethical hacking, security research, and digital protection.
                </p>
                
                {/* Founder badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-electric-purple/10 border border-electric-purple/50 rounded-full">
                  <Crown className="w-4 h-4 text-electric-purple" />
                  <span className="text-sm font-mono text-electric-purple">Founder & Core Member</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-muted/30 rounded-lg text-center">
                <Shield className="w-6 h-6 text-neon-green mx-auto mb-2" />
                <div className="text-xs text-muted-foreground font-mono">Security</div>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg text-center">
                <Users className="w-6 h-6 text-electric-purple mx-auto mb-2" />
                <div className="text-xs text-muted-foreground font-mono">Community</div>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg text-center">
                <Crown className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <div className="text-xs text-muted-foreground font-mono">Leadership</div>
              </div>
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
            <div className="absolute top-4 right-4 text-xs font-mono text-muted-foreground/50">
              v1.0.0
            </div>
            <div className="absolute bottom-4 left-4 text-xs font-mono text-muted-foreground/50 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              ACTIVE
            </div>
          </motion.div>

          {/* Link to Team page */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-center"
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AsuraLegionSection;
