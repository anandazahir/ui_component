"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export const RotatingLetter = ({ letter }: { letter: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const rotation = Math.random() * 180 - 90; // Random rotation between -90 and 90 degrees

  return (
    <motion.span
      className="ml-1 inline-block bg-gradient-to-r from-sky-400 to-sky-700 text-transparent bg-clip-text cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={isHovered ? { rotate: rotation } : { rotate: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      {letter}
    </motion.span>
  );
};
