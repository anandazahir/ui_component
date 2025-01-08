import { Button3D } from "@/components/labs/Button3D";
import { AnimatedButton } from "@/components/labs/AnimatedButton";
import { Divider } from "@/components/labs/Divider";
import { Form } from "@/components/labs/Form";
import { RandomJapaneseText } from "@/components/labs/RandomTextTransition";
import { TextTransition } from "@/components/labs/TextTransition";
import { ColorPicker } from "@/components/labs/ColorPicker";
import { RunningText } from "@/components/labs/RunningText";

interface Component {
  id: number;
  name: string;
  size: string;
  component: React.ReactNode;
  code: string;
}

const components: Component[] = [
  {
    id: 1,
    name: "3D Button",
    size: "regular-card",
    component: <Button3D>Nanda</Button3D>,
    code: `
"use client";
import React, { ReactNode } from "react";

interface Button3DProps {
  children: ReactNode; 
}

export const Button3D: React.FC<Button3DProps> = ({ children }) => {
  return (
    <div className="relative w-fit group">
      <button className="z-20 relative rounded-md font-mono p-3 border-4 transition-transform duration-200 dark:bg-black bg-white text-black dark:text-white dark:border-white border-black group-hover:translate-y-1 group-hover:translate-x-1 group-focus:translate-y-1 group-focus:translate-x-1">
        {children}
      </button>
      <div className="absolute w-full h-full top-2 left-2 z-0 rounded-md transition-all duration-200 dark:bg-white bg-black scale-x-[1.0] group-hover:top-2 group-hover:scale-x-[1.0] group-focus:top-1 group-focus:left-1"></div>
    </div>
  );
};
`,
  },
  {
    id: 2,
    name: "Animated Button",
    size: "regular-card",
    component: (
      <AnimatedButton
        className="dark:bg-white p-3 font-mono"
        classNameText="text-black"
      >
        Animated Button
      </AnimatedButton>
    ),
    code: `
"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { twMerge } from "tailwind-merge";
import { useState, useEffect } from "react";

interface AnimatedButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  classNameText?: string;
  variants?: any;
  isActive?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  onClick,
  children,
  className = "",
  classNameText = "",
  variants,
  isActive = false,
}) => {
  const [isActiveState, setIsActiveState] = useState(isActive);

  useEffect(() => {
    setIsActiveState(isActive);
  }, [isActive]);

  const buttonClasses = twMerge(
    cn("relative p-3 text-white rounded-md cursor-pointer", className)
  );

  const textClasses = twMerge(
    cn("relative z-10", classNameText, {
      "text-slate-800": isActiveState,
      "text-white": !isActiveState,
    })
  );

  return (
    <motion.button
      className={buttonClasses}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      variants={variants}
    >
      <motion.div
        className="absolute inset-0 bg-sky-400 z-0"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isActiveState ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ originX: isActiveState ? 0 : 1, borderRadius: "0.375rem" }}
      />
      <motion.span
        className={textClasses}
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
};
`,
  },
  {
    id: 3,
    name: "Divider",
    size: "regular-card",
    component: <Divider lineColor="white" />,
    code: `
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
  duration = 0.6,
  className,
}) => {
  const lineVariants = {
    open: {
      scaleX: 1,
      transition: { duration, ease: "easeOut" },
    },
    closed: {
      scaleX: 0,
      transition: { duration, ease: "easeIn" },
    },
  };

  const rhombusVariants = {
    open: {
      opacity: 1,
      transition: { delay: 0.3, duration: 0.3 },
    },
    closed: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className={\`flex justify-center items-center m-0 p-0 \${className}\`}>
      <motion.div
        className="rotate-45"
        style={{
          width: rhombusSize,
          height: rhombusSize,
          backgroundColor: lineColor,
        }}
        variants={rhombusVariants}
        initial="closed"
        whileInView="open"
        viewport={{ once: true }}
      />
      <motion.div
        className="h-[2px] origin-center"
        style={{ width: lineWidth, backgroundColor: lineColor }}
        variants={lineVariants}
        initial="closed"
        whileInView="open"
        viewport={{ once: true }}
      />
      <motion.div
        className="rotate-45"
        style={{
          width: rhombusSize,
          height: rhombusSize,
          backgroundColor: lineColor,
        }}
        variants={rhombusVariants}
        initial="closed"
        whileInView="open"
        viewport={{ once: true }}
      />
    </div>
  );
};
`,
  },
  {
    id: 4,
    name: "Form",
    size: "medium-card",
    component: <Form />,
    code: `
"use client";

import React, { useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion"; // Import Framer Motion

interface FormData {
  fullName: string;
  email: string;
  message: string;
}

interface FormErrors {
  fullName: string;
  email: string;
  message: string;
}

export const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    fullName: "",
    email: "",
    message: "",
  });

  // Animasi untuk border
  const fullNameBorderControls = useAnimation();
  const emailBorderControls = useAnimation();
  const messageBorderControls = useAnimation();

  // State untuk animasi tombol
  const [isClicked, setIsClicked] = useState(false);

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = { fullName: "", email: "", message: "" };

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Trigger button animation
      setIsClicked(true);

      // Simulate form submission (e.g., API call)
      setTimeout(() => {
        // Clear form data
        setFormData({ fullName: "", email: "", message: "" });
        // Show success toast

        // Reset button animation after 2 seconds
        setTimeout(() => setIsClicked(false), 100);
      }, 700); // Simulate a delay for the API call
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
        noValidate
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="col-span-1 md:col-span-2">
          <div className="relative">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              onFocus={() => fullNameBorderControls.start({ scaleX: 1 })}
              onBlur={() => fullNameBorderControls.start({ scaleX: 0 })}
              className="w-full px-3 py-2 bg-transparent border-t-0 border-r-0 border-l-0 dark:text-white border-b-2 border-gray-700 focus:outline-none rounded-[0px]"
            />
            <motion.div
              className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-400 origin-left"
              initial={{ scaleX: 0 }} // Start with no width
              animate={fullNameBorderControls} // Control animation
              transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth transition
            />
          </div>
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {" "}
              <i className="fa-solid fa-triangle-exclamation mr-2"></i>
              {errors.fullName}
            </p>
          )}
        </div>
        <div className="col-span-1 md:col-span-2">
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => emailBorderControls.start({ scaleX: 1 })}
              onBlur={() => emailBorderControls.start({ scaleX: 0 })}
              className="w-full px-3 py-2 bg-transparent border-t-0 border-r-0 border-l-0 dark:text-white border-b-2 border-gray-700 focus:outline-none rounded-[0px]"
            />
            <motion.div
              className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-400 origin-left"
              initial={{ scaleX: 0 }} // Start with no width
              animate={emailBorderControls} // Control animation
              transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth transition
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              <i className="fa-solid fa-triangle-exclamation mr-2"></i>
              {errors.email}
            </p>
          )}
        </div>
        <div className="col-span-1 md:col-span-2">
          <div className="relative">
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => messageBorderControls.start({ scaleX: 1 })}
              onBlur={() => messageBorderControls.start({ scaleX: 0 })}
              className="w-full px-3 py-2 bg-transparent border-t-0 border-r-0 border-l-0 dark:text-white border-b-2 border-gray-700 focus:outline-none h-32 resize-none rounded-[0px]"
            />
            <motion.div
              className="absolute bottom-2 left-0 w-full h-0.5 bg-sky-400 origin-left"
              initial={{ scaleX: 0 }} // Start with no width
              animate={messageBorderControls} // Control animation
              transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth transition
            />
          </div>
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">
              <i className="fa-solid fa-triangle-exclamation mr-2"></i>
              {errors.message}
            </p>
          )}
        </div>
        <div className="col-span-1 md:col-span-2 w-fit place-self-end">
          <button
            type="submit"
            className="w-full bg-gray-500 hover:bg-sky-400 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out flex gap-2 items-center overflow-hidden"
          >
            {/* Paper Icon */}
            <motion.img
              src="paper.svg"
              alt=""
              className="w-6 h-6"
              animate={{
                x: isClicked ? "100%" : 0, // Move to the right
                opacity: isClicked ? 0 : 1,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />

            {/* Text */}
            <AnimatePresence>
              {!isClicked && (
                <motion.span
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Send Message
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </form>
    </>
  );
}; `,
  },
  {
    id: 5,
    name: "Random Text Transition",
    size: "regular-card",
    component: (
      <RandomJapaneseText
        text="Hello World"
        duration={3}
        useScroll={true}
        loopDelay={2000}
        className="text-[20rem]"
      />
    ),
    code: `"use client";

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
      className={twMerge(cn("inline-block", className))}
      initial={{ opacity: useScroll ? 0 : 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayText}
    </motion.div>
  );
};
`,
  },
  {
    id: 6,
    name: "Text Transition",
    size: "regular-card",
    component: <TextTransition />,
    code: `"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";  
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
          "relative flex items-center justify-center h-full",
          "w-[66vw] max-[400px]:w-[65vw] md:w-[50vw] lg:w-[35vw] xl:w-[35vw] 2xl:w-[35vw]",
          "bg-transparent"
        )
      )}
    >
      <div className="relative w-full h-full overflow-hidden">
        {/* Text Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={textIndex}
            className={twMerge(
              cn(
                "absolute w-fit text-center font-semibold",
                "text-[17px] sm:text-2xl text-gray-600 font-custom z-10"
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
          key={\`box-\${textIndex}\`}
          className="absolute top-0 left-0 h-6 w-full bg-sky-400 z-20"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.5 }}
        />
      </div>
    </div>
  );
};
`,
  },
  {
    id: 7,
    name: "Color Picker",
    size: "regular-card",
    component: <ColorPicker value="bg-slate-400" />,
    code: `
"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";

interface ColorOption {
  name: string;
  value: string;
}

const colorOptions: ColorOption[] = [
  { name: "Slate", value: "bg-slate-500" },
  { name: "Gray", value: "bg-gray-500" },
  { name: "Zinc", value: "bg-zinc-500" },
  { name: "Neutral", value: "bg-neutral-500" },
  { name: "Stone", value: "bg-stone-500" },
  { name: "Red", value: "bg-red-500" },
  { name: "Orange", value: "bg-orange-500" },
  { name: "Amber", value: "bg-amber-500" },
  { name: "Yellow", value: "bg-yellow-500" },
  { name: "Lime", value: "bg-lime-500" },
  { name: "Green", value: "bg-green-500" },
  { name: "Emerald", value: "bg-emerald-500" },
  { name: "Teal", value: "bg-teal-500" },
  { name: "Cyan", value: "bg-cyan-500" },
  { name: "Sky", value: "bg-sky-500" },
  { name: "Blue", value: "bg-blue-500" },
  { name: "Indigo", value: "bg-indigo-500" },
  { name: "Violet", value: "bg-violet-500" },
  { name: "Purple", value: "bg-purple-500" },
  { name: "Fuchsia", value: "bg-fuchsia-500" },
  { name: "Pink", value: "bg-pink-500" },
  { name: "Rose", value: "bg-rose-500" },
];

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectColor = (color: ColorOption) => {
    onChange(color.value); // Pass the selected color to the parent
    setIsOpen(false); // Close the popover
  };

  const selectedColor =
    colorOptions.find((color) => color.value === value) || colorOptions[0];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className="w-[200px] justify-between"
        >
          <div className="flex items-center gap-2">
            {/* Display the selected color */}
            <div
              className={\`w-4 h-4 rounded-full \${selectedColor.value}\`}
              style={{ backgroundColor: selectedColor.value }}
            />
            {selectedColor.name} {/* Display the name of the selected color */}
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <div className="grid grid-cols-5 gap-1 p-2">
          {colorOptions.map((color) => (
            <Button
              key={color.value}
              className={\`w-8 h-8 rounded-full dark:\${color.value} \${color.value} hover:scale-110 transition-transform\`}
              onClick={() => handleSelectColor(color)}
            >
              {/* If color is selected, show the check icon */}
              {color.value === value && (
                <Check className="h-4 w-4 text-white" />
              )}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};    
`,
  },
  {
    id: 8,
    name: "Running Text",
    size: "last-card",
    component: <RunningText />,
    code: `
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
    `,
  },
];

export default components;
