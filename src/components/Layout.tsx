"use client";

import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { FeatureFlagBanner } from "./FeatureFlagBanner";
import { SearchOverlay } from "./SearchOverlay";
import { cn } from "@/lib/utils";
import { useGlobalUIStore } from "@/store/use-global-ui-store";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const { bannerVisible } = useGlobalUIStore();

  React.useEffect(() => {
    setIsMounted(true);
    // Open sidebar by default on desktop
    if (window.innerWidth >= 1024) {
      setSidebarOpen(true);
    }
  }, []);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Global Overlays */}
      <SearchOverlay />

      {/* Top Navbar - Full Width, Always Visible */}
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Fixed Sticky Banner - Always at the top, respects sidebar */}
      <FeatureFlagBanner sidebarOpen={sidebarOpen} />

      <div className="flex pt-16 min-h-[calc(100vh-4rem)]">
        {/* Sidebar Overlay Backdrop (Mobile only) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden animate-in fade-in duration-300"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} />

        {/* Main Content */}
        <main
          className={cn(
            "flex-1 transition-all duration-300 min-w-0 w-full relative",
            sidebarOpen ? "lg:ml-64" : "lg:ml-16 ml-0",
          )}
        >
          <div
            className={cn(
              "px-4 md:px-8 max-w-[1440px] mx-auto transition-all duration-500",
              bannerVisible ? "pt-12 md:pt-14" : "pt-4 md:pt-8",
            )}
          >
            <div className="pb-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
