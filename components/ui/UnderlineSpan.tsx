"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have a utility file for `cn`
import { twMerge } from "tailwind-merge";

type UnderlineSpanProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  lineWidth?: string; // Custom width for the underline
  lineHeight?: string; // Custom height for the underline
};

export const UnderlineSpan: React.FC<UnderlineSpanProps> = ({
  children,
  className = "",
  onClick,
  lineWidth = "100%", // Default underline width
  lineHeight = "2px", // Default underline height
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    onClick?.(); // Call onClick if it exists
  };

  const underlineStyle = {
    backgroundImage: "linear-gradient(to right, #38bdf8, #38bdf8)",
    backgroundPosition: "center left",
    backgroundRepeat: "no-repeat",
    backgroundSize: `0% ${lineHeight}`,
  };

  return (
    <motion.span
      className={twMerge(
        cn(
          "inline-block cursor-pointer font-bold focus-visible:outline-none",
          className
        )
      )}
      onClick={handleClick}
      initial={{
        backgroundSize: `0% ${lineHeight}`,
        backgroundPosition: "center right",
      }}
      animate={
        isClicked
          ? { backgroundSize: `${lineWidth} ${lineHeight}` }
          : { backgroundSize: `0% ${lineHeight}` }
      }
      whileHover={{
        backgroundSize: `${lineWidth} ${lineHeight}`,
        backgroundPosition: "center left",
      }}
      whileFocus={{
        backgroundSize: `${lineWidth} ${lineHeight}`,
        backgroundPosition: "center left",
      }}
      whileTap={{
        backgroundSize: `${lineWidth} ${lineHeight}`,
        backgroundPosition: "center left",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={underlineStyle}
    >
      {children}
    </motion.span>
  );
};
