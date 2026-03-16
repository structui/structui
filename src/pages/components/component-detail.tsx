import React from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/src/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Slider } from "@/src/components/ui/slider";
import { Switch } from "@/src/components/ui/switch";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Spinner } from "@/src/components/ui/spinner";
import { Stepper } from "@/src/components/ui/stepper";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/src/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Combobox } from "@/src/components/ui/combobox";
import { MarkdownEditor } from "@/src/components/ui/markdown-editor";
import { PinContainer } from "@/src/components/ui/3d-pin";
import { BentoGrid, BentoGridItem } from "@/src/components/ui/bento-grid";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { CodeBlock } from "@/src/components/ui/code-block";
import { StatsCard, StatsGrid } from "@/src/components/ui/stats";
import { AreaChartComponent, BarChartComponent, PieChartComponent } from "@/src/components/ui/charts";
import { KanbanBoard } from "@/src/components/ui/kanban";
import { Calendar } from "@/src/components/ui/calendar";
import { Pricing } from "@/src/components/ui/pricing";
import { Timeline, activityLog } from "@/src/components/ui/timeline";
import { DataTableAdvanced } from "@/src/components/ui/data-table-advanced";
import { useToast } from "@/src/components/ui/toast";
import { Hero } from "@/src/components/ui/hero";
import { CommandPalette } from "@/src/components/ui/command-palette";
import { IPhoneMockup, AndroidMockup, TabletMockup, LaptopMockup, DesktopMockup } from "@/src/components/ui/device-mockups";
import { Spinner1, Spinner2, Spinner3, Spinner4, Spinner5, Loader1, Loader2, Loader3, Loader4, Loader5 } from "@/src/components/ui/loaders";
import { CookiesBanner } from "@/src/components/ui/cookies-banner";
import { SignInModal, AlertDialog } from "@/src/components/ui/dialogs";
import { Breadcrumbs, Pagination } from "@/src/components/ui/navigation";
import { Progress, Alert, AlertTitle, AlertDescription } from "@/src/components/ui/feedback";
import { Separator, AspectRatio, ScrollArea } from "@/src/components/ui/primitives";
import { Toggle, ToggleGroup, ToggleGroupItem, InputOTP, InputTag, FileUpload } from "@/src/components/ui/inputs-advanced";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger, HoverCard, HoverCardContent, HoverCardTrigger, Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger, MenubarSeparator } from "@/src/components/ui/overlay-advanced";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/src/components/ui/navigation-advanced";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/src/components/ui/sheet";
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/src/components/ui/alert-dialog";
import { ExternalLink, Info, Layers, MousePointer2, Type, BarChart3, Calendar as CalendarIcon, LayoutDashboard, Trello, CreditCard, ListTree, Command as CommandIcon, Smartphone, Laptop, Tablet, Monitor, ChevronRight, MoreHorizontal, AlertCircle, CheckCircle2, Terminal } from "lucide-react";

interface ComponentExample {
  title: string;
  description: string;
  code: string;
  render: React.ReactNode;
}

interface ComponentProp {
  name: string;
  type: string;
  default: string;
  description: string;
}

interface ComponentData {
  title: string;
  description: string;
  category: string;
  examples: ComponentExample[];
  props: ComponentProp[];
  features?: string[];
  accessibility?: string[];
  usage?: string;
}

const componentData: Record<string, ComponentData> = {
  button: {
    title: "Button",
    description: "Displays a button or a component that looks like a button.",
    category: "General",
    features: [
      "Multiple variants (primary, secondary, outline, ghost, link)",
      "Various sizes (sm, default, lg, icon)",
      "Supports 'asChild' for polymorphic rendering",
      "Loading state support",
      "Icon support",
    ],
    accessibility: [
      "Keyboard focus management",
      "ARIA roles and attributes automatically applied",
      "Support for screen readers",
      "High contrast mode support",
    ],
    examples: [
      {
        title: "Variants",
        description: "Buttons come in several variants to indicate different actions.",
        code: `<Button>Default</Button>\n<Button variant="secondary">Secondary</Button>\n<Button variant="outline">Outline</Button>\n<Button variant="ghost">Ghost</Button>\n<Button variant="destructive">Destructive</Button>`,
        render: (
          <div className="flex flex-wrap gap-4">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        ),
      },
      {
        title: "Sizes",
        description: "Buttons are available in small, default, and large sizes.",
        code: `<Button size="sm">Small</Button>\n<Button size="default">Default</Button>\n<Button size="lg">Large</Button>`,
        render: (
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
          </div>
        ),
      },
    ],
    props: [
      { name: "variant", type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'", default: "'default'", description: "The visual style of the button." },
      { name: "size", type: "'default' | 'sm' | 'lg' | 'icon'", default: "'default'", description: "The size of the button." },
      { name: "asChild", type: "boolean", default: "false", description: "Whether to render as a child component." },
    ],
  },
  accordion: {
    title: "Accordion",
    description: "A vertically stacked set of interactive headings that each reveal a section of content.",
    category: "Data Display",
    features: [
      "Collapsible items",
      "Single or multiple expansion",
      "Animated transitions",
      "Keyboard navigation",
    ],
    accessibility: [
      "WAI-ARIA Accordion pattern compliant",
      "Keyboard support (Space/Enter to toggle)",
      "Focus management for expanded content",
    ],
    examples: [
      {
        title: "Single Selection",
        description: "Only one item can be expanded at a time.",
        code: `<Accordion type="single" collapsible>\n  <AccordionItem value="item-1">\n    <AccordionTrigger>Is it accessible?</AccordionTrigger>\n    <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>\n  </AccordionItem>\n</Accordion>`,
        render: (
          <Accordion type="single" collapsible className="w-full max-w-md">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>Yes. It comes with default styles that match the aesthetic.</AccordionContent>
            </AccordionItem>
          </Accordion>
        ),
      },
    ],
    props: [
      { name: "type", type: "'single' | 'multiple'", default: "-", description: "Determines if one or multiple items can be opened." },
      { name: "collapsible", type: "boolean", default: "false", description: "Allows closing all items in 'single' mode." },
    ],
  },
  avatar: {
    title: "Avatar",
    description: "An image element with a fallback for representing the user.",
    category: "Data Display",
    features: [
      "Image support with automatic loading state",
      "Fallback text or icon support",
      "Customizable shapes and sizes",
    ],
    accessibility: [
      "Alt text support for images",
      "Role='img' for fallbacks",
    ],
    examples: [
      {
        title: "Default",
        description: "Standard avatar with image and fallback.",
        code: `<Avatar>\n  <AvatarImage src="https://github.com/shadcn.png" />\n  <AvatarFallback>CN</AvatarFallback>\n</Avatar>`,
        render: (
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        ),
      },
    ],
    props: [
      { name: "src", type: "string", default: "-", description: "The source URL of the image." },
      { name: "alt", type: "string", default: "-", description: "The alt text for the image." },
    ],
  },
  badge: {
    title: "Badge",
    description: "Displays a badge or a component that looks like a badge.",
    category: "General",
    features: [
      "Multiple color variants",
      "Outline and solid styles",
      "Small and compact design",
    ],
    accessibility: [
      "High contrast support",
      "Screen reader friendly",
    ],
    examples: [
      {
        title: "Variants",
        description: "Badges come in several variants.",
        code: `<Badge>Default</Badge>\n<Badge variant="secondary">Secondary</Badge>\n<Badge variant="outline">Outline</Badge>\n<Badge variant="destructive">Destructive</Badge>`,
        render: (
          <div className="flex gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        ),
      },
    ],
    props: [
      { name: "variant", type: "'default' | 'secondary' | 'outline' | 'destructive'", default: "'default'", description: "The visual style of the badge." },
    ],
  },
  checkbox: {
    title: "Checkbox",
    description: "A control that allows the user to select one or more options from a set.",
    category: "Forms",
    features: [
      "Controlled and uncontrolled states",
      "Indeterminate state support",
      "Customizable check icon",
    ],
    accessibility: [
      "Native checkbox behavior",
      "Keyboard support (Space to toggle)",
      "Label association for screen readers",
    ],
    examples: [
      {
        title: "Default",
        description: "Standard checkbox with label.",
        code: `<div className="flex items-center space-x-2">\n  <Checkbox id="terms" />\n  <label htmlFor="terms">Accept terms</label>\n</div>`,
        render: (
          <div className="flex items-center space-x-2">
            <Checkbox id="terms-doc" />
            <label htmlFor="terms-doc" className="text-sm font-medium">Accept terms and conditions</label>
          </div>
        ),
      },
    ],
    props: [
      { name: "checked", type: "boolean", default: "false", description: "The controlled checked state." },
      { name: "onCheckedChange", type: "(checked: boolean) => void", default: "-", description: "Event handler called when the checked state changes." },
    ],
  },
  combobox: {
    title: "Combobox",
    description: "Autocomplete input and search with a list of options.",
    category: "Forms",
    features: [
      "Searchable list of options",
      "Customizable option rendering",
      "Loading state support",
      "Clearable selection",
    ],
    accessibility: [
      "ARIA combobox pattern",
      "Keyboard navigation (Arrow keys, Enter)",
      "Screen reader support for results",
    ],
    examples: [
      {
        title: "Default",
        description: "A searchable dropdown list.",
        code: `<Combobox options={options} placeholder="Select framework..." />`,
        render: (
          <Combobox
            options={[
              { value: "next.js", label: "Next.js" },
              { value: "sveltekit", label: "SvelteKit" },
              { value: "nuxt.js", label: "Nuxt.js" },
              { value: "remix", label: "Remix" },
              { value: "astro", label: "Astro" },
            ]}
            className="w-[200px]"
          />
        ),
      },
    ],
    props: [
      { name: "options", type: "ComboboxOption[]", default: "[]", description: "The list of options to display." },
      { name: "placeholder", type: "string", default: "'Select option...'", description: "The placeholder text." },
    ],
  },
  "dropdown-menu": {
    title: "Dropdown Menu",
    description: "Displays a menu to the user — such as a set of actions or functions — triggered by a button.",
    category: "Navigation",
    features: [
      "Submenus support",
      "Checkboxes and radio items",
      "Separators and labels",
      "Keyboard shortcuts display",
    ],
    accessibility: [
      "WAI-ARIA Menu pattern",
      "Full keyboard navigation",
      "Focus management",
    ],
    examples: [
      {
        title: "Default",
        description: "A standard dropdown menu with labels and separators.",
        code: `<DropdownMenu>\n  <DropdownMenuTrigger>Open</DropdownMenuTrigger>\n  <DropdownMenuContent>\n    <DropdownMenuLabel>Account</DropdownMenuLabel>\n    <DropdownMenuSeparator />\n    <DropdownMenuItem>Profile</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>`,
        render: (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    props: [
      { name: "open", type: "boolean", default: "false", description: "The controlled open state." },
    ],
  },
  input: {
    title: "Input",
    description: "Displays a form input field or a component that looks like an input field.",
    category: "Forms",
    features: [
      "Support for various HTML types",
      "Customizable icons (prefix/suffix)",
      "Error and success states",
      "Floating labels support",
    ],
    accessibility: [
      "Native input accessibility",
      "Aria-describedby for errors",
      "Clear focus indicators",
    ],
    examples: [
      {
        title: "Default",
        description: "Standard text input field.",
        code: `<Input type="email" placeholder="Email" />`,
        render: <Input type="email" placeholder="Email" className="max-w-xs" />,
      },
      {
        title: "With Label",
        description: "Input field with an associated label.",
        code: `<div className="grid w-full max-w-sm items-center gap-1.5">\n  <label htmlFor="email">Email</label>\n  <Input type="email" id="email" placeholder="Email" />\n</div>`,
        render: (
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label htmlFor="email-example" className="text-sm font-medium">Email</label>
            <Input type="email" id="email-example" placeholder="Email" />
          </div>
        ),
      },
    ],
    props: [
      { name: "type", type: "string", default: "'text'", description: "The HTML input type." },
      { name: "disabled", type: "boolean", default: "false", description: "Whether the input is disabled." },
    ],
  },
  "markdown-editor": {
    title: "Markdown Editor",
    description: "A markdown editor with live preview.",
    category: "Advanced",
    features: [
      "Real-time preview",
      "Syntax highlighting",
      "Toolbar for common actions",
      "Support for GFM (GitHub Flavored Markdown)",
    ],
    accessibility: [
      "Keyboard shortcuts for formatting",
      "Screen reader support for editor and preview",
    ],
    examples: [
      {
        title: "Default",
        description: "Editor with split view preview.",
        code: `<MarkdownEditor value={value} onChange={setValue} />`,
        render: <MarkdownEditor value="# Hello World\n\nThis is a preview of the **Markdown Editor**." onChange={() => {}} />,
      },
    ],
    props: [
      { name: "value", type: "string", default: "''", description: "The markdown content." },
      { name: "onChange", type: "(value: string) => void", default: "-", description: "Callback when content changes." },
    ],
  },
  popover: {
    title: "Popover",
    description: "Displays rich content in a portal, triggered by a button.",
    category: "Data Display",
    features: [
      "Rich content support",
      "Automatic positioning",
      "Customizable triggers",
      "Portal-based rendering",
    ],
    accessibility: [
      "WAI-ARIA Popover pattern",
      "Keyboard support (Esc to close)",
      "Focus trapping within popover",
    ],
    examples: [
      {
        title: "Default",
        description: "A popover with custom content.",
        code: `<Popover>\n  <PopoverTrigger>Open</PopoverTrigger>\n  <PopoverContent>Content</PopoverContent>\n</Popover>`,
        render: (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Open popover</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Dimensions</h4>
                  <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        ),
      },
    ],
    props: [
      { name: "open", type: "boolean", default: "false", description: "The controlled open state." },
    ],
  },
  select: {
    title: "Select",
    description: "Displays a list of options for the user to pick from—triggered by a button.",
    category: "Forms",
    features: [
      "Customizable trigger and content",
      "Searchable options support",
      "Grouped items with labels",
      "Disabled items support",
    ],
    accessibility: [
      "WAI-ARIA Select pattern",
      "Keyboard navigation (Arrow keys, Enter)",
      "Screen reader friendly",
    ],
    examples: [
      {
        title: "Default",
        description: "Standard select dropdown.",
        code: `<Select>\n  <SelectTrigger><SelectValue /></SelectTrigger>\n  <SelectContent>\n    <SelectItem value="apple">Apple</SelectItem>\n  </SelectContent>\n</Select>`,
        render: (
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
            </SelectContent>
          </Select>
        ),
      },
    ],
    props: [
      { name: "value", type: "string", default: "-", description: "The controlled value." },
    ],
  },
  skeleton: {
    title: "Skeleton",
    description: "Use to show a placeholder while content is loading.",
    category: "Data Display",
    features: [
      "Animated pulse effect",
      "Customizable shapes (circle, rectangle)",
      "Responsive sizing",
    ],
    accessibility: [
      "Aria-busy='true' support",
      "Screen reader hidden by default",
    ],
    examples: [
      {
        title: "Default",
        description: "Skeleton placeholders for profile card.",
        code: `<Skeleton className="h-12 w-12 rounded-full" />\n<Skeleton className="h-4 w-[250px]" />`,
        render: (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ),
      },
    ],
    props: [
      { name: "className", type: "string", default: "-", description: "Additional CSS classes." },
    ],
  },
  slider: {
    title: "Slider",
    description: "An input where the user selects a value from a given range.",
    category: "Forms",
    features: [
      "Single and multi-thumb support",
      "Customizable range and steps",
      "Vertical and horizontal orientations",
    ],
    accessibility: [
      "WAI-ARIA Slider pattern",
      "Keyboard support (Arrow keys for fine-tuning)",
      "Touch-friendly interface",
    ],
    examples: [
      {
        title: "Default",
        description: "Standard range slider.",
        code: `<Slider defaultValue={[50]} max={100} step={1} />`,
        render: <Slider defaultValue={[50]} max={100} step={1} className="w-[60%]" />,
      },
    ],
    props: [
      { name: "defaultValue", type: "number[]", default: "[0]", description: "The default value." },
      { name: "max", type: "number", default: "100", description: "The maximum value." },
    ],
  },
  switch: {
    title: "Switch",
    description: "A control that allows the user to toggle a setting on or off.",
    category: "Forms",
    features: [
      "Animated toggle transitions",
      "Customizable colors and sizes",
      "Controlled and uncontrolled states",
    ],
    accessibility: [
      "WAI-ARIA Switch pattern",
      "Keyboard support (Space/Enter to toggle)",
      "Label association",
    ],
    examples: [
      {
        title: "Default",
        description: "Standard toggle switch.",
        code: `<Switch id="airplane-mode" />`,
        render: (
          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode-doc" />
            <label htmlFor="airplane-mode-doc">Airplane Mode</label>
          </div>
        ),
      },
    ],
    props: [
      { name: "checked", type: "boolean", default: "false", description: "The controlled checked state." },
    ],
  },
  table: {
    title: "Table",
    description: "A responsive table component.",
    category: "Data Display",
    features: [
      "Responsive layout",
      "Sticky headers support",
      "Customizable cell rendering",
      "Sorting and filtering support",
    ],
    accessibility: [
      "Semantic HTML table structure",
      "Aria-label for table description",
      "Keyboard navigation for interactive cells",
    ],
    examples: [
      {
        title: "Default",
        description: "A standard data table.",
        code: `<Table>\n  <TableHeader>\n    <TableRow><TableHead>Invoice</TableHead></TableRow>\n  </TableHeader>\n  <TableBody>\n    <TableRow><TableCell>INV001</TableCell></TableRow>\n  </TableBody>\n</Table>`,
        render: (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">INV002</TableCell>
                <TableCell>Pending</TableCell>
                <TableCell>PayPal</TableCell>
                <TableCell className="text-right">$150.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ),
      },
    ],
    props: [],
  },
  textarea: {
    title: "Textarea",
    description: "Displays a form textarea field or a component that looks like a textarea field.",
    category: "Forms",
    features: [
      "Auto-resizing support",
      "Customizable rows and columns",
      "Error and success states",
    ],
    accessibility: [
      "Native textarea accessibility",
      "Label association",
      "Clear focus indicators",
    ],
    examples: [
      {
        title: "Default",
        description: "Standard multi-line text input.",
        code: `<Textarea placeholder="Type your message here." />`,
        render: <Textarea placeholder="Type your message here." className="max-w-md" />,
      },
    ],
    props: [
      { name: "placeholder", type: "string", default: "-", description: "The placeholder text." },
    ],
  },
  tooltip: {
    title: "Tooltip",
    description: "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    category: "Data Display",
    features: [
      "Customizable delay and duration",
      "Automatic positioning",
      "Rich content support",
      "Portal-based rendering",
    ],
    accessibility: [
      "WAI-ARIA Tooltip pattern",
      "Keyboard focus trigger",
      "Screen reader friendly",
    ],
    examples: [
      {
        title: "Default",
        description: "Tooltip on hover.",
        code: `<TooltipProvider>\n  <Tooltip>\n    <TooltipTrigger>Hover</TooltipTrigger>\n    <TooltipContent>Info</TooltipContent>\n  </Tooltip>\n</TooltipProvider>`,
        render: (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ),
      },
    ],
    props: [],
  },
  stepper: {
    title: "Stepper",
    description: "A component to display progress through a series of steps.",
    category: "Navigation",
    features: [
      "Horizontal and vertical orientations",
      "Customizable step icons",
      "Linear and non-linear progress",
      "Completed and error states",
    ],
    accessibility: [
      "Aria-current for active step",
      "Keyboard navigation between steps",
      "Screen reader support for progress",
    ],
    examples: [
      {
        title: "Default",
        description: "A standard horizontal stepper.",
        code: `<Stepper steps={["Details", "Review", "Finish"]} currentStep={1} />`,
        render: <Stepper steps={["Details", "Review", "Finish"]} currentStep={1} className="max-w-md" />,
      },
      {
        title: "Completed",
        description: "A stepper with all steps completed.",
        code: `<Stepper steps={["Step 1", "Step 2", "Step 3"]} currentStep={2} />`,
        render: <Stepper steps={["Step 1", "Step 2", "Step 3"]} currentStep={2} className="max-w-md" />,
      },
    ],
    props: [
      { name: "steps", type: "string[]", default: "[]", description: "An array of step labels." },
      { name: "currentStep", type: "number", default: "0", description: "The zero-based index of the current step." },
    ],
  },
  spinner: {
    title: "Spinner",
    description: "Animated loading indicators.",
    category: "General",
    features: [
      "Various animation styles",
      "Customizable sizes and colors",
      "Lightweight SVG-based",
    ],
    accessibility: [
      "Role='status' for loading state",
      "Aria-live for dynamic updates",
    ],
    examples: [
      {
        title: "Default",
        description: "Standard loading spinner.",
        code: `<Spinner />`,
        render: <Spinner className="h-8 w-8 text-primary" />,
      },
    ],
    props: [
      { name: "className", type: "string", default: "-", description: "Additional CSS classes." },
    ],
  },
  "bento-grid": {
    title: "Bento Grid",
    description: "Modern grid layouts for displaying content in a bento-box style.",
    category: "Layout",
    features: [
      "Responsive grid layout",
      "Customizable column spans",
      "Smooth hover effects",
      "Dark mode support",
    ],
    accessibility: [
      "Semantic grid structure",
      "Focus management for interactive items",
    ],
    examples: [
      {
        title: "Default",
        description: "A responsive bento grid layout.",
        code: `<BentoGrid>\n  <BentoGridItem title="Title" description="Desc" />\n</BentoGrid>`,
        render: (
          <BentoGrid className="max-w-4xl mx-auto">
            <BentoGridItem
              title="The Dawn of Innovation"
              description="Explore the birth of groundbreaking ideas and inventions."
              header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100" />}
              className="md:col-span-2"
            />
            <BentoGridItem
              title="The Digital Revolution"
              description="Dive into the transformative power of technology."
              header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100" />}
              className="md:col-span-1"
            />
          </BentoGrid>
        ),
      },
    ],
    props: [],
  },
  "3d-pin": {
    title: "3D Pin",
    description: "A beautiful 3D pin component for highlighting locations or items.",
    category: "Advanced",
    features: [
      "Interactive 3D hover effect",
      "Customizable pin label",
      "Smooth animations",
      "Gradient background support",
    ],
    accessibility: [
      "Keyboard focus support",
      "Aria-labels for pin content",
    ],
    examples: [
      {
        title: "Interactive Pin",
        description: "Hover over the card to see the 3D pin effect.",
        code: `<PinContainer title="/struct-ui" href="https://github.com">\n  <div className="...">...</div>\n</PinContainer>`,
        render: (
          <div className="h-[20rem] w-full flex items-center justify-center">
            <PinContainer title="/struct-ui" href="https://github.com">
              <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
                <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">StructUI</h3>
                <div className="text-base !m-0 !p-0 font-normal">
                  <span className="text-slate-500 ">Customizable and modern UI components for React.</span>
                </div>
                <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
              </div>
            </PinContainer>
          </div>
        ),
      },
    ],
    props: [
      { name: "title", type: "string", default: "-", description: "The label displayed on the pin." },
      { name: "href", type: "string", default: "-", description: "The link the pin points to." },
    ],
  },
  stats: {
    title: "Stats",
    description: "Dashboard statistics cards for displaying key metrics.",
    category: "Data Display",
    features: [
      "Trend indicators (up/down)",
      "Icon support",
      "Description text",
      "Responsive grid layout",
    ],
    accessibility: [
      "Semantic structure",
      "Screen reader friendly labels",
    ],
    examples: [
      {
        title: "Default",
        description: "A collection of stats cards.",
        code: `<StatsGrid>\n  <StatsCard title="Revenue" value="$45,231" trend={{ value: "+20%", isUp: true }} />\n</StatsGrid>`,
        render: (
          <div className="w-full grid gap-4 md:grid-cols-2">
            <StatsCard title="Total Revenue" value="$45,231.89" trend={{ value: "+20.1%", isUp: true }} description="from last month" />
            <StatsCard title="Subscriptions" value="+2350" trend={{ value: "+180.1%", isUp: true }} description="from last month" />
          </div>
        ),
      },
    ],
    props: [
      { name: "title", type: "string", default: "-", description: "The title of the stat." },
      { name: "value", type: "string", default: "-", description: "The main value to display." },
    ],
  },
  charts: {
    title: "Charts",
    description: "Data visualization components using Recharts.",
    category: "Data Display",
    features: [
      "Area, Bar, and Pie charts",
      "Responsive containers",
      "Custom tooltips",
      "Themed colors",
    ],
    accessibility: [
      "Accessible SVG structure",
      "Keyboard navigable tooltips",
    ],
    examples: [
      {
        title: "Area Chart",
        description: "A smooth area chart for time-series data.",
        code: `<AreaChartComponent title="Revenue" data={data} />`,
        render: (
          <AreaChartComponent 
            title="Revenue Overview" 
            data={[
              { name: "Jan", value: 400 },
              { name: "Feb", value: 300 },
              { name: "Mar", value: 600 },
              { name: "Apr", value: 800 },
              { name: "May", value: 500 },
            ]} 
            className="w-full"
          />
        ),
      },
    ],
    props: [],
  },
  kanban: {
    title: "Kanban",
    description: "A task management board for project tracking.",
    category: "Advanced",
    features: [
      "Multiple columns",
      "Task cards with priority and tags",
      "Responsive scrolling",
      "Add task functionality",
    ],
    accessibility: [
      "Keyboard navigation support",
      "Aria-labels for columns and tasks",
    ],
    examples: [
      {
        title: "Project Board",
        description: "A standard Kanban board for a software project.",
        code: `<KanbanBoard columns={columns} />`,
        render: (
          <KanbanBoard 
            columns={[
              { id: "1", title: "Todo", tasks: [{ id: "t1", title: "Design UI", description: "Create mockups", priority: "high", tags: ["design"] }] },
              { id: "2", title: "In Progress", tasks: [{ id: "t2", title: "Implement Auth", description: "Firebase setup", priority: "medium", tags: ["dev"] }] },
            ]} 
            className="w-full"
          />
        ),
      },
    ],
    props: [],
  },
  calendar: {
    title: "Calendar",
    description: "A full-featured calendar for scheduling and events.",
    category: "Data Display",
    features: [
      "Month/Week views",
      "Event indicators",
      "Navigation controls",
      "Today shortcut",
    ],
    accessibility: [
      "Keyboard navigation (Arrow keys)",
      "Aria-live for month changes",
    ],
    examples: [
      {
        title: "Default",
        description: "A monthly calendar view with events.",
        code: `<Calendar events={events} />`,
        render: (
          <Calendar 
            events={[
              { id: "1", title: "Meeting", date: new Date(), type: "meeting" },
              { id: "2", title: "Deadline", date: new Date(), type: "task" },
            ]} 
            className="w-full"
          />
        ),
      },
    ],
    props: [],
  },
  pricing: {
    title: "Pricing",
    description: "A beautiful, responsive pricing table with monthly/yearly toggle.",
    category: "Data Display",
    features: [
      "Monthly/Yearly toggle with animation",
      "Popular plan highlighting",
      "Responsive grid layout",
      "Feature lists with icons",
      "Customizable badges and buttons"
    ],
    accessibility: [
      "Semantic HTML structure",
      "Keyboard navigable toggle",
      "High contrast text",
      "Screen reader friendly feature lists"
    ],
    examples: [
      {
        title: "Default Pricing",
        description: "A standard three-tier pricing table.",
        code: `<Pricing />`,
        render: (
          <div className="w-full py-8 bg-muted/10 rounded-3xl">
            <Pricing />
          </div>
        ),
      },
    ],
    props: [
      { name: "plans", type: "PricingPlan[]", default: "defaultPlans", description: "Array of pricing plan objects." },
    ],
  },
  timeline: {
    title: "Timeline",
    description: "A clean activity log or history tracking component.",
    category: "Data Display",
    features: [
      "Multiple status states (completed, current, pending, error)",
      "Customizable icons for each event",
      "Responsive vertical layout",
      "Automatic line connecting items",
      "Time badges for each entry"
    ],
    accessibility: [
      "Ordered list structure",
      "Aria-labels for status icons",
      "Clear visual hierarchy",
      "Readable font sizes"
    ],
    examples: [
      {
        title: "Activity Log",
        description: "A vertical timeline showing recent system events.",
        code: `<Timeline items={activityLog} />`,
        render: (
          <div className="w-full max-w-xl mx-auto p-8 border rounded-2xl bg-background">
            <Timeline items={activityLog} />
          </div>
        ),
      },
    ],
    props: [
      { name: "items", type: "TimelineItem[]", default: "[]", description: "Array of timeline event objects." },
    ],
  },
  "command-palette": {
    title: "Command Palette",
    description: "A powerful global search and action interface.",
    category: "Advanced",
    features: [
      "Keyboard shortcut trigger (Cmd+K / Ctrl+K)",
      "Fuzzy search across commands",
      "Grouped results with headers",
      "Keyboard navigation (Arrows + Enter)",
      "Smooth animations with Framer Motion"
    ],
    accessibility: [
      "WAI-ARIA Dialog pattern",
      "Focus management",
      "Keyboard accessibility",
      "Aria-selected states for items"
    ],
    examples: [
      {
        title: "Global Search",
        description: "A command palette for quick navigation and actions.",
        code: `<CommandPalette />`,
        render: (
          <div className="flex flex-col items-center justify-center py-12 border rounded-2xl bg-muted/5 gap-4 w-full">
            <p className="text-muted-foreground text-sm">Click the button below or press <kbd className="px-2 py-1 bg-muted border rounded">⌘K</kbd></p>
            <CommandPalette />
          </div>
        ),
      },
    ],
    props: [],
    usage: `import { CommandPalette } from "@/components/ui/command-palette";

export default function App() {
  return <CommandPalette />;
}`,
  },
  "device-mockups": {
    title: "Device Mockups",
    description: "Beautiful device frames for showcasing your application.",
    category: "Layout",
    features: ["iPhone, Android, Tablet, Laptop, Desktop", "Responsive sizing", "Dark/Light mode support", "Custom content injection"],
    examples: [
      {
        title: "iPhone Mockup",
        description: "A realistic iPhone frame.",
        code: `<IPhoneMockup>\n  <div className="p-4">Your App Content</div>\n</IPhoneMockup>`,
        render: <IPhoneMockup className="scale-75 origin-top"><div className="p-8 text-center pt-24 font-bold">App Preview</div></IPhoneMockup>
      }
    ],
    props: [],
    usage: `import { IPhoneMockup, LaptopMockup } from "@/components/ui/device-mockups";

export default function Demo() {
  return (
    <IPhoneMockup>
      <div className="p-4">Your mobile app content here</div>
    </IPhoneMockup>
  );
}`,
  },
  loaders: {
    title: "Loaders & Spinners",
    description: "A collection of 20+ animated loading indicators.",
    category: "General",
    features: ["10 Spinners", "10 Progress Loaders", "Customizable colors", "Smooth CSS animations"],
    examples: [
      {
        title: "Spinners",
        description: "Various circular loading animations.",
        code: `<Spinner1 />\n<Spinner2 />\n<Spinner3 />`,
        render: <div className="flex gap-8"><Spinner1 /><Spinner2 /><Spinner3 /><Spinner4 /><Spinner5 /></div>
      },
      {
        title: "Loaders",
        description: "Horizontal progress and bar loaders.",
        code: `<Loader1 />\n<Loader2 />\n<Loader3 />`,
        render: <div className="flex flex-col gap-8 w-full max-w-xs"><Loader1 /><Loader2 /><Loader3 /><Loader4 /><Loader5 /></div>
      }
    ],
    props: [],
    usage: `import { Spinner1, Loader1 } from "@/components/ui/loaders";

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Spinner1 />
      <Loader1 className="w-48" />
    </div>
  );
}`,
  },
  "cookies-banner": {
    title: "Cookies Banner",
    description: "A modern, animated cookies consent banner.",
    category: "Advanced",
    features: ["Animated entry/exit", "Local storage persistence", "Minimal design", "Mobile responsive"],
    examples: [
      {
        title: "Standard Banner",
        description: "The default cookies consent interface.",
        code: `<CookiesBanner />`,
        render: <div className="p-12 border rounded-2xl bg-muted/5 text-center">Banner will appear at the bottom of the screen</div>
      }
    ],
    props: [],
    usage: `import { CookiesBanner } from "@/components/ui/cookies-banner";

// Add this to your main layout or App.tsx
export default function Layout({ children }) {
  return (
    <>
      {children}
      <CookiesBanner />
    </>
  );
}`,
  },
  dialogs: {
    title: "Dialogs & Modals",
    description: "Ready-to-use modal structures for common actions.",
    category: "Advanced",
    features: ["Sign In Modal", "Alert Dialog", "Customizable content", "Radix UI based"],
    examples: [
      {
        title: "Sign In",
        description: "A pre-built authentication modal.",
        code: `<SignInModal />`,
        render: <SignInModal />
      },
      {
        title: "Alert",
        description: "A confirmation dialog for destructive actions.",
        code: `<AlertDialog title="Are you sure?" description="This action cannot be undone." />`,
        render: <AlertDialog title="Delete Project" description="Are you sure you want to delete this project? All data will be permanently removed." />
      }
    ],
    props: [],
    usage: `import { SignInModal, AlertDialog } from "@/components/ui/dialogs";

export default function Page() {
  return (
    <div className="space-x-4">
      <SignInModal />
      <AlertDialog 
        title="Confirm Action" 
        description="Please confirm you want to proceed." 
        onAction={() => console.log("Confirmed")}
      />
    </div>
  );
}`,
  },
  breadcrumbs: {
    title: "Breadcrumbs",
    description: "Displays the path to the current resource using a hierarchy of links.",
    category: "Navigation",
    features: ["Custom separators", "Active page state", "Responsive design", "Icon support"],
    examples: [
      {
        title: "Default",
        description: "Standard breadcrumb navigation.",
        code: `<Breadcrumbs 
  items={[
    { label: "Home", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Breadcrumbs", active: true },
  ]} 
/>`,
        render: (
          <Breadcrumbs 
            items={[
              { label: "Home", href: "/" },
              { label: "Components", href: "/components" },
              { label: "Breadcrumbs", active: true },
            ]} 
          />
        )
      }
    ],
    props: [],
    usage: `import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/navigation";`
  },
  pagination: {
    title: "Pagination",
    description: "Displays a sequence of links for navigating through multiple pages.",
    category: "Navigation",
    features: ["Previous/Next controls", "Page numbers", "Ellipsis for long lists", "Responsive layout"],
    examples: [
      {
        title: "Default",
        description: "Standard pagination controls.",
        code: `<Pagination \n  currentPage={1} \n  totalPages={10} \n  onPageChange={(page) => console.log(page)} \n/>`,
        render: (
          <Pagination 
            currentPage={1} 
            totalPages={10} 
            onPageChange={(page) => console.log(page)} 
          />
        )
      }
    ],
    props: [],
    usage: `import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/navigation";`
  },
  progress: {
    title: "Progress",
    description: "Displays an indicator showing the completion progress of a task.",
    category: "Feedback",
    features: ["Animated transitions", "Customizable colors", "Determinate and indeterminate states"],
    examples: [
      {
        title: "Default",
        description: "A standard progress bar at 60%.",
        code: `<Progress value={60} />`,
        render: <Progress value={60} className="w-[60%]" />
      }
    ],
    props: [
      { name: "value", type: "number", default: "0", description: "The progress value (0-100)." }
    ],
    usage: `import { Progress } from "@/components/ui/feedback";`
  },
  alert: {
    title: "Alert",
    description: "Displays a callout for user attention.",
    category: "Feedback",
    features: ["Multiple variants (default, destructive, success, warning, info)", "Icon support", "Title and description"],
    examples: [
      {
        title: "Default",
        description: "A standard informational alert.",
        code: `<Alert>\n  <Terminal className="h-4 w-4" />\n  <AlertTitle>Heads up!</AlertTitle>\n  <AlertDescription>You can add components to your app using the cli.</AlertDescription>\n</Alert>`,
        render: (
          <Alert className="max-w-md">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>You can add components to your app using the cli.</AlertDescription>
          </Alert>
        )
      },
      {
        title: "Destructive",
        description: "An alert indicating a critical error or destructive action.",
        code: `<Alert variant="destructive">\n  <AlertCircle className="h-4 w-4" />\n  <AlertTitle>Error</AlertTitle>\n  <AlertDescription>Your session has expired. Please log in again.</AlertDescription>\n</Alert>`,
        render: (
          <Alert variant="destructive" className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
          </Alert>
        )
      }
    ],
    props: [
      { name: "variant", type: "'default' | 'destructive' | 'success' | 'warning' | 'info'", default: "'default'", description: "The visual style of the alert." }
    ],
    usage: `import { Alert, AlertTitle, AlertDescription } from "@/components/ui/feedback";`
  },
  separator: {
    title: "Separator",
    description: "Visually or semantically separates content.",
    category: "Layout",
    features: ["Horizontal and vertical orientations", "Customizable thickness", "Themed colors"],
    examples: [
      {
        title: "Horizontal",
        description: "A standard horizontal line.",
        code: `<div>\n  <h4 className="text-sm font-medium leading-none">Radix UI</h4>\n  <p className="text-sm text-muted-foreground">An open-source UI component library.</p>\n  <Separator className="my-4" />\n  <div className="flex h-5 items-center space-x-4 text-sm">\n    <div>Blog</div>\n    <Separator orientation="vertical" />\n    <div>Docs</div>\n  </div>\n</div>`,
        render: (
          <div className="w-full max-w-sm">
            <div className="space-y-1">
              <h4 className="text-sm font-medium leading-none">StructUI</h4>
              <p className="text-sm text-muted-foreground">A modern UI component library for React.</p>
            </div>
            <Separator className="my-4" />
            <div className="flex h-5 items-center space-x-4 text-sm">
              <div>Blog</div>
              <Separator orientation="vertical" />
              <div>Docs</div>
              <Separator orientation="vertical" />
              <div>Source</div>
            </div>
          </div>
        )
      }
    ],
    props: [
      { name: "orientation", type: "'horizontal' | 'vertical'", default: "'horizontal'", description: "The orientation of the separator." }
    ],
    usage: `import { Separator } from "@/components/ui/primitives";`
  },
  "aspect-ratio": {
    title: "Aspect Ratio",
    description: "Displays content within a desired ratio.",
    category: "Layout",
    features: ["Maintains ratio on resize", "Supports any numeric ratio", "Great for images and videos"],
    examples: [
      {
        title: "16:9 Ratio",
        description: "Common widescreen ratio for images.",
        code: `<AspectRatio ratio={16 / 9}>\n  <img src="..." alt="..." className="rounded-md object-cover" />\n</AspectRatio>`,
        render: (
          <div className="w-[450px]">
            <AspectRatio ratio={16 / 9} className="bg-muted rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1588345921523-c2dcd27f1dcd?w=800&dpr=2&q=80"
                alt="Photo by Drew Beamer"
                className="object-cover w-full h-full"
                referrerPolicy="no-referrer"
              />
            </AspectRatio>
          </div>
        )
      }
    ],
    props: [
      { name: "ratio", type: "number", default: "1", description: "The aspect ratio to maintain." }
    ],
    usage: `import { AspectRatio } from "@/components/ui/primitives";`
  },
  "scroll-area": {
    title: "Scroll Area",
    description: "Augments native scroll functionality with custom-styled, cross-browser scrollbars.",
    category: "Layout",
    features: ["Custom scrollbars", "Cross-browser consistency", "Smooth scrolling", "Auto-hide support"],
    examples: [
      {
        title: "Default",
        description: "A scrollable area with custom scrollbars.",
        code: `<ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">\n  {content}\n</ScrollArea>`,
        render: (
          <ScrollArea className="h-72 w-48 rounded-md border">
            <div className="p-4">
              <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
              {Array.from({ length: 50 }).map((_, i, a) => (
                <React.Fragment key={i}>
                  <div className="text-sm">v1.2.0-beta.{a.length - i}</div>
                  <Separator className="my-2" />
                </React.Fragment>
              ))}
            </div>
          </ScrollArea>
        )
      }
    ],
    props: [],
    usage: `import { ScrollArea } from "@/components/ui/primitives";`
  },
  "input-otp": {
    title: "Input OTP",
    description: "A specialized input for One-Time Passwords.",
    category: "Forms",
    features: ["Accessible keyboard navigation", "Auto-focus management", "Customizable slots and separators", "Numeric and alphanumeric support"],
    examples: [
      {
        title: "Default",
        description: "A 6-digit OTP input.",
        code: `<InputOTP length={6} onChange={(val) => console.log(val)} />`,
        render: (
          <InputOTP length={6} onChange={() => {}} />
        )
      }
    ],
    props: [
      { name: "maxLength", type: "number", default: "6", description: "The maximum number of characters." }
    ],
    usage: `import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/inputs-advanced";`
  },
  "input-tag": {
    title: "Input Tag",
    description: "An input field for managing a list of tags.",
    category: "Forms",
    features: ["Add/Remove tags", "Duplicate prevention", "Customizable tag appearance", "Keyboard support (Enter to add)"],
    examples: [
      {
        title: "Default",
        description: "A tag input for keywords.",
        code: `<InputTag placeholder="Add tags..." tags={tags} setTags={setTags} />`,
        render: <div className="max-w-md"><InputTag placeholder="Add tags..." tags={["react", "ui", "library"]} setTags={() => {}} /></div>
      }
    ],
    props: [
      { name: "tags", type: "string[]", default: "[]", description: "The list of tags." },
      { name: "setTags", type: "(tags: string[]) => void", default: "-", description: "Callback to update tags." }
    ],
    usage: `import { InputTag } from "@/components/ui/inputs-advanced";`
  },
  "file-upload": {
    title: "File Upload",
    description: "A drag-and-drop file upload component.",
    category: "Forms",
    features: ["Drag and drop support", "File type validation", "Multiple file support", "Progress indicators"],
    examples: [
      {
        title: "Default",
        description: "A standard file upload zone.",
        code: `<FileUpload onUpload={(files) => console.log(files)} />`,
        render: <div className="max-w-md w-full"><FileUpload onUpload={() => {}} /></div>
      }
    ],
    props: [
      { name: "onUpload", type: "(files: File[]) => void", default: "-", description: "Callback when files are selected." }
    ],
    usage: `import { FileUpload } from "@/components/ui/inputs-advanced";`
  },
  "context-menu": {
    title: "Context Menu",
    description: "Displays a menu located at the pointer, triggered by a right-click or long-press.",
    category: "Overlay",
    features: ["Right-click trigger", "Submenus", "Checkboxes and radio items", "Keyboard navigation"],
    examples: [
      {
        title: "Default",
        description: "Right-click the area below to see the menu.",
        code: `<ContextMenu>\n  <ContextMenuTrigger>Right click here</ContextMenuTrigger>\n  <ContextMenuContent>\n    <ContextMenuItem>Back</ContextMenuItem>\n    <ContextMenuItem>Forward</ContextMenuItem>\n  </ContextMenuContent>\n</ContextMenu>`,
        render: (
          <ContextMenu>
            <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
              Right click here
            </ContextMenuTrigger>
            <ContextMenuContent className="w-64">
              <ContextMenuItem inset>Back</ContextMenuItem>
              <ContextMenuItem inset disabled>Forward</ContextMenuItem>
              <ContextMenuItem inset>Reload</ContextMenuItem>
              <DropdownMenuSeparator />
              <ContextMenuItem inset>Save As...</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        )
      }
    ],
    props: [],
    usage: `import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/overlay-advanced";`
  },
  "hover-card": {
    title: "Hover Card",
    description: "For sighted users to preview content available behind a link.",
    category: "Overlay",
    features: ["Hover trigger", "Customizable delay", "Rich content support", "Animated transitions"],
    examples: [
      {
        title: "Default",
        description: "Hover over the trigger to see more info.",
        code: `<HoverCard>\n  <HoverCardTrigger>@nextjs</HoverCardTrigger>\n  <HoverCardContent>The React Framework</HoverCardContent>\n</HoverCard>`,
        render: (
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link">@nextjs</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <Avatar>
                  <AvatarImage src="https://github.com/vercel.png" />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">@nextjs</h4>
                  <p className="text-sm">The React Framework – created and maintained by @vercel.</p>
                  <div className="flex items-center pt-2">
                    <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                    <span className="text-xs text-muted-foreground">Joined December 2021</span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        )
      }
    ],
    props: [],
    usage: `import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/overlay-advanced";`
  },
  menubar: {
    title: "Menubar",
    description: "A visually persistent menu common in desktop applications.",
    category: "Overlay",
    features: ["Multiple top-level menus", "Submenus", "Checkboxes and radio items", "Keyboard navigation"],
    examples: [
      {
        title: "Default",
        description: "A standard application menubar.",
        code: `<Menubar>\n  <MenubarMenu>\n    <MenubarTrigger>File</MenubarTrigger>\n    <MenubarContent>\n      <MenubarItem>New Tab</MenubarItem>\n    </MenubarContent>\n  </MenubarMenu>\n</Menubar>`,
        render: (
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>New Tab <span className="ml-auto text-xs tracking-widest opacity-60">⌘T</span></MenubarItem>
                <MenubarItem>New Window <span className="ml-auto text-xs tracking-widest opacity-60">⌘N</span></MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Share</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Print <span className="ml-auto text-xs tracking-widest opacity-60">⌘P</span></MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Undo <span className="ml-auto text-xs tracking-widest opacity-60">⌘Z</span></MenubarItem>
                <MenubarItem>Redo <span className="ml-auto text-xs tracking-widest opacity-60">⇧⌘Z</span></MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        )
      }
    ],
    props: [],
    usage: `import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/overlay-advanced";`
  },
  "navigation-menu": {
    title: "Navigation Menu",
    description: "A collection of links for navigating websites.",
    category: "Navigation",
    features: ["Rich content dropdowns", "Smooth transitions", "Responsive design", "Accessible keyboard navigation"],
    examples: [
      {
        title: "Default",
        description: "A powerful navigation menu with dropdowns.",
        code: `<NavigationMenu>\n  <NavigationMenuList>\n    <NavigationMenuItem>\n      <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>\n      <NavigationMenuContent>...</NavigationMenuContent>\n    </NavigationMenuItem>\n  </NavigationMenuList>\n</NavigationMenu>`,
        render: (
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md" href="/">
                          <div className="mb-2 mt-4 text-lg font-medium">StructUI</div>
                          <p className="text-sm leading-tight text-muted-foreground">Beautifully designed components built with Radix UI and Tailwind CSS.</p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>Introduction</li>
                    <li>Installation</li>
                    <li>Typography</li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    <li>Alert Dialog</li>
                    <li>Hover Card</li>
                    <li>Progress</li>
                    <li>Scroll Area</li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )
      }
    ],
    props: [],
    usage: `import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-advanced";`
  },
  sheet: {
    title: "Sheet",
    description: "Extends the Dialog component to display content that complements the main content of the screen.",
    category: "Overlay",
    features: ["Side-sliding panels (left, right, top, bottom)", "Overlay support", "Animated transitions", "Accessible focus management"],
    examples: [
      {
        title: "Right Side",
        description: "A standard side drawer sliding from the right.",
        code: `<Sheet>\n  <SheetTrigger>Open</SheetTrigger>\n  <SheetContent side="right">\n    <SheetHeader>\n      <SheetTitle>Edit Profile</SheetTitle>\n    </SheetHeader>\n  </SheetContent>\n</Sheet>`,
        render: (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Open Sheet</Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right">Name</label>
                  <Input id="name" value="Pedro Duarte" className="col-span-3" />
                </div>
              </div>
              <Button type="submit">Save changes</Button>
            </SheetContent>
          </Sheet>
        )
      }
    ],
    props: [
      { name: "side", type: "'top' | 'bottom' | 'left' | 'right'", default: "'right'", description: "The side where the sheet appears." }
    ],
    usage: `import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";`
  },
  "alert-dialog": {
    title: "Alert Dialog",
    description: "A modal dialog that interrupts the user with important content and expects a response.",
    category: "Overlay",
    features: ["Critical confirmations", "Action and Cancel buttons", "Accessible focus trapping", "Animated transitions"],
    examples: [
      {
        title: "Default",
        description: "A confirmation dialog for a destructive action.",
        code: `<AlertDialog>\n  <AlertDialogTrigger>Open</AlertDialogTrigger>\n  <AlertDialogContent>\n    <AlertDialogHeader>\n      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>\n    </AlertDialogHeader>\n    <AlertDialogFooter>\n      <AlertDialogCancel>Cancel</AlertDialogCancel>\n      <AlertDialogAction>Continue</AlertDialogAction>\n    </AlertDialogFooter>\n  </AlertDialogContent>\n</AlertDialog>`,
        render: (
          <div className="w-full h-full flex items-center justify-center">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Show Alert Dialog</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )
      }
    ],
    props: [],
    usage: `import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";`
  },
  card: {
    title: "Card",
    description: "Displays a card with header, content, and footer sections.",
    category: "Layout",
    features: [
      "Composable header, content, and footer",
      "Customizable with className",
      "Responsive by default",
      "Works with any content type",
    ],
    accessibility: [
      "Semantic grouping of related content",
      "Works with screen readers",
    ],
    examples: [
      {
        title: "Default",
        description: "A standard card with header, description, content, and footer.",
        code: `<Card className="w-[350px]">
  <CardHeader>
    <CardTitle>Create project</CardTitle>
    <CardDescription>Deploy your new project in one-click.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
</Card>`,
        render: (
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Create project</CardTitle>
              <CardDescription>Deploy your new project in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Your new project will be configured automatically with best practices.</p>
            </CardContent>
          </Card>
        ),
      },
    ],
    props: [
      { name: "className", type: "string", default: "-", description: "Additional CSS classes for the card." },
    ],
    usage: `import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";`,
  },
  tabs: {
    title: "Tabs",
    description: "A set of layered sections of content — known as tab panels — that are displayed one at a time.",
    category: "Navigation",
    features: [
      "Keyboard navigation (Arrow keys)",
      "Controlled and uncontrolled modes",
      "Custom content in each panel",
      "Animated transitions between tabs",
    ],
    accessibility: [
      "WAI-ARIA Tabs pattern compliant",
      "Keyboard navigation with Arrow keys",
      "Focus management for active tab",
      "Aria-selected and aria-controls attributes",
    ],
    examples: [
      {
        title: "Default",
        description: "A basic tabs component with two panels.",
        code: `<Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings here.</TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent>
</Tabs>`,
        render: (
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="p-4 border rounded-lg mt-2 text-sm text-muted-foreground">
              Make changes to your account here. Click save when you're done.
            </TabsContent>
            <TabsContent value="password" className="p-4 border rounded-lg mt-2 text-sm text-muted-foreground">
              Change your password here. After saving, you'll be logged out.
            </TabsContent>
          </Tabs>
        ),
      },
    ],
    props: [
      { name: "defaultValue", type: "string", default: "-", description: "The default active tab value." },
      { name: "value", type: "string", default: "-", description: "The controlled active tab value." },
      { name: "onValueChange", type: "(value: string) => void", default: "-", description: "Callback when the active tab changes." },
    ],
    usage: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";`,
  },
  "data-table-advanced": {
    title: "Data Table Advanced",
    description: "A powerful data table with search, pagination, column toggling, filtering, and CRUD operations.",
    category: "Data Display",
    features: [
      "Full-text global search",
      "Per-column filtering",
      "Column visibility toggle",
      "Row selection with checkboxes",
      "Pagination with configurable page sizes",
      "Inline CRUD (Add / Edit / Delete)",
      "Sticky header",
      "Sort by any column",
    ],
    accessibility: [
      "Keyboard navigable rows and cells",
      "Aria-labels for action buttons",
      "Screen reader friendly column headers",
    ],
    examples: [
      {
        title: "Full Featured Table",
        description: "A data table with search, pagination, and CRUD operations.",
        code: `import { DataTableAdvanced } from "@/components/ui/data-table-advanced";

const columns = [
  { header: "Name", accessorKey: "name" },
  { header: "Status", accessorKey: "status" },
  { header: "Email", accessorKey: "email" },
];

const data = [
  { id: 1, name: "Alice", status: "Active", email: "alice@example.com" },
  { id: 2, name: "Bob", status: "Inactive", email: "bob@example.com" },
];

<DataTableAdvanced
  data={data}
  columns={columns}
  enableCRUD
  onAdd={() => {}}
  onEdit={(row) => {}}
  onDelete={(row) => {}}
/>`,
        render: (
          <DataTableAdvanced
            data={[
              { id: 1, name: "Alice Johnson", status: "Active", email: "alice@example.com" },
              { id: 2, name: "Bob Smith", status: "Inactive", email: "bob@example.com" },
              { id: 3, name: "Carol Davis", status: "Active", email: "carol@example.com" },
            ]}
            columns={[
              { header: "Name", accessorKey: "name" },
              { header: "Status", accessorKey: "status" },
              { header: "Email", accessorKey: "email" },
            ]}
          />
        ),
      },
    ],
    props: [
      { name: "data", type: "TData[]", default: "[]", description: "Array of data objects to display." },
      { name: "columns", type: "ColumnDef[]", default: "[]", description: "Column definitions for the table." },
      { name: "enableCRUD", type: "boolean", default: "false", description: "Enables Add, Edit, Delete action buttons." },
      { name: "onAdd", type: "() => void", default: "-", description: "Callback when the Add Row button is clicked." },
      { name: "onEdit", type: "(row: TData) => void", default: "-", description: "Callback when Edit is clicked for a row." },
      { name: "onDelete", type: "(row: TData) => void", default: "-", description: "Callback when Delete is clicked for a row." },
    ],
    usage: `import { DataTableAdvanced } from "@/components/ui/data-table-advanced";`,
  },
  typography: {
    title: "Typography",
    description: "A collection of typographic components for headings, paragraphs, and inline text.",
    category: "General",
    features: [
      "Semantic HTML elements",
      "Consistent scale and spacing",
      "Responsive font sizes",
      "Muted and lead variants",
    ],
    accessibility: [
      "Proper heading hierarchy for screen readers",
      "Sufficient contrast ratios",
    ],
    examples: [
      {
        title: "Headings",
        description: "Typographic scale from h1 to h4.",
        code: `<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Heading 1</h1>
<h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">Heading 2</h2>
<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Heading 3</h3>
<p className="leading-7">Paragraph text with comfortable line height.</p>`,
        render: (
          <div className="space-y-4 max-w-md">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Heading 1</h1>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Heading 2</h2>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Heading 3</h3>
            <p className="leading-7">The king, seeing how much happier his subjects were, realized the error of his ways and ordered his kingdom to be ruled with kindness.</p>
            <p className="text-sm text-muted-foreground">Small muted text for secondary information.</p>
          </div>
        ),
      },
    ],
    props: [],
    usage: `// Tailwind utility classes for typography
<h1 className="text-4xl font-extrabold tracking-tight">Heading</h1>
<p className="text-muted-foreground leading-7">Paragraph</p>`,
  },
  "radio-group": {
    title: "Radio Group",
    description: "A set of radio buttons where only one option can be selected at a time.",
    category: "Forms",
    features: [
      "Single selection from a group",
      "Controlled and uncontrolled modes",
      "Custom radio appearance",
      "Keyboard navigation",
    ],
    accessibility: [
      "WAI-ARIA Radio Group pattern",
      "Keyboard support (Arrow keys to navigate)",
      "Label association for screen readers",
    ],
    examples: [
      {
        title: "Default",
        description: "A standard radio group for single selection.",
        code: `<div className="space-y-2">
  {["Option 1", "Option 2", "Option 3"].map((option) => (
    <label key={option} className="flex items-center gap-2 cursor-pointer">
      <input type="radio" name="demo" value={option} className="accent-primary" />
      {option}
    </label>
  ))}
</div>`,
        render: (
          <div className="space-y-3">
            {["Comfortable", "Compact", "Spacious"].map((option) => (
              <label key={option} className="flex items-center gap-3 cursor-pointer group">
                <div className="h-4 w-4 rounded-full border-2 border-primary flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-primary opacity-0 group-has-[:checked]:opacity-100 transition-opacity" />
                </div>
                <input type="radio" name="layout-demo" value={option} className="sr-only" />
                <span className="text-sm font-medium">{option}</span>
              </label>
            ))}
          </div>
        ),
      },
    ],
    props: [
      { name: "value", type: "string", default: "-", description: "The controlled selected value." },
      { name: "onValueChange", type: "(value: string) => void", default: "-", description: "Callback when selection changes." },
    ],
    usage: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";`,
  },
  toggle: {
    title: "Toggle",
    description: "A two-state button that can be either on or off.",
    category: "Forms",
    features: [
      "Pressed/unpressed state",
      "Multiple variants (default, outline)",
      "Size variants",
      "Can be grouped for exclusive selection",
    ],
    accessibility: [
      "WAI-ARIA Toggle Button pattern",
      "Aria-pressed attribute",
      "Keyboard support (Space/Enter)",
    ],
    examples: [
      {
        title: "Default",
        description: "A basic toggle button.",
        code: `<Toggle aria-label="Toggle italic">B</Toggle>`,
        render: (
          <div className="flex gap-2">
            <Toggle aria-label="Bold">B</Toggle>
            <Toggle aria-label="Italic" variant="outline">I</Toggle>
            <Toggle aria-label="Underline" size="sm">U</Toggle>
          </div>
        ),
      },
    ],
    props: [
      { name: "pressed", type: "boolean", default: "false", description: "The controlled pressed state." },
      { name: "variant", type: "'default' | 'outline'", default: "'default'", description: "The visual variant." },
      { name: "size", type: "'default' | 'sm' | 'lg'", default: "'default'", description: "The size of the toggle." },
    ],
    usage: `import { Toggle } from "@/components/ui/inputs-advanced";`,
  },
  toast: {
    title: "Toast",
    description: "A succinct message that is displayed temporarily to provide feedback.",
    category: "Feedback",
    features: [
      "4 variants: success, error, info, warning",
      "Auto-dismiss with configurable duration",
      "Stacked notifications",
      "Accessible live region",
    ],
    accessibility: [
      "Aria-live region for announcements",
      "Role='status' for non-critical messages",
      "Keyboard dismissible",
    ],
    examples: [
      {
        title: "Variants",
        description: "Toast notifications with different severity levels.",
        code: `const { toast } = useToast();

toast({ title: "Success", description: "Changes saved.", type: "success" });
toast({ title: "Error", description: "Something failed.", type: "error" });
toast({ title: "Info", description: "Update available.", type: "info" });
toast({ title: "Warning", description: "Expires soon.", type: "warning" });`,
        render: (() => {
          const ToastDemo = () => {
            const { toast } = useToast();
            return (
              <div className="flex flex-wrap gap-3">
                <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white" onClick={() => toast({ title: "Success!", description: "Changes saved.", type: "success" })}>Success</Button>
                <Button size="sm" variant="destructive" onClick={() => toast({ title: "Error", description: "Something went wrong.", type: "error" })}>Error</Button>
                <Button size="sm" variant="outline" onClick={() => toast({ title: "Info", description: "Update available.", type: "info" })}>Info</Button>
                <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white" onClick={() => toast({ title: "Warning", description: "Expires in 3 days.", type: "warning" })}>Warning</Button>
              </div>
            );
          };
          return <ToastDemo />;
        })(),
      },
    ],
    props: [
      { name: "title", type: "string", default: "-", description: "The main heading of the toast." },
      { name: "description", type: "string", default: "-", description: "Optional supporting text." },
      { name: "type", type: "'success' | 'error' | 'info' | 'warning'", default: "'info'", description: "Controls the icon and color." },
      { name: "duration", type: "number", default: "4000", description: "Auto-dismiss delay in milliseconds." },
    ],
    usage: `import { useToast } from "@/components/ui/toast";

export function MyComponent() {
  const { toast } = useToast();
  return (
    <button onClick={() => toast({ title: "Done!", type: "success" })}>
      Save
    </button>
  );
}`,
  },
  hero: {
    title: "Hero",
    description: "A full-featured hero section component for landing pages.",
    category: "Advanced",
    features: [
      "Animated headline and CTA",
      "Customizable badge/chip",
      "Social proof avatars",
      "Dark mode support",
    ],
    accessibility: [
      "Semantic heading hierarchy",
      "Keyboard navigable CTAs",
      "Alt text for images",
    ],
    examples: [
      {
        title: "Default Hero",
        description: "A ready-to-use hero section.",
        code: `import { Hero } from "@/components/ui/hero";

<Hero />`,
        render: (
          <div className="border rounded-2xl overflow-hidden bg-background w-full">
            <Hero />
          </div>
        ),
      },
    ],
    props: [],
    usage: `import { Hero } from "@/components/ui/hero";

export default function LandingPage() {
  return <Hero />;
}`,
  },
};

export const ComponentDetail = () => {
  const { componentId } = useParams();
  const data = componentId ? componentData[componentId] : null;

  if (!data) {
    // Fallback for components not yet fully documented in this detailed view
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <Layers className="h-12 w-12 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Documentation in Progress</h1>
        <p className="text-muted-foreground mb-8">We are currently working on detailed documentation for "{componentId}".</p>
        <Button asChild>
          <Link to="/components">Back to Components</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-12 pb-24 mt-8">
      <div className="flex-1 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="rounded-sm px-1.5">{data.category}</Badge>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight">{data.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            {data.description}
          </p>
          <div className="flex gap-4 pt-2">
            <Button variant="outline" size="sm" className="gap-2">
              <ExternalLink className="h-4 w-4" /> Docs
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Info className="h-4 w-4" /> Report Issue
            </Button>
          </div>
        </div>

        {/* Installation */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Installation</h2>
          <Tabs defaultValue="cli" className="w-full">
            <TabsList>
              <TabsTrigger value="cli">CLI</TabsTrigger>
              <TabsTrigger value="manual">Manual</TabsTrigger>
            </TabsList>
            <TabsContent value="cli">
              <CodeBlock code={`npx struct-ui add ${componentId}`} language="bash" />
            </TabsContent>
            <TabsContent value="manual">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Copy the source file into your <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">src/components/ui/</code> directory:</p>
                <CodeBlock code={`# 1. Copy the component file
cp node_modules/struct-ui/src/components/ui/${componentId}.tsx src/components/ui/

# 2. Or manually create src/components/ui/${componentId}.tsx
# 3. Import as: import { ... } from "@/components/ui/${componentId}"`} language="bash" />
                {data.usage && (
                  <div>
                    <p className="text-sm font-medium mb-2">Full source usage:</p>
                    <CodeBlock code={data.usage} />
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Usage */}
        {data.usage && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Usage</h2>
            <CodeBlock code={data.usage} />
          </div>
        )}

        {/* Examples */}
        <div className="space-y-12">
          <h2 className="text-3xl font-bold tracking-tight">Examples</h2>
          {data.examples.map((example, index) => (
            <div key={index} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-bold">{example.title}</h3>
                <p className="text-muted-foreground">{example.description}</p>
              </div>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="grid w-[200px] grid-cols-2">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="mt-4">
                  <div className="flex items-center justify-center p-12 border rounded-xl bg-muted/10 min-h-[200px]">
                    {example.render}
                  </div>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={example.code} />
                </TabsContent>
              </Tabs>
            </div>
          ))}
        </div>

        {/* Props */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Props</h2>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[150px]">Prop</TableHead>
                  <TableHead className="w-[200px]">Type</TableHead>
                  <TableHead className="w-[100px]">Default</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.props.map((prop) => (
                  <TableRow key={prop.name}>
                    <TableCell className="font-mono text-sm font-bold text-primary">{prop.name}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{prop.type}</TableCell>
                    <TableCell className="font-mono text-xs">{prop.default}</TableCell>
                    <TableCell className="text-sm">{prop.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:w-80 space-y-8">
        {data.features && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Layers className="h-4 w-4" /> Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {data.features.map((feature, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-primary">•</span> {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {data.accessibility && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MousePointer2 className="h-4 w-4" /> Accessibility
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {data.accessibility.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-primary">•</span> {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="h-4 w-4" /> Quick Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase text-muted-foreground">Category</p>
              <p className="text-sm">{data.category}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase text-muted-foreground">Package</p>
              <p className="text-sm font-mono">@struct-ui/{componentId}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
