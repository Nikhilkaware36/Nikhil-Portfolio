import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, Phone, MapPin, Clock, 
  Github, Linkedin, Instagram, MessageSquare,
  Shield, Zap
} from "lucide-react";
import Background3D from "@/components/Background3D";
import ParticleField from "@/components/ParticleField";
import { useSound } from "@/hooks/useSound";

const socialLinks = [
  { name: "GitHub", icon: Github, url: "https://github.com/nikhilkaware36", handle: "@nikhilkaware36" },
  { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com/in/", handle: "Nikhil Kaware" },
  { name: "Instagram", icon: Instagram, url: "https://instagram.com/nikhil.kaware.3", handle: "@nikhil.kaware.3" },
];

const availabilityStatus = {
  status: "Available",
  message: "Currently accepting freelance security projects and consulting work",
  responseTime: "Usually responds within 24 hours"
};

const Contact = () => {
  const { playClick, playHover } = useSound();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Background3D />
      <ParticleField />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-muted-foreground hover:text-neon-green transition-colors group"
            onClick={() => playClick()}
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-sm">Back to Home</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-neon-green" />
            <span className="font-mono font-bold text-lg">
              Contact <span className="text-neon-green">Me</span>
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <MessageSquare className="w-16 h-16 text-neon-green mx-auto" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-mono font-bold mb-4">
              <span className="text-muted-foreground">//</span> Direct
              <span className="text-neon-green"> Contact</span>
            </h1>
            <p className="text-muted-foreground font-mono max-w-xl mx-auto">
              Have a security project, need a consultation, or want to collaborate?
              Reach out directly - I'm just a call away.
            </p>
          </motion.div>

          {/* Main Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="bg-card/50 border border-neon-green/30 rounded-xl p-8 text-center hover:border-neon-green/60 transition-all group"
              style={{ boxShadow: "0 0 40px hsl(120 100% 50% / 0.1)" }}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-block mb-6"
              >
                <div className="w-20 h-20 rounded-full bg-neon-green/20 border-2 border-neon-green/50 flex items-center justify-center mx-auto">
                  <Phone className="w-10 h-10 text-neon-green" />
                </div>
              </motion.div>
              
              <h2 className="font-mono text-sm text-muted-foreground mb-2">DIRECT LINE</h2>
              
              <motion.a
                href="tel:+918928613738"
                onClick={() => playClick()}
                onMouseEnter={playHover}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block text-4xl md:text-5xl font-mono font-bold text-neon-green hover:text-white transition-colors mb-6"
                style={{ textShadow: "0 0 30px hsl(120 100% 50% / 0.5)" }}
              >
                +91 8928613738
              </motion.a>
              
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <motion.a
                  href="tel:+918928613738"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => playClick()}
                  className="flex items-center gap-2 px-6 py-3 bg-neon-green/20 border border-neon-green/50 rounded-lg text-neon-green font-mono hover:bg-neon-green/30 transition-all"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </motion.a>
                
                <motion.a
                  href="https://wa.me/918928613738"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => playClick()}
                  className="flex items-center gap-2 px-6 py-3 bg-electric-purple/20 border border-electric-purple/50 rounded-lg text-electric-purple font-mono hover:bg-electric-purple/30 transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  WhatsApp
                </motion.a>
              </div>
              
              <p className="text-xs text-muted-foreground font-mono mt-6">
                <Zap className="w-3 h-3 inline mr-1 text-neon-green" />
                Available for calls and messages 24/7
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Availability status */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card/50 border border-neon-green/30 rounded-lg p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-green"></span>
                </span>
                <span className="font-mono font-bold text-neon-green">{availabilityStatus.status}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{availabilityStatus.message}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {availabilityStatus.responseTime}
              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-card/50 border border-border/50 rounded-lg p-6"
            >
              <h3 className="font-mono font-bold text-sm mb-4 text-muted-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4 text-signal-red" />
                LOCATION
              </h3>
              <p className="font-mono text-lg mb-2">India</p>
              <p className="text-sm text-muted-foreground">Available for remote work worldwide</p>
            </motion.div>
          </div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 bg-card/50 border border-border/50 rounded-lg p-6"
          >
            <h3 className="font-mono font-bold text-sm mb-4 text-muted-foreground">
              ALSO FIND ME ON
            </h3>
            <div className="grid sm:grid-cols-3 gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHover}
                  onClick={() => playClick()}
                  className="flex items-center gap-3 p-4 bg-background/30 rounded-lg hover:bg-neon-green/10 hover:border-neon-green/30 border border-transparent transition-all group"
                >
                  <social.icon className="w-6 h-6 text-muted-foreground group-hover:text-neon-green transition-colors" />
                  <div>
                    <p className="font-mono text-sm group-hover:text-neon-green transition-colors">{social.name}</p>
                    <p className="text-xs text-muted-foreground">{social.handle}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Security note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 p-4 border border-electric-purple/20 rounded-lg bg-electric-purple/5 text-center"
          >
            <p className="text-sm text-muted-foreground font-mono">
              <Shield className="w-4 h-4 inline mr-2 text-electric-purple" />
              For sensitive security matters, prefer Signal or encrypted communication.
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
