import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import Layout from "@/components/Layout";
import "@/app/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://utilso.spdic.com",
  ),
  title: {
    default: "Utilso - Simple, Privacy-First Online Tools",
    template: "%s | Utilso",
  },
  description:
    "Free online tools for text, images, PDFs, data, and web development. All tools work instantly in your browser with zero uploads. Privacy-first, open-source utilities.",
  keywords: [
    "online tools",
    "free file converter",
    "privacy-first utilities",
    "text analysis tools",
    "image optimization",
    "PDF editor online",
    "browser-based data tools",
    "web developer utilities",
  ],
  authors: [{ name: "Utilso", url: "https://utilso.spdic.com" }],
  creator: "Utilso",
  publisher: "Utilso",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Utilso",
    title: "Utilso - Clear digital problems instantly",
    description:
      "All-in-one browser toolkit: Convert, optimize, and clean your files without leaving your browser. 100% private, no accounts required.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Utilso - The Ultimate Browser Toolkit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Utilso - Professional Digital Tools",
    description: "Fix files, clean data, convert formats — without friction.",
    images: ["/og-image.png"],
    creator: "@utilso_app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

import { AuthProvider } from "@/hooks/use-auth";
import { GlobalUIProvider } from "@/components/GlobalUIProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="light" storageKey="utilso-theme">
          <AuthProvider>
            <GlobalUIProvider>
              <Layout>{children}</Layout>
              <Toaster position="top-right" closeButton />
            </GlobalUIProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
