import { motion } from "framer-motion";
import { Github, Star, GitFork, Users, Code, ExternalLink, RefreshCw } from "lucide-react";
import { useGitHubProfile } from "@/hooks/useGitHubProfile";
import { useSound } from "@/hooks/useSound";

const GitHubStats = () => {
  const { profile, loading, error, refresh } = useGitHubProfile();
  const { playHover, playClick } = useSound();

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-2 text-xs font-mono text-muted-foreground"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <RefreshCw className="w-3 h-3" />
        </motion.div>
        <span>Loading GitHub stats...</span>
      </motion.div>
    );
  }

  if (!profile) {
    return null;
  }

  const stats = [
    { icon: Code, value: profile.stats.publicRepos, label: "Repos", color: "text-neon-green" },
    { icon: Star, value: profile.stats.totalStars, label: "Stars", color: "text-yellow-400" },
    { icon: GitFork, value: profile.stats.totalForks, label: "Forks", color: "text-electric-purple" },
    { icon: Users, value: profile.stats.followers, label: "Followers", color: "text-signal-red" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.65 }}
      className="space-y-4"
    >
      {/* GitHub Stats Bar */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <motion.a
          href={profile.profile.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full border border-border/50 hover:border-neon-green/50 transition-all group"
          whileHover={{ scale: 1.05 }}
          onMouseEnter={playHover}
          onClick={playClick}
        >
          <Github className="w-4 h-4 text-neon-green" />
          <span className="font-mono text-xs text-muted-foreground group-hover:text-neon-green transition-colors">
            @{profile.profile.username}
          </span>
          <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.a>

        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            className="flex items-center gap-1.5 px-3 py-2 bg-card/60 backdrop-blur-sm rounded-full border border-border/30"
            title={stat.label}
          >
            <stat.icon className={`w-3 h-3 ${stat.color}`} />
            <span className="font-mono text-xs text-foreground">{stat.value}</span>
          </motion.div>
        ))}

        <motion.button
          onClick={() => {
            playClick();
            refresh();
          }}
          onMouseEnter={playHover}
          className="p-2 bg-card/60 backdrop-blur-sm rounded-full border border-border/30 hover:border-neon-green/50 transition-all"
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          title="Refresh GitHub stats"
        >
          <RefreshCw className="w-3 h-3 text-muted-foreground" />
        </motion.button>
      </div>

      {/* Languages */}
      {profile.languages.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex items-center justify-center gap-2 flex-wrap"
        >
          {profile.languages.slice(0, 6).map((lang, index) => (
            <motion.span
              key={lang}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + index * 0.05 }}
              className="px-2 py-1 text-[10px] font-mono bg-muted/50 rounded-md border border-border/30 text-muted-foreground"
            >
              {lang}
            </motion.span>
          ))}
        </motion.div>
      )}

      {/* Last updated indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-center"
      >
        <span className="text-[10px] font-mono text-muted-foreground/50">
          Auto-synced from GitHub • Updated {new Date(profile.fetchedAt).toLocaleDateString()}
        </span>
      </motion.div>
    </motion.div>
  );
};

export default GitHubStats;