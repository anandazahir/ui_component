"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have a utility file for `cn`
import { twMerge } from "tailwind-merge";

export const TextTransition = () => {
  const [textIndex, setTextIndex] = useState(0);

  // Array of texts to cycle through
  const texts = [
    "Front-End Developer",
    "Web Developer",
    "Graphic Designer",
    "Motion Designer",
  ];

  // Function to handle the transition to the next text
  const handleNextText = () => {
    setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
  };

  // Automatically cycle through texts every 5 seconds
  useEffect(() => {
    const interval = setInterval(handleNextText, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={twMerge(
        cn(
          "relative flex items-center justify-center h-full z-10 w-[100%]",
          "bg-transparent"
        )
      )}
    >
      <div className="relative w-full h-[10vh] overflow-hidden flex items-center justify-center">
        {/* Text Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={textIndex}
            className={twMerge(
              cn(
                "absolute w-fit text-center font-semibold",
                "text-[17px] sm:text-2xl dark:text-white font-custom z-10"
              )
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {texts[textIndex]}
          </motion.div>
        </AnimatePresence>

        {/* Box Animation */}
        <motion.div
          key={`box-${textIndex}`}
          className="absolute top-50 left-50 h-6 w-full bg-sky-400 z-20"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.5 }}
        />
      </div>
    </div>
  );
};
