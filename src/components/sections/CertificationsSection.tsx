import { motion } from "framer-motion";
import { Award, Calendar, CheckCircle, Shield, BookOpen, Target, Users, Lock, Bug, Server, Globe, Brain, Fingerprint, Network, Eye } from "lucide-react";

const certifications = [
  // Row 1 - Core Security
  { name: "Certified Phishing Prevention Specialist", acronym: "CPPS", date: "Dec 2025", icon: Shield, color: "border-neon-green" },
  { name: "Cybersecurity Career Starter Certification", acronym: "CCSC", date: "Dec 2025", icon: Target, color: "border-electric-purple" },
  { name: "Foundations of Log Analysis for Cyber Defense", acronym: "FLACD", date: "Dec 2025", icon: BookOpen, color: "border-neon-green" },
  { name: "Healthcare Hacking", acronym: "HCH", date: "Dec 2025", icon: Shield, color: "border-signal-red" },
  { name: "Purple Team - Active Directory and AzureAD v1", acronym: "PT-AD", date: "Dec 2025", icon: Users, color: "border-electric-purple" },
  // Row 2 - Training Platforms
  { name: "TryHackMe – Advent of Cyber 2025", acronym: "THM-AOC", date: "Dec 2025", icon: Target, color: "border-neon-green" },
  { name: "Certified Cybersecurity Educator Professional", acronym: "CCEP", date: "Dec 2025", icon: BookOpen, color: "border-electric-purple" },
  { name: "SOC Analyst Level 1 Path", acronym: "SOC-L1", date: "Dec 2025", icon: Eye, color: "border-neon-green" },
  { name: "Web Application Penetration Testing", acronym: "WAPT", date: "Dec 2025", icon: Bug, color: "border-signal-red" },
  { name: "Linux Fundamentals & Security", acronym: "LFS", date: "Nov 2025", icon: Server, color: "border-neon-green" },
  // Row 3 - Offensive Security
  { name: "Ethical Hacking Essentials", acronym: "EHE", date: "Nov 2025", icon: Lock, color: "border-signal-red" },
  { name: "Network Security Fundamentals", acronym: "NSF", date: "Nov 2025", icon: Network, color: "border-neon-green" },
  { name: "OSINT Fundamentals", acronym: "OSINT-F", date: "Nov 2025", icon: Globe, color: "border-electric-purple" },
  { name: "Intro to Digital Forensics", acronym: "IDF", date: "Oct 2025", icon: Fingerprint, color: "border-electric-purple" },
  { name: "Malware Analysis Basics", acronym: "MAB", date: "Oct 2025", icon: Bug, color: "border-signal-red" },
  // Row 4 - Cloud & Modern
  { name: "Cloud Security Fundamentals", acronym: "CSF", date: "Oct 2025", icon: Server, color: "border-neon-green" },
  { name: "Incident Response Fundamentals", acronym: "IRF", date: "Oct 2025", icon: Shield, color: "border-signal-red" },
  { name: "Threat Intelligence Basics", acronym: "TIB", date: "Sep 2025", icon: Brain, color: "border-electric-purple" },
  { name: "Security Operations Center Basics", acronym: "SOC-B", date: "Sep 2025", icon: Eye, color: "border-neon-green" },
  { name: "Python for Cybersecurity", acronym: "PY-SEC", date: "Sep 2025", icon: BookOpen, color: "border-neon-green" },
  // Row 5 - Additional
  { name: "Dark Web Investigation Fundamentals", acronym: "DWIF", date: "Sep 2025", icon: Globe, color: "border-electric-purple" },
  { name: "Bug Bounty Hunter Path", acronym: "BBH", date: "Aug 2025", icon: Bug, color: "border-signal-red" },
  { name: "Vulnerability Assessment Professional", acronym: "VAP", date: "Aug 2025", icon: Target, color: "border-signal-red" },
  { name: "Cryptography Essentials", acronym: "CRYPT", date: "Aug 2025", icon: Lock, color: "border-neon-green" },
  { name: "Red Team Operations Intro", acronym: "RTO-I", date: "Jul 2025", icon: Shield, color: "border-signal-red" },
  { name: "Blue Team Junior Analyst", acronym: "BTJA", date: "Jul 2025", icon: Shield, color: "border-neon-green" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { duration: 0.3 }
  },
};

const CertificationsSection = () => {
  return (
    <section id="certifications" className="py-24 relative bg-gradient-to-b from-transparent via-muted/5 to-transparent">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <Award className="w-6 h-6 text-electric-purple" />
            <h2 className="text-3xl md:text-4xl font-mono font-bold">
              <span className="text-muted-foreground">//</span> The_Vault
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground mb-12 font-mono text-sm"
          >
            {">"} ls -la ~/certifications/ <span className="text-electric-purple">| {certifications.length} verified credentials</span>
          </motion.p>

          {/* Certifications Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          >
            {certifications.map((cert) => (
              <motion.div
                key={cert.name}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -3 }}
                className={`p-4 bg-card border ${cert.color}/40 rounded-lg group transition-all duration-300 hover:border-opacity-100 hover:shadow-lg`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <cert.icon className="w-5 h-5 text-neon-green flex-shrink-0" />
                  <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-muted rounded text-neon-green">
                    {cert.acronym}
                  </span>
                </div>
                
                <h3 className="font-mono font-medium text-foreground leading-tight text-xs mb-2 line-clamp-2">
                  {cert.name}
                </h3>

                <div className="flex items-center justify-between text-[10px]">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="w-2.5 h-2.5" />
                    {cert.date}
                  </div>
                  <div className="flex items-center gap-0.5 text-neon-green">
                    <CheckCircle className="w-2.5 h-2.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { value: `${certifications.length}+`, label: "Certifications", color: "text-neon-green" },
              { value: "2025", label: "Latest Year", color: "text-electric-purple" },
              { value: "10+", label: "Domains", color: "text-signal-red" },
              { value: "∞", label: "Learning", color: "text-neon-green" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-card border border-border/50 rounded-lg text-center"
              >
                <div className={`text-3xl font-mono font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-muted-foreground font-mono mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
