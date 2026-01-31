import { motion } from "framer-motion";
import { Quote, Star, Shield, Code, Search, ExternalLink } from "lucide-react";
import { useSound } from "@/hooks/useSound";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  category: "Security" | "Development" | "OSINT";
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Alex Chen",
    role: "CTO",
    company: "TechSecure Inc.",
    avatar: "AC",
    content: "Nikhil's penetration testing uncovered critical vulnerabilities in our infrastructure that our internal team had missed for months. His detailed reports and remediation guidance were invaluable.",
    rating: 5,
    category: "Security"
  },
  {
    id: "2",
    name: "Sarah Mitchell",
    role: "Security Director",
    company: "FinanceGuard",
    avatar: "SM",
    content: "Working with Nikhil on our threat intelligence program transformed our security posture. His OSINT skills are exceptional, and he consistently delivers actionable intelligence.",
    rating: 5,
    category: "OSINT"
  },
  {
    id: "3",
    name: "Raj Patel",
    role: "Lead Developer",
    company: "CodeVault",
    avatar: "RP",
    content: "The security automation tools Nikhil built for our CI/CD pipeline caught vulnerabilities early in development. His Python expertise and security knowledge are a rare combination.",
    rating: 5,
    category: "Development"
  },
  {
    id: "4",
    name: "Emma Rodriguez",
    role: "CEO",
    company: "CyberShield Solutions",
    avatar: "ER",
    content: "Nikhil conducted a comprehensive security audit for our SaaS platform. His methodology was thorough, and he communicated complex technical findings in a way our business team could understand.",
    rating: 5,
    category: "Security"
  },
  {
    id: "5",
    name: "David Kim",
    role: "Incident Response Lead",
    company: "GlobalDefense",
    avatar: "DK",
    content: "During a critical incident, Nikhil's forensic analysis skills helped us trace the attack vector and implement immediate countermeasures. His calm under pressure was impressive.",
    rating: 5,
    category: "Security"
  },
  {
    id: "6",
    name: "Lisa Thompson",
    role: "Product Manager",
    company: "SecureApp",
    avatar: "LT",
    content: "Nikhil's dark web monitoring service helped us identify credential leaks before they could be exploited. His proactive approach to threat detection is exactly what we needed.",
    rating: 5,
    category: "OSINT"
  }
];

const categoryIcons = {
  Security: Shield,
  Development: Code,
  OSINT: Search
};

const categoryColors = {
  Security: "text-neon-green border-neon-green/30",
  Development: "text-electric-purple border-electric-purple/30",
  OSINT: "text-signal-red border-signal-red/30"
};

const TestimonialsSection = () => {
  const { playHover } = useSound();

  return (
    <section id="testimonials" className="py-24 relative">
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
            <Quote className="w-6 h-6 text-electric-purple" />
            <h2 className="text-3xl md:text-4xl font-mono font-bold">
              <span className="text-muted-foreground">//</span> Client_Testimonials
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground mb-12 font-mono text-sm"
          >
            {">"} cat /var/log/feedback.log | grep "positive"
          </motion.p>

          {/* Testimonials grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => {
              const CategoryIcon = categoryIcons[testimonial.category];
              return (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onMouseEnter={playHover}
                  className="bg-card/50 border border-border/50 rounded-lg p-6 hover:border-electric-purple/30 transition-all group cursor-default"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-electric-purple/20 border border-electric-purple/30 flex items-center justify-center font-mono font-bold text-electric-purple">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-mono font-bold text-sm">{testimonial.name}</h4>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                        <p className="text-xs text-electric-purple">{testimonial.company}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-[10px] font-mono border rounded flex items-center gap-1 ${categoryColors[testimonial.category]}`}>
                      <CategoryIcon className="w-3 h-3" />
                      {testimonial.category}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-sm text-muted-foreground leading-relaxed relative">
                    <Quote className="absolute -top-2 -left-2 w-6 h-6 text-electric-purple/20" />
                    <p className="pl-4">{testimonial.content}</p>
                  </blockquote>

                  {/* Decorative element */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-electric-purple/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground font-mono text-sm mb-4">
              Want to work together?
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-electric-purple/20 border border-electric-purple/50 rounded-lg text-electric-purple font-mono hover:bg-electric-purple/30 transition-all"
            >
              Get in Touch
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
