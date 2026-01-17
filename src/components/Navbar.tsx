"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, Moon, Sun, LogIn } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useTheme } from './ThemeProvider';

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Navbar({ sidebarOpen, setSidebarOpen }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const navLinks = [
    { name: 'Tools', path: '/' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Documentation', path: '/documentation' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-card border-b border-border">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section */}
        <div className="flex items-center gap-6">
          {/* Sidebar Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hover:bg-muted"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold text-foreground">ClearIt</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <Button
                  variant="ghost"
                  className={`${
                    pathname === link.path
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Global Search */}
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search tools..."
              className="pl-10 w-64 bg-muted/50 border-border focus:bg-background"
            />
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="hover:bg-muted"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          {/* Auth Buttons */}
          <Button variant="ghost" className="gap-2">
            <LogIn className="h-4 w-4" />
            Login
          </Button>
          <Button className="bg-primary hover:bg-primary-hover">
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
}
