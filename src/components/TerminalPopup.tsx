import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Minimize2, Maximize2 } from "lucide-react";

const commands: Record<string, string | string[]> = {
  help: [
    "Available commands:",
    "  whoami      - Display identity info",
    "  skills      - List technical skills",
    "  projects    - Show project list",
    "  certs       - Display certifications",
    "  contact     - Get contact info",
    "  social      - Show social links",
    "  asura       - About Asura Legion",
    "  education   - Educational background",
    "  languages   - Languages spoken",
    "  clear       - Clear terminal",
    "  help        - Show this help",
  ],
  whoami: [
    "╔══════════════════════════════════════╗",
    "║  NIKHIL SANTOSH KAWARE               ║",
    "║  Cybersecurity Analyst (Fresher)     ║",
    "║  Digital Forensics | OSINT | Bug BB  ║",
    "║  Founder @ Asura Legion              ║",
    "╚══════════════════════════════════════╝",
    "",
    "Status: Open for Entry-Level Roles",
    "Location: India",
  ],
  skills: [
    "╭─ SECURITY ─────────────────────────╮",
    "│ • Network Security & Protocols     │",
    "│ • Digital Forensics & Evidence     │",
    "│ • Blue Team Operations             │",
    "│ • Bug Bounty & Vuln Assessment     │",
    "│ • Dark Web Investigation           │",
    "│ • OSINT Research                   │",
    "╰────────────────────────────────────╯",
    "",
    "╭─ DEVELOPMENT ──────────────────────╮",
    "│ • Python ████████████░░ 92%        │",
    "│ • Bash   ████████░░░░░░ 88%        │",
    "│ • Rust   ██████░░░░░░░░ 65%        │",
    "╰────────────────────────────────────╯",
  ],
  projects: [
    "╭─ THE ARSENAL ──────────────────────╮",
    "│ 01. PyPop - Security Toolkit       │",
    "│ 02. Adah - AI System Controller    │",
    "│ 03. DomineGhost - DNS Scanner      │",
    "│ 04. ShadowLens - OSINT Analyzer    │",
    "│ 05. TraceX - Forensics Helper      │",
    "│ 06. DefenderBot - Blue Team Bot    │",
    "│ 07. NetEye - Network Monitor       │",
    "│ 08. Shadowsender - Red Team Tool   │",
    "│ 09. SafeNet Guard - Safety Tool    │",
    "│ 10. DataLeak Alert - Breach Check  │",
    "│ 11. PhishBlocker - Browser Plugin  │",
    "│ 12. RajaBabu - Password Breaker    │",
    "╰────────────────────────────────────╯",
    "",
    "Run: git clone github.com/Nikhilkaware36",
  ],
  certs: [
    "╭─ CERTIFICATIONS (25+) ─────────────╮",
    "│ ✓ CPPS - Phishing Prevention       │",
    "│ ✓ CCSC - Career Starter            │",
    "│ ✓ FLACD - Log Analysis             │",
    "│ ✓ Healthcare Hacking               │",
    "│ ✓ Purple Team AD/AzureAD           │",
    "│ ✓ TryHackMe Advent of Cyber        │",
    "│ ✓ CCEP - Cybersecurity Educator    │",
    "│ ✓ SOC Analyst Path                 │",
    "│ ✓ Web App Pentesting               │",
    "│ ✓ Linux Fundamentals               │",
    "│ + 15 more certifications...        │",
    "╰────────────────────────────────────╯",
  ],
  contact: [
    "╭─ CONTACT INFO ─────────────────────╮",
    "│ Email: nikhilkaware8236@gmail.com  │",
    "│ Location: India                    │",
    "│ Status: Open for opportunities     │",
    "╰────────────────────────────────────╯",
    "",
    "Run: mailto nikhilkaware8236@gmail.com",
  ],
  social: [
    "╭─ SOCIAL LINKS ─────────────────────╮",
    "│ GitHub:    github.com/Nikhilkaware36",
    "│ LinkedIn:  linkedin.com/in/nikhil-kaware",
    "│ Instagram: instagram.com/nikhil.kaware.3",
    "╰────────────────────────────────────╯",
  ],
  asura: [
    "╔══════════════════════════════════════╗",
    "║         🔱 ASURA LEGION 🔱           ║",
    "╠══════════════════════════════════════╣",
    "║ Elite cybersecurity collective       ║",
    "║ focused on ethical hacking,          ║",
    "║ security research, and digital       ║",
    "║ protection.                          ║",
    "╠══════════════════════════════════════╣",
    "║ FOUNDER: Nikhil Santosh Kaware       ║",
    "║ MISSION: Secure the digital realm    ║",
    "║ VALUES:  Ethics, Excellence, Unity   ║",
    "╚══════════════════════════════════════╝",
    "",
    "\"Breaking barriers to uncover hidden vulnerabilities\"",
  ],
  education: [
    "╭─ EDUCATION ────────────────────────╮",
    "│ Diploma in Computer Science        │",
    "│ June 2023 - May 2027               │",
    "│                                    │",
    "│ 10th SSC                           │",
    "│ Completed June 2023                │",
    "╰────────────────────────────────────╯",
  ],
  languages: [
    "╭─ LANGUAGES ────────────────────────╮",
    "│ • English  ████████████ Native     │",
    "│ • Hindi    ████████████ Native     │",
    "│ • Marathi  ████████████ Native     │",
    "│ • Latin    ██████░░░░░░ Basic      │",
    "│ • Spanish  ██████░░░░░░ Basic      │",
    "╰────────────────────────────────────╯",
  ],
  clear: "CLEAR",
};

const TerminalPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ type: "input" | "output"; content: string }[]>([
    { type: "output", content: "Welcome to Kaware Security Terminal v1.0" },
    { type: "output", content: 'Type "help" to see available commands.' },
    { type: "output", content: "" },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    setHistory((prev) => [...prev, { type: "input", content: `> ${cmd}` }]);

    if (trimmedCmd === "clear") {
      setHistory([]);
      return;
    }

    const response = commands[trimmedCmd];
    if (response) {
      if (Array.isArray(response)) {
        response.forEach((line) => {
          setHistory((prev) => [...prev, { type: "output", content: line }]);
        });
      } else {
        setHistory((prev) => [...prev, { type: "output", content: response }]);
      }
    } else {
      setHistory((prev) => [
        ...prev,
        { type: "output", content: `Command not found: ${cmd}` },
        { type: "output", content: 'Type "help" for available commands.' },
      ]);
    }
    setHistory((prev) => [...prev, { type: "output", content: "" }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <>
      {/* Floating terminal button */}
      <motion.button
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        onClick={() => setIsOpen(true)}
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 p-3 bg-card border border-neon-green/50 rounded-l-lg text-neon-green hover:bg-neon-green/10 transition-all group ${
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{
          boxShadow: "0 0 20px hsl(120 100% 50% / 0.2)",
        }}
      >
        <Terminal className="w-6 h-6" />
        <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-card border border-border rounded text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Open Terminal
        </span>
      </motion.button>

      {/* Terminal window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ 
              x: 0, 
              opacity: 1,
              height: isMinimized ? "auto" : "500px"
            }}
            exit={{ x: 400, opacity: 0 }}
            className="fixed right-4 bottom-4 w-[450px] bg-card border border-neon-green/30 rounded-lg overflow-hidden z-50 flex flex-col"
            style={{
              boxShadow: "0 0 40px hsl(120 100% 50% / 0.15)",
            }}
          >
            {/* Terminal header */}
            <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border/50">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-neon-green" />
                <span className="text-xs font-mono text-muted-foreground">
                  kaware-sec@terminal
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-muted rounded transition-colors"
                >
                  {isMinimized ? (
                    <Maximize2 className="w-3 h-3 text-muted-foreground" />
                  ) : (
                    <Minimize2 className="w-3 h-3 text-muted-foreground" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-muted rounded transition-colors"
                >
                  <X className="w-3 h-3 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Terminal content */}
            {!isMinimized && (
              <>
                <div
                  ref={terminalRef}
                  className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-0.5"
                  onClick={() => inputRef.current?.focus()}
                >
                  {history.map((line, index) => (
                    <div
                      key={index}
                      className={`${
                        line.type === "input"
                          ? "text-neon-green"
                          : "text-foreground/80"
                      } whitespace-pre-wrap`}
                    >
                      {line.content}
                    </div>
                  ))}
                </div>

                {/* Input */}
                <form
                  onSubmit={handleSubmit}
                  className="flex items-center gap-2 p-3 border-t border-border/50 bg-muted/30"
                >
                  <span className="text-neon-green font-mono text-xs">{">"}</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-foreground placeholder:text-muted-foreground"
                    placeholder="Type a command..."
                    autoComplete="off"
                    spellCheck={false}
                  />
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TerminalPopup;
