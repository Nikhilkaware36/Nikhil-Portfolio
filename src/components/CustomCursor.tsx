import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Trail {
  x: number;
  y: number;
  id: number;
}

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [trails, setTrails] = useState<Trail[]>([]);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const lastPosition = useRef({ x: 0, y: 0 });
  const trailIdRef = useRef(0);
  const rafRef = useRef<number>();

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const newX = e.clientX;
    const newY = e.clientY;
    
    // Calculate velocity
    const vx = newX - lastPosition.current.x;
    const vy = newY - lastPosition.current.y;
    setVelocity({ x: vx, y: vy });
    lastPosition.current = { x: newX, y: newY };
    
    setPosition({ x: newX, y: newY });
    setIsVisible(true);
    
    // Add trail with unique ID
    trailIdRef.current += 1;
    const newTrail = { x: newX, y: newY, id: trailIdRef.current };
    setTrails(prev => [...prev.slice(-10), newTrail]);
    
    const target = e.target as HTMLElement;
    const isClickable = 
      target.tagName === "A" ||
      target.tagName === "BUTTON" ||
      target.tagName === "INPUT" ||
      target.closest("a") !== null ||
      target.closest("button") !== null ||
      window.getComputedStyle(target).cursor === "pointer";
    
    setIsPointer(isClickable);
  }, []);

  useEffect(() => {
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
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  // Clean up old trails periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setTrails(prev => prev.slice(-6));
    }, 80);
    return () => clearInterval(interval);
  }, []);

  // Don't render on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
  const rotation = Math.atan2(velocity.y, velocity.x) * (180 / Math.PI);

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* Trail particles with unique keys */}
      <AnimatePresence mode="popLayout">
        {trails.map((trail, index) => (
          <motion.div
            key={`trail-${trail.id}`}
            initial={{ opacity: 0.5, scale: 0.8 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute"
            style={{
              left: trail.x,
              top: trail.y,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className="rounded-full"
              style={{
                width: 3 + index * 0.4,
                height: 3 + index * 0.4,
                background: isPointer 
                  ? `hsl(270 100% ${55 + index * 2}%)`
                  : `hsl(120 100% ${55 + index * 2}%)`,
                boxShadow: isPointer
                  ? `0 0 ${4 + index}px hsl(270 100% 65% / 0.5)`
                  : `0 0 ${4 + index}px hsl(120 100% 50% / 0.5)`,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Outer glow ring - spring physics */}
      <motion.div
        className={`absolute transition-opacity duration-100 ${isVisible ? "opacity-100" : "opacity-0"}`}
        animate={{
          x: position.x - 22,
          y: position.y - 22,
          scale: isPointer ? 1.6 : isClicking ? 0.7 : 1,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 12, mass: 0.4 }}
      >
        <div
          className={`w-11 h-11 rounded-full border-2 transition-colors duration-150 ${
            isPointer ? "border-electric-purple" : "border-neon-green/50"
          }`}
          style={{
            boxShadow: isPointer 
              ? "0 0 25px hsl(270 100% 65% / 0.5), inset 0 0 15px hsl(270 100% 65% / 0.1)" 
              : "0 0 20px hsl(120 100% 50% / 0.4), inset 0 0 10px hsl(120 100% 50% / 0.05)",
          }}
        />
      </motion.div>

      {/* Inner geometric ring */}
      <motion.div
        className={`absolute transition-opacity duration-100 ${isVisible ? "opacity-100" : "opacity-0"}`}
        animate={{
          x: position.x - 12,
          y: position.y - 12,
          scale: isClicking ? 0.5 : 1,
          rotate: isPointer ? 45 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.2 }}
      >
        <div
          className={`w-6 h-6 transition-all duration-100 ${
            isPointer ? "rounded-sm" : "rounded-full"
          }`}
          style={{
            border: `1.5px solid ${isPointer ? "hsl(270 100% 65%)" : "hsl(120 100% 50% / 0.7)"}`,
            boxShadow: isPointer
              ? "0 0 12px hsl(270 100% 65% / 0.6)"
              : "0 0 10px hsl(120 100% 50% / 0.5)",
          }}
        />
      </motion.div>

      {/* Core dot - instant follow */}
      <div
        className={`absolute transition-opacity duration-50 ${isVisible ? "opacity-100" : "opacity-0"}`}
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.4 : 1})`,
          transition: "transform 0.05s ease-out",
        }}
      >
        <div className="relative">
          {/* Main glowing dot */}
          <div
            className={`rounded-full transition-all duration-75 ${
              isPointer ? "bg-electric-purple w-2 h-2" : "bg-neon-green w-1.5 h-1.5"
            }`}
            style={{
              boxShadow: isPointer
                ? "0 0 20px hsl(270 100% 65%), 0 0 40px hsl(270 100% 65% / 0.6), 0 0 60px hsl(270 100% 65% / 0.3)"
                : "0 0 15px hsl(120 100% 50%), 0 0 30px hsl(120 100% 50% / 0.5), 0 0 45px hsl(120 100% 50% / 0.2)",
            }}
          />
          
          {/* Crosshair on hover */}
          <AnimatePresence>
            {isPointer && (
              <>
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  exit={{ scaleX: 0, opacity: 0 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-px bg-gradient-to-r from-transparent via-electric-purple to-transparent"
                />
                <motion.div
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  exit={{ scaleY: 0, opacity: 0 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-8 bg-gradient-to-b from-transparent via-electric-purple to-transparent"
                />
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Click burst ripple */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            key="click-burst"
            initial={{ scale: 0.3, opacity: 1 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute"
            style={{
              left: position.x - 24,
              top: position.y - 24,
            }}
          >
            <div
              className="w-12 h-12 rounded-full border-2"
              style={{
                borderColor: isPointer ? "hsl(270 100% 65%)" : "hsl(120 100% 50%)",
                boxShadow: isPointer
                  ? "0 0 40px hsl(270 100% 65% / 0.7)"
                  : "0 0 40px hsl(120 100% 50% / 0.7)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Motion blur trail on fast movement */}
      {speed > 15 && (
        <div
          className="absolute"
          style={{
            left: position.x - velocity.x * 0.4,
            top: position.y - velocity.y * 0.4,
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
          }}
        >
          <div
            className="rounded-full"
            style={{
              width: Math.min(speed * 0.6, 40),
              height: 3,
              background: `linear-gradient(90deg, transparent, ${isPointer ? "hsl(270 100% 65% / 0.7)" : "hsl(120 100% 50% / 0.7)"})`,
              boxShadow: isPointer
                ? "0 0 10px hsl(270 100% 65% / 0.5)"
                : "0 0 10px hsl(120 100% 50% / 0.5)",
            }}
          />
        </div>
      )}

      {/* Particle burst on click */}
      <AnimatePresence>
        {isClicking && (
          <>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <motion.div
                key={`particle-${angle}`}
                initial={{ 
                  x: position.x, 
                  y: position.y, 
                  scale: 1, 
                  opacity: 1 
                }}
                animate={{ 
                  x: position.x + Math.cos(angle * Math.PI / 180) * 30,
                  y: position.y + Math.sin(angle * Math.PI / 180) * 30,
                  scale: 0,
                  opacity: 0,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background: isPointer ? "hsl(270 100% 65%)" : "hsl(120 100% 50%)",
                  boxShadow: isPointer
                    ? "0 0 6px hsl(270 100% 65%)"
                    : "0 0 6px hsl(120 100% 50%)",
                  transform: "translate(-50%, -50%)",
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomCursor;
