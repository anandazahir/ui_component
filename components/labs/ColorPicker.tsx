"use client";

import React, { useState, useEffect } from "react";
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
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState<string>(value);

  // Update color if `value` prop changes
  useEffect(() => {
    setColor(value);
  }, [value]);

  const handleSelectColor = (selected: string) => {
    setColor(selected); // Update the color state
    setIsOpen(false); // Close the popover
  };

  const selectedColor =
    colorOptions.find((colorOption) => colorOption.value === color) ||
    colorOptions[0];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className="w-[200px] justify-between relative z-10"
        >
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full ${selectedColor.value}`} />
            {selectedColor.name}
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <div className="grid grid-cols-5 gap-1 p-2">
          {colorOptions.map((colorOption) => (
            <Button
              key={colorOption.value}
              className={`w-8 h-8 rounded-full dark:${colorOption.value} ${colorOption.value} hover:scale-110 transition-transform`}
              onClick={() => handleSelectColor(colorOption.value)}
            >
              {colorOption.value === color && (
                <Check className="h-4 w-4 text-white" />
              )}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
