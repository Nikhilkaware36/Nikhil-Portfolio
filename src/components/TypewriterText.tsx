import { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

const TypewriterText = ({ text, speed = 50, delay = 500, className = "" }: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const startTyping = setTimeout(() => {
      setIsTyping(true);
      let currentIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, speed);

      return () => clearInterval(typingInterval);
    }, delay);

    return () => clearTimeout(startTyping);
  }, [text, speed, delay]);

  return (
    <span className={`font-mono ${className}`}>
      {displayedText}
      <span 
        className={`inline-block w-[2px] h-[1em] ml-1 bg-neon-green align-middle ${
          isTyping ? "animate-pulse" : "animate-[blink_1s_step-end_infinite]"
        }`}
      />
    </span>
  );
};

export default TypewriterText;
