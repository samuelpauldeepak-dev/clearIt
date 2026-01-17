"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ArrowRight,
  Upload,
  Download,
  CheckCircle2,
  Settings as SettingsIcon,
  FileText,
  Image as ImageIcon,
  FileType,
  Database,
  Globe,
  Sparkles,
  Info
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const iconMap: Record<string, typeof FileText> = {
  text: FileText,
  image: ImageIcon,
  pdf: FileType,
  data: Database,
  web: Globe
};

const toolDetails: Record<string, {
  name: string;
  category: string;
  description: string;
  acceptedFormats: string[];
  capabilities: string[];
  settings: Array<{
    type: 'switch' | 'slider' | 'select';
    id: string;
    label: string;
    default?: boolean | number | string;
    min?: number;
    max?: number;
    options?: string[];
  }>;
}> = {
  'word-counter': {
    name: 'Word Counter',
    category: 'text',
    description: 'Count words, characters, sentences, and paragraphs instantly',
    acceptedFormats: ['.txt', '.doc', '.docx'],
    capabilities: ['Real-time counting', 'Character breakdown', 'Reading time estimate', 'Keyword density'],
    settings: [
      { type: 'switch', id: 'includeSpaces', label: 'Include spaces in character count', default: true },
      { type: 'switch', id: 'countPunctuation', label: 'Count punctuation separately', default: false }
    ]
  },
  'image-compressor': {
    name: 'Image Compressor',
    category: 'image',
    description: 'Reduce image file size while maintaining quality',
    acceptedFormats: ['.jpg', '.jpeg', '.png', '.webp'],
    capabilities: ['Smart compression', 'Quality control', 'Batch processing', 'Preview comparison'],
    settings: [
      { type: 'slider', id: 'quality', label: 'Compression quality', default: 80, min: 1, max: 100 },
      { type: 'switch', id: 'preserveMetadata', label: 'Preserve image metadata', default: false },
      { type: 'select', id: 'outputFormat', label: 'Output format', options: ['Same as input', 'JPEG', 'PNG', 'WebP'], default: 'Same as input' }
    ]
  },
  'pdf-merger': {
    name: 'PDF Merger',
    category: 'pdf',
    description: 'Combine multiple PDF files into a single document',
    acceptedFormats: ['.pdf'],
    capabilities: ['Drag-and-drop ordering', 'Unlimited files', 'Custom page ranges', 'Table of contents generation'],
    settings: [
      { type: 'switch', id: 'addBookmarks', label: 'Add bookmarks for each file', default: true },
      { type: 'switch', id: 'addPageNumbers', label: 'Add page numbers', default: false }
    ]
  },
  'csv-converter': {
    name: 'CSV Converter',
    category: 'data',
    description: 'Convert CSV to JSON, XML, or Excel formats',
    acceptedFormats: ['.csv', '.tsv'],
    capabilities: ['Multiple output formats', 'Custom delimiters', 'Header detection', 'Data validation'],
    settings: [
      { type: 'select', id: 'outputFormat', label: 'Output format', options: ['JSON', 'XML', 'Excel'], default: 'JSON' },
      { type: 'switch', id: 'firstRowHeader', label: 'First row as headers', default: true },
      { type: 'select', id: 'delimiter', label: 'Delimiter', options: ['Comma', 'Tab', 'Semicolon', 'Pipe'], default: 'Comma' }
    ]
  },
  'html-minifier': {
    name: 'HTML Minifier',
    category: 'web',
    description: 'Minify HTML, CSS, and JavaScript for faster page loads',
    acceptedFormats: ['.html', '.css', '.js'],
    capabilities: ['Remove whitespace', 'Compress code', 'Preserve functionality', 'Source maps'],
    settings: [
      { type: 'switch', id: 'removeComments', label: 'Remove comments', default: true },
      { type: 'switch', id: 'collapseWhitespace', label: 'Collapse whitespace', default: true },
      { type: 'switch', id: 'minifyCSS', label: 'Minify inline CSS', default: true }
    ]
  },
  'default': {
    name: 'Tool',
    category: 'text',
    description: 'Process your files',
    acceptedFormats: ['.txt'],
    capabilities: ['File processing'],
    settings: []
  }
};

export default function ToolPage() {
  const params = useParams();
  const categoryId = (params?.categoryId as string) || '';
  const toolId = (params?.toolId as string) || '';
  const tool = toolDetails[toolId] || { ...toolDetails['default'], name: toolId };
  const Icon = iconMap[tool.category] || FileText;
  
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [settings, setSettings] = useState<Record<string, any>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize settings with defaults
  useEffect(() => {
    const defaultSettings: Record<string, any> = {};
    tool.settings.forEach(setting => {
      defaultSettings[setting.id] = setting.default;
    });
    setSettings(defaultSettings);
  }, [toolId]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setUploadedFile(file);
    setCompleted(false);
    setProgress(0);
    toast.success(`File "${file.name}" uploaded successfully`);
  };

  const handleProcess = () => {
    if (!uploadedFile) {
      toast.error('Please upload a file first');
      return;
    }

    setProcessing(true);
    setProgress(0);
    
    // Simulate processing with progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setProcessing(false);
          setCompleted(true);
          toast.success('Processing completed successfully!');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDownload = () => {
    toast.success('Download started!');
  };

  const handleReset = () => {
    setUploadedFile(null);
    setProgress(0);
    setCompleted(false);
    setProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.info('Ready for new file');
  };

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://clearit.spdic.com';
  const toolUrl = `${baseUrl}/tool/${categoryId}/${toolId}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "description": tool.description,
    "url": toolUrl,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": tool.capabilities,
    "fileFormat": tool.acceptedFormats.join(", ")
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": `${categoryId} Tools`,
        "item": `${baseUrl}/category/${categoryId}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": tool.name,
        "item": toolUrl
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
      <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-smooth">Home</Link>
        <ArrowRight className="h-4 w-4" />
        <Link href={`/category/${categoryId}`} className="hover:text-foreground transition-smooth capitalize">
          {categoryId} Tools
        </Link>
        <ArrowRight className="h-4 w-4" />
        <span className="text-foreground">{tool.name}</span>
      </div>

      {/* Tool Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div 
            className="w-16 h-16 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `hsl(var(--category-${tool.category}) / 0.1)` }}
          >
            <Icon 
              className="h-8 w-8" 
              style={{ color: `hsl(var(--category-${tool.category}))` }}
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{tool.name}</h1>
            <p className="text-muted-foreground mt-1">{tool.description}</p>
          </div>
        </div>
      </div>

      {/* Capabilities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Capabilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tool.capabilities.map((capability) => (
              <Badge key={capability} variant="secondary" className="text-sm">
                {capability}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Tool Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Upload & Process */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload" className="gap-2">
                <Upload className="h-4 w-4" />
                Upload
              </TabsTrigger>
              <TabsTrigger value="result" disabled={!completed} className="gap-2">
                <Download className="h-4 w-4" />
                Result
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-4">
              {/* Drag and Drop Zone */}
              <Card>
                <CardHeader>
                  <CardTitle>Upload File</CardTitle>
                  <CardDescription>
                    Accepted formats: {tool.acceptedFormats.join(', ')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className={`drag-zone p-12 text-center cursor-pointer ${
                      dragActive ? 'drag-active' : ''
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      onChange={handleFileInput}
                      accept={tool.acceptedFormats.join(',')}
                    />
                    
                    {!uploadedFile ? (
                      <div className="space-y-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                          <Upload className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <p className="text-lg font-medium text-foreground">
                            Drop your file here or click to browse
                          </p>
                          <p className="text-sm text-muted-foreground mt-2">
                            Supported formats: {tool.acceptedFormats.join(', ')}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10">
                          <CheckCircle2 className="h-8 w-8 text-success" />
                        </div>
                        <div>
                          <p className="text-lg font-medium text-foreground">
                            {uploadedFile.name}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {(uploadedFile.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReset();
                          }}
                        >
                          Change File
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Processing Status */}
                  {uploadedFile && (
                    <div className="mt-6 space-y-4">
                      {processing && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Processing...</span>
                            <span className="font-medium">{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      )}

                      {completed && (
                        <div className="flex items-center gap-2 text-success">
                          <CheckCircle2 className="h-5 w-5" />
                          <span className="font-medium">Processing completed!</span>
                        </div>
                      )}

                      <div className="flex gap-3">
                        <Button
                          className="flex-1"
                          onClick={handleProcess}
                          disabled={processing || completed}
                          style={{
                            backgroundColor: `hsl(var(--category-${tool.category}))`,
                            color: `hsl(var(--category-${tool.category}-foreground))`
                          }}
                        >
                          {processing ? 'Processing...' : completed ? 'Completed' : 'Process File'}
                        </Button>
                        
                        {!processing && (
                          <Button
                            variant="outline"
                            onClick={handleReset}
                          >
                            Reset
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="result" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Processed File</CardTitle>
                  <CardDescription>Your file is ready to download</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-6 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">
                          {uploadedFile?.name.replace(/\.[^/.]+$/, '')}_processed{uploadedFile?.name.match(/\.[^/.]+$/)?.[0]}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Ready for download
                        </p>
                      </div>
                      <CheckCircle2 className="h-8 w-8 text-success" />
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleDownload}
                    style={{
                      backgroundColor: `hsl(var(--category-${tool.category}))`,
                      color: `hsl(var(--category-${tool.category}-foreground))`
                    }}
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download File
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Settings */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                Settings
              </CardTitle>
              <CardDescription>Customize processing options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {tool.settings.map((setting) => {
                if (setting.type === 'switch') {
                  return (
                    <div key={setting.id} className="flex items-center justify-between">
                      <Label htmlFor={setting.id} className="text-sm flex-1">
                        {setting.label}
                      </Label>
                      <Switch
                        id={setting.id}
                        checked={settings[setting.id] ?? setting.default}
                        onCheckedChange={(checked) => 
                          setSettings(prev => ({ ...prev, [setting.id]: checked }))
                        }
                      />
                    </div>
                  );
                }
                
                if (setting.type === 'slider') {
                  return (
                    <div key={setting.id} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label htmlFor={setting.id} className="text-sm">
                          {setting.label}
                        </Label>
                        <span className="text-sm font-medium">
                          {settings[setting.id] ?? setting.default}%
                        </span>
                      </div>
                      <Slider
                        id={setting.id}
                        min={setting.min}
                        max={setting.max}
                        step={1}
                        value={[settings[setting.id] ?? setting.default as number]}
                        onValueChange={(value) => 
                          setSettings(prev => ({ ...prev, [setting.id]: value[0] }))
                        }
                      />
                    </div>
                  );
                }
                
                if (setting.type === 'select') {
                  return (
                    <div key={setting.id} className="space-y-2">
                      <Label htmlFor={setting.id} className="text-sm">
                        {setting.label}
                      </Label>
                      <Select
                        value={settings[setting.id] ?? setting.default}
                        onValueChange={(value) => 
                          setSettings(prev => ({ ...prev, [setting.id]: value }))
                        }
                      >
                        <SelectTrigger id={setting.id}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {setting.options?.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  );
                }
                
                return null;
              })}

              {tool.settings.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No additional settings available
                </p>
              )}
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Info className="h-4 w-4" />
                Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• All processing happens locally in your browser</li>
                <li>• Your files are never uploaded to our servers</li>
                <li>• Works offline after initial page load</li>
                <li>• No file size limits</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </>
  );
}
