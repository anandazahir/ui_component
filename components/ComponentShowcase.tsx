"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import CodeModal from "./CodeModal";
import components from "@/lib/component";

const size: { [key: string]: string } = {
  "regular-card": "row-span-1 col-span-1 ",
  "medium-card": "row-span-2 sm:col-span-2 ",
  "last-card": "sm:col-span-2 col-span-1 ",
};
export default function ComponentShowcase() {
  const [selectedComponent, setSelectedComponent] = useState<
    (typeof components)[0] | null
  >(null);

  return (
    <>
      <div className="grid grid-cols-1  sm:grid-cols-3 sm:grid-rows-3 gap-4 sm:gap-6 py-8 sm:py-16 ">
        {components.map((component, index) => (
          <motion.div
            key={component.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.4 }}
            className={`group ${size[component.size]}`}
          >
            <Card className="relative bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-black border-neutral-200/50 from-white via-gray-400 to-white  overflow-hidden h-full dark:border-neutral-800/50">
              <div className="absolute z-0 inset-0 bg-gradient-to-br from-sky-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <CardContent className="flex items-center justify-center min-h-[120px] sm:min-h-[200px]">
                {component.component}
              </CardContent>

              <CardFooter className=" relative  flex justify-between gap-10 z-20">
                <CardTitle className="font-mono text-lg sm:text-xl">
                  {component.name}
                </CardTitle>
                <Button
                  size="sm"
                  variant="ghost"
                  className="font-mono text-xs sm:text-sm group-hover:opacity-100  transition-opacity opacity-100 sm:opacity-0"
                  onClick={() => setSelectedComponent(component)}
                >
                  View Code
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
      <CodeModal
        isOpen={!!selectedComponent}
        onClose={() => setSelectedComponent(null)}
        component={selectedComponent}
      />
    </>
  );
}
