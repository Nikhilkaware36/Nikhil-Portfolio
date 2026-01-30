import { Award, Calendar, CheckCircle } from "lucide-react";

const certifications = [
  {
    name: "Certified Phishing Prevention Specialist",
    acronym: "CPPS",
    date: "December 2025",
    color: "border-neon-green",
    glow: "group-hover:shadow-[0_0_20px_hsl(120_100%_50%/0.3)]",
  },
  {
    name: "Cybersecurity Career Starter Certification",
    acronym: "CCSC",
    date: "December 2025",
    color: "border-electric-purple",
    glow: "group-hover:shadow-[0_0_20px_hsl(270_100%_65%/0.3)]",
  },
  {
    name: "Foundations of Log Analysis for Cyber Defense",
    acronym: "FLACD",
    date: "December 2025",
    color: "border-neon-green",
    glow: "group-hover:shadow-[0_0_20px_hsl(120_100%_50%/0.3)]",
  },
  {
    name: "Purple Team - Active Directory and AzureAD v1",
    acronym: "PT-AD",
    date: "December 2025",
    color: "border-electric-purple",
    glow: "group-hover:shadow-[0_0_20px_hsl(270_100%_65%/0.3)]",
  },
  {
    name: "Certified Cybersecurity Educator Professional",
    acronym: "CCEP",
    date: "December 2025",
    color: "border-neon-green",
    glow: "group-hover:shadow-[0_0_20px_hsl(120_100%_50%/0.3)]",
  },
];

const CertificationsSection = () => {
  return (
    <section id="certifications" className="py-24 relative bg-gradient-to-b from-transparent via-muted/5 to-transparent">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="flex items-center gap-3 mb-12">
            <Award className="w-6 h-6 text-electric-purple" />
            <h2 className="text-3xl md:text-4xl font-mono font-bold">
              <span className="text-muted-foreground">//</span> The_Vault
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-green via-electric-purple to-neon-green opacity-30" />

            <div className="space-y-8">
              {certifications.map((cert, index) => (
                <div
                  key={cert.name}
                  className={`relative flex items-center gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } opacity-0 animate-fade-in-up`}
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 -translate-x-1/2 rounded-full bg-neon-green shadow-[0_0_10px_hsl(120_100%_50%/0.5)]" />

                  {/* Content card */}
                  <div
                    className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] p-6 bg-card border ${cert.color}/50 rounded-lg group transition-all duration-300 ${cert.glow} hover:border-opacity-100`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <span className="px-2 py-1 text-xs font-mono font-bold bg-muted rounded text-neon-green">
                        {cert.acronym}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {cert.date}
                      </div>
                    </div>
                    
                    <h3 className="font-mono font-semibold text-foreground leading-tight">
                      {cert.name}
                    </h3>

                    <div className="flex items-center gap-2 mt-4 text-xs text-neon-green">
                      <CheckCircle className="w-4 h-4" />
                      <span>Verified</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
