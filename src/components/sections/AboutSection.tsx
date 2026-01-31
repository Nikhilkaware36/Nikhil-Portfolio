import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { User, Target, Globe, Bug, BookOpen, GraduationCap, Terminal, Award, Briefcase, Code2 } from "lucide-react";
import TerminalCard from "../TerminalCard";
import { useSound } from "@/hooks/useSound";

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const { playHover } = useSound();

  const experiences = [
    {
      title: "Dark Web Intel",
      icon: Target,
      desc: "Deep dive investigations and threat intelligence gathering from hidden networks.",
      color: "neon-green",
      stats: "50+ Cases"
    },
    {
      title: "OSINT Research", 
      icon: Globe,
      desc: "Open-source intelligence automation and large-scale data analysis.",
      color: "electric-purple",
      stats: "100+ Reports"
    },
    {
      title: "Bug Bounty",
      icon: Bug,
      desc: "Vulnerability hunting and responsible disclosure on live targets.",
      color: "signal-red",
      stats: "25+ Bugs"
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden" ref={sectionRef}>
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 bg-neon-green/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-72 h-72 bg-electric-purple/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section header - enhanced */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-12"
          >
            <motion.div
              className="w-14 h-14 rounded-xl bg-neon-green/10 border border-neon-green/30 flex items-center justify-center"
              whileHover={{ rotate: 10, scale: 1.1 }}
            >
              <User className="w-7 h-7 text-neon-green" />
            </motion.div>
            <div>
              <h2 className="text-3xl md:text-4xl font-mono font-bold">
                <span className="text-muted-foreground">//</span> Mission_Data
              </h2>
              <p className="text-sm text-muted-foreground font-mono mt-1">
                {">"} cat ~/about/profile.json
              </p>
            </div>
          </motion.div>

          {/* Main about card - enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <TerminalCard title="about.md" className="mb-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-neon-green/20 via-electric-purple/20 to-signal-red/20 border border-neon-green/30 flex items-center justify-center shrink-0">
                    <span className="text-4xl">🐀</span>
                  </div>
                  <div className="space-y-3">
                    <p className="text-lg leading-relaxed text-foreground/90">
                      Cybersecurity professional with practical experience in{" "}
                      <span className="text-signal-red font-semibold">digital forensics</span>,{" "}
                      <span className="text-signal-red font-semibold">bug bounty</span>,{" "}
                      <span className="text-electric-purple font-semibold">OSINT</span>, and{" "}
                      <span className="text-electric-purple font-semibold">dark web investigations</span>.
                    </p>
                    <p className="text-base leading-relaxed text-foreground/80">
                      Skilled in <span className="text-neon-green">vulnerability identification</span>,{" "}
                      <span className="text-neon-green">threat analysis</span>, and{" "}
                      <span className="text-neon-green">evidence awareness</span> while supporting real-world cyber investigation workflows.
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                  <p className="text-sm leading-relaxed text-muted-foreground italic">
                    "Technically curious, ethically driven, and detail-oriented with a strong foundation in networking and Linux security concepts. Seeking a formal entry-level cybersecurity role to apply hands-on expertise in a professional environment."
                  </p>
                </div>
              </div>
            </TerminalCard>
          </motion.div>

          {/* Education & Languages row */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Education - enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl hover:border-electric-purple/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-electric-purple/10 border border-electric-purple/30 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-electric-purple" />
                </div>
                <h3 className="font-mono font-bold text-electric-purple">Education</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-mono font-semibold text-foreground">Diploma in Computer Science</p>
                    <p className="text-xs text-muted-foreground">Pursuing advanced studies</p>
                  </div>
                  <span className="text-xs font-mono px-2 py-1 bg-electric-purple/10 rounded-full text-electric-purple">
                    2023 - 2027
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-mono font-semibold text-foreground">SSC (10th Standard)</p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                  <span className="text-xs font-mono px-2 py-1 bg-neon-green/10 rounded-full text-neon-green">
                    Jun 2023
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Languages - enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-6 bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl hover:border-neon-green/50 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-neon-green/10 border border-neon-green/30 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-neon-green" />
                </div>
                <h3 className="font-mono font-bold text-neon-green">Languages</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { lang: "English", level: "Fluent" },
                  { lang: "Hindi", level: "Native" },
                  { lang: "Marathi", level: "Native" },
                  { lang: "Latin", level: "Basic" },
                  { lang: "Spanish", level: "Basic" },
                ].map((item, index) => (
                  <motion.div
                    key={item.lang}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-2 bg-neon-green/10 border border-neon-green/30 rounded-lg"
                  >
                    <p className="text-sm font-mono text-neon-green">{item.lang}</p>
                    <p className="text-[10px] text-muted-foreground">{item.level}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Mission cards - enhanced with better visuals */}
          <div className="grid md:grid-cols-3 gap-6">
            {experiences.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                whileHover={{ scale: 1.05, y: -10 }}
                onMouseEnter={playHover}
                className={`relative p-6 bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl hover:border-${item.color}/50 transition-all group cursor-pointer overflow-hidden`}
              >
                {/* Glow effect */}
                <motion.div
                  className={`absolute inset-0 bg-${item.color}/5 opacity-0 group-hover:opacity-100 transition-opacity`}
                />
                
                {/* Icon with animation */}
                <motion.div
                  className={`relative w-14 h-14 rounded-xl bg-${item.color}/10 border border-${item.color}/30 flex items-center justify-center mb-4`}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                >
                  <item.icon className={`w-7 h-7 text-${item.color}`} />
                </motion.div>

                {/* Content */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-mono font-bold text-lg">{item.title}</h3>
                    <span className={`text-xs font-mono px-2 py-0.5 bg-${item.color}/10 rounded-full text-${item.color}`}>
                      {item.stats}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                  
                  {/* Hover indicator */}
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    <Terminal className="w-3 h-3" />
                    <span>Explore more</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats row - enhanced with better visuals */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { value: "25+", label: "Certifications", icon: Award, color: "neon-green" },
              { value: "12+", label: "Projects", icon: Code2, color: "electric-purple" },
              { value: "5", label: "Languages", icon: BookOpen, color: "signal-red" },
              { value: "∞", label: "Curiosity", icon: Target, color: "neon-green" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05, y: -5 }}
                onMouseEnter={playHover}
                className={`relative p-6 bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl text-center group cursor-pointer hover:border-${stat.color}/50 transition-all overflow-hidden`}
              >
                <motion.div
                  className={`absolute inset-0 bg-${stat.color}/5 opacity-0 group-hover:opacity-100 transition-opacity`}
                />
                <stat.icon className={`w-5 h-5 text-${stat.color} mx-auto mb-2 relative`} />
                <motion.div
                  className={`text-4xl font-mono font-bold text-${stat.color} relative`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs text-muted-foreground font-mono mt-1 relative">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
