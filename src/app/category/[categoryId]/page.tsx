import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  FileText, 
  Image, 
  FileType, 
  Database, 
  Globe,
  ArrowRight,
  Star,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const categoryData: Record<string, {
  name: string;
  icon: typeof FileText;
  color: string;
  description: string;
  philosophy: string;
  tools: Array<{
    id: string;
    name: string;
    description: string;
    features: string[];
    popular: boolean;
  }>;
}> = {
  text: {
    name: 'Text Tools',
    icon: FileText,
    color: 'text',
    description: 'Transform and analyze text content with precision',
    philosophy: 'Text is the foundation of digital communication. Our text tools help you clean, format, and analyze text effortlessly, ensuring your content is always clear and professional.',
    tools: [
      {
        id: 'word-counter',
        name: 'Word Counter',
        description: 'Count words, characters, sentences, and paragraphs instantly. Get detailed text statistics.',
        features: ['Real-time counting', 'Character breakdown', 'Reading time estimate'],
        popular: true
      },
      {
        id: 'text-formatter',
        name: 'Text Formatter',
        description: 'Remove extra spaces, line breaks, and format text for clean presentation.',
        features: ['Remove duplicates', 'Trim whitespace', 'Add/remove line breaks'],
        popular: false
      },
      {
        id: 'case-converter',
        name: 'Case Converter',
        description: 'Convert text between uppercase, lowercase, title case, and sentence case.',
        features: ['Multiple case styles', 'Preserve formatting', 'Batch conversion'],
        popular: true
      }
    ]
  },
  image: {
    name: 'Image Tools',
    icon: Image,
    color: 'image',
    description: 'Resize, compress, and convert images effortlessly',
    philosophy: 'Images need to be optimized for the web without sacrificing quality. Our image tools provide professional-grade compression and conversion while maintaining visual fidelity.',
    tools: [
      {
        id: 'image-compressor',
        name: 'Image Compressor',
        description: 'Reduce image file size while maintaining quality. Perfect for web optimization.',
        features: ['Smart compression', 'Quality control', 'Batch processing'],
        popular: true
      },
      {
        id: 'format-converter',
        name: 'Format Converter',
        description: 'Convert between PNG, JPG, WebP, and other image formats seamlessly.',
        features: ['Multiple formats', 'Preserve metadata', 'Fast conversion'],
        popular: true
      },
      {
        id: 'image-resizer',
        name: 'Image Resizer',
        description: 'Resize images to exact dimensions or by percentage. Maintain aspect ratio.',
        features: ['Custom dimensions', 'Aspect ratio lock', 'Preview changes'],
        popular: false
      }
    ]
  },
  pdf: {
    name: 'PDF Tools',
    icon: FileType,
    color: 'pdf',
    description: 'Merge, split, and convert PDF documents instantly',
    philosophy: 'PDF documents are essential for professional communication. Our tools make it easy to manipulate PDFs without expensive software, giving you complete control over your documents.',
    tools: [
      {
        id: 'pdf-merger',
        name: 'PDF Merger',
        description: 'Combine multiple PDF files into a single document. Reorder pages easily.',
        features: ['Drag-and-drop ordering', 'Unlimited files', 'Custom page ranges'],
        popular: true
      },
      {
        id: 'pdf-splitter',
        name: 'PDF Splitter',
        description: 'Extract specific pages or split PDF into multiple documents.',
        features: ['Page range selection', 'Split by size', 'Extract pages'],
        popular: false
      },
      {
        id: 'pdf-converter',
        name: 'PDF to Image',
        description: 'Convert PDF pages to high-quality images (PNG, JPG).',
        features: ['High resolution', 'Multiple formats', 'Page selection'],
        popular: true
      }
    ]
  },
  data: {
    name: 'Data Tools',
    icon: Database,
    color: 'data',
    description: 'Convert, validate, and clean data files seamlessly',
    philosophy: 'Data comes in many formats, and converting between them shouldn\'t be painful. Our data tools handle the complexity of format conversion and validation automatically.',
    tools: [
      {
        id: 'csv-converter',
        name: 'CSV Converter',
        description: 'Convert CSV to JSON, XML, or Excel. Support for custom delimiters.',
        features: ['Multiple output formats', 'Custom delimiters', 'Header detection'],
        popular: true
      },
      {
        id: 'json-formatter',
        name: 'JSON Formatter',
        description: 'Validate, format, and minify JSON data. Find syntax errors instantly.',
        features: ['Syntax validation', 'Pretty print', 'Minification'],
        popular: true
      },
      {
        id: 'data-cleaner',
        name: 'Data Cleaner',
        description: 'Remove duplicates, empty rows, and invalid data from spreadsheets.',
        features: ['Duplicate removal', 'Validation rules', 'Batch cleaning'],
        popular: false
      }
    ]
  },
  web: {
    name: 'Web Tools',
    icon: Globe,
    color: 'web',
    description: 'Analyze and optimize web content and code',
    philosophy: 'Web development requires clean, optimized code. Our web tools help developers format, minify, and validate code for better performance and maintainability.',
    tools: [
      {
        id: 'html-minifier',
        name: 'HTML Minifier',
        description: 'Minify HTML, CSS, and JavaScript for faster page loads.',
        features: ['Remove whitespace', 'Compress code', 'Preserve functionality'],
        popular: true
      },
      {
        id: 'code-formatter',
        name: 'Code Formatter',
        description: 'Format HTML, CSS, JavaScript, and JSON with proper indentation.',
        features: ['Auto-indent', 'Syntax highlighting', 'Multiple languages'],
        popular: false
      }
    ]
  }
};

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { categoryId } = params;
  const category = categoryData[categoryId];

  if (!category) {
    notFound();
  }

  const Icon = category.icon;

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Category Header */}
      <div className="space-y-4">
        <Link href="/">
          <Button variant="ghost" className="gap-2 mb-4">
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to Categories
          </Button>
        </Link>

        <div className="flex items-center gap-4">
          <div 
            className="w-16 h-16 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `hsl(var(--category-${category.color}) / 0.1)` }}
          >
            <Icon 
              className="h-8 w-8" 
              style={{ color: `hsl(var(--category-${category.color}))` }}
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground">{category.name}</h1>
            <p className="text-lg text-muted-foreground mt-2">{category.description}</p>
          </div>
        </div>
      </div>

      {/* Philosophy */}
      <Card className="border-l-4" style={{ borderLeftColor: `hsl(var(--category-${category.color}))` }}>
        <CardContent className="pt-6">
          <p className="text-base text-muted-foreground leading-relaxed">
            {category.philosophy}
          </p>
        </CardContent>
      </Card>

      {/* Tools Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Available Tools</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {category.tools.map((tool) => (
            <Link key={tool.id} href={`/tool/${categoryId}/${tool.id}`}>
              <Card className="h-full border-2 border-border hover:border-[hsl(var(--category-${category.color}))] hover:shadow-lg transition-smooth group">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl">{tool.name}</CardTitle>
                    {tool.popular && (
                      <Badge 
                        variant="secondary"
                        className="gap-1"
                        style={{ 
                          backgroundColor: `hsl(var(--category-${category.color}) / 0.1)`,
                          color: `hsl(var(--category-${category.color}))`,
                          borderColor: `hsl(var(--category-${category.color}) / 0.2)`
                        }}
                      >
                        <TrendingUp className="h-3 w-3" />
                        Popular
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-base">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Key features:</p>
                    <ul className="space-y-1">
                      {tool.features.map((feature) => (
                        <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                          <Star className="h-3 w-3" style={{ color: `hsl(var(--category-${category.color}))` }} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    className="w-full justify-between group-hover:translate-x-1 transition-smooth"
                    style={{ 
                      backgroundColor: `hsl(var(--category-${category.color}))`,
                      color: `hsl(var(--category-${category.color}-foreground))`
                    }}
                  >
                    Launch Tool
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
