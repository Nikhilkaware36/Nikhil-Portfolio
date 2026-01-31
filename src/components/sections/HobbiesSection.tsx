import { motion } from "framer-motion";
import { Layers, Lightbulb, Flag, FileSearch, Dumbbell, TrendingUp, Utensils, Compass, Video, Users } from "lucide-react";

const hobbies = [
  {
    icon: Lightbulb,
    title: "Startups & Business",
    description: "Studying startups, entrepreneurship, and business models",
    color: "text-neon-green",
    borderColor: "hover:border-neon-green/50",
  },
  {
    icon: TrendingUp,
    title: "Market & Tech Trends",
    description: "Observing trends in AI, Web3, and cybersecurity",
    color: "text-electric-purple",
    borderColor: "hover:border-electric-purple/50",
  },
  {
    icon: Flag,
    title: "CTF Challenges",
    description: "Solving CTF challenges and security labs",
    color: "text-signal-red",
    borderColor: "hover:border-signal-red/50",
  },
  {
    icon: FileSearch,
    title: "Forensics Practice",
    description: "Digital forensics practice and case studies",
    color: "text-electric-purple",
    borderColor: "hover:border-electric-purple/50",
  },
  {
    icon: Dumbbell,
    title: "Fitness & Sports",
    description: "Regular physical training and outdoor sports",
    color: "text-neon-green",
    borderColor: "hover:border-neon-green/50",
  },
  {
    icon: Compass,
    title: "Exploration",
    description: "Exploring new places and cultures",
    color: "text-electric-purple",
    borderColor: "hover:border-electric-purple/50",
  },
  {
    icon: Video,
    title: "Tech Documentaries",
    description: "Watching documentaries on technology and crime",
    color: "text-signal-red",
    borderColor: "hover:border-signal-red/50",
  },
  {
    icon: Utensils,
    title: "Cooking",
    description: "Experimenting with new cuisines",
    color: "text-neon-green",
    borderColor: "hover:border-neon-green/50",
  },
  {
    icon: Users,
    title: "Personal Development",
    description: "Leadership and communication skills",
    color: "text-electric-purple",
    borderColor: "hover:border-electric-purple/50",
  },
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
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { duration: 0.4 }
  },
};

const HobbiesSection = () => {
  return (
    <section id="hobbies" className="py-24 relative">
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
            <Layers className="w-6 h-6 text-muted-foreground" />
            <h2 className="text-3xl md:text-4xl font-mono font-bold">
              <span className="text-muted-foreground">//</span> Human_Layer
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground mb-12 font-mono text-sm"
          >
            {">"} cat ~/offline_activities.log
          </motion.p>

          {/* Hobbies grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {hobbies.map((hobby) => (
              <motion.div
                key={hobby.title}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -5 }}
                className={`p-5 bg-card border border-border/50 rounded-lg transition-all duration-300 ${hobby.borderColor} group`}
              >
                <hobby.icon className={`w-6 h-6 ${hobby.color} mb-3 group-hover:animate-pulse`} />
                <h3 className={`font-mono font-bold text-base mb-1 ${hobby.color}`}>
                  {hobby.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {hobby.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HobbiesSection;
