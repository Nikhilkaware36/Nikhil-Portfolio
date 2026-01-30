import { Award, Calendar, CheckCircle, Shield, BookOpen, Target, Users } from "lucide-react";

const certifications = [
  {
    name: "Certified Phishing Prevention Specialist",
    acronym: "CPPS",
    date: "December 2025",
    issuer: "Security Certification Body",
    icon: Shield,
    color: "border-neon-green",
    glow: "group-hover:shadow-[0_0_20px_hsl(120_100%_50%/0.3)]",
  },
  {
    name: "Cybersecurity Career Starter Certification",
    acronym: "CCSC",
    date: "December 2025",
    issuer: "Industry Certification",
    icon: Target,
    color: "border-electric-purple",
    glow: "group-hover:shadow-[0_0_20px_hsl(270_100%_65%/0.3)]",
  },
  {
    name: "Foundations of Log Analysis for Cyber Defense",
    acronym: "FLACD",
    date: "December 2025",
    issuer: "Blue Team Training",
    icon: BookOpen,
    color: "border-neon-green",
    glow: "group-hover:shadow-[0_0_20px_hsl(120_100%_50%/0.3)]",
  },
  {
    name: "Healthcare Hacking",
    acronym: "HCH",
    date: "December 2025",
    issuer: "Specialized Training",
    icon: Shield,
    color: "border-signal-red",
    glow: "group-hover:shadow-[0_0_20px_hsl(0_85%_55%/0.3)]",
  },
  {
    name: "Purple Team - Active Directory and AzureAD v1",
    acronym: "PT-AD",
    date: "December 2025",
    issuer: "Purple Team Academy",
    icon: Users,
    color: "border-electric-purple",
    glow: "group-hover:shadow-[0_0_20px_hsl(270_100%_65%/0.3)]",
  },
  {
    name: "TryHackMe – Advent of Cyber 2025",
    acronym: "THM-AOC",
    date: "December 2025",
    issuer: "TryHackMe",
    icon: Target,
    color: "border-neon-green",
    glow: "group-hover:shadow-[0_0_20px_hsl(120_100%_50%/0.3)]",
  },
  {
    name: "Certified Cybersecurity Educator Professional",
    acronym: "CCEP",
    date: "December 2025",
    issuer: "Education Certification",
    icon: BookOpen,
    color: "border-electric-purple",
    glow: "group-hover:shadow-[0_0_20px_hsl(270_100%_65%/0.3)]",
  },
];

const CertificationsSection = () => {
  return (
    <section id="certifications" className="py-24 relative bg-gradient-to-b from-transparent via-muted/5 to-transparent">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-6 h-6 text-electric-purple" />
            <h2 className="text-3xl md:text-4xl font-mono font-bold">
              <span className="text-muted-foreground">//</span> The_Vault
            </h2>
          </div>
          
          <p className="text-muted-foreground mb-12 font-mono text-sm">
            {">"} ls -la ~/certifications/ <span className="text-electric-purple">| {certifications.length} verified credentials</span>
          </p>

          {/* Certifications Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={cert.name}
                className={`p-6 bg-card border ${cert.color}/50 rounded-lg group transition-all duration-300 ${cert.glow} hover:border-opacity-100 opacity-0 animate-fade-in-up`}
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <cert.icon className="w-8 h-8 text-neon-green flex-shrink-0" />
                  <span className="px-2 py-1 text-xs font-mono font-bold bg-muted rounded text-neon-green">
                    {cert.acronym}
                  </span>
                </div>
                
                <h3 className="font-mono font-semibold text-foreground leading-tight mb-3 text-sm">
                  {cert.name}
                </h3>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {cert.date}
                  </div>
                  <div className="flex items-center gap-1 text-neon-green">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-card border border-border/50 rounded-lg text-center">
              <div className="text-3xl font-mono font-bold text-neon-green">{certifications.length}</div>
              <div className="text-xs text-muted-foreground font-mono mt-1">Certifications</div>
            </div>
            <div className="p-4 bg-card border border-border/50 rounded-lg text-center">
              <div className="text-3xl font-mono font-bold text-electric-purple">2025</div>
              <div className="text-xs text-muted-foreground font-mono mt-1">Latest Year</div>
            </div>
            <div className="p-4 bg-card border border-border/50 rounded-lg text-center">
              <div className="text-3xl font-mono font-bold text-signal-red">5+</div>
              <div className="text-xs text-muted-foreground font-mono mt-1">Domains</div>
            </div>
            <div className="p-4 bg-card border border-border/50 rounded-lg text-center">
              <div className="text-3xl font-mono font-bold text-neon-green">∞</div>
              <div className="text-xs text-muted-foreground font-mono mt-1">Learning</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
