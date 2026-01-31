import { motion } from "framer-motion";
import { Cpu, Shield, Code, Terminal, Lock, Search, Database, Globe, Zap, Bug, Network, Eye } from "lucide-react";
import SkillBar from "../SkillBar";
import { useSound } from "@/hooks/useSound";

const skillCategories = [
  {
    title: "Security",
    icon: Shield,
    color: "text-neon-green",
    skills: [
      { name: "Network Security & Protocols", level: 90, variant: "green" as const },
      { name: "Digital Forensics & Evidence", level: 85, variant: "green" as const },
      { name: "Blue Team Operations", level: 85, variant: "green" as const },
      { name: "Incident Response", level: 80, variant: "green" as const },
    ],
  },
  {
    title: "Investigation",
    icon: Search,
    color: "text-electric-purple",
    skills: [
      { name: "OSINT Research", level: 92, variant: "purple" as const },
      { name: "Dark Web Investigation", level: 85, variant: "purple" as const },
      { name: "Malware Analysis", level: 75, variant: "purple" as const },
      { name: "Threat Intelligence", level: 80, variant: "purple" as const },
    ],
  },
  {
    title: "Development",
    icon: Code,
    color: "text-signal-red",
    skills: [
      { name: "Python", level: 92, variant: "red" as const },
      { name: "Bash Scripting", level: 88, variant: "red" as const },
      { name: "Rust", level: 65, variant: "red" as const },
      { name: "PowerShell", level: 75, variant: "red" as const },
    ],
  },
];

const technicalSkills = [
  { name: "Network Security & Protocols", category: "core", icon: Network },
  { name: "Bug Bounty & Vulnerability Assessment", category: "offensive", icon: Bug },
  { name: "Blue Team Operations & Defense", category: "defensive", icon: Shield },
  { name: "Linux Administration & Security", category: "core", icon: Terminal },
  { name: "Malware & Threat Analysis", category: "analysis", icon: Eye },
  { name: "Digital Forensics & Evidence", category: "forensics", icon: Search },
  { name: "Dark Web Investigation", category: "investigation", icon: Globe },
  { name: "OSINT & Intelligence Gathering", category: "investigation", icon: Search },
  { name: "Penetration Testing", category: "offensive", icon: Zap },
  { name: "Security Automation", category: "core", icon: Cpu },
  { name: "Reverse Engineering", category: "analysis", icon: Code },
  { name: "Social Engineering Defense", category: "defensive", icon: Lock },
];

const techStack = [
  "Python", "Rust", "Bash", "PowerShell", "Go",
  "Kali Linux", "Kali NetHunter", "Parrot OS", "BlackArch",
  "Burp Suite", "Metasploit", "Wireshark", "Nmap", "Nessus",
  "Autopsy", "Volatility", "FTK Imager", "Sleuth Kit",
  "TheHive", "MISP", "Splunk", "ELK Stack",
  "Linux (Arch/Debian)", "Docker", "Git", "AWS", "Azure",
  "TryHackMe", "HackTheBox", "CyberDefenders",
  "Ghidra", "IDA Pro", "OllyDbg", "x64dbg",
];

const certificationAreas = [
  { name: "Network Security", count: 5 },
  { name: "Digital Forensics", count: 4 },
  { name: "Ethical Hacking", count: 6 },
  { name: "Cloud Security", count: 3 },
  { name: "Malware Analysis", count: 4 },
  { name: "OSINT", count: 3 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { duration: 0.3 }
  },
};

const SkillsSection = () => {
  const { playHover } = useSound();

  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <Cpu className="w-6 h-6 text-neon-green" />
            <h2 className="text-3xl md:text-4xl font-mono font-bold">
              <span className="text-muted-foreground">//</span> Skill_Matrix
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground mb-12 font-mono text-sm"
          >
            {">"} sudo cat /etc/skills.conf | grep -E "active|armed"
          </motion.p>

          {/* Technical Skills Tags */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h3 className="text-sm font-mono text-muted-foreground mb-4 flex items-center gap-2">
              <Lock className="w-4 h-4 text-signal-red" />
              {">"} Core Capabilities [ARMED]
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap gap-3"
            >
              {technicalSkills.map((skill) => (
                <motion.span
                  key={skill.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -3 }}
                  onMouseEnter={playHover}
                  className="px-4 py-2 text-sm font-mono bg-card border border-border/50 rounded-lg hover:border-neon-green/50 hover:text-neon-green transition-all cursor-default flex items-center gap-2 group"
                >
                  <skill.icon className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                  {skill.name}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Skills grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="p-6 bg-card border border-border/50 rounded-lg hover:border-neon-green/30 transition-all group"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: categoryIndex * 0.5 }}
                  >
                    <category.icon className={`w-6 h-6 ${category.color}`} />
                  </motion.div>
                  <h3 className={`font-mono font-bold text-lg ${category.color}`}>
                    {category.title}
                  </h3>
                  <span className="ml-auto text-xs font-mono text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    [ACTIVE]
                  </span>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      variant={skill.variant}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certification Areas */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <h3 className="text-sm font-mono text-muted-foreground mb-4 flex items-center gap-2">
              <Database className="w-4 h-4 text-electric-purple" />
              {">"} Certification Coverage
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {certificationAreas.map((area, index) => (
                <motion.div
                  key={area.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  onMouseEnter={playHover}
                  className="p-3 bg-card/50 border border-border/30 rounded-lg text-center group hover:border-electric-purple/50 transition-all cursor-default"
                >
                  <div className="text-2xl font-mono font-bold text-electric-purple group-hover:text-neon-green transition-colors">
                    {area.count}+
                  </div>
                  <div className="text-xs text-muted-foreground font-mono mt-1">{area.name}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tech tags */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-sm font-mono text-muted-foreground mb-4 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-neon-green" />
              {">"} cat ~/arsenal/tools.txt
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap gap-2"
            >
              {techStack.map((tool) => (
                <motion.span
                  key={tool}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1, rotate: Math.random() > 0.5 ? 2 : -2 }}
                  onMouseEnter={playHover}
                  className="px-3 py-1 text-xs font-mono bg-muted/50 border border-border/50 rounded hover:border-neon-green/50 hover:text-neon-green hover:bg-neon-green/5 transition-all cursor-default"
                >
                  {tool}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { value: "35+", label: "Tools Mastered", color: "text-neon-green" },
              { value: "25+", label: "Certifications", color: "text-electric-purple" },
              { value: "12+", label: "Active Projects", color: "text-signal-red" },
              { value: "5+", label: "Languages", color: "text-neon-green" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05 }}
                onMouseEnter={playHover}
                className="p-4 bg-card/50 border border-border/30 rounded-lg text-center group cursor-default hover:border-neon-green/30 transition-all"
              >
                <motion.div
                  className={`text-3xl font-mono font-bold ${stat.color}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
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

export default SkillsSection;
