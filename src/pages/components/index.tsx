import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Card, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Badge } from "@/src/components/ui/badge";
import { Container } from "@/src/components/layout/container";
import { 
   Search, 
   Layout, 
   MousePointer2, 
   Type, 
   Layers, 
   Navigation, 
   Box, 
   BarChart3, 
   Calendar as CalendarIcon, 
   LayoutDashboard, 
   Trello, 
   CreditCard, 
   ListTree, 
   Command as CommandIcon, 
   Smartphone, 
   Zap, 
   Shield, 
   MessageSquare,
   MoreHorizontal,
   ArrowRightLeft,
   Menu,
   MousePointer,
   Eye,
   SeparatorHorizontal,
   Maximize,
   ChevronDown,
   CircleDot,
   SlidersHorizontal,
   ToggleLeft,
   CheckSquare,
   Radio,
   Activity,
   AlertTriangle,
   PanelLeft,
   ChevronRight,
   Hash,
   Phone,
   Tag,
   FileUp,
   Info
} from "lucide-react";

interface ComponentItem {
  id: string;
  title: string;
  description: string;
  category: "General" | "Layout" | "Forms" | "Data Display" | "Navigation" | "Advanced" | "Feedback" | "Overlay";
  icon: React.ReactNode;
}

const components: ComponentItem[] = [
  // General
  { id: "button", title: "Button", description: "Interactive button with multiple variants.", category: "General", icon: <MousePointer2 className="h-4 w-4" /> },
  { id: "badge", title: "Badge", description: "Status indicators and labels.", category: "General", icon: <Type className="h-4 w-4" /> },
  { id: "loaders", title: "Loaders & Spinners", description: "20+ animated loading indicators.", category: "General", icon: <Zap className="h-4 w-4" /> },
  { id: "typography", title: "Typography", description: "Standard text styles and headings.", category: "General", icon: <Type className="h-4 w-4" /> },
  
  // Layout
  { id: "card", title: "Card", description: "Flexible container for content.", category: "Layout", icon: <Box className="h-4 w-4" /> },
  { id: "bento-grid", title: "Bento Grid", description: "Modern grid layout for features.", category: "Layout", icon: <LayoutDashboard className="h-4 w-4" /> },
  { id: "device-mockups", title: "Device Mockups", description: "Showcase your app on various devices.", category: "Layout", icon: <Smartphone className="h-4 w-4" /> },
  { id: "aspect-ratio", title: "Aspect Ratio", description: "Displays content within a fixed ratio.", category: "Layout", icon: <Maximize className="h-4 w-4" /> },
  { id: "separator", title: "Separator", description: "Visually separates content.", category: "Layout", icon: <SeparatorHorizontal className="h-4 w-4" /> },
  
  // Forms
  { id: "input", title: "Input", description: "Standard text input field.", category: "Forms", icon: <Type className="h-4 w-4" /> },
  { id: "checkbox", title: "Checkbox", description: "Binary choice input.", category: "Forms", icon: <CheckSquare className="h-4 w-4" /> },
  { id: "radio-group", title: "Radio Group", description: "Single choice from multiple options.", category: "Forms", icon: <Radio className="h-4 w-4" /> },
  { id: "switch", title: "Switch", description: "Toggle switch for binary settings.", category: "Forms", icon: <ToggleLeft className="h-4 w-4" /> },
  { id: "slider", title: "Slider", description: "Range selection input.", category: "Forms", icon: <SlidersHorizontal className="h-4 w-4" /> },
  { id: "select", title: "Select", description: "Dropdown selection menu.", category: "Forms", icon: <ChevronDown className="h-4 w-4" /> },
  { id: "combobox", title: "Combobox", description: "Searchable selection menu.", category: "Forms", icon: <Search className="h-4 w-4" /> },
  { id: "input-otp", title: "Input OTP", description: "One-time password input.", category: "Forms", icon: <Hash className="h-4 w-4" /> },
  { id: "input-tag", title: "Input Tag", description: "Tag-based input field.", category: "Forms", icon: <Tag className="h-4 w-4" /> },
  { id: "file-upload", title: "File Upload", description: "Drag and drop file uploader.", category: "Forms", icon: <FileUp className="h-4 w-4" /> },

  // Data Display
  { id: "table", title: "Table", description: "Standard data table.", category: "Data Display", icon: <ListTree className="h-4 w-4" /> },
  { id: "data-table-advanced", title: "Data Table Advanced", description: "Feature-rich table with sorting and filtering.", category: "Data Display", icon: <ListTree className="h-4 w-4" /> },
  { id: "charts", title: "Charts", description: "Beautiful data visualizations.", category: "Data Display", icon: <BarChart3 className="h-4 w-4" /> },
  { id: "calendar", title: "Calendar", description: "Date picker and event calendar.", category: "Data Display", icon: <CalendarIcon className="h-4 w-4" /> },
  { id: "timeline", title: "Timeline", description: "Activity logs and history.", category: "Data Display", icon: <ListTree className="h-4 w-4" /> },
  { id: "accordion", title: "Accordion", description: "Collapsible content sections.", category: "Data Display", icon: <Layers className="h-4 w-4" /> },
  { id: "avatar", title: "Avatar", description: "User profile images.", category: "Data Display", icon: <Box className="h-4 w-4" /> },

  // Navigation
  { id: "tabs", title: "Tabs", description: "Tabbed content navigation.", category: "Navigation", icon: <Navigation className="h-4 w-4" /> },
  { id: "breadcrumbs", title: "Breadcrumbs", description: "Hierarchical page navigation.", category: "Navigation", icon: <ChevronRight className="h-4 w-4" /> },
  { id: "pagination", title: "Pagination", description: "Data paging controls.", category: "Navigation", icon: <ArrowRightLeft className="h-4 w-4" /> },
  { id: "navigation-menu", title: "Navigation Menu", description: "Advanced site header menus.", category: "Navigation", icon: <Menu className="h-4 w-4" /> },
  { id: "menubar", title: "Menubar", description: "Desktop-style application menus.", category: "Navigation", icon: <MoreHorizontal className="h-4 w-4" /> },

  // Feedback
  { id: "alert", title: "Alert", description: "Important messages and warnings.", category: "Feedback", icon: <AlertTriangle className="h-4 w-4" /> },
  { id: "progress", title: "Progress", description: "Progress bars and indicators.", category: "Feedback", icon: <Activity className="h-4 w-4" /> },
  { id: "toast", title: "Toast", description: "Temporary notification messages.", category: "Feedback", icon: <MessageSquare className="h-4 w-4" /> },
  { id: "skeleton", title: "Skeleton", description: "Loading placeholders for content.", category: "Feedback", icon: <Zap className="h-4 w-4" /> },

  // Overlay
  { id: "dialogs", title: "Dialogs & Modals", description: "Modal windows and overlays.", category: "Overlay", icon: <Layers className="h-4 w-4" /> },
  { id: "popover", title: "Popover", description: "Floating content triggered by an element.", category: "Overlay", icon: <MessageSquare className="h-4 w-4" /> },
  { id: "tooltip", title: "Tooltip", description: "Brief info on hover.", category: "Overlay", icon: <Info className="h-4 w-4" /> },
  { id: "context-menu", title: "Context Menu", description: "Right-click action menus.", category: "Overlay", icon: <MousePointer className="h-4 w-4" /> },
  { id: "hover-card", title: "Hover Card", description: "Preview content on hover.", category: "Overlay", icon: <Eye className="h-4 w-4" /> },
  { id: "sheet", title: "Sheet", description: "Side-sliding panels.", category: "Overlay", icon: <PanelLeft className="h-4 w-4" /> },
  { id: "command-palette", title: "Command Palette", description: "Global search and actions.", category: "Overlay", icon: <CommandIcon className="h-4 w-4" /> },
];

const categories = ["All", "General", "Layout", "Forms", "Data Display", "Navigation", "Feedback", "Overlay"];

export const ComponentsIndex = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const activeCategory = searchParams.get("category") || "All";

  const filteredComponents = components.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || 
                         c.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || c.category === activeCategory;
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
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                size="sm"
                className="rounded-full px-4"
                onClick={() => setSearchParams(cat === "All" ? {} : { category: cat })}
              >
                {cat}
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
                      {component.icon}
                    </div>
                    <Badge variant="secondary" className="rounded-full font-medium">{component.category}</Badge>
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-xl font-bold">{component.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">{component.description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        {filteredComponents.length === 0 && (
          <div className="text-center py-24 space-y-4">
            <Search className="h-12 w-12 text-muted-foreground mx-auto opacity-20" />
            <p className="text-xl text-muted-foreground">No components found matching your criteria.</p>
            <Button variant="link" onClick={() => { setSearch(""); setSearchParams({}); }}>Clear all filters</Button>
          </div>
        )}
      </Container>
    </div>
  );
};
