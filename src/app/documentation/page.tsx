"use client";

import React, { useState } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Search,
  BookOpen,
  AlertCircle,
  CheckCircle2,
  Info,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

// Note: Since this is a client component, metadata is handled via layout or head
// For now, we'll add it via a separate metadata export in a layout file

interface Documentation {
  id: string;
  category: string;
  title: string;
  overview: string;
  whenToUse: string[];
  usage: Array<{ step: string; detail: string }>;
  tips: string[];
  limitations: string[];
  faqs: Array<{ question: string; answer: string }>;
}

const documentation: Documentation[] = [
  {
    id: "word-counter",
    category: "text",
    title: "Word Counter",
    overview:
      "The Word Counter tool provides instant, accurate statistics about your text content, including word count, character count, sentence count, and reading time estimates.",
    whenToUse: [
      "Meeting specific word count requirements for articles or assignments",
      "Analyzing content length for SEO optimization",
      "Tracking writing progress on long-form content",
      "Ensuring text fits within character limits for social media or ads",
    ],
    usage: [
      {
        step: "Navigate to Text Tools > Word Counter",
        detail: "Access the tool from the main menu or category page",
      },
      {
        step: "Upload a text file or paste content",
        detail: "Supports .txt, .doc, and .docx files, or paste directly",
      },
      {
        step: "View instant statistics",
        detail:
          "See word count, character count (with/without spaces), sentences, and paragraphs",
      },
      {
        step: "Adjust settings if needed",
        detail: "Toggle space counting or punctuation analysis",
      },
    ],
    tips: [
      'Use the "Include spaces" toggle to match different word count standards',
      "The reading time estimate assumes 200 words per minute average reading speed",
      "Character count excludes formatting when pasting from rich text documents",
    ],
    limitations: [
      "Very large files (>10MB) may take longer to process",
      "Some non-Latin scripts may have different word boundary detection",
    ],
    faqs: [
      {
        question: "Does the word count include punctuation?",
        answer:
          "No, punctuation marks are not counted as words. However, you can enable a separate punctuation count in the settings.",
      },
      {
        question: "How accurate is the reading time estimate?",
        answer:
          "The estimate is based on an average reading speed of 200 words per minute. Actual reading time varies based on content complexity and reader proficiency.",
      },
    ],
  },
  {
    id: "image-compressor",
    category: "image",
    title: "Image Compressor",
    overview:
      "The Image Compressor reduces image file sizes while maintaining visual quality, perfect for web optimization and faster page loads.",
    whenToUse: [
      "Optimizing images for website performance",
      "Reducing file sizes for email attachments",
      "Meeting upload size limits on various platforms",
      "Preparing images for mobile app distribution",
    ],
    usage: [
      {
        step: "Navigate to Image Tools > Image Compressor",
        detail: "Select from the category page",
      },
      {
        step: "Upload your image(s)",
        detail: "Drag and drop or browse for .jpg, .png, or .webp files",
      },
      {
        step: "Adjust compression quality",
        detail:
          "Use the slider to balance file size and quality (80% recommended)",
      },
      {
        step: "Process and download",
        detail: 'Click "Process File" and download your optimized image',
      },
    ],
    tips: [
      "Start with 80% quality for a good balance between size and visual fidelity",
      "Use WebP format for maximum compression with modern browsers",
      "Preview the compressed image before downloading to ensure quality",
      "Batch process multiple images by uploading them together",
    ],
    limitations: [
      "Maximum individual file size is limited by browser memory (typically ~500MB)",
      'Some metadata may be lost unless "Preserve metadata" is enabled',
      "Animated images are processed as static images",
    ],
    faqs: [
      {
        question: "What quality setting should I use?",
        answer:
          "80% is ideal for most web images. Use 90-95% for professional photography, and 60-70% for thumbnails or less critical images.",
      },
      {
        question: "Will compressing reduce image dimensions?",
        answer:
          "No, compression reduces file size without changing dimensions. Use the Image Resizer tool if you need to change dimensions.",
      },
      {
        question: "Is the compression lossy or lossless?",
        answer:
          "The compression is lossy for JPEG and WebP formats, meaning some quality is traded for smaller file size. PNG compression can be lossless at 100% quality.",
      },
    ],
  },
  {
    id: "pdf-merger",
    category: "pdf",
    title: "PDF Merger",
    overview:
      "Combine multiple PDF documents into a single file with customizable page ordering and optional bookmarks.",
    whenToUse: [
      "Combining multiple report sections into one document",
      "Merging scanned pages into a single file",
      "Creating comprehensive documentation from separate PDFs",
      "Preparing materials for distribution or printing",
    ],
    usage: [
      {
        step: "Navigate to PDF Tools > PDF Merger",
        detail: "Access from the category menu",
      },
      {
        step: "Upload PDF files",
        detail: "Add multiple PDF files in the order you want them merged",
      },
      {
        step: "Reorder if needed",
        detail: "Drag files to reorder them before merging",
      },
      {
        step: "Configure settings",
        detail: "Enable bookmarks or page numbers if desired",
      },
      {
        step: "Merge and download",
        detail: "Process the files and download your merged PDF",
      },
    ],
    tips: [
      "Enable bookmarks to create a table of contents for easy navigation",
      "Add page numbers to maintain continuity across merged documents",
      "Preview the order before merging to avoid re-processing",
      "You can merge PDFs of different page sizes and orientations",
    ],
    limitations: [
      "Password-protected PDFs must be unlocked before merging",
      "Very large PDFs (>100MB each) may take longer to process",
      "Form fields in source PDFs may not be preserved",
    ],
    faqs: [
      {
        question: "Can I merge password-protected PDFs?",
        answer:
          "No, PDFs must be unlocked before merging. Remove the password protection first, then merge the files.",
      },
      {
        question: "Will the file size increase significantly?",
        answer:
          "The merged PDF size is approximately the sum of individual file sizes. Some overhead may be added for bookmarks and metadata.",
      },
      {
        question: "Can I select specific pages from each PDF?",
        answer:
          "Currently, the merger combines entire PDFs. Use the PDF Splitter first to extract specific pages, then merge those extracted files.",
      },
    ],
  },
  {
    id: "csv-converter",
    category: "data",
    title: "CSV Converter",
    overview:
      "Convert CSV files to JSON, XML, or Excel formats with support for custom delimiters and header detection.",
    whenToUse: [
      "Converting spreadsheet data for API consumption",
      "Transforming data exports into different formats",
      "Preparing data for import into other systems",
      "Converting between database export formats",
    ],
    usage: [
      {
        step: "Navigate to Data Tools > CSV Converter",
        detail: "Select from the data tools category",
      },
      {
        step: "Upload your CSV file",
        detail: "Support for .csv and .tsv files",
      },
      {
        step: "Configure delimiter and headers",
        detail:
          "Select the correct delimiter and specify if the first row contains headers",
      },
      {
        step: "Choose output format",
        detail: "Select JSON, XML, or Excel as your target format",
      },
      {
        step: "Convert and download",
        detail: "Process the file and download in your chosen format",
      },
    ],
    tips: [
      "Ensure the correct delimiter is selected for accurate parsing",
      'Enable "First row as headers" for better JSON/XML structure',
      "Preview the output structure before downloading large files",
      "Use JSON format for web API integration",
    ],
    limitations: [
      "Files larger than 50MB may take longer to process",
      "Complex nested structures cannot be represented in CSV",
      "Date formats are preserved as-is without conversion",
    ],
    faqs: [
      {
        question: "What if my CSV uses a non-standard delimiter?",
        answer:
          "You can select from common delimiters (comma, tab, semicolon, pipe) in the settings. If you need a custom delimiter, contact support.",
      },
      {
        question: "Will data types be preserved in JSON output?",
        answer:
          "All values are treated as strings by default. Numbers and booleans must be parsed by your application if needed.",
      },
      {
        question: "Can I convert back from JSON to CSV?",
        answer:
          "Yes, the converter works bidirectionally. Upload a JSON file and select CSV as the output format.",
      },
    ],
  },
  {
    id: "html-minifier",
    category: "web",
    title: "HTML Minifier",
    overview:
      "Minify HTML, CSS, and JavaScript code to reduce file sizes and improve website loading performance.",
    whenToUse: [
      "Preparing production code for deployment",
      "Reducing page load times for better performance",
      "Optimizing web assets for mobile devices",
      "Meeting performance budgets and Core Web Vitals",
    ],
    usage: [
      {
        step: "Navigate to Web Tools > HTML Minifier",
        detail: "Access from web tools category",
      },
      {
        step: "Upload your HTML, CSS, or JS file",
        detail: "Supports all common web code formats",
      },
      {
        step: "Configure minification settings",
        detail:
          "Choose to remove comments, collapse whitespace, and minify inline styles",
      },
      {
        step: "Minify and download",
        detail: "Process the code and download your optimized file",
      },
    ],
    tips: [
      "Always keep original files before minification for future editing",
      "Test minified code thoroughly before deploying to production",
      "Use source maps if you need to debug minified code",
      "Combine with gzip compression for maximum file size reduction",
    ],
    limitations: [
      "Minified code is not meant for editing - keep original sources",
      "Some minification may break code with unusual formatting",
      "Source maps are not automatically generated",
    ],
    faqs: [
      {
        question: "Will minification break my code?",
        answer:
          "No, the minifier preserves functionality while removing unnecessary characters. However, always test minified code before deployment.",
      },
      {
        question: "How much file size reduction can I expect?",
        answer:
          "Typical reduction is 20-40% for HTML and 40-60% for CSS/JavaScript, depending on code style and comments.",
      },
      {
        question: "Can I reverse minification?",
        answer:
          "No, minification cannot be fully reversed. Use code formatters to make minified code more readable, but original formatting and comments are lost.",
      },
    ],
  },
];

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://utilso.spdic.com";

  const filteredDocs = documentation.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.overview.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Documentation for Utilso",
    description:
      "Comprehensive guides for every Utilso tool. Learn how to use each tool effectively, discover best practices, and troubleshoot common issues.",
    url: `${baseUrl}/documentation`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: documentation.map((doc, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: doc.title,
        description: doc.overview,
        url: `${baseUrl}/tool/${doc.category}/${doc.id}`,
      })),
    },
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Documentation",
        item: `${baseUrl}/documentation`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <Badge variant="secondary" className="mb-2">
            <BookOpen className="h-3 w-3 mr-1" />
            Documentation
          </Badge>
          <h1 className="text-5xl font-bold text-foreground">
            Tool Documentation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive guides for every Utilso tool. Learn how to use each
            tool effectively, discover best practices, and troubleshoot common
            issues.
          </p>
        </div>

        {/* Privacy & Security Section */}
        <section className="bg-primary/5 border border-primary/20 rounded-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">
                  Privacy & Browser-Based Processing
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Utilso is designed with a <strong>privacy-first</strong>{" "}
                philosophy. Unlike other online tools, your files are
                <strong> never uploaded to our servers</strong>. All processing
                happens locally within your browser using modern Web APIs and
                client-side libraries.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  No server-side storage
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  Works completely offline
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  No accounts required
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  Zero data collection
                </li>
              </ul>
            </div>
            <div className="w-full md:w-64 space-y-3 p-4 bg-background rounded-lg border border-border shadow-sm">
              <h3 className="font-semibold text-sm">
                Technical Implementation
              </h3>
              <p className="text-xs text-muted-foreground">
                We use technologies like WebAssembly, File API, and Canvas to
                handle complex file manipulations directly on your device.
              </p>
              <Link href="/solutions">
                <Button
                  variant="link"
                  size="sm"
                  className="p-0 h-auto text-primary"
                >
                  Learn about our solutions
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Search */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search documentation..."
              className="pl-12 h-12 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Documentation Cards */}
        <div className="space-y-8">
          {filteredDocs.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  No documentation found matching your search.
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredDocs.map((doc) => (
              <Card key={doc.id} className="overflow-hidden">
                <CardHeader className="border-b border-border bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">{doc.title}</CardTitle>
                      <CardDescription className="text-base mt-2">
                        {doc.overview}
                      </CardDescription>
                    </div>
                    <Link href={`/tool/${doc.category}/${doc.id}`}>
                      <Button variant="outline" className="gap-2">
                        Launch Tool
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>

                <CardContent className="pt-6 space-y-8">
                  {/* When to Use */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Lightbulb className="h-4 w-4 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        When to Use
                      </h3>
                    </div>
                    <ul className="space-y-2 ml-10">
                      {doc.whenToUse.map((use, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-muted-foreground"
                        >
                          <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                          <span>{use}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  {/* Step-by-Step Usage */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <BookOpen className="h-4 w-4 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        Step-by-Step Usage
                      </h3>
                    </div>
                    <div className="ml-10 space-y-4">
                      {doc.usage.map((step, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 text-primary-foreground text-sm font-bold">
                            {idx + 1}
                          </div>
                          <div className="flex-1 pt-1">
                            <p className="font-medium text-foreground">
                              {step.step}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {step.detail}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Tips & Best Practices */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        Tips & Best Practices
                      </h3>
                    </div>
                    <div className="ml-10 space-y-2">
                      {doc.tips.map((tip, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 bg-success/5 rounded-lg border border-success/20"
                        >
                          <Info className="h-5 w-5 text-success shrink-0 mt-0.5" />
                          <p className="text-sm text-muted-foreground">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Limitations */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
                        <AlertCircle className="h-4 w-4 text-warning" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        Limitations
                      </h3>
                    </div>
                    <div className="ml-10 space-y-2">
                      {doc.limitations.map((limitation, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 bg-warning/5 rounded-lg border border-warning/20"
                        >
                          <AlertCircle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                          <p className="text-sm text-muted-foreground">
                            {limitation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* FAQ */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Info className="h-4 w-4 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        Frequently Asked Questions
                      </h3>
                    </div>
                    <div className="ml-10">
                      <Accordion type="single" collapsible className="w-full">
                        {doc.faqs.map((faq, idx) => (
                          <AccordionItem key={idx} value={`faq-${idx}`}>
                            <AccordionTrigger className="text-left hover:text-primary">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </>
  );
}
