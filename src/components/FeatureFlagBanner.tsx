"use client";

import React from "react";
import { Shield, X } from "lucide-react";
import { useGlobalUIStore } from "@/store/use-global-ui-store";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

/**
 * FeatureFlagBanner Component
 *
 * Styled as a seamless extension of the Navbar.
 * Supports tooltips for truncated content on mobile.
 */
export function FeatureFlagBanner({ sidebarOpen }: { sidebarOpen: boolean }) {
  const { bannerVisible, setBannerVisible } = useGlobalUIStore();
  const [isOverflowing, setIsOverflowing] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const textRef = React.useRef<HTMLButtonElement>(null);

  const message = "You have 5 most limit to use the tools";

  const checkOverflow = () => {
    if (textRef.current) {
      const isOver = textRef.current.scrollWidth > textRef.current.clientWidth;
      setIsOverflowing(isOver);
      return isOver;
    }
    return false;
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      const over = checkOverflow();
      if (over) setOpen(true);
    } else {
      setOpen(false);
    }
  };

  if (!bannerVisible) return null;

  return (
    <TooltipProvider delayDuration={100}>
      <div
        className={cn(
          "fixed top-16 right-0 z-[40] px-4 md:px-8 pointer-events-none flex justify-center transition-all duration-300",
          sidebarOpen ? "lg:left-64 left-0" : "lg:left-16 left-0",
        )}
      >
        <div
          className={cn(
            "pointer-events-auto flex items-center gap-3 md:gap-4 px-4 md:px-7 py-2",
            "bg-card/95 backdrop-blur-xl border border-t-0 border-border shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
            "rounded-b-[2rem] w-fit max-w-[95%] ",
            "relative transition-all duration-300 group/banner",
          )}
        >
          {/* Top connection glow - creates a seamless visual link to the navbar */}
          <div className="absolute inset-x-8 -top-px h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent blur-[1px]" />

          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 shrink-0 shadow-inner group-hover/banner:scale-110 transition-transform duration-300">
            <Shield className="h-3.5 w-3.5 text-primary" />
          </div>

          <Tooltip open={open} onOpenChange={handleOpenChange}>
            <TooltipTrigger asChild>
              <button
                ref={textRef}
                onMouseEnter={checkOverflow}
                className={cn(
                  "text-sm font-medium text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis flex-1 min-w-0 outline-none transition-colors text-left",
                  isOverflowing
                    ? "cursor-help hover:text-foreground focus:text-foreground"
                    : "cursor-default",
                )}
                aria-label={
                  isOverflowing ? `Usage note: ${message}` : undefined
                }
              >
                <span className="font-bold text-primary mr-1">Note:</span>
                <span className="text-foreground/80">{message}</span>
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              sideOffset={15}
              className="w-[320px] max-w-[95vw] text-center bg-card/98 backdrop-blur-2xl border border-primary/20 text-foreground shadow-2xl z-[100] p-3 rounded-2xl animate-in fade-in zoom-in-95 duration-200"
            >
              <div className="flex items-start gap-3 text-left">
                <div className="p-1.5 rounded-lg bg-primary/10 shrink-0">
                  <Shield className="h-3.5 w-3.5 text-primary" />
                </div>
                <p className="font-medium text-[13px] leading-relaxed tracking-tight">
                  {message}
                </p>
              </div>
            </TooltipContent>
          </Tooltip>

          <div className="flex items-center">
            <div className="h-4 w-px bg-border/40 mx-1 md:mx-2" />
            <button
              onClick={() => setBannerVisible(false)}
              className="p-1 rounded-full hover:bg-destructive/10 hover:text-destructive text-muted-foreground/60 transition-all duration-300 hover:rotate-90 shrink-0"
              aria-label="Close message"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
