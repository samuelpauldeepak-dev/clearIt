import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import Layout from "@/components/Layout";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "ClearIt - Clear digital problems instantly",
  description: "Fix files, clean data, convert formats — without friction.",
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
