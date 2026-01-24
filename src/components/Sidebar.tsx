"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
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
  ChevronRight,
  Briefcase,
  User as UserIcon,
  Settings as SettingsIcon,
  CreditCard,
} from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

const categories = [
  {
    id: "text",
    name: "Text Tools",
    icon: FileText,
    color: "text",
    tools: [
      { id: "word-counter", name: "Word Counter" },
      { id: "text-formatter", name: "Text Formatter" },
      { id: "case-converter", name: "Case Converter" },
    ],
  },
  {
    id: "image",
    name: "Image Tools",
    icon: Image,
    color: "image",
    tools: [
      { id: "image-compressor", name: "Image Compressor" },
      { id: "format-converter", name: "Format Converter" },
      { id: "image-resizer", name: "Image Resizer" },
    ],
  },
  {
    id: "pdf",
    name: "PDF Tools",
    icon: FileType,
    color: "pdf",
    tools: [
      { id: "pdf-merger", name: "PDF Merger" },
      { id: "pdf-splitter", name: "PDF Splitter" },
      { id: "pdf-converter", name: "PDF Converter" },
    ],
  },
  {
    id: "data",
    name: "Data Tools",
    icon: Database,
    color: "data",
    tools: [
      { id: "csv-converter", name: "CSV Converter" },
      { id: "json-formatter", name: "JSON Formatter" },
      { id: "data-cleaner", name: "Data Cleaner" },
    ],
  },
  {
    id: "web",
    name: "Web Tools",
    icon: Globe,
    color: "web",
    tools: [
      { id: "html-minifier", name: "HTML Minifier" },
      { id: "code-formatter", name: "Code Formatter" },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
}

/**
 * Sidebar Component
 *
 * Displays the main navigation menu and categorized lists of tools.
 * Can be collapsed or expanded. Automatically highlights the active route.
 */
export default function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname() || "";
  const params = useParams();
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {},
  );

  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const mainLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Solutions", path: "/solutions", icon: Lightbulb },
    { name: "Documentation", path: "/documentation", icon: BookOpen },
    { name: "Pricing", path: "/pricing", icon: CreditCard },
  ];

  useEffect(() => {
    if (params?.toolId && params?.categoryId) {
      setOpenCategories({ [`${params?.categoryId}`]: true });
    }
  }, []);

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-sidebar-background border-r border-sidebar-border sidebar-transition z-40",
        "lg:translate-x-0 transition-transform duration-300",
        isOpen
          ? "w-64 translate-x-0 shadow-2xl lg:shadow-none"
          : "w-16 -translate-x-full lg:translate-x-0",
      )}
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
                    className={cn(
                      "w-full group transition-all duration-200",
                      isActive
                        ? "bg-primary text-primary-foreground hover:bg-primary-hover shadow-md"
                        : "hover:bg-primary/10 hover:text-primary text-muted-foreground",
                      isOpen ? "justify-start gap-3 px-4" : "justify-center",
                    )}
                    aria-label={link.name}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon
                      className={cn(
                        "h-5 w-5 shrink-0 transition-colors",
                        isActive
                          ? "text-primary-foreground"
                          : "group-hover:text-primary",
                      )}
                    />
                    {isOpen && <span className="font-medium">{link.name}</span>}
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
                  const isCategoryActive =
                    pathname.includes(`/category/${category.id}`) ||
                    pathname.includes(`/tool/${category.id}`);
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
                              className={cn(
                                "w-full justify-start gap-3 group transition-all duration-200",
                                isCategoryActive
                                  ? `${isOpenCategory ? "bg-primary/10 text-primary" : "bg-primary text-primary-foreground shadow-md"} border-l-2`
                                  : "hover:bg-primary/10 hover:text-primary text-muted-foreground",
                              )}
                              style={{
                                borderLeftColor: isOpenCategory
                                  ? `hsl(var(--category-${category.color}))`
                                  : "transparent",
                              }}
                            >
                              <Icon
                                className={cn(
                                  "h-5 w-5 shrink-0 transition-colors",
                                  isCategoryActive && !isOpenCategory
                                    ? "text-primary-foreground"
                                    : isOpenCategory || isCategoryActive
                                      ? `hsl(var(--category-${category.color}))`
                                      : "group-hover:text-primary",
                                )}
                                style={{
                                  color:
                                    isCategoryActive && !isOpenCategory
                                      ? undefined
                                      : isOpenCategory || isCategoryActive
                                        ? `hsl(var(--category-${category.color}))`
                                        : undefined,
                                }}
                              />
                              <span className="flex-1 text-left text-sm font-medium">
                                {category.name}
                              </span>
                              <span
                                className={cn(
                                  "text-xs font-bold px-1.5 py-0.5 rounded-full bg-muted/50",
                                  isCategoryActive && !isOpenCategory
                                    ? "bg-white/20 text-primary-foreground"
                                    : "text-muted-foreground group-hover:text-primary",
                                )}
                              >
                                {category.tools.length}
                              </span>
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
                            const isToolActive = pathname.includes(
                              `/tool/${category.id}/${tool.id}`,
                            );

                            return (
                              <Link
                                key={tool.id}
                                href={`/tool/${category.id}/${tool.id}`}
                              >
                                <Button
                                  variant="ghost"
                                  className={cn(
                                    "w-full justify-start pl-12 text-sm group transition-all duration-200",
                                    isToolActive
                                      ? "bg-primary text-primary-foreground shadow-sm"
                                      : "text-muted-foreground hover:text-primary hover:bg-primary/10",
                                  )}
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
                  const isActive = pathname.includes(
                    `/category/${category.id}`,
                  );

                  return (
                    <Link key={category.id} href={`/category/${category.id}`}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`w-full h-10 ${
                          isActive
                            ? "bg-sidebar-hover"
                            : "hover:bg-sidebar-hover"
                        }`}
                      >
                        <Icon
                          className="h-5 w-5"
                          style={{
                            color: `hsl(var(--category-${category.color}))`,
                          }}
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
