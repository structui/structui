"use client";

import { useState } from "react";
import { Check, ChevronDown, Package, TrendingUp, Users } from "lucide-react";

import { ActivityFeed, sampleActivityFeed } from "@/src/components/ui/activity-feed";
import { NotificationCenter } from "@/src/components/ui/notification-center";
import { ProfileCard } from "@/src/components/ui/profile-card";
import {
  FormWizard,
  MultiStepForm,
  MultiStepFormIndicator,
  MultiStepFormNavigation,
  MultiStepFormProgress,
  MultiStepFormStepContent,
} from "@/src/components/ui/multi-step-form";
import { VirtualList, generateVirtualListData } from "@/src/components/ui/virtual-list";
import { FileTreeView, sampleFileTree, TreeView } from "@/src/components/ui/tree-view";
import { SplitPane, TriplePane } from "@/src/components/ui/split-pane";
import { DataGrid, sampleGridColumns, generateGridData } from "@/src/components/ui/data-grid";
import { SortableTaskList, SortableChipList } from "@/src/components/ui/drag-list";

import { PinCard } from "@/src/components/ui/3d-pin";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/src/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { BentoGrid, BentoGridItem } from "@/src/components/ui/bento-grid";
import { Button } from "@/src/components/ui/button";
import { Calendar } from "@/src/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { AreaChartComponent, BarChartComponent } from "@/src/components/ui/charts";
import { Checkbox } from "@/src/components/ui/checkbox";
import { CodeBlock } from "@/src/components/ui/code-block";
import { Combobox } from "@/src/components/ui/combobox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/components/ui/command";
import { DataTableAdvanced } from "@/src/components/ui/data-table-advanced";
import { IPhoneMockup, LaptopMockup } from "@/src/components/ui/device-mockups";
import { SignInModal } from "@/src/components/ui/dialogs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu";
import { Alert, AlertDescription, AlertTitle, Progress } from "@/src/components/ui/feedback";
import { Hero } from "@/src/components/ui/hero";
import { Input } from "@/src/components/ui/input";
import { Toggle, ToggleGroup, ToggleGroupItem, InputOTP, InputTag, FileUpload } from "@/src/components/ui/inputs-advanced";
import { KanbanBoard } from "@/src/components/ui/kanban";
import { Spinner1, Spinner2, Spinner4, Loader1, Loader3 } from "@/src/components/ui/loaders";
import { MarkdownEditor } from "@/src/components/ui/markdown-editor";
import { Breadcrumbs, Pagination } from "@/src/components/ui/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/src/components/ui/navigation-advanced";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/src/components/ui/overlay-advanced";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { AspectRatio, ScrollArea, Separator } from "@/src/components/ui/primitives";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/src/components/ui/sheet";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Slider } from "@/src/components/ui/slider";
import { Snippet } from "@/src/components/ui/snippet";
import { Spinner } from "@/src/components/ui/spinner";
import { StatsCard, StatsGrid } from "@/src/components/ui/stats";
import { Stepper } from "@/src/components/ui/stepper";
import { Switch } from "@/src/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Textarea } from "@/src/components/ui/textarea";
import { Timeline, activityLog } from "@/src/components/ui/timeline";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/src/components/ui/tooltip";

const chartData = [
  { name: "Jan", value: 1200 },
  { name: "Feb", value: 2100 },
  { name: "Mar", value: 1800 },
  { name: "Apr", value: 2600 },
  { name: "May", value: 3200 },
];

const kanbanColumns = [
  {
    id: "todo",
    title: "Backlog",
    tasks: [
      {
        id: "k1",
        title: "Improve preview coverage",
        description: "Restore richer previews for real component pages.",
        priority: "high" as const,
        tags: ["ui", "docs"],
      },
      {
        id: "k2",
        title: "Refine sidebar transitions",
        description: "Keep navigation stable while switching components.",
        priority: "medium" as const,
        tags: ["ux"],
      },
    ],
  },
  {
    id: "progress",
    title: "In Progress",
    tasks: [
      {
        id: "k3",
        title: "Wire GitHub stars",
        description: "Fetch live repository stars in the navbar.",
        priority: "medium" as const,
        tags: ["api", "navbar"],
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    tasks: [
      {
        id: "k4",
        title: "App Router migration",
        description: "Replace legacy visible routes with native app pages.",
        priority: "low" as const,
        tags: ["nextjs"],
      },
    ],
  },
];

const calendarEvents = [
  { id: "e1", title: "Design review", date: new Date(), type: "meeting" as const },
  { id: "e2", title: "Ship blocks page", date: new Date(), type: "task" as const },
  { id: "e3", title: "Billing reminder", date: new Date(Date.now() + 86400000 * 2), type: "reminder" as const },
];

const comboboxOptions = [
  { value: "button", label: "Button" },
  { value: "dialog", label: "Dialog" },
  { value: "kanban", label: "Kanban" },
];

const tableRows = [
  { team: "Platform", owner: "Ava", status: "Stable" },
  { team: "Growth", owner: "Leo", status: "Review" },
  { team: "Ops", owner: "Mina", status: "Blocked" },
];

const dataTableColumns = [
  { accessorKey: "team", header: "Team" },
  { accessorKey: "owner", header: "Owner" },
  { accessorKey: "status", header: "Status" },
];

function ConceptPreview({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-muted/10 p-8">
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export function ComponentPreview({ slug }: { slug: string }) {
  const [checked, setChecked] = useState(true);
  const [enabled, setEnabled] = useState(false);
  const [comboboxValue, setComboboxValue] = useState("");
  const [markdownValue, setMarkdownValue] = useState("## Preview\n\nLive markdown preview for StructUI.");
  const [tags, setTags] = useState(["registry", "preview"]);
  const [page, setPage] = useState(2);

  switch (slug) {
    case "3d-pin":
      return (
        <div className="max-w-sm">
          <PinCard
            title="3D Preview Card"
            label="Live Preview"
            description="Tilt, sheen, and floating label behavior are active here."
            header={
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 via-background to-primary/5 text-sm font-medium">
                Hover me
              </div>
            }
          />
        </div>
      );
    case "accordion":
      return (
        <Accordion type="single" collapsible className="w-full max-w-2xl">
          <AccordionItem value="registry">
            <AccordionTrigger>Registry-first structure</AccordionTrigger>
            <AccordionContent>
              Component cards and detail pages now come from actual source files.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="docs">
            <AccordionTrigger>Markdown-backed docs</AccordionTrigger>
            <AccordionContent>
              Each markdown file under content becomes a real docs page.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    case "alert-dialog":
      return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete item</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this record?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    case "avatar":
      return (
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>SU</AvatarFallback>
          </Avatar>
          <Avatar className="h-12 w-12">
            <AvatarFallback>UI</AvatarFallback>
          </Avatar>
          <div className="text-sm text-muted-foreground">
            Avatar supports image-first rendering with graceful fallback content.
          </div>
        </div>
      );
    case "badge":
      return (
        <div className="flex flex-wrap gap-3">
          <Badge>Stable</Badge>
          <Badge variant="secondary">Draft</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Danger</Badge>
        </div>
      );
    case "bento-grid":
      return (
        <BentoGrid className="md:auto-rows-[12rem]">
          <BentoGridItem
            title="Source-owned"
            description="Preview cards can reflect real component behavior."
            className="md:col-span-2"
            header={<div className="h-full w-full bg-gradient-to-br from-primary/10 to-background" />}
          />
          <BentoGridItem
            title="Docs-linked"
            description="Every component page exposes preview, code, and docs."
            header={<div className="h-full w-full bg-muted/30" />}
          />
        </BentoGrid>
      );
    case "button":
      return (
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      );
    case "calendar":
      return <Calendar events={calendarEvents} />;
    case "card":
      return (
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Source-first component</CardTitle>
            <CardDescription>Cards point directly to a real source file.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Copy the code, inspect dependencies, and open docs from a single detail page.
          </CardContent>
        </Card>
      );
    case "charts":
      return (
        <div className="grid gap-4 lg:grid-cols-2">
          <AreaChartComponent title="Revenue" description="Monthly run rate" data={chartData} />
          <BarChartComponent title="Growth" description="New accounts" data={chartData} />
        </div>
      );
    case "checkbox":
      return (
        <label className="flex items-center gap-3 text-sm">
          <Checkbox checked={checked} onCheckedChange={(value) => setChecked(Boolean(value))} />
          Show code tab content for manual install
        </label>
      );
    case "code-block":
      return <CodeBlock code={`const preview = "live";`} language="tsx" />;
    case "combobox":
      return (
        <div className="max-w-sm">
          <Combobox
            options={comboboxOptions}
            value={comboboxValue}
            onValueChange={setComboboxValue}
            placeholder="Select component"
          />
        </div>
      );
    case "command":
      return (
        <div className="max-w-md overflow-hidden rounded-xl border">
          <Command>
            <CommandInput placeholder="Search components..." />
            <CommandList>
              <CommandEmpty>No results.</CommandEmpty>
              <CommandGroup heading="Components">
                <CommandItem>Button</CommandItem>
                <CommandItem>Accordion</CommandItem>
                <CommandItem>Kanban</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      );
    case "command-palette":
      return (
        <ConceptPreview
          title="Command Palette"
          description="Global search entrypoint preview. The full site command palette is also available from the navbar."
        />
      );
    case "cookies-banner":
      return (
        <div className="max-w-md rounded-3xl border bg-background/90 p-6 shadow-lg">
          <div className="space-y-2">
            <div className="text-sm font-semibold">We use cookies</div>
            <p className="text-sm text-muted-foreground">
              Cookie banner preview card for consent messaging and actions.
            </p>
          </div>
          <div className="mt-5 flex gap-3">
            <Button size="sm" className="flex-1">Accept</Button>
            <Button size="sm" variant="outline" className="flex-1">Reject</Button>
          </div>
        </div>
      );
    case "data-table-advanced":
      return (
        <DataTableAdvanced
          columns={dataTableColumns}
          data={tableRows}
          title="Team overview"
          searchPlaceholder="Search table..."
        />
      );
    case "device-mockups":
      return (
        <div className="grid gap-8 lg:grid-cols-2">
          <IPhoneMockup className="scale-75 origin-top">
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 to-background text-sm font-medium">
              Mobile app
            </div>
          </IPhoneMockup>
          <LaptopMockup className="scale-90 origin-top">
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-muted/50 to-background text-sm font-medium">
              Desktop dashboard
            </div>
          </LaptopMockup>
        </div>
      );
    case "dialogs":
      return <SignInModal />;
    case "dropdown-menu":
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Open menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    case "feedback":
      return (
        <div className="w-full max-w-xl space-y-4">
          <Alert>
            <AlertTitle>Deployment complete</AlertTitle>
            <AlertDescription>Your latest version is now live.</AlertDescription>
          </Alert>
          <Progress value={68} />
        </div>
      );
    case "form-advanced":
      return (
        <div className="grid max-w-xl gap-4 rounded-2xl border p-5">
          <Input placeholder="Company email" />
          <Textarea placeholder="Project requirements" />
          <div className="flex gap-3">
            <Button>Submit</Button>
            <Button variant="outline">Save Draft</Button>
          </div>
        </div>
      );
    case "hero":
      return (
        <div className="-mx-4 rounded-2xl border sm:mx-0">
          <Hero />
        </div>
      );
    case "input":
      return (
        <div className="grid max-w-xl gap-4">
          <Input placeholder="Search components..." />
          <Input placeholder="Disabled state" disabled />
        </div>
      );
    case "inputs-advanced":
      return (
        <div className="grid max-w-2xl gap-5">
          <div className="flex flex-wrap gap-2">
            <Toggle defaultPressed>Bold</Toggle>
            <Toggle variant="outline">Italic</Toggle>
          </div>
          <ToggleGroup type="single" defaultValue="week">
            <ToggleGroupItem value="day">Day</ToggleGroupItem>
            <ToggleGroupItem value="week">Week</ToggleGroupItem>
            <ToggleGroupItem value="month">Month</ToggleGroupItem>
          </ToggleGroup>
          <InputOTP />
          <InputTag tags={tags} setTags={setTags} />
          <FileUpload />
        </div>
      );
    case "kanban":
      return <KanbanBoard columns={kanbanColumns} className="max-w-full" />;
    case "loaders":
      return (
        <div className="flex flex-wrap items-center gap-6">
          <Spinner1 />
          <Spinner2 />
          <Spinner4 />
          <Loader1 className="w-40" />
          <Loader3 className="w-40" />
        </div>
      );
    case "markdown-editor":
      return (
        <MarkdownEditor
          value={markdownValue}
          onChange={setMarkdownValue}
          placeholder="Write markdown..."
        />
      );
    case "navigation":
      return (
        <div className="space-y-6">
          <Breadcrumbs
            items={[
              { label: "Docs", href: "/docs" },
              { label: "Components", href: "/components" },
              { label: "Navigation", active: true },
            ]}
          />
          <Pagination currentPage={page} totalPages={5} onPageChange={setPage} />
        </div>
      );
    case "navigation-advanced":
      return (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-2 p-4 md:w-[320px]">
                  <NavigationMenuLink asChild>
                    <a className="rounded-lg border p-3" href="#preview">
                      Component previews
                    </a>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <a className="rounded-lg border p-3" href="#code">
                      Source-first install
                    </a>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      );
    case "overlay-advanced":
      return (
        <div className="flex flex-wrap items-center gap-4">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="outline">Hover card</Button>
            </HoverCardTrigger>
            <HoverCardContent>Quick preview content</HoverCardContent>
          </HoverCard>
          <ContextMenu>
            <ContextMenuTrigger className="rounded-xl border px-4 py-3 text-sm text-muted-foreground">
              Right click area
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>Rename</ContextMenuItem>
              <ContextMenuItem>Duplicate</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>New</MenubarItem>
                <MenubarItem>Save</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      );
    case "popover":
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            Quick settings and secondary actions fit well in this pattern.
          </PopoverContent>
        </Popover>
      );
    case "pricing":
      return (
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            { name: "Starter", price: "$0", cta: "Get Started" },
            { name: "Pro", price: "$29", cta: "Start Trial", featured: true },
            { name: "Enterprise", price: "$99", cta: "Contact Sales" },
          ].map((plan) => (
            <Card key={plan.name} className={plan.featured ? "border-primary shadow-lg shadow-primary/10" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.featured ? <Badge>Popular</Badge> : null}
                </div>
                <CardDescription>Preview of a pricing card layout.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold">{plan.price}</div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>Unlimited components</div>
                  <div>Source ownership</div>
                  <div>Production-ready setup</div>
                </div>
                <Button className="w-full" variant={plan.featured ? "default" : "outline"}>
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    case "primitives":
      return (
        <div className="grid gap-6">
          <Separator />
          <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-2xl border bg-muted/20">
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">16:9 ratio box</div>
          </AspectRatio>
          <ScrollArea className="h-28 max-w-md rounded-xl border p-4">
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="rounded-lg border p-3 text-sm text-muted-foreground">
                  Scroll item {index + 1}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      );
    case "radio-group":
      return (
        <RadioGroup defaultValue="pro" className="gap-4">
          <label className="flex items-center gap-3 rounded-xl border p-3">
            <RadioGroupItem value="starter" />
            <span className="text-sm">Starter</span>
          </label>
          <label className="flex items-center gap-3 rounded-xl border p-3">
            <RadioGroupItem value="pro" />
            <span className="text-sm">Pro</span>
          </label>
        </RadioGroup>
      );
    case "select":
      return (
        <Select>
          <SelectTrigger className="max-w-xs">
            <SelectValue placeholder="Choose a component" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="button">Button</SelectItem>
            <SelectItem value="badge">Badge</SelectItem>
            <SelectItem value="accordion">Accordion</SelectItem>
          </SelectContent>
        </Select>
      );
    case "sheet":
      return (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Adjust layout and display settings.</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      );
    case "skeleton":
      return (
        <div className="grid gap-4 max-w-md">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-10 w-28" />
        </div>
      );
    case "slider":
      return (
        <div className="max-w-md">
          <Slider defaultValue={[42]} max={100} step={1} />
        </div>
      );
    case "snippet":
      return (
        <Snippet code={`npm install structui\nnpx sui add button`} language="bash" filename="install.sh" />
      );
    case "spinner":
      return <Spinner className="h-8 w-8" />;
    case "stats":
      return (
        <StatsGrid className="grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
          <StatsCard
            title="Revenue"
            value="$48,240"
            trend={{ value: "+12.4%", isUp: true }}
            icon={<TrendingUp className="h-4 w-4" />}
          />
          <StatsCard
            title="Users"
            value="12.8k"
            trend={{ value: "+5.1%", isUp: true }}
            icon={<Users className="h-4 w-4" />}
          />
          <StatsCard
            title="Shipments"
            value="128"
            description="This week"
            icon={<Package className="h-4 w-4" />}
          />
        </StatsGrid>
      );
    case "stepper":
      return <Stepper steps={["Account", "Workspace", "Launch"]} currentStep={1} className="max-w-xl" />;
    case "switch":
      return (
        <div className="flex items-center gap-3 text-sm">
          <Switch checked={enabled} onCheckedChange={setEnabled} />
          <span>{enabled ? "Enabled" : "Disabled"}</span>
        </div>
      );
    case "table":
      return (
        <div className="rounded-2xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Velocity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Platform</TableCell>
                <TableCell>Stable</TableCell>
                <TableCell>+14%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Growth</TableCell>
                <TableCell>Review</TableCell>
                <TableCell>+8%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ops</TableCell>
                <TableCell>Blocked</TableCell>
                <TableCell>-2%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      );
    case "tabs":
      return (
        <Tabs defaultValue="preview" className="max-w-xl">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="docs">Docs</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="text-sm text-muted-foreground">
            Live preview for supported components.
          </TabsContent>
          <TabsContent value="code" className="text-sm text-muted-foreground">
            Real source path and copy-paste steps.
          </TabsContent>
          <TabsContent value="docs" className="text-sm text-muted-foreground">
            Markdown docs rendered as HTML pages.
          </TabsContent>
        </Tabs>
      );
    case "textarea":
      return <Textarea className="max-w-xl min-h-32" placeholder="Write a longer message..." />;
    case "timeline":
      return <Timeline items={activityLog.slice(0, 4)} className="max-w-2xl" />;
    case "toast":
      return (
        <div className="flex flex-wrap gap-3">
          <Button variant="default">Success toast</Button>
          <Button variant="outline">Info toast</Button>
          <Button variant="destructive">Error toast</Button>
        </div>
      );
    case "tooltip":
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover for tooltip</Button>
            </TooltipTrigger>
            <TooltipContent>Tooltip preview content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    case "notification-center":
      return (
        <div className="flex justify-start">
          <NotificationCenter />
        </div>
      );

    case "profile-card": {
      return (
        <div className="grid max-w-3xl gap-6 lg:grid-cols-2">
          <ProfileCard
            name="Alex Chen"
            username="alexchen"
            role="Senior Frontend Engineer"
            bio="Building open-source UI libraries. Obsessed with developer experience."
            status="online"
            location="San Francisco, CA"
            company="StructUI"
            stats={[
              { label: "Repos", value: 42 },
              { label: "Stars", value: "1.2k" },
              { label: "PRs", value: 186 },
            ]}
            skills={["React", "TypeScript", "Tailwind", "Next.js"]}
            socials={[
              { type: "github", href: "#", label: "GitHub" },
              { type: "twitter", href: "#", label: "Twitter" },
              { type: "website", href: "#", label: "Website" },
            ]}
          />
          <div className="space-y-3">
            <ProfileCard
              name="Mina Park"
              username="minapark"
              role="Design Engineer"
              status="away"
              variant="compact"
            />
            <ProfileCard
              name="Leo Torres"
              username="leotorres"
              role="Backend Engineer"
              status="busy"
              variant="compact"
            />
            <ProfileCard
              name="Sara Lee"
              username="saralee"
              role="Product Designer"
              status="offline"
              variant="compact"
            />
          </div>
        </div>
      );
    }

    case "activity-feed":
      return (
        <div className="max-w-2xl">
          <ActivityFeed events={sampleActivityFeed} maxItems={4} />
        </div>
      );

    case "virtual-list": {
      const data = generateVirtualListData(500);
      return (
        <div className="w-full">
          <VirtualList
            items={data}
            height={380}
            rowHeight={44}
            columns={[
              { key: "name", header: "Name", width: "25%", sortable: true },
              {
                key: "status", header: "Status", width: "15%", sortable: true,
                render: (v) => {
                  const s = String(v);
                  const c: Record<string, string> = { Active: "text-emerald-600 bg-emerald-500/10", Inactive: "text-slate-500 bg-slate-500/10", Trial: "text-amber-600 bg-amber-500/10", Suspended: "text-rose-600 bg-rose-500/10" };
                  return <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${c[s] ?? ""}`}>{s}</span>;
                }
              },
              { key: "role", header: "Role", width: "15%", sortable: true },
              { key: "plan", header: "Plan", width: "15%", sortable: true },
              { key: "mrr", header: "MRR", width: "15%", sortable: true },
              { key: "joined", header: "Joined", width: "15%", sortable: true },
            ]}
            searchable
          />
          <p className="mt-2 text-xs text-muted-foreground">Rendering 500 rows with @tanstack/react-virtual — only visible rows in DOM.</p>
        </div>
      );
    }

    case "tree-view":
      return (
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-semibold text-muted-foreground">File Explorer</p>
            <FileTreeView nodes={sampleFileTree} className="h-72" />
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold text-muted-foreground">Basic Tree</p>
            <TreeView
              nodes={sampleFileTree.slice(0, 3)}
              showIcons
              defaultExpandedIds={new Set(["app", "src"])}
              className="h-72 overflow-y-auto"
            />
          </div>
        </div>
      );

    case "split-pane":
      return (
        <div className="space-y-6">
          <div>
            <p className="mb-2 text-xs font-semibold text-muted-foreground">Horizontal split — drag the divider</p>
            <SplitPane direction="horizontal" defaultSize={40} storageKey="demo-h" className="h-52 overflow-hidden rounded-2xl border">
              <div className="flex h-full items-center justify-center bg-muted/20 text-sm font-medium text-muted-foreground">Left panel</div>
              <div className="flex h-full items-center justify-center bg-background text-sm font-medium text-muted-foreground">Right panel</div>
            </SplitPane>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold text-muted-foreground">Vertical split</p>
            <SplitPane direction="vertical" defaultSize={40} storageKey="demo-v" className="h-52 overflow-hidden rounded-2xl border">
              <div className="flex h-full items-center justify-center bg-muted/20 text-sm font-medium text-muted-foreground">Top panel</div>
              <div className="flex h-full items-center justify-center bg-background text-sm font-medium text-muted-foreground">Bottom panel</div>
            </SplitPane>
          </div>
        </div>
      );

    case "data-grid":
      return (
        <div className="w-full">
          <DataGrid
            columns={sampleGridColumns}
            rows={generateGridData(40)}
            title="Customer Records"
            height={380}
            selectable
            addable
            deletable
            downloadable
          />
          <p className="mt-2 text-xs text-muted-foreground">Double-click any cell to edit · Click column header to sort · Checkbox to multi-select</p>
        </div>
      );

    case "drag-list":
      return (
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-semibold text-muted-foreground">Sortable task list</p>
            <SortableTaskList />
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold text-muted-foreground">Sortable chip list — drag to reorder</p>
            <SortableChipList />
          </div>
        </div>
      );

    case "multi-step-form": {
      const wizardSteps = [
        {
          id: "account",
          title: "Account",
          description: "Set up your login credentials.",
          content: (
            <div className="space-y-3">
              <Input placeholder="Email address" />
              <Input type="password" placeholder="Password" />
            </div>
          ),
        },
        {
          id: "profile",
          title: "Profile",
          description: "Tell us a bit about yourself.",
          content: (
            <div className="space-y-3">
              <Input placeholder="Full name" />
              <Input placeholder="Company (optional)" />
            </div>
          ),
        },
        {
          id: "launch",
          title: "Launch",
          description: "Review and finish setup.",
          optional: true,
          content: (
            <div className="rounded-xl border bg-muted/20 p-4 space-y-2">
              <p className="text-sm font-medium">Everything looks good!</p>
              <p className="text-sm text-muted-foreground">
                Click &quot;Complete&quot; to finish setting up your account.
              </p>
            </div>
          ),
        },
      ];
      return (
        <div className="max-w-xl">
          <FormWizard steps={wizardSteps} />
        </div>
      );
    }

    default:
      return (
        <ConceptPreview
          title="Preview available"
          description={`A concrete inline preview is now provided for this component family (${slug}).`}
        />
      );
  }
}

export function ComponentIcon({ slug }: { slug: string }) {
  if (slug === "accordion") {
    return <ChevronDown className="h-4 w-4" />;
  }

  if (slug === "checkbox") {
    return <Check className="h-4 w-4" />;
  }

  return null;
}
