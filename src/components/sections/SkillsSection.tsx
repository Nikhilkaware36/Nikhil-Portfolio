import { motion } from "framer-motion";
import { Cpu, Shield, Code, Terminal, Lock, Search } from "lucide-react";
import SkillBar from "../SkillBar";

const skillCategories = [
  {
    title: "Security",
    icon: Shield,
    color: "text-neon-green",
    skills: [
      { name: "Network Security & Protocols", level: 90, variant: "green" as const },
      { name: "Digital Forensics & Evidence", level: 85, variant: "green" as const },
      { name: "Blue Team Operations", level: 85, variant: "green" as const },
    ],
  },
  {
    title: "Investigation",
    icon: Search,
    color: "text-electric-purple",
    skills: [
      { name: "OSINT", level: 92, variant: "purple" as const },
      { name: "Dark Web Investigation", level: 85, variant: "purple" as const },
      { name: "Malware & Threat Analysis", level: 75, variant: "purple" as const },
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
    ],
  },
];

const technicalSkills = [
  { name: "Network Security & Protocols", category: "core" },
  { name: "Bug Bounty & Vulnerability Assessment", category: "offensive" },
  { name: "Blue Team Operations & Defensive Security", category: "defensive" },
  { name: "Linux Administration & Security", category: "core" },
  { name: "Malware & Threat Analysis", category: "analysis" },
  { name: "Digital Forensics & Evidence Handling", category: "forensics" },
  { name: "Dark Web Investigation Techniques", category: "investigation" },
  { name: "OSINT", category: "investigation" },
];

const techStack = [
  "Python", "Rust", "Bash", "PowerShell",
  "Kali Linux", "Kali NetHunter", "Burp Suite", "Metasploit", "Wireshark", "Nmap",
  "Autopsy", "Volatility", "TheHive", "MISP",
  "Linux (Arch/Debian)", "Docker", "Git", "TryHackMe",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  },
};

const SkillsSection = () => {
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
            className="flex items-center gap-3 mb-12"
          >
            <Cpu className="w-6 h-6 text-neon-green" />
            <h2 className="text-3xl md:text-4xl font-mono font-bold">
              <span className="text-muted-foreground">//</span> Skill_Matrix
            </h2>
          </motion.div>

          {/* Technical Skills Tags */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h3 className="text-sm font-mono text-muted-foreground mb-4 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              {">"} Technical Expertise
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
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 text-sm font-mono bg-card border border-border/50 rounded-lg hover:border-neon-green/50 hover:text-neon-green transition-colors cursor-default"
                >
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-card border border-border/50 rounded-lg hover:border-neon-green/30 transition-all"
              >
                <div className="flex items-center gap-3 mb-6">
                  <category.icon className={`w-6 h-6 ${category.color}`} />
                  <h3 className={`font-mono font-bold text-lg ${category.color}`}>
                    {category.title}
                  </h3>
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

          {/* Tech tags */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-sm font-mono text-muted-foreground mb-4 flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              {">"} cat ~/tools_and_tech.txt
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap gap-3"
            >
              {techStack.map((tool) => (
                <motion.span
                  key={tool}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1 }}
                  className="px-3 py-1 text-sm font-mono bg-muted/50 border border-border/50 rounded hover:border-neon-green/50 hover:text-neon-green transition-colors cursor-default"
                >
                  {tool}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
