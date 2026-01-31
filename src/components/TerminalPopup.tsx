import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Minimize2, Maximize2, Skull } from "lucide-react";
import { useSound } from "@/hooks/useSound";

const commands: Record<string, string | string[]> = {
  help: [
    "╔═══════════════════════════════════════╗",
    "║     🐀 RAT TERMINAL v3.0 - COMMANDS    ║",
    "╠═══════════════════════════════════════╣",
    "║  whoami      - Display operator info   ║",
    "║  skills      - List exploit abilities  ║",
    "║  projects    - Show arsenal            ║",
    "║  certs       - Display credentials     ║",
    "║  contact     - Get secure comms        ║",
    "║  social      - Show intel sources      ║",
    "║  asura       - About the Legion        ║",
    "║  rat         - RAT system info         ║",
    "║  payload     - Active payloads         ║",
    "║  clear       - Wipe terminal           ║",
    "║  help        - Show this menu          ║",
    "╚═══════════════════════════════════════╝",
  ],
  whoami: [
    "┌──────────────────────────────────────┐",
    "│  🐀 RAT OPERATOR PROFILE              │",
    "├──────────────────────────────────────┤",
    "│  HANDLE: NIKHIL SANTOSH KAWARE       │",
    "│  CLASS:  Cybersecurity Analyst       │",
    "│  SKILLS: Digital Forensics | OSINT   │",
    "│  RANK:   Founder @ Asura Legion      │",
    "│  ACCESS: GOD_MODE                    │",
    "└──────────────────────────────────────┘",
    "",
    "  [!] Status: Hunting for Entry-Level Roles",
    "  [!] Location: India",
  ],
  skills: [
    "╭─ 🔴 OFFENSIVE CAPABILITIES ───────────╮",
    "│ • Network Infiltration & Protocols   │",
    "│ • Digital Forensics & Evidence       │",
    "│ • Blue Team Evasion                  │",
    "│ • Vulnerability Discovery            │",
    "│ • Dark Web Navigation                │",
    "│ • OSINT & Target Profiling           │",
    "╰───────────────────────────────────────╯",
    "",
    "╭─ 🔴 PAYLOAD DEVELOPMENT ─────────────╮",
    "│ • Python ████████████░░ 92% [ARMED]  │",
    "│ • Bash   ████████░░░░░░ 88% [ACTIVE] │",
    "│ • Rust   ██████░░░░░░░░ 65% [DEV]    │",
    "╰───────────────────────────────────────╯",
  ],
  projects: [
    "╔═══════════════════════════════════════╗",
    "║      🐀 RAT ARSENAL - 12 PAYLOADS     ║",
    "╠═══════════════════════════════════════╣",
    "║ [01] PyPop --------- Security Toolkit ║",
    "║ [02] Adah ---------- AI Controller    ║",
    "║ [03] DomineGhost --- DNS Recon        ║",
    "║ [04] ShadowLens ---- OSINT Analyzer   ║",
    "║ [05] TraceX -------- Forensics Tool   ║",
    "║ [06] DefenderBot --- Blue Team Bot    ║",
    "║ [07] NetEye -------- Network Monitor  ║",
    "║ [08] Shadowsender -- Red Team Tool    ║",
    "║ [09] SafeNet Guard - Security Suite   ║",
    "║ [10] DataLeak Alert  Breach Detector  ║",
    "║ [11] PhishBlocker -- Anti-Phishing    ║",
    "║ [12] RajaBabu ------ Password Cracker ║",
    "╚═══════════════════════════════════════╝",
    "",
    "  > git clone github.com/Nikhilkaware36",
  ],
  certs: [
    "╭─ 🏴 CREDENTIALS VAULT (25+) ─────────╮",
    "│ ✓ CPPS - Phishing Prevention        │",
    "│ ✓ CCSC - Career Starter             │",
    "│ ✓ FLACD - Log Analysis              │",
    "│ ✓ Healthcare Hacking                │",
    "│ ✓ Purple Team AD/AzureAD            │",
    "│ ✓ TryHackMe Advent of Cyber         │",
    "│ ✓ CCEP - Cybersecurity Educator     │",
    "│ ✓ SOC Analyst Path                  │",
    "│ ✓ Web App Pentesting                │",
    "│ ✓ Linux Fundamentals                │",
    "│ + 15 more classified credentials... │",
    "╰──────────────────────────────────────╯",
  ],
  contact: [
    "╭─ 🔐 SECURE COMMUNICATION CHANNELS ───╮",
    "│                                      │",
    "│  EMAIL: nikhilkaware8236@gmail.com   │",
    "│  LOC:   India [ENCRYPTED]            │",
    "│  STATUS: Accepting missions          │",
    "│                                      │",
    "╰──────────────────────────────────────╯",
    "",
    "  > Establishing encrypted tunnel...",
    "  > Connection secure. Await response.",
  ],
  social: [
    "╭─ 📡 INTEL SOURCES ───────────────────╮",
    "│                                      │",
    "│  GITHUB:    github.com/Nikhilkaware36│",
    "│  LINKEDIN:  linkedin.com/in/nikhil-..│",
    "│  INSTAGRAM: instagram.com/nikhil...  │",
    "│                                      │",
    "╰──────────────────────────────────────╯",
  ],
  asura: [
    "╔═══════════════════════════════════════╗",
    "║         🔱 ASURA LEGION 🔱            ║",
    "╠═══════════════════════════════════════╣",
    "║  Elite cybersecurity collective       ║",
    "║  focused on ethical hacking,          ║",
    "║  security research, and digital       ║",
    "║  protection.                          ║",
    "╠═══════════════════════════════════════╣",
    "║  FOUNDER: Nikhil Santosh Kaware       ║",
    "║  MISSION: Secure the digital realm    ║",
    "║  VALUES:  Ethics • Excellence • Unity ║",
    "╚═══════════════════════════════════════╝",
    "",
    '  "Breaking barriers to uncover hidden',
    '   vulnerabilities"',
  ],
  rat: [
    "╔═══════════════════════════════════════╗",
    "║     🐀 REMOTE ACCESS TROJAN v3.0      ║",
    "╠═══════════════════════════════════════╣",
    "║  STATUS:     FULLY OPERATIONAL        ║",
    "║  ENCRYPTION: AES-256-GCM              ║",
    "║  PROTOCOL:   CUSTOM C2                ║",
    "║  EVASION:    POLYMORPHIC              ║",
    "║  PERSISTENCE: MULTI-VECTOR            ║",
    "╠═══════════════════════════════════════╣",
    "║  [!] All systems nominal              ║",
    "║  [!] Backdoor connections: ACTIVE     ║",
    "║  [!] Data exfiltration: READY         ║",
    "╚═══════════════════════════════════════╝",
  ],
  payload: [
    "┌──────────────────────────────────────┐",
    "│  🔴 ACTIVE PAYLOADS                   │",
    "├──────────────────────────────────────┤",
    "│  [ARMED]   keylogger.py    STEALTH   │",
    "│  [ARMED]   screencap.sh    ACTIVE    │",
    "│  [READY]   exfil_data.rs   STANDBY   │",
    "│  [LOADED]  persist.exe     DORMANT   │",
    "│  [ACTIVE]  c2_beacon.py    CALLING   │",
    "└──────────────────────────────────────┘",
    "",
    "  > All payloads loaded and operational",
    "  > Awaiting operator command...",
  ],
  education: [
    "╭─ 📚 TRAINING RECORDS ────────────────╮",
    "│ Diploma in Computer Science          │",
    "│ June 2023 - May 2027                 │",
    "│                                      │",
    "│ 10th SSC                             │",
    "│ Completed June 2023                  │",
    "╰──────────────────────────────────────╯",
  ],
  languages: [
    "╭─ 🌐 LANGUAGE MODULES ────────────────╮",
    "│ • English  ████████████ NATIVE       │",
    "│ • Hindi    ████████████ NATIVE       │",
    "│ • Marathi  ████████████ NATIVE       │",
    "│ • Latin    ██████░░░░░░ BASIC        │",
    "│ • Spanish  ██████░░░░░░ BASIC        │",
    "╰──────────────────────────────────────╯",
  ],
  clear: "CLEAR",
};

const TerminalPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ type: "input" | "output"; content: string }[]>([
    { type: "output", content: "🐀 RAT TERMINAL v3.0 - Remote Access Active" },
    { type: "output", content: "[!] Connection established. Operator authenticated." },
    { type: "output", content: "" },
    { type: "output", content: 'Type "help" to see available commands.' },
    { type: "output", content: "" },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { playKeypress, playClick } = useSound();

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
    setHistory((prev) => [...prev, { type: "input", content: `rat@legion:~$ ${cmd}` }]);

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
        { type: "output", content: `[ERROR] Command not found: ${cmd}` },
        { type: "output", content: '[!] Type "help" for available commands.' },
      ]);
    }
    setHistory((prev) => [...prev, { type: "output", content: "" }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      playKeypress();
      handleCommand(input);
      setInput("");
    }
  };

  const handleOpen = () => {
    playClick();
    setIsOpen(true);
  };

  return (
    <>
      {/* Floating terminal button - LEFT SIDE with RAT theme */}
      <motion.button
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        onClick={handleOpen}
        className={`fixed left-0 top-1/2 -translate-y-1/2 z-50 p-3 bg-card border border-signal-red/50 rounded-r-lg text-signal-red hover:bg-signal-red/10 transition-all group ${
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{
          boxShadow: "0 0 20px hsl(0 85% 55% / 0.3)",
        }}
        whileHover={{ x: 5 }}
      >
        <div className="relative">
          <Terminal className="w-6 h-6" />
          <motion.div
            className="absolute -top-1 -right-1 w-2 h-2 bg-signal-red rounded-full"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        </div>
        <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-card border border-signal-red/30 rounded text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-signal-red">
          🐀 RAT Terminal
        </span>
      </motion.button>

      {/* Terminal window - RAT themed */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -450, opacity: 0 }}
            animate={{ 
              x: 0, 
              opacity: 1,
              height: isMinimized ? "auto" : "520px"
            }}
            exit={{ x: -450, opacity: 0 }}
            className="fixed left-4 bottom-4 w-[480px] bg-card border border-signal-red/40 rounded-lg overflow-hidden z-50 flex flex-col"
            style={{
              boxShadow: "0 0 60px hsl(0 85% 55% / 0.2), inset 0 0 30px hsl(0 85% 55% / 0.05)",
            }}
          >
            {/* Terminal header - RAT themed */}
            <div className="flex items-center justify-between px-4 py-2 bg-signal-red/10 border-b border-signal-red/30">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <motion.span 
                    className="w-2.5 h-2.5 rounded-full bg-signal-red" 
                    animate={{ scale: [1, 1.2, 1] }} 
                    transition={{ duration: 1, repeat: Infinity }} 
                  />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-neon-green" />
                </div>
                <Skull className="w-4 h-4 text-signal-red ml-2" />
                <span className="text-xs font-mono text-signal-red">
                  rat@asura-legion
                </span>
                <motion.span
                  className="text-[10px] font-mono text-signal-red/60 ml-2"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  [CONNECTED]
                </motion.span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-signal-red/20 rounded transition-colors"
                >
                  {isMinimized ? (
                    <Maximize2 className="w-3 h-3 text-signal-red/70" />
                  ) : (
                    <Minimize2 className="w-3 h-3 text-signal-red/70" />
                  )}
                </button>
                <button
                  onClick={() => {
                    playClick();
                    setIsOpen(false);
                  }}
                  className="p-1 hover:bg-signal-red/20 rounded transition-colors"
                >
                  <X className="w-3 h-3 text-signal-red/70" />
                </button>
              </div>
            </div>

            {/* Terminal content */}
            {!isMinimized && (
              <>
                <div
                  ref={terminalRef}
                  className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-0.5 bg-gradient-to-b from-transparent to-signal-red/5"
                  onClick={() => inputRef.current?.focus()}
                >
                  {history.map((line, index) => (
                    <div
                      key={index}
                      className={`${
                        line.type === "input"
                          ? "text-signal-red"
                          : line.content.includes("[ERROR]") || line.content.includes("[!]")
                          ? "text-signal-red/90"
                          : line.content.includes("✓") || line.content.includes("[ARMED]") || line.content.includes("[ACTIVE]")
                          ? "text-neon-green/80"
                          : "text-foreground/80"
                      } whitespace-pre-wrap`}
                    >
                      {line.content}
                    </div>
                  ))}
                </div>

                {/* Input - RAT themed */}
                <form
                  onSubmit={handleSubmit}
                  className="flex items-center gap-2 p-3 border-t border-signal-red/30 bg-signal-red/5"
                >
                  <span className="text-signal-red font-mono text-xs">rat@legion:~$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-foreground placeholder:text-signal-red/40"
                    placeholder="Enter command..."
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <motion.div
                    className="w-2 h-4 bg-signal-red"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
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
