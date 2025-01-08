"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { twMerge } from "tailwind-merge";

const japaneseCharacters =
  "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";

interface RandomJapaneseTextProps {
  text: string;
  duration?: number;
  className?: string;
  useScroll?: boolean;
  loopDelay?: number;
}

export const RandomJapaneseText: React.FC<RandomJapaneseTextProps> = ({
  text,
  className = "",
  duration = 2,
  useScroll = false,
  loopDelay = 1000,
}) => {
  const [displayText, setDisplayText] = useState<string>(text);
  const isAnimatingRef = useRef<boolean>(false);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  const animateText = useCallback(() => {
    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    let iterations = 0;

    const interval = setInterval(() => {
      if (iterations > duration * 10) {
        clearInterval(interval);
        setDisplayText(text);
        isAnimatingRef.current = false;
        return;
      }

      const randomizedText = text
        .split("")
        .map((char) => {
          if (/[a-zA-Z0-9]/.test(char)) {
            return Math.random() < 0.5
              ? japaneseCharacters[
                  Math.floor(Math.random() * japaneseCharacters.length)
                ]
              : char;
          }
          return char;
        })
        .join("");

      setDisplayText(randomizedText);
      iterations++;
    }, 100);

    return () => clearInterval(interval);
  }, [text, duration]);

  useEffect(() => {
    if (!useScroll || (useScroll && !isInView)) return;

    const animationLoop = () => {
      animateText();
      animationTimeoutRef.current = setTimeout(
        animationLoop,
        duration * 1000 + loopDelay
      );
    };

    animationLoop();

    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      isAnimatingRef.current = false;
    };
  }, [useScroll, isInView, animateText, duration, loopDelay]);

  return (
    <motion.div
      ref={ref}
      className={twMerge(cn("inline-block text-2xl", className))}
      initial={{ opacity: useScroll ? 0 : 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayText}
    </motion.div>
  );
};
