"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Search,
  Moon,
  Sun,
  LogIn,
  LogOut,
  CreditCard,
  User as UserIcon,
  Settings as SettingsIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useTheme } from "./ThemeProvider";
import { useAuth } from "@/hooks/use-auth";
import { useGlobalUIStore } from "@/store/use-global-ui-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

/**
 * Navigation Bar Component
 *
 * Provides top-level navigation, search, theme toggling, and sidebar control.
 * Supports light and dark modes via ThemeProvider.
 */
export default function Navbar({ sidebarOpen, setSidebarOpen }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const { setSearchOverlayOpen } = useGlobalUIStore();

  const navLinks = [
    { name: "Tools", path: "/" },
    { name: "Solutions", path: "/solutions" },
    { name: "Documentation", path: "/documentation" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-card border-b border-border">
      <div className="flex items-center justify-between h-full px-2 md:px-4">
        {/* Left Section */}
        <div className="flex items-center gap-2 md:gap-6">
          {/* Sidebar Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hover:bg-muted w-10 md:w-11 shrink-0"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            aria-expanded={sidebarOpen}
          >
            <Menu className="h-5 w-5 text-foreground" />
          </Button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-0 shrink-0">
            {/* <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">C</span>
            </div> */}
            <span className="text-xl md:text-2xl lg:text-3xl font-bold text-primary bg-gradient-to-t  tracking-tighter ">
              Utilso
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <Button
                  variant="ghost"
                  className={`${
                    pathname === link.path
                      ? "bg-muted text-foreground hover:text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-1 sm:gap-4">
          {/* Global Search - Desktop */}
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search tools..."
              className="pl-10 w-64 bg-muted/50 border-border focus:bg-background"
            />
          </div>

          {/* Mobile Search Trigger */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOverlayOpen(true)}
            className="lg:hidden hover:bg-muted"
            aria-label="Open search"
          >
            <Search className="h-5 w-5 text-foreground" />
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="hover:bg-muted"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5 text-foreground" />
            ) : (
              <Sun className="h-5 w-5 text-foreground" />
            )}
          </Button>

          {/* Auth Buttons */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="gap-2 px-1 md:px-2 h-10 group transition-all duration-200 hover:bg-primary/5 active:scale-95"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold transition-colors group-hover:bg-primary/20 group-hover:text-primary">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline-block text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {user.name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-2">
                <DropdownMenuLabel className="flex flex-col gap-1 px-2 py-3">
                  <span className="font-bold text-base">{user.name}</span>
                  <span className="text-xs text-muted-foreground font-normal">
                    {user.email}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="h-10 cursor-pointer">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 w-full"
                  >
                    <UserIcon className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="h-10 cursor-pointer">
                  <Link
                    href="/settings"
                    className="flex items-center gap-2 w-full"
                  >
                    <SettingsIcon className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="h-10 text-destructive hover:!text-white hover:!bg-destructive focus:text-destructive cursor-pointer flex items-center gap-2"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-1 sm:gap-2">
              <Link href="/login" onClick={() => setSidebarOpen(false)}>
                <Button
                  variant="secondary"
                  size="sm"
                  className="gap-2 px-3 h-9 sm:h-10 text-xs sm:text-sm"
                >
                  <LogIn className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  <span className="hidden sm:inline">Login</span>
                </Button>
              </Link>
              <Link href="/signup" onClick={() => setSidebarOpen(false)}>
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary-hover px-3 sm:px-4 h-9 sm:h-10 text-xs sm:text-sm"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
