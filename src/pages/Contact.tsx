import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, Send, Mail, MapPin, Clock, 
  Github, Linkedin, Twitter, MessageSquare,
  CheckCircle, AlertCircle, Terminal, Zap
} from "lucide-react";
import { z } from "zod";
import Background3D from "@/components/Background3D";
import ParticleField from "@/components/ParticleField";
import { useSound } from "@/hooks/useSound";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email too long"),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject too long"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message too long")
});

type ContactForm = z.infer<typeof contactSchema>;

const socialLinks = [
  { name: "GitHub", icon: Github, url: "https://github.com/", handle: "@cyberrat" },
  { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com/in/", handle: "Nikhil Kaware" },
  { name: "Twitter", icon: Twitter, url: "https://twitter.com/", handle: "@cyberrat_sec" },
];

const availabilityStatus = {
  status: "Available",
  message: "Currently accepting freelance security projects and consulting work",
  responseTime: "Usually responds within 24 hours"
};

const Contact = () => {
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { playClick, playHover, playSuccess, playGlitch } = useSound();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof ContactForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick();

    // Validate
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactForm, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactForm] = err.message;
        }
      });
      setErrors(fieldErrors);
      playGlitch();
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission (in real app, this would be an API call)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    playSuccess();
    
    toast({
      title: "Message Sent!",
      description: "I'll get back to you as soon as possible.",
    });
  };

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
            <Mail className="w-5 h-5 text-electric-purple" />
            <span className="font-mono font-bold text-lg">
              Contact <span className="text-electric-purple">Me</span>
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-5xl mx-auto">
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
              <MessageSquare className="w-16 h-16 text-electric-purple mx-auto" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-mono font-bold mb-4">
              <span className="text-muted-foreground">//</span> Get In
              <span className="text-electric-purple"> Touch</span>
            </h1>
            <p className="text-muted-foreground font-mono max-w-xl mx-auto">
              Have a security project, need a consultation, or want to collaborate?
              I'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-3"
            >
              <div className="bg-card/50 border border-border/50 rounded-lg p-6 hover:border-electric-purple/30 transition-all">
                <h2 className="font-mono font-bold text-lg mb-6 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-electric-purple" />
                  Send a Message
                </h2>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle className="w-16 h-16 text-neon-green mx-auto mb-4" />
                    <h3 className="font-mono font-bold text-xl text-neon-green mb-2">
                      Message Transmitted!
                    </h3>
                    <p className="text-muted-foreground font-mono text-sm">
                      Your message has been encrypted and sent securely.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setForm({ name: "", email: "", subject: "", message: "" });
                        playClick();
                      }}
                      className="mt-6 px-4 py-2 border border-electric-purple/50 rounded-lg text-electric-purple hover:bg-electric-purple/10 transition-all font-mono text-sm"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-mono text-muted-foreground mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          onFocus={playHover}
                          className={`w-full px-4 py-3 bg-background/50 border rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-electric-purple/50 transition-all ${
                            errors.name ? "border-signal-red" : "border-border/50"
                          }`}
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <p className="text-signal-red text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-mono text-muted-foreground mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          onFocus={playHover}
                          className={`w-full px-4 py-3 bg-background/50 border rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-electric-purple/50 transition-all ${
                            errors.email ? "border-signal-red" : "border-border/50"
                          }`}
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <p className="text-signal-red text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-mono text-muted-foreground mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        onFocus={playHover}
                        className={`w-full px-4 py-3 bg-background/50 border rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-electric-purple/50 transition-all ${
                          errors.subject ? "border-signal-red" : "border-border/50"
                        }`}
                        placeholder="Security Consultation Request"
                      />
                      {errors.subject && (
                        <p className="text-signal-red text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.subject}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-mono text-muted-foreground mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        onFocus={playHover}
                        rows={6}
                        className={`w-full px-4 py-3 bg-background/50 border rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-electric-purple/50 transition-all resize-none ${
                          errors.message ? "border-signal-red" : "border-border/50"
                        }`}
                        placeholder="Tell me about your project or inquiry..."
                      />
                      {errors.message && (
                        <p className="text-signal-red text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.message}
                        </p>
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-electric-purple/20 border border-electric-purple/50 rounded-lg text-electric-purple font-mono font-bold hover:bg-electric-purple/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Zap className="w-5 h-5" />
                          </motion.div>
                          Encrypting & Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Availability status */}
              <div className="bg-card/50 border border-neon-green/30 rounded-lg p-6">
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
              </div>

              {/* Contact info */}
              <div className="bg-card/50 border border-border/50 rounded-lg p-6">
                <h3 className="font-mono font-bold text-sm mb-4 text-muted-foreground">
                  CONTACT INFO
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-electric-purple" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <a href="mailto:contact@cyberrat.dev" className="font-mono text-sm hover:text-electric-purple transition-colors">
                        contact@cyberrat.dev
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-signal-red" />
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="font-mono text-sm">India / Remote</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="bg-card/50 border border-border/50 rounded-lg p-6">
                <h3 className="font-mono font-bold text-sm mb-4 text-muted-foreground">
                  CONNECT
                </h3>
                <div className="space-y-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={playHover}
                      onClick={() => playClick()}
                      className="flex items-center gap-3 p-3 bg-background/30 rounded-lg hover:bg-neon-green/10 hover:border-neon-green/30 border border-transparent transition-all group"
                    >
                      <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-neon-green transition-colors" />
                      <div>
                        <p className="font-mono text-sm group-hover:text-neon-green transition-colors">{social.name}</p>
                        <p className="text-xs text-muted-foreground">{social.handle}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Security note */}
              <div className="p-4 border border-electric-purple/20 rounded-lg bg-electric-purple/5">
                <p className="text-xs text-muted-foreground font-mono">
                  <span className="text-electric-purple">🔐</span> All messages are transmitted securely. 
                  For sensitive communications, please use encrypted email or Signal.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
