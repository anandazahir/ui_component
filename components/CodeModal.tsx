"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  component: {
    name: string;
    code: string;
  } | null;
}

export default function CodeModal({
  isOpen,
  onClose,
  component,
}: CodeModalProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    if (component) {
      await navigator.clipboard.writeText(component.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!component) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="font-mono text-lg sm:text-xl">
            {component.name}
          </DialogTitle>
        </DialogHeader>
        <div className="relative flex-grow overflow-hidden rounded-lg bg-gray-500/50 ">
          <pre className="dark:bg-black/50 bg-white/50 p-5 rounded-lg overflow-x-auto overflow-y-auto max-h-[70vh] h-full font-mono text-xs sm:text-sm">
            <code>{component.code}</code>
          </pre>
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-0 right-5 hover:bg-white/10"
            onClick={copyToClipboard}
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
