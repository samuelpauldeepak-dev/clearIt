import type { Metadata } from 'next';

const toolDetails: Record<string, {
  name: string;
  category: string;
  description: string;
  acceptedFormats: string[];
  capabilities: string[];
}> = {
  'word-counter': {
    name: 'Word Counter',
    category: 'text',
    description: 'Count words, characters, sentences, and paragraphs instantly. Get detailed text statistics.',
    acceptedFormats: ['.txt', '.doc', '.docx'],
    capabilities: ['Real-time counting', 'Character breakdown', 'Reading time estimate', 'Keyword density'],
  },
  'image-compressor': {
    name: 'Image Compressor',
    category: 'image',
    description: 'Reduce image file size while maintaining quality',
    acceptedFormats: ['.jpg', '.jpeg', '.png', '.webp'],
    capabilities: ['Smart compression', 'Quality control', 'Batch processing', 'Preview comparison'],
  },
  'pdf-merger': {
    name: 'PDF Merger',
    category: 'pdf',
    description: 'Combine multiple PDF files into a single document',
    acceptedFormats: ['.pdf'],
    capabilities: ['Drag-and-drop ordering', 'Unlimited files', 'Custom page ranges', 'Table of contents generation'],
  },
  'csv-converter': {
    name: 'CSV Converter',
    category: 'data',
    description: 'Convert CSV to JSON, XML, or Excel formats',
    acceptedFormats: ['.csv', '.tsv'],
    capabilities: ['Multiple output formats', 'Custom delimiters', 'Header detection', 'Data validation'],
  },
  'html-minifier': {
    name: 'HTML Minifier',
    category: 'web',
    description: 'Minify HTML, CSS, and JavaScript for faster page loads',
    acceptedFormats: ['.html', '.css', '.js'],
    capabilities: ['Remove whitespace', 'Compress code', 'Preserve functionality', 'Source maps'],
  },
  'text-formatter': {
    name: 'Text Formatter',
    category: 'text',
    description: 'Remove extra spaces, line breaks, and format text for clean presentation.',
    acceptedFormats: ['.txt'],
    capabilities: ['Remove duplicates', 'Trim whitespace', 'Add/remove line breaks'],
  },
  'case-converter': {
    name: 'Case Converter',
    category: 'text',
    description: 'Convert text between uppercase, lowercase, title case, and sentence case.',
    acceptedFormats: ['.txt'],
    capabilities: ['Multiple case styles', 'Preserve formatting', 'Batch conversion'],
  },
  'format-converter': {
    name: 'Format Converter',
    category: 'image',
    description: 'Convert between PNG, JPG, WebP, and other image formats seamlessly.',
    acceptedFormats: ['.jpg', '.jpeg', '.png', '.webp'],
    capabilities: ['Multiple formats', 'Preserve metadata', 'Fast conversion'],
  },
  'image-resizer': {
    name: 'Image Resizer',
    category: 'image',
    description: 'Resize images to exact dimensions or by percentage. Maintain aspect ratio.',
    acceptedFormats: ['.jpg', '.jpeg', '.png', '.webp'],
    capabilities: ['Custom dimensions', 'Aspect ratio lock', 'Preview changes'],
  },
  'pdf-splitter': {
    name: 'PDF Splitter',
    category: 'pdf',
    description: 'Extract specific pages or split PDF into multiple documents.',
    acceptedFormats: ['.pdf'],
    capabilities: ['Page range selection', 'Split by size', 'Extract pages'],
  },
  'pdf-converter': {
    name: 'PDF to Image',
    category: 'pdf',
    description: 'Convert PDF pages to high-quality images (PNG, JPG).',
    acceptedFormats: ['.pdf'],
    capabilities: ['High resolution', 'Multiple formats', 'Page selection'],
  },
  'json-formatter': {
    name: 'JSON Formatter',
    category: 'data',
    description: 'Validate, format, and minify JSON data. Find syntax errors instantly.',
    acceptedFormats: ['.json'],
    capabilities: ['Syntax validation', 'Pretty print', 'Minification'],
  },
  'data-cleaner': {
    name: 'Data Cleaner',
    category: 'data',
    description: 'Remove duplicates, empty rows, and invalid data from spreadsheets.',
    acceptedFormats: ['.csv', '.xlsx'],
    capabilities: ['Duplicate removal', 'Validation rules', 'Batch cleaning'],
  },
  'code-formatter': {
    name: 'Code Formatter',
    category: 'web',
    description: 'Format HTML, CSS, JavaScript, and JSON with proper indentation.',
    acceptedFormats: ['.html', '.css', '.js', '.json'],
    capabilities: ['Auto-indent', 'Syntax highlighting', 'Multiple languages'],
  },
};

const categoryNames: Record<string, string> = {
  text: 'Text Tools',
  image: 'Image Tools',
  pdf: 'PDF Tools',
  data: 'Data Tools',
  web: 'Web Tools',
};

export async function generateMetadata({ params }: { params: { categoryId: string; toolId: string } }): Promise<Metadata> {
  const { categoryId, toolId } = params;
  const tool = toolDetails[toolId] || {
    name: toolId,
    category: categoryId,
    description: 'Process your files with ClearIt',
    acceptedFormats: [],
    capabilities: [],
  };
  const categoryName = categoryNames[categoryId] || categoryId;

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://clearit.spdic.com';
  const toolUrl = `${baseUrl}/tool/${categoryId}/${toolId}`;

  return {
    title: `${tool.name} - Free Online Tool | ClearIt`,
    description: `${tool.description}. Free ${tool.name.toLowerCase()} tool that works instantly in your browser. Supports ${tool.acceptedFormats.join(', ')} files. Features: ${tool.capabilities.join(', ')}. No uploads, no accounts required.`,
    keywords: [
      `clearit ${tool.name.toLowerCase()}`,
      `${tool.name.toLowerCase()} online`,
      `free ${tool.name.toLowerCase()}`,
      `${tool.name.toLowerCase()} tool`,
      `${categoryName.toLowerCase()} ${tool.name.toLowerCase()}`,
      ...tool.capabilities.map(c => c.toLowerCase()),
      ...tool.acceptedFormats.map(f => f.replace('.', '')),
      "online tool",
      "browser tool",
      "privacy-first tool",
      "free tool"
    ],
    openGraph: {
      title: `${tool.name} - Free Online Tool | ClearIt`,
      description: `${tool.description}. Free tool that works instantly in your browser.`,
      url: toolUrl,
      type: "website",
    },
    twitter: {
      title: `${tool.name} - ClearIt`,
      description: tool.description,
    },
    alternates: {
      canonical: toolUrl,
    },
  };
}

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
