import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Activity,
  AlertTriangle,
  ArrowRightLeft,
  BarChart3,
  BellRing,
  Box,
  Calendar as CalendarIcon,
  CheckSquare,
  ChevronDown,
  ChevronRight,
  Command as CommandIcon,
  Eye,
  FileUp,
  Hash,
  Info,
  Layers,
  LayoutDashboard,
  ListTree,
  Menu,
  MoreHorizontal,
  MousePointer,
  MousePointer2,
  Navigation,
  PanelLeft,
  Radio,
  Search,
  SeparatorHorizontal,
  SlidersHorizontal,
  Smartphone,
  Tag,
  Trello,
  Type,
  ToggleLeft,
  Zap,
} from "lucide-react";

import { Container } from "@/src/components/layout/container";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { getAllComponents, getComponentCategories, type ComponentRegistryEntry } from "@/src/lib/registry";

const components = getAllComponents();

const categories = ["All", ...getComponentCategories()];

const getComponentIcon = (component: ComponentRegistryEntry): React.ReactNode => {
  const iconClassName = "h-4 w-4";
  const iconMap: Record<string, React.ReactNode> = {
    button: <MousePointer2 className={iconClassName} />,
    badge: <Type className={iconClassName} />,
    loaders: <Zap className={iconClassName} />,
    typography: <Type className={iconClassName} />,
    card: <Box className={iconClassName} />,
    "bento-grid": <LayoutDashboard className={iconClassName} />,
    "device-mockups": <Smartphone className={iconClassName} />,
    "aspect-ratio": <Box className={iconClassName} />,
    separator: <SeparatorHorizontal className={iconClassName} />,
    "scroll-area": <MoreHorizontal className={iconClassName} />,
    input: <Type className={iconClassName} />,
    textarea: <Type className={iconClassName} />,
    checkbox: <CheckSquare className={iconClassName} />,
    "radio-group": <Radio className={iconClassName} />,
    switch: <ToggleLeft className={iconClassName} />,
    slider: <SlidersHorizontal className={iconClassName} />,
    select: <ChevronDown className={iconClassName} />,
    combobox: <Search className={iconClassName} />,
    "input-otp": <Hash className={iconClassName} />,
    "input-tag": <Tag className={iconClassName} />,
    "file-upload": <FileUp className={iconClassName} />,
    toggle: <ToggleLeft className={iconClassName} />,
    "markdown-editor": <Type className={iconClassName} />,
    table: <ListTree className={iconClassName} />,
    "data-table-advanced": <ListTree className={iconClassName} />,
    charts: <BarChart3 className={iconClassName} />,
    calendar: <CalendarIcon className={iconClassName} />,
    timeline: <ListTree className={iconClassName} />,
    accordion: <Layers className={iconClassName} />,
    avatar: <Box className={iconClassName} />,
    stats: <BarChart3 className={iconClassName} />,
    skeleton: <Zap className={iconClassName} />,
    kanban: <Trello className={iconClassName} />,
    pricing: <Box className={iconClassName} />,
    tabs: <Navigation className={iconClassName} />,
    breadcrumbs: <ChevronRight className={iconClassName} />,
    pagination: <ArrowRightLeft className={iconClassName} />,
    "navigation-menu": <Menu className={iconClassName} />,
    menubar: <MoreHorizontal className={iconClassName} />,
    stepper: <ChevronRight className={iconClassName} />,
    alert: <AlertTriangle className={iconClassName} />,
    progress: <Activity className={iconClassName} />,
    spinner: <Zap className={iconClassName} />,
    toast: <BellRing className={iconClassName} />,
    tooltip: <Info className={iconClassName} />,
    popover: <Layers className={iconClassName} />,
    "dropdown-menu": <ChevronDown className={iconClassName} />,
    "context-menu": <MousePointer className={iconClassName} />,
    "hover-card": <Eye className={iconClassName} />,
    sheet: <PanelLeft className={iconClassName} />,
    "alert-dialog": <AlertTriangle className={iconClassName} />,
    dialogs: <Layers className={iconClassName} />,
    "cookies-banner": <Info className={iconClassName} />,
    "command-palette": <CommandIcon className={iconClassName} />,
    "3d-pin": <Box className={iconClassName} />,
    hero: <LayoutDashboard className={iconClassName} />,
  };

  return iconMap[component.id] ?? <Box className={iconClassName} />;
};

export const ComponentsIndex = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const activeCategory = searchParams.get("category") || "All";

  const filteredComponents = components.filter((component) => {
    const matchesSearch =
      component.title.toLowerCase().includes(search.toLowerCase()) ||
      component.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || component.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-12 space-y-12">
      <Container>
        <div className="max-w-3xl space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">Components</h1>
          <p className="text-xl text-muted-foreground font-normal">
            A comprehensive collection of professionally designed, accessible, and high-performance components.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between pt-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search components..."
              className="pl-10 h-11 rounded-xl"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                className="rounded-full px-4"
                onClick={() =>
                  setSearchParams(category === "All" ? {} : { category })
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
          {filteredComponents.map((component) => (
            <Link key={component.id} to={`/components/${component.id}`}>
              <Card className="h-full hover:border-primary/20 hover:shadow-md transition-all group overflow-hidden">
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {getComponentIcon(component)}
                    </div>
                    <Badge variant="secondary" className="rounded-full font-medium">
                      {component.category}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-xl font-bold">{component.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {component.description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        {filteredComponents.length === 0 && (
          <div className="text-center py-24 space-y-4">
            <Search className="h-12 w-12 text-muted-foreground mx-auto opacity-20" />
            <p className="text-xl text-muted-foreground">
              No components found matching your criteria.
            </p>
            <Button
              variant="link"
              onClick={() => {
                setSearch("");
                setSearchParams({});
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};
