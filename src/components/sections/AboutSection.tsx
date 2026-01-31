import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { User, Target, Globe, Bug, BookOpen, GraduationCap, Code, Terminal } from "lucide-react";
import TerminalCard from "../TerminalCard";
import { useSound } from "@/hooks/useSound";

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const { playHover } = useSound();

  return (
    <section id="about" className="py-24 relative" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-12"
          >
            <User className="w-6 h-6 text-neon-green" />
            <h2 className="text-3xl md:text-4xl font-mono font-bold">
              <span className="text-muted-foreground">//</span> Mission_Data
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <TerminalCard title="about.md" className="mb-8">
              <div className="space-y-6">
                <p className="text-lg leading-relaxed text-foreground/90">
                  Cybersecurity professional with practical experience in{" "}
                  <span className="text-signal-red font-semibold">digital forensics</span>,{" "}
                  <span className="text-signal-red font-semibold">bug bounty</span>,{" "}
                  <span className="text-electric-purple font-semibold">OSINT</span>, and{" "}
                  <span className="text-electric-purple font-semibold">dark web investigations</span>.
                </p>
                <p className="text-lg leading-relaxed text-foreground/90">
                  Skilled in <span className="text-neon-green">vulnerability identification</span>,{" "}
                  <span className="text-neon-green">threat analysis</span>, and{" "}
                  <span className="text-neon-green">evidence awareness</span> while supporting real-world cyber investigation workflows.
                </p>
                <p className="text-base leading-relaxed text-muted-foreground">
                  Technically curious, ethically driven, and detail-oriented with a strong foundation in networking and Linux security concepts. Seeking a formal entry-level cybersecurity role to apply hands-on expertise in a professional environment.
                </p>
              </div>
            </TerminalCard>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 p-4 bg-card border border-border/50 rounded-lg"
          >
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="w-5 h-5 text-electric-purple" />
              <h3 className="font-mono font-semibold text-electric-purple">Education</h3>
            </div>
            <div className="space-y-2 text-sm font-mono">
              <div className="flex justify-between items-center">
                <span className="text-foreground">Diploma in Computer Science</span>
                <span className="text-muted-foreground">Jun 2023 - May 2027</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground">10th in SSC</span>
                <span className="text-muted-foreground">Jun 2023</span>
              </div>
            </div>
          </motion.div>

          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8 p-4 bg-muted/30 border border-border/50 rounded-lg"
          >
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-neon-green" />
              <h3 className="font-mono font-semibold text-neon-green">Languages</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {["English", "Hindi", "Marathi", "Latin", "Spanish"].map((lang, index) => (
                <motion.span
                  key={lang}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                  className="px-3 py-1 text-xs font-mono bg-neon-green/10 border border-neon-green/30 rounded-full text-neon-green"
                >
                  {lang}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Mission cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: "Dark Web Intel", desc: "Deep dive investigations and threat intelligence gathering from hidden networks.", color: "text-neon-green", border: "hover:border-neon-green/50", glow: "group-hover:shadow-[0_0_30px_hsl(120_100%_50%/0.2)]" },
              { icon: Globe, title: "OSINT Research", desc: "Open-source intelligence automation and large-scale data analysis.", color: "text-electric-purple", border: "hover:border-electric-purple/50", glow: "group-hover:shadow-[0_0_30px_hsl(270_100%_65%/0.2)]" },
              { icon: Bug, title: "Bug Bounty", desc: "Vulnerability hunting and responsible disclosure on live targets.", color: "text-signal-red", border: "hover:border-signal-red/50", glow: "group-hover:shadow-[0_0_30px_hsl(0_85%_55%/0.2)]" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                whileHover={{ scale: 1.05, y: -10 }}
                onMouseEnter={playHover}
                className={`p-6 bg-card border border-border/50 rounded-lg ${item.border} ${item.glow} transition-all group cursor-pointer`}
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                >
                  <item.icon className={`w-10 h-10 ${item.color} mb-4`} />
                </motion.div>
                <h3 className="font-mono font-semibold mb-2 text-lg">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
                <div className="mt-4 flex items-center gap-2 text-xs font-mono text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  <Terminal className="w-3 h-3" />
                  <span>Click to explore</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { value: "25+", label: "Certifications", color: "text-neon-green" },
              { value: "12+", label: "Projects", color: "text-electric-purple" },
              { value: "5", label: "Languages", color: "text-signal-red" },
              { value: "∞", label: "Curiosity", color: "text-neon-green" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05 }}
                onMouseEnter={playHover}
                className="p-4 bg-card/50 border border-border/30 rounded-lg text-center group cursor-pointer"
              >
                <motion.div
                  className={`text-3xl font-mono font-bold ${stat.color}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs text-muted-foreground font-mono mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
