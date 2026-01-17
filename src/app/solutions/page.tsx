import React from 'react';
import Link from 'next/link';
import { 
  FileText,
  Image,
  FileType,
  Database,
  Globe,
  ArrowRight,
  Users,
  Briefcase,
  GraduationCap,
  Code,
  CheckCircle2,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const solutions = [
  {
    id: 'content-creators',
    icon: Users,
    title: 'For Content Creators',
    subtitle: 'Streamline your content workflow',
    problem: 'Content creators often struggle with file format incompatibilities, image optimization for different platforms, and text formatting issues that slow down their publishing workflow.',
    whoFor: 'Bloggers, YouTubers, social media managers, and digital marketers who need to prepare content for multiple platforms quickly.',
    solution: 'ClearIt provides instant tools to resize images for different social platforms, compress videos without quality loss, format text for web publishing, and convert between document formats — all without leaving your browser.',
    tools: [
      { category: 'image', name: 'Image Compressor', icon: Image },
      { category: 'image', name: 'Image Resizer', icon: Image },
      { category: 'text', name: 'Text Formatter', icon: FileText },
      { category: 'web', name: 'HTML Minifier', icon: Globe }
    ],
    workflow: [
      'Upload your content files (images, text, or code)',
      'Apply format-specific optimizations with one click',
      'Download processed files ready for publishing',
      'Repeat for different platforms with saved presets'
    ]
  },
  {
    id: 'business-professionals',
    icon: Briefcase,
    title: 'For Business Professionals',
    subtitle: 'Handle documents efficiently',
    problem: 'Business professionals waste valuable time dealing with PDF management, data conversion between systems, and preparing documents for presentations or reports.',
    whoFor: 'Executives, analysts, consultants, and office workers who regularly handle business documents and need quick document processing.',
    solution: 'ClearIt enables instant PDF merging for reports, data conversion between Excel and JSON for integrations, and document format conversion — eliminating the need for expensive software licenses.',
    tools: [
      { category: 'pdf', name: 'PDF Merger', icon: FileType },
      { category: 'pdf', name: 'PDF Splitter', icon: FileType },
      { category: 'data', name: 'CSV Converter', icon: Database },
      { category: 'data', name: 'Data Cleaner', icon: Database }
    ],
    workflow: [
      'Gather documents from different sources',
      'Merge, split, or convert as needed',
      'Apply data cleaning and validation',
      'Export in the required format for your workflow'
    ]
  },
  {
    id: 'students-educators',
    icon: GraduationCap,
    title: 'For Students & Educators',
    subtitle: 'Simplify academic work',
    problem: 'Students and educators face challenges with assignment formatting, citation management, document conversion for different submission systems, and collaborative document preparation.',
    whoFor: 'Students, teachers, researchers, and academic administrators working with various document formats and submission requirements.',
    solution: 'ClearIt helps format papers correctly, count words for assignments, convert between document formats for different learning management systems, and prepare materials for online or print distribution.',
    tools: [
      { category: 'text', name: 'Word Counter', icon: FileText },
      { category: 'text', name: 'Text Formatter', icon: FileText },
      { category: 'pdf', name: 'PDF Converter', icon: FileType },
      { category: 'data', name: 'CSV Converter', icon: Database }
    ],
    workflow: [
      'Draft and format your academic content',
      'Verify word count and formatting requirements',
      'Convert to required submission format',
      'Prepare supplementary materials (data, images)'
    ]
  },
  {
    id: 'developers',
    icon: Code,
    title: 'For Developers',
    subtitle: 'Optimize code and data',
    problem: 'Developers need quick access to code formatting, data validation, API response formatting, and file conversion tools without installing heavy software or running terminal commands.',
    whoFor: 'Web developers, software engineers, DevOps professionals, and technical teams working with code and structured data.',
    solution: 'ClearIt offers instant code minification for production, JSON/XML validation and formatting, data conversion for APIs, and web asset optimization — all browser-based with no installation.',
    tools: [
      { category: 'web', name: 'HTML Minifier', icon: Globe },
      { category: 'web', name: 'Code Formatter', icon: Globe },
      { category: 'data', name: 'JSON Formatter', icon: Database },
      { category: 'data', name: 'CSV Converter', icon: Database }
    ],
    workflow: [
      'Paste or upload your code/data files',
      'Apply validation, formatting, or minification',
      'Review changes with syntax highlighting',
      'Download optimized files for deployment'
    ]
  }
];

export default function SolutionsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-fade-in">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <Badge variant="secondary" className="mb-2">
          <Zap className="h-3 w-3 mr-1" />
          Solutions
        </Badge>
        <h1 className="text-5xl font-bold text-foreground">
          Solutions for Every Workflow
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Discover how ClearIt solves real problems for professionals, creators, students, and developers. 
          No matter your role, we have tools to streamline your digital workflow.
        </p>
      </div>

      {/* Solutions */}
      <div className="space-y-16">
        {solutions.map((solution, index) => {
          const Icon = solution.icon;
          
          return (
            <div key={solution.id} className="space-y-6">
              {index > 0 && <Separator className="my-12" />}
              
              {/* Solution Header */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-foreground">{solution.title}</h2>
                  <p className="text-lg text-muted-foreground mt-1">{solution.subtitle}</p>
                </div>
              </div>

              {/* Solution Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* The Problem */}
                  <Card className="border-l-4 border-l-destructive">
                    <CardHeader>
                      <CardTitle className="text-lg">The Problem</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{solution.problem}</p>
                    </CardContent>
                  </Card>

                  {/* Who It's For */}
                  <Card className="border-l-4 border-l-primary">
                    <CardHeader>
                      <CardTitle className="text-lg">Who It's For</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{solution.whoFor}</p>
                    </CardContent>
                  </Card>

                  {/* How ClearIt Helps */}
                  <Card className="border-l-4 border-l-success">
                    <CardHeader>
                      <CardTitle className="text-lg">How ClearIt Helps</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{solution.solution}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Tools Involved */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Tools Involved</CardTitle>
                      <CardDescription>Key tools that solve this problem</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {solution.tools.map((tool) => {
                        const ToolIcon = tool.icon;
                        return (
                          <Link 
                            key={tool.name} 
                            href={`/category/${tool.category}`}
                            className="block"
                          >
                            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-smooth group">
                              <div 
                                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                                style={{ backgroundColor: `hsl(var(--category-${tool.category}) / 0.1)` }}
                              >
                                <ToolIcon 
                                  className="h-5 w-5" 
                                  style={{ color: `hsl(var(--category-${tool.category}))` }}
                                />
                              </div>
                              <span className="flex-1 font-medium text-foreground">{tool.name}</span>
                              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-smooth" />
                            </div>
                          </Link>
                        );
                      })}
                    </CardContent>
                  </Card>

                  {/* Example Workflow */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Example Workflow</CardTitle>
                      <CardDescription>Step-by-step process</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-3">
                        {solution.workflow.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0 text-primary-foreground text-xs font-bold">
                              {idx + 1}
                            </div>
                            <p className="text-muted-foreground flex-1 pt-0.5">{step}</p>
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Section */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="py-12 text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Ready to solve your digital problems?
            </h2>
            <p className="text-muted-foreground">
              Start using ClearIt tools now. No sign-up required.
            </p>
          </div>
          <Link href="/">
            <Button size="lg" className="bg-primary hover:bg-primary-hover">
              Browse All Tools
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
