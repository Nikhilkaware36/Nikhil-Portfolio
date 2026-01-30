import { Layers, Lightbulb, Flag, FileSearch, Dumbbell } from "lucide-react";

const hobbies = [
  {
    icon: Lightbulb,
    title: "Startups & Web3",
    description: "Studying emerging technologies and entrepreneurship",
    color: "text-neon-green",
    borderColor: "hover:border-neon-green/50",
  },
  {
    icon: Flag,
    title: "CTF Challenges",
    description: "Sharpening skills through capture-the-flag competitions",
    color: "text-electric-purple",
    borderColor: "hover:border-electric-purple/50",
  },
  {
    icon: FileSearch,
    title: "Forensics Case Studies",
    description: "Analyzing real-world digital forensics investigations",
    color: "text-signal-red",
    borderColor: "hover:border-signal-red/50",
  },
  {
    icon: Dumbbell,
    title: "Fitness & Outdoors",
    description: "Maintaining physical health through sports and nature",
    color: "text-neon-green",
    borderColor: "hover:border-neon-green/50",
  },
];

const HobbiesSection = () => {
  return (
    <section id="hobbies" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="flex items-center gap-3 mb-4">
            <Layers className="w-6 h-6 text-muted-foreground" />
            <h2 className="text-3xl md:text-4xl font-mono font-bold">
              <span className="text-muted-foreground">//</span> Human_Layer
            </h2>
          </div>

          <p className="text-muted-foreground mb-12 font-mono text-sm">
            {">"} cat ~/offline_activities.log
          </p>

          {/* Hobbies grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {hobbies.map((hobby, index) => (
              <div
                key={hobby.title}
                className={`p-6 bg-card border border-border/50 rounded-lg transition-all duration-300 ${hobby.borderColor} group opacity-0 animate-fade-in-up`}
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
              >
                <hobby.icon className={`w-8 h-8 ${hobby.color} mb-4 group-hover:animate-pulse`} />
                <h3 className={`font-mono font-bold text-lg mb-2 ${hobby.color}`}>
                  {hobby.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {hobby.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HobbiesSection;
