"use client";

import React from "react";
import { motion } from "framer-motion";

interface DividerProps {
  lineWidth?: string;
  lineColor?: string;
  rhombusSize?: string;
  duration?: number;
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  lineWidth = "200px",
  lineColor = "black",
  rhombusSize = "16px",
  duration = 1,
  className,
}) => {
  // Animation variants for the line
  const lineVariants = {
    open: {
      scaleX: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        repeat: Infinity,
        repeatType: "loop" as const, // Corrected to match expected type
      },
    },
    closed: {
      scaleX: 0,
      transition: {
        duration,
        ease: "easeIn",
        repeat: Infinity,
        repeatType: "loop" as const, // Corrected to match expected type
      },
    },
  };

  // Animation variants for the rhombus
  const rhombusVariants = {
    open: {
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.3,
      },
    },
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className={`flex justify-center items-center m-0 p-0 ${className}`}>
      {/* Left Rhombus */}
      <motion.div
        className="rotate-45"
        style={{
          width: rhombusSize,
          height: rhombusSize,
          backgroundColor: lineColor,
        }}
        variants={rhombusVariants}
        initial="closed"
        animate="open"
        viewport={{ once: true }} // Ensures animation only triggers once, loop controlled by the repeat setting
      />

      {/* Line */}
      <motion.div
        className="h-[2px] origin-center"
        style={{ width: lineWidth, backgroundColor: lineColor }}
        variants={lineVariants}
        initial="closed"
        animate="open"
        viewport={{ once: true }} // Ensures animation only triggers once, loop controlled by the repeat setting
      />

      {/* Right Rhombus */}
      <motion.div
        className="rotate-45"
        style={{
          width: rhombusSize,
          height: rhombusSize,
          backgroundColor: lineColor,
        }}
        variants={rhombusVariants}
        initial="closed"
        animate="open"
        viewport={{ once: true }} // Ensures animation only triggers once, loop controlled by the repeat setting
      />
    </div>
  );
};
