import { useState } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GlitchText = ({ text, className = "" }: GlitchTextProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className={`glitch ${isHovered ? "active" : ""} ${className}`}
      data-text={text}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
    </span>
  );
};

export default GlitchText;
