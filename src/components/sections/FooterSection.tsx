import { Terminal, Github, Linkedin, Mail } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="py-12 border-t border-border/30 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Terminal-style status */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3 font-mono text-sm">
              <Terminal className="w-4 h-4 text-neon-green" />
              <span className="text-muted-foreground">system_status:</span>
              <span className="status-online">
                Online
              </span>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4">
              <a
                href="mailto:nikhilkaware8236@gmail.com"
                className="p-2 text-muted-foreground hover:text-neon-green transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 text-muted-foreground hover:text-neon-green transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 text-muted-foreground hover:text-neon-green transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* ASCII art divider */}
          <div className="text-center font-mono text-xs text-muted-foreground/30 mb-6 overflow-x-auto">
            <pre className="inline-block">
{`═══════════════════════════════════════════════════════════════`}
            </pre>
          </div>

          {/* Copyright and command prompt */}
          <div className="text-center space-y-2">
            <p className="font-mono text-sm text-muted-foreground">
              © 2026 Nikhil Santosh Kaware. All rights reserved.
            </p>
            <p className="font-mono text-xs text-muted-foreground/50">
              <span className="text-neon-green">root@kaware-sec:~$</span> echo "Stay secure, stay curious."
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
