"use client";

import React from "react";
import { motion } from "framer-motion";

export const RunningText: React.FC = () => {
  const words = Array(100).fill("Thank You"); // Create an array of 100 "Thank You" strings

  return (
    <div className="overflow-hidden bg-black py-3 dark:bg-white">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1920] }} // Animate from 0 to -1920px (standard screen width)
        transition={{
          x: {
            repeat: Infinity, // Loop infinitely
            repeatType: "loop",
            duration: 20, // Duration of one loop
            ease: "linear", // Smooth linear animation
          },
        }}
        whileHover={{ x: 0 }} // Stop animation on hover
        whileTap={{ x: 0 }} // Stop animation on tap
      >
        {words.map((word, index) => (
          <span
            key={index}
            className="mx-3 font-custom text-xl font-bold text-white dark:text-black"
          >
            {word}
          </span>
        ))}
      </motion.div>
    </div>
  );
};
