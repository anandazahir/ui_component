"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { twMerge } from "tailwind-merge";

interface AnimatedButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  classNameText?: string;
  variants?: Variants;
  isActive?: boolean; // Changed from isClick to isActive
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  onClick,
  children,
  className = "",
  classNameText = "",
  variants,
  isActive = false, // Default to false
}) => {
  const [isActiveState, setIsActiveState] = useState(isActive);

  useEffect(() => {
    setIsActiveState(isActive);
  }, [isActive]);

  const buttonClasses = twMerge(
    cn("relative p-3 text-white rounded-md cursor-pointer", className)
  );

  const textClasses = twMerge(
    cn(
      "relative z-10 dark:text-black", // Base classes
      classNameText // Dynamically passed classes
    )
  );

  return (
    <motion.button
      className={buttonClasses + " group"}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => setIsActiveState(true)}
      onMouseLeave={() => setIsActiveState(false)}
      variants={variants}
    >
      <motion.div
        className="absolute inset-0 bg-sky-400 z-0 rounded-md"
        initial={{ scaleX: 0, borderRadius: "0.5rem" }}
        animate={{ scaleX: isActiveState ? 1 : 0, borderRadius: "0.5rem" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ originX: isActiveState ? 0 : 1 }}
      />

      <span className={textClasses}>{children}</span>
    </motion.button>
  );
};
