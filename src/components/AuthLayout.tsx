"use client";

import * as React from "react";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export default function AuthLayout({
  children,
  title,
  description,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-[80vh] items-center justify-center p-2 sm:p-3 lg:p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          {/* <Link
            href="/"
            className="inline-block group transition-transform hover:scale-105"
          >
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shadow-xl shadow-primary/20 mb-4 group-hover:rotate-3 transition-transform">
                <span className="text-primary-foreground font-black text-4xl">
                  C
                </span>
              </div>
              <span className="text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-primary to-purple-600">
                ClearIt
              </span>
            </div>
          </Link> */}
          <h2 className="text-3xl font-bold tracking-tight text-foreground pt-4">
            {title}
          </h2>
          <p className="text-base text-muted-foreground max-w-sm mx-auto">
            {description}
          </p>
        </div>
        <div className="mt-8 bg-card p-8 rounded-xl border border-border shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
