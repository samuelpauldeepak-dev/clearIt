"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FileText, 
  Image, 
  FileType, 
  Database, 
  Globe,
  Home,
  Lightbulb,
  BookOpen,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

const categories = [
  {
    id: 'text',
    name: 'Text Tools',
    icon: FileText,
    color: 'text',
    tools: [
      { id: 'word-counter', name: 'Word Counter' },
      { id: 'text-formatter', name: 'Text Formatter' },
      { id: 'case-converter', name: 'Case Converter' }
    ]
  },
  {
    id: 'image',
    name: 'Image Tools',
    icon: Image,
    color: 'image',
    tools: [
      { id: 'image-compressor', name: 'Image Compressor' },
      { id: 'format-converter', name: 'Format Converter' },
      { id: 'image-resizer', name: 'Image Resizer' }
    ]
  },
  {
    id: 'pdf',
    name: 'PDF Tools',
    icon: FileType,
    color: 'pdf',
    tools: [
      { id: 'pdf-merger', name: 'PDF Merger' },
      { id: 'pdf-splitter', name: 'PDF Splitter' },
      { id: 'pdf-converter', name: 'PDF Converter' }
    ]
  },
  {
    id: 'data',
    name: 'Data Tools',
    icon: Database,
    color: 'data',
    tools: [
      { id: 'csv-converter', name: 'CSV Converter' },
      { id: 'json-formatter', name: 'JSON Formatter' },
      { id: 'data-cleaner', name: 'Data Cleaner' }
    ]
  },
  {
    id: 'web',
    name: 'Web Tools',
    icon: Globe,
    color: 'web',
    tools: [
      { id: 'html-minifier', name: 'HTML Minifier' },
      { id: 'code-formatter', name: 'Code Formatter' }
    ]
  },
];

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const mainLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Solutions', path: '/solutions', icon: Lightbulb },
    { name: 'Documentation', path: '/documentation', icon: BookOpen },
  ];

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-sidebar-background border-r border-sidebar-border sidebar-transition z-40 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      <ScrollArea className="h-full custom-scrollbar">
        <div className="p-2 space-y-2">
          {/* Main Navigation */}
          <div className="space-y-1">
            {mainLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.path;
              
              return (
                <Link key={link.path} href={link.path}>
                  <Button
                    variant="ghost"
                    size={isOpen ? "default" : "icon"}
                    className={`w-full ${
                      isActive
                        ? 'bg-primary text-primary-foreground hover:bg-primary-hover'
                        : 'hover:bg-sidebar-hover'
                    } ${isOpen ? 'justify-start gap-3' : 'justify-center'}`}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {isOpen && <span>{link.name}</span>}
                  </Button>
                </Link>
              );
            })}
          </div>

          {isOpen && (
            <>
              <Separator className="my-3" />
              
              {/* Tool Categories with Accordion */}
              <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground px-3 py-2">
                  CATEGORIES
                </p>
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isCategoryActive = pathname.includes(`/category/${category.id}`);
                  const isOpenCategory = openCategories[category.id];
                  
                  return (
                    <Collapsible
                      key={category.id}
                      open={isOpenCategory}
                      onOpenChange={() => toggleCategory(category.id)}
                    >
                      <div className="space-y-1">
                        {/* Category Header */}
                        <div className="flex items-center">
                          <Link 
                            href={`/category/${category.id}`} 
                            className="flex-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button
                              variant="ghost"
                              className={`w-full justify-start gap-3 group ${
                                isCategoryActive
                                  ? 'bg-sidebar-hover border-l-2'
                                  : 'hover:bg-sidebar-hover'
                              }`}
                              style={{
                                borderLeftColor: isCategoryActive ? `hsl(var(--category-${category.color}))` : 'transparent'
                              }}
                            >
                              <Icon 
                                className="h-5 w-5 shrink-0" 
                                style={{ color: `hsl(var(--category-${category.color}))` }}
                              />
                              <span className="flex-1 text-left text-sm">{category.name}</span>
                              <span className="text-xs text-muted-foreground">{category.tools.length}</span>
                            </Button>
                          </Link>
                          <CollapsibleTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 p-0 hover:bg-sidebar-hover"
                            >
                              {isOpenCategory ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </Button>
                          </CollapsibleTrigger>
                        </div>

                        {/* Sub-tools */}
                        <CollapsibleContent className="space-y-1">
                          {category.tools.map((tool) => {
                            const isToolActive = pathname.includes(`/tool/${category.id}/${tool.id}`);
                            
                            return (
                              <Link key={tool.id} href={`/tool/${category.id}/${tool.id}`}>
                                <Button
                                  variant="ghost"
                                  className={`w-full justify-start pl-12 text-sm ${
                                    isToolActive
                                      ? 'bg-muted text-foreground'
                                      : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-hover'
                                  }`}
                                >
                                  {tool.name}
                                </Button>
                              </Link>
                            );
                          })}
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                  );
                })}
              </div>
            </>
          )}

          {!isOpen && (
            <>
              <Separator className="my-3" />
              
              {/* Collapsed Category Icons */}
              <div className="space-y-1">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isActive = pathname.includes(`/category/${category.id}`);
                  
                  return (
                    <Link key={category.id} href={`/category/${category.id}`}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`w-full h-10 ${
                          isActive ? 'bg-sidebar-hover' : 'hover:bg-sidebar-hover'
                        }`}
                      >
                        <Icon 
                          className="h-5 w-5" 
                          style={{ color: `hsl(var(--category-${category.color}))` }}
                        />
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
}
