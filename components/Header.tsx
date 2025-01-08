"use client";

import { MoonIcon, SunIcon } from "lucide-react";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Switch } from "@/components/ui/switch";

export default function Header() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    console.log("Toggling theme. Current theme:", theme);
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return null;
  }

  return (
    <header className="border-b border-neutral-200/40 dark:border-neutral-800/40">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.a
          className="text-2xl font-bold font-mono dark:hover:text-sky-400 hover:text-sky-400 cursor-pointer "
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          href="/"
        >
          UI
        </motion.a>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Switch
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
              aria-label="Toggle dark mode"
            />
            <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </div>
        </div>
      </div>
    </header>
  );
}
