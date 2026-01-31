import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-green via-electric-purple to-neon-green z-50 origin-left"
        style={{ scaleX }}
      />
      
      {/* Side progress indicator */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-1">
        <motion.div
          className="w-1 bg-muted/30 rounded-full overflow-hidden"
          style={{ height: 100 }}
        >
          <motion.div
            className="w-full bg-gradient-to-b from-neon-green to-electric-purple rounded-full"
            style={{ 
              height: "100%",
              scaleY: scrollYProgress,
              originY: 0,
            }}
          />
        </motion.div>
        <motion.span
          className="text-[10px] font-mono text-neon-green mt-2"
          style={{ opacity: scrollYProgress }}
        >
          <motion.span>
            {scrollYProgress.get() > 0 ? `${Math.round(scrollYProgress.get() * 100)}%` : "0%"}
          </motion.span>
        </motion.span>
      </div>
    </>
  );
};

export default ScrollProgress;
