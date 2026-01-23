"use client";

import React, { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useGlobalUIStore } from "@/store/use-global-ui-store";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

/**
 * SearchOverlay Component
 *
 * Provides a full-screen search experience for mobile users.
 * Features a backdrop blur and smooth animations.
 */
export function SearchOverlay() {
  const { searchOverlayOpen, setSearchOverlayOpen } = useGlobalUIStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOverlayOpen) {
      // Focus input when overlay opens
      setTimeout(() => inputRef.current?.focus(), 100);
      // Prevent body scroll
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [searchOverlayOpen]);

  if (!searchOverlayOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="max-w-3xl mx-auto px-6 pt-20 flex flex-col items-center">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-6 right-6 h-12 w-12 rounded-full hover:bg-muted"
          onClick={() => setSearchOverlayOpen(false)}
        >
          <X className="h-6 w-6" />
        </Button>

        {/* Search Header */}
        <div className="w-full text-center space-y-4 mb-12">
          <h2 className="text-3xl font-black tracking-tight text-foreground">
            Search Tools
          </h2>
          <p className="text-muted-foreground">
            Find the perfect tool for your digital problems
          </p>
        </div>

        {/* Large Search Input */}
        <div className="w-full relative animate-in slide-in-from-bottom-4 duration-500">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="What solution are you looking for?"
            className="h-16 pl-16 pr-6 text-xl rounded-2xl bg-muted/50 border-2 border-border focus:border-primary focus:bg-background transition-all"
          />
        </div>

        {/* Quick Results Placeholder */}
        <div className="w-full mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <p className="col-span-full text-sm font-semibold text-muted-foreground mb-2 text-center">
            POPULAR TOOLS
          </p>
          {[
            "Word Counter",
            "Image Compressor",
            "PDF Merger",
            "CSV Converter",
          ].map((tool) => (
            <div
              key={tool}
              className="p-4 rounded-xl bg-card border border-border hover:border-primary hover:bg-primary/5 cursor-pointer transition-all flex items-center justify-between group"
            >
              <span className="font-medium group-hover:text-primary">
                {tool}
              </span>
              <div className="h-2 w-2 rounded-full bg-primary/20 group-hover:bg-primary" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
