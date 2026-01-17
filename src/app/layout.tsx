import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import Layout from "@/components/Layout";
import "@/app/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://clearit.spdic.com'),
  title: {
    default: "ClearIt - Clear digital problems instantly",
    template: "%s | ClearIt"
  },
  description: "Fix files, clean data, convert formats — without friction. Free online tools for text, images, PDFs, data, and web development.",
  keywords: [
    "online tools",
    "file converter",
    "text tools",
    "image compressor",
    "PDF tools",
    "data converter",
    "web tools",
    "free tools",
    "browser tools",
    "privacy-first tools"
  ],
  authors: [{ name: "ClearIt" }],
  creator: "ClearIt",
  publisher: "ClearIt",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://clearit.spdic.com',
    siteName: "ClearIt",
    title: "ClearIt - Clear digital problems instantly",
    description: "Fix files, clean data, convert formats — without friction. Free online tools for text, images, PDFs, data, and web development.",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ClearIt - Digital Tools',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClearIt - Clear digital problems instantly",
    description: "Fix files, clean data, convert formats — without friction.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="light" storageKey="clearit-theme">
          <Layout>{children}</Layout>
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
