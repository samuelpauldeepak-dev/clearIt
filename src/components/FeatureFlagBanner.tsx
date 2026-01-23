"use client";

import React from "react";
import { Shield, X } from "lucide-react";
import { useGlobalUIStore } from "@/store/use-global-ui-store";
import { cn } from "@/lib/utils";

/**
 * FeatureFlagBanner Component
 *
 * A sticky banner that appears to extend from the bottom of the navbar.
 * It features a curved, integrated design and is closable.
 */
export function FeatureFlagBanner({ sidebarOpen }: { sidebarOpen: boolean }) {
  const { bannerVisible, setBannerVisible } = useGlobalUIStore();

  if (!bannerVisible) return null;

  return (
    <div
      className={cn(
        "fixed top-16 right-0 z-40 px-2 md:px-8 pointer-events-none flex justify-center transition-all duration-300",
        sidebarOpen ? "lg:left-64 left-0" : "lg:left-16 left-0",
      )}
    >
      <div
        className={cn(
          "pointer-events-auto w-full max-w-[90%] md:max-w-max",
          "flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 pb-3",
          "bg-card border border-t-0 border-border shadow-lg",
          "rounded-b-[1.5rem] md:rounded-b-[2rem]",
          "animate-in slide-in-from-top duration-300",
          "relative",
        )}
      >
        {/* Curved connection piece left */}
        <div className="absolute -top-1 -left-4 w-4 h-4 bg-card">
          <div className="w-4 h-4 rounded-tr-xl bg-background border-r border-t border-border" />
        </div>

        {/* Curved connection piece right */}
        <div className="absolute -top-1 -right-4 w-4 h-4 bg-card">
          <div className="w-4 h-4 rounded-tl-xl bg-background border-l border-t border-border" />
        </div>

        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/20">
          <Shield className="h-4 w-4 text-primary" />
        </div>

        <p className="text-sm font-medium text-muted-foreground whitespace-nowrap">
          <span className="font-bold text-foreground">Usage Note:</span> dummy
          text of you have 5 most limit to use the tools
        </p>

        <button
          onClick={() => setBannerVisible(false)}
          className="ml-2 p-1 rounded-full hover:bg-muted text-muted-foreground transition-colors"
          aria-label="Close message"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
