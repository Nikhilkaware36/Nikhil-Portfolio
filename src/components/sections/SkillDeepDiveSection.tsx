import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, Search, Code, Terminal, Lock, Bug, 
  Network, Eye, ChevronRight, Zap, Target, Database
} from "lucide-react";
import { useSound } from "@/hooks/useSound";

interface SkillDeepDive {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  color: string;
  expertise: string[];
  tools: string[];
  experience: string;
  achievements: string[];
  methodologies: string[];
}

const skillDeepDives: SkillDeepDive[] = [
  {
    id: "pentest",
    icon: Bug,
    title: "Penetration Testing",
    subtitle: "Offensive Security Expert",
    color: "signal-red",
    expertise: [
      "Web Application Security (OWASP Top 10)",
      "Network Infrastructure Testing",
      "API Security Assessment",
      "Mobile Application Testing",
      "Cloud Security (AWS, Azure, GCP)"
    ],
    tools: ["Burp Suite Pro", "Metasploit", "Nmap", "SQLMap", "Nuclei", "ffuf"],
    experience: "3+ years conducting security assessments for startups to enterprises",
    achievements: [
      "Discovered 50+ high/critical vulnerabilities in bug bounty programs",
      "Conducted 100+ successful penetration tests",
      "Developed custom exploitation frameworks"
    ],
    methodologies: ["OWASP Testing Guide", "PTES", "OSSTMM"]
  },
  {
    id: "forensics",
    icon: Search,
    title: "Digital Forensics",
    subtitle: "Incident Response Specialist",
    color: "electric-purple",
    expertise: [
      "Memory Forensics & Analysis",
      "Disk Imaging & Recovery",
      "Network Traffic Analysis",
      "Malware Reverse Engineering",
      "Timeline Reconstruction"
    ],
    tools: ["Autopsy", "Volatility", "FTK Imager", "Wireshark", "X-Ways", "EnCase"],
    experience: "Handled incident response for ransomware attacks and data breaches",
    achievements: [
      "Led forensic investigations for 20+ security incidents",
      "Developed automated evidence collection scripts",
      "Certified in digital forensics methodologies"
    ],
    methodologies: ["NIST SP 800-86", "ISO 27037", "SANS DFIR"]
  },
  {
    id: "osint",
    icon: Eye,
    title: "OSINT & Intelligence",
    subtitle: "Open Source Intelligence Analyst",
    color: "neon-green",
    expertise: [
      "Social Media Intelligence (SOCMINT)",
      "Dark Web Monitoring",
      "Corporate Reconnaissance",
      "Threat Actor Profiling",
      "Data Aggregation & Analysis"
    ],
    tools: ["Maltego", "SpiderFoot", "Shodan", "theHarvester", "Recon-ng", "Amass"],
    experience: "Conducted intelligence gathering for security assessments and investigations",
    achievements: [
      "Built automated OSINT collection pipelines",
      "Identified threat actors targeting client organizations",
      "Created threat intelligence reports for C-level executives"
    ],
    methodologies: ["Intelligence Cycle", "OSINT Framework", "Threat Intelligence Platforms"]
  },
  {
    id: "blueteam",
    icon: Shield,
    title: "Blue Team Defense",
    subtitle: "Security Operations Specialist",
    color: "cyan-400",
    expertise: [
      "SIEM Management & Tuning",
      "Security Monitoring & Alerting",
      "Threat Hunting",
      "Security Hardening",
      "Vulnerability Management"
    ],
    tools: ["Splunk", "ELK Stack", "Wazuh", "TheHive", "MISP", "CrowdStrike"],
    experience: "Built and managed SOC operations for medium-sized organizations",
    achievements: [
      "Reduced mean time to detect (MTTD) by 60%",
      "Implemented SOAR playbooks for automated response",
      "Created custom detection rules for APT activities"
    ],
    methodologies: ["MITRE ATT&CK", "Cyber Kill Chain", "NIST CSF"]
  },
  {
    id: "secdev",
    icon: Code,
    title: "Security Development",
    subtitle: "Secure Code & Automation",
    color: "yellow-400",
    expertise: [
      "Security Tool Development",
      "Exploit Development",
      "Secure Code Review",
      "DevSecOps Integration",
      "API Development"
    ],
    tools: ["Python", "Rust", "Go", "Bash", "PowerShell", "Docker"],
    experience: "Developed custom security tools and automation frameworks",
    achievements: [
      "Created open-source security scanning tools",
      "Built CI/CD security integration pipelines",
      "Developed custom payloads and exploits for assessments"
    ],
    methodologies: ["OWASP SAMM", "Microsoft SDL", "DevSecOps"]
  },
  {
    id: "network",
    icon: Network,
    title: "Network Security",
    subtitle: "Infrastructure Protection",
    color: "orange-500",
    expertise: [
      "Firewall Configuration & Audit",
      "IDS/IPS Deployment",
      "Network Segmentation",
      "VPN & Zero Trust",
      "Wireless Security"
    ],
    tools: ["pfSense", "Snort", "Suricata", "Zeek", "OpenVPN", "Cisco"],
    experience: "Designed and secured network architectures for various organizations",
    achievements: [
      "Implemented zero-trust network architectures",
      "Conducted network security assessments",
      "Set up honeypot networks for threat intelligence"
    ],
    methodologies: ["Zero Trust Architecture", "Defense in Depth", "Network Segmentation Best Practices"]
  }
];

const SkillDeepDiveSection = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const { playClick, playHover } = useSound();

  const selected = skillDeepDives.find(s => s.id === selectedSkill);

  return (
    <section id="expertise" className="py-24 relative">
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
            <Target className="w-6 h-6 text-signal-red" />
            <h2 className="text-3xl md:text-4xl font-mono font-bold">
              <span className="text-muted-foreground">//</span> Expertise_Deep_Dive
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground mb-12 font-mono text-sm"
          >
            {">"} Select a skill to explore detailed capabilities and experience
          </motion.p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Skill selector */}
            <div className="space-y-3">
              {skillDeepDives.map((skill, index) => (
                <motion.button
                  key={skill.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    playClick();
                    setSelectedSkill(selectedSkill === skill.id ? null : skill.id);
                  }}
                  onMouseEnter={playHover}
                  className={`w-full p-4 text-left border rounded-lg transition-all flex items-center gap-4 group ${
                    selectedSkill === skill.id
                      ? `bg-${skill.color}/10 border-${skill.color}/50`
                      : "bg-card/50 border-border/50 hover:border-muted-foreground/50"
                  }`}
                  style={{
                    backgroundColor: selectedSkill === skill.id ? `hsl(var(--${skill.color}) / 0.1)` : undefined,
                    borderColor: selectedSkill === skill.id ? `hsl(var(--${skill.color}) / 0.5)` : undefined
                  }}
                >
                  <skill.icon className={`w-6 h-6 text-${skill.color}`} style={{ color: `hsl(var(--${skill.color}))` }} />
                  <div className="flex-1">
                    <h3 className="font-mono font-bold text-sm">{skill.title}</h3>
                    <p className="text-xs text-muted-foreground">{skill.subtitle}</p>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${
                    selectedSkill === skill.id ? "rotate-90" : "group-hover:translate-x-1"
                  }`} />
                </motion.button>
              ))}
            </div>

            {/* Detail panel */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {selected ? (
                  <motion.div
                    key={selected.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-card/50 border border-border/50 rounded-lg p-6 h-full"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border/50">
                      <selected.icon className={`w-10 h-10 text-${selected.color}`} style={{ color: `hsl(var(--${selected.color}))` }} />
                      <div>
                        <h3 className="font-mono font-bold text-xl">{selected.title}</h3>
                        <p className="text-sm text-muted-foreground">{selected.subtitle}</p>
                      </div>
                    </div>

                    {/* Experience */}
                    <div className="mb-6">
                      <p className="text-sm text-muted-foreground italic border-l-2 border-electric-purple/50 pl-4">
                        "{selected.experience}"
                      </p>
                    </div>

                    {/* Expertise areas */}
                    <div className="mb-6">
                      <h4 className="font-mono text-sm text-neon-green mb-3 flex items-center gap-2">
                        <Zap className="w-4 h-4" /> Core Expertise
                      </h4>
                      <ul className="grid md:grid-cols-2 gap-2">
                        {selected.expertise.map((exp, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-neon-green mt-1">▸</span>
                            {exp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tools */}
                    <div className="mb-6">
                      <h4 className="font-mono text-sm text-electric-purple mb-3 flex items-center gap-2">
                        <Terminal className="w-4 h-4" /> Tools & Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selected.tools.map((tool) => (
                          <span
                            key={tool}
                            className="px-3 py-1 text-xs font-mono bg-muted/50 border border-border/50 rounded-lg"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="font-mono text-sm text-signal-red mb-3 flex items-center gap-2">
                        <Target className="w-4 h-4" /> Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {selected.achievements.map((achievement, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-signal-red mt-1">●</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Methodologies */}
                    <div>
                      <h4 className="font-mono text-sm text-yellow-400 mb-3 flex items-center gap-2">
                        <Database className="w-4 h-4" /> Methodologies & Frameworks
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selected.methodologies.map((method) => (
                          <span
                            key={method}
                            className="px-3 py-1 text-xs font-mono bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 rounded-lg"
                          >
                            {method}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-card/30 border border-dashed border-border/50 rounded-lg p-12 h-full flex flex-col items-center justify-center text-center"
                  >
                    <Lock className="w-12 h-12 text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground font-mono text-sm">
                      Select a skill from the left to view detailed expertise
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillDeepDiveSection;
