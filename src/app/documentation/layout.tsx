import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation for Utilso - Complete Tool Guides & Tutorials",
  description:
    "Comprehensive documentation for Utilso tools. Learn how to use word counter, image compressor, PDF merger, CSV converter, HTML minifier, and more. Step-by-step guides, tips, best practices, and FAQs for every tool.",
  keywords: [
    "utilso documentation",
    "documentation for utilso",
    "utilso guides",
    "utilso tutorials",
    "utilso how to",
    "utilso help",
    "word counter guide",
    "image compressor tutorial",
    "PDF merger documentation",
    "CSV converter guide",
    "HTML minifier tutorial",
    "utilso tool documentation",
  ],
  openGraph: {
    title: "Documentation for Utilso - Complete Tool Guides & Tutorials",
    description:
      "Comprehensive guides for every Utilso tool. Learn how to use each tool effectively, discover best practices, and troubleshoot common issues.",
    url: "/documentation",
    type: "website",
  },
  twitter: {
    title: "Documentation for Utilso",
    description: "Comprehensive guides for every Utilso tool.",
  },
  alternates: {
    canonical: "/documentation",
  },
};

export default function DocumentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
