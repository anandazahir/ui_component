"use client";

import { motion } from "framer-motion";

import { UnderlineSpan } from "@/components/ui/UnderlineSpan";
import { RotatingLetter } from "@/components/ui/RotatingLetter";
import { Book, Star } from "lucide-react";

import Link from "next/link";

export default function Hero() {
  const text = "Tailwind CSS and TypeScript.";

  return (
    <div className="text-center py-10 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl  font-bold mb-3 font-helvetica">
            Elevate your next project with handcrafted, homegrown components
            built using
            <br />
            {text.split("").map((letter, index) => (
              <RotatingLetter key={index} letter={letter} />
            ))}
          </h1>
          <p className="text-neutral-500 mb-6 text-sm sm:text-lg font-helvetica px-4 sm:px-0 dark:text-neutral-400">
            This collection of{" "}
            <UnderlineSpan className="cursor-pointer"> Next.js</UnderlineSpan>{" "}
            components is designed to be{" "}
            <UnderlineSpan className="cursor-pointer">simple</UnderlineSpan>,
            <UnderlineSpan className="cursor-pointer">clean</UnderlineSpan> ,
            and{" "}
            <UnderlineSpan className="cursor-pointer">
              easy to integerate
            </UnderlineSpan>
            . Feel free to use these personal components to enhance your
            development workflow!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <Link
            className="rounded-full font-mono w-full sm:w-fit dark:bg-white bg-black dark:text-black text-white flex p-3 gap-2"
            href="https://github.com/anandazahir/ui_component"
          >
            <Book />
            Read the Docs
          </Link>
          <Link
            className="rounded-full font-mono w-full sm:w-fit dark:bg-white bg-black dark:text-black text-white flex p-3 gap-2"
            href="https://github.com/anandazahir/ui_component"
          >
            <Star />
            Star on Github
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
