import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Documentation for ClearIt - Complete Tool Guides & Tutorials",
  description: "Comprehensive documentation for ClearIt tools. Learn how to use word counter, image compressor, PDF merger, CSV converter, HTML minifier, and more. Step-by-step guides, tips, best practices, and FAQs for every tool.",
  keywords: [
    "clearit documentation",
    "documentation for clearit",
    "clearit guides",
    "clearit tutorials",
    "clearit how to",
    "clearit help",
    "word counter guide",
    "image compressor tutorial",
    "PDF merger documentation",
    "CSV converter guide",
    "HTML minifier tutorial",
    "clearit tool documentation"
  ],
  openGraph: {
    title: "Documentation for ClearIt - Complete Tool Guides & Tutorials",
    description: "Comprehensive guides for every ClearIt tool. Learn how to use each tool effectively, discover best practices, and troubleshoot common issues.",
    url: "/documentation",
    type: "website",
  },
  twitter: {
    title: "Documentation for ClearIt",
    description: "Comprehensive guides for every ClearIt tool.",
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
