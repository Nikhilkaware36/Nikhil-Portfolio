import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Trail {
  x: number;
  y: number;
  id: number;
}

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [trails, setTrails] = useState<Trail[]>([]);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const lastPosition = useRef({ x: 0, y: 0 });
  const trailId = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX;
      const newY = e.clientY;
      
      // Calculate velocity for effects
      setVelocity({
        x: newX - lastPosition.current.x,
        y: newY - lastPosition.current.y,
      });
      lastPosition.current = { x: newX, y: newY };
      
      setPosition({ x: newX, y: newY });
      setIsVisible(true);
      
      // Add trail particle
      trailId.current += 1;
      setTrails(prev => [...prev.slice(-12), { x: newX, y: newY, id: trailId.current }]);
      
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        !!target.closest("a") ||
        !!target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer";
      
      setIsPointer(isClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  // Clean up old trails
  useEffect(() => {
    const interval = setInterval(() => {
      setTrails(prev => prev.slice(-8));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Don't render on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
  const rotation = Math.atan2(velocity.y, velocity.x) * (180 / Math.PI);

  return (
    <>
      {/* Trail particles */}
      <AnimatePresence>
        {trails.map((trail, index) => (
          <motion.div
            key={trail.id}
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed pointer-events-none z-[9996]"
            style={{
              left: trail.x,
              top: trail.y,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className="rounded-full"
              style={{
                width: 4 + index * 0.3,
                height: 4 + index * 0.3,
                background: isPointer 
                  ? `hsl(270 100% ${50 + index * 3}% / ${0.3 + index * 0.02})`
                  : `hsl(120 100% ${50 + index * 3}% / ${0.3 + index * 0.02})`,
                boxShadow: isPointer
                  ? `0 0 ${6 + index}px hsl(270 100% 65% / 0.4)`
                  : `0 0 ${6 + index}px hsl(120 100% 50% / 0.4)`,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Outer glow ring - follows slower */}
      <motion.div
        className={`fixed pointer-events-none z-[9997] ${isVisible ? "opacity-100" : "opacity-0"}`}
        animate={{
          left: position.x,
          top: position.y,
          scale: isPointer ? 1.8 : isClicking ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div
          className={`rounded-full border-2 transition-colors duration-200 ${
            isPointer ? "border-electric-purple" : "border-neon-green/40"
          }`}
          style={{
            width: 40,
            height: 40,
            boxShadow: isPointer 
              ? "0 0 20px hsl(270 100% 65% / 0.4), inset 0 0 20px hsl(270 100% 65% / 0.1)" 
              : "0 0 15px hsl(120 100% 50% / 0.3), inset 0 0 15px hsl(120 100% 50% / 0.05)",
          }}
        />
      </motion.div>

      {/* Inner ring - follows medium speed */}
      <motion.div
        className={`fixed pointer-events-none z-[9998] ${isVisible ? "opacity-100" : "opacity-0"}`}
        animate={{
          left: position.x,
          top: position.y,
          scale: isClicking ? 0.6 : 1,
          rotate: isPointer ? rotation : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.3 }}
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div
          className={`transition-all duration-150 ${
            isPointer ? "rotate-45" : ""
          }`}
          style={{
            width: isPointer ? 20 : 24,
            height: isPointer ? 20 : 24,
            borderRadius: isPointer ? "4px" : "50%",
            border: `1px solid ${isPointer ? "hsl(270 100% 65% / 0.8)" : "hsl(120 100% 50% / 0.6)"}`,
            boxShadow: isPointer
              ? "0 0 10px hsl(270 100% 65% / 0.5)"
              : "0 0 8px hsl(120 100% 50% / 0.4)",
          }}
        />
      </motion.div>

      {/* Core cursor - instant follow */}
      <div
        className={`fixed pointer-events-none z-[9999] transition-opacity duration-100 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.5 : 1})`,
        }}
      >
        {/* Main dot with crosshair effect */}
        <div className="relative">
          <div
            className={`rounded-full transition-all duration-100 ${
              isPointer ? "bg-electric-purple" : "bg-neon-green"
            }`}
            style={{
              width: isPointer ? 8 : 6,
              height: isPointer ? 8 : 6,
              boxShadow: isPointer
                ? "0 0 15px hsl(270 100% 65%), 0 0 30px hsl(270 100% 65% / 0.5)"
                : "0 0 12px hsl(120 100% 50%), 0 0 25px hsl(120 100% 50% / 0.5)",
            }}
          />
          
          {/* Crosshair lines when hovering */}
          {isPointer && (
            <>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-[1px] bg-electric-purple/60"
              />
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-6 bg-electric-purple/60"
              />
            </>
          )}
        </div>
      </div>

      {/* Click burst effect */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed pointer-events-none z-[9995]"
            style={{
              left: position.x,
              top: position.y,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className="w-12 h-12 rounded-full border-2"
              style={{
                borderColor: isPointer ? "hsl(270 100% 65%)" : "hsl(120 100% 50%)",
                boxShadow: isPointer
                  ? "0 0 30px hsl(270 100% 65% / 0.6)"
                  : "0 0 30px hsl(120 100% 50% / 0.6)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Velocity-based stretch effect */}
      {speed > 10 && (
        <motion.div
          className="fixed pointer-events-none z-[9994]"
          style={{
            left: position.x - velocity.x * 0.5,
            top: position.y - velocity.y * 0.5,
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
          }}
        >
          <div
            className="rounded-full"
            style={{
              width: Math.min(speed * 0.5, 30),
              height: 2,
              background: `linear-gradient(90deg, transparent, ${isPointer ? "hsl(270 100% 65% / 0.6)" : "hsl(120 100% 50% / 0.6)"})`,
            }}
          />
        </motion.div>
      )}
    </>
  );
};

export default CustomCursor;
