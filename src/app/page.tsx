import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  FileText, 
  Image, 
  FileType, 
  Database, 
  Globe,
  ArrowRight,
  Zap,
  Shield,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: "ClearIt - Free Online Tools for Text, Images, PDFs & Data",
  description: "ClearIt provides free, privacy-first online tools to fix files, clean data, and convert formats instantly. Word counter, image compressor, PDF merger, CSV converter, and more. All processing happens in your browser - no uploads, no accounts required.",
  keywords: [
    "clearit",
    "online tools",
    "free tools",
    "text tools",
    "image tools",
    "PDF tools",
    "data tools",
    "web tools",
    "word counter",
    "image compressor",
    "PDF merger",
    "CSV converter",
    "privacy-first tools",
    "browser-based tools"
  ],
  openGraph: {
    title: "ClearIt - Free Online Tools for Text, Images, PDFs & Data",
    description: "Fix files, clean data, convert formats — without friction. Free online tools that work instantly in your browser.",
    url: "/",
    type: "website",
  },
  twitter: {
    title: "ClearIt - Free Online Tools",
    description: "Fix files, clean data, convert formats — without friction.",
  },
  alternates: {
    canonical: "/",
  },
};

const categories = [
  {
    id: 'text',
    name: 'Text Tools',
    description: 'Transform, clean, and analyze text content with precision',
    icon: FileText,
    color: 'text',
    toolCount: 3,
    tools: ['Word Counter', 'Text Formatter', 'Case Converter']
  },
  {
    id: 'image',
    name: 'Image Tools',
    description: 'Resize, compress, and convert images effortlessly',
    icon: Image,
    color: 'image',
    toolCount: 3,
    tools: ['Image Compressor', 'Format Converter', 'Resizer']
  },
  {
    id: 'pdf',
    name: 'PDF Tools',
    description: 'Merge, split, and convert PDF documents instantly',
    icon: FileType,
    color: 'pdf',
    toolCount: 3,
    tools: ['PDF Merger', 'PDF Splitter', 'PDF Converter']
  },
  {
    id: 'data',
    name: 'Data Tools',
    description: 'Convert, validate, and clean data files seamlessly',
    icon: Database,
    color: 'data',
    toolCount: 3,
    tools: ['CSV Converter', 'JSON Formatter', 'Data Cleaner']
  },
  {
    id: 'web',
    name: 'Web Tools',
    description: 'Analyze and optimize web content and code',
    icon: Globe,
    color: 'web',
    toolCount: 2,
    tools: ['HTML Minifier', 'Code Formatter']
  },
];

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Process files instantly with zero waiting'
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'All processing happens locally in your browser'
  },
  {
    icon: Clock,
    title: 'Always Available',
    description: 'No sign-up required, access tools anytime'
  },
];

export default function ToolsLanding() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ClearIt",
    "description": "Free online tools for text, images, PDFs, data, and web development. All processing happens in your browser.",
    "url": process.env.NEXT_PUBLIC_APP_URL || 'https://clearit.spdic.com',
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1000"
    },
    "featureList": [
      "Word Counter",
      "Image Compressor",
      "PDF Merger",
      "CSV Converter",
      "HTML Minifier"
    ]
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": process.env.NEXT_PUBLIC_APP_URL || 'https://clearit.spdic.com'
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <div className="max-w-7xl mx-auto space-y-12 animate-fade-in">
        {/* Hero Section */}
        <section className="text-center space-y-6 py-12">
          <Badge variant="secondary" className="mb-4">
            <Zap className="h-3 w-3 mr-1" />
            Fast • Private • Simple
          </Badge>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Clear digital problems.
            <br />
            <span className="text-primary">Instantly.</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Fix files, clean data, convert formats — without friction. 
            ClearIt is your go-to toolkit for solving everyday digital challenges with confidence.
          </p>

          {/* Quick Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 max-w-4xl mx-auto">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="border-border bg-card hover:shadow-md transition-smooth">
                  <CardContent className="pt-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Categories Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Browse Tools by Category</h2>
              <p className="text-muted-foreground mt-2">Choose a category to explore powerful utilities</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              
              return (
                <Link key={category.id} href={`/category/${category.id}`}>
                  <Card className="h-full border-2 border-border hover:border-[hsl(var(--category-${category.color}))] transition-smooth card-elevated group">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div 
                          className="w-14 h-14 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `hsl(var(--category-${category.color}) / 0.1)` }}
                        >
                          <Icon 
                            className="h-7 w-7" 
                            style={{ color: `hsl(var(--category-${category.color}))` }}
                          />
                        </div>
                        <Badge 
                          variant="secondary" 
                          className="text-xs"
                        >
                          {category.toolCount} tools
                        </Badge>
                      </div>
                      
                      <CardTitle className="text-xl">{category.name}</CardTitle>
                      <CardDescription className="text-base">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm font-medium text-muted-foreground">Available tools:</p>
                        <div className="flex flex-wrap gap-2">
                          {category.tools.slice(0, 3).map((tool) => (
                            <span 
                              key={tool} 
                              className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        className="w-full justify-between group-hover:bg-sidebar-hover"
                        style={{ 
                          color: `hsl(var(--category-${category.color}))` 
                        }}
                      >
                        Explore tools
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-smooth" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="bg-muted/30 rounded-xl p-8 md:p-12 text-center space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Our Philosophy</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Digital problems shouldn't require complex solutions. ClearIt provides straightforward, 
            powerful tools that work instantly in your browser. No uploads, no accounts, no hassle — 
            just results.
          </p>
        </section>
      </div>
    </>
  );
}
