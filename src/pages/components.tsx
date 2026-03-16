import React from "react";
import { Routes, Route } from "react-router-dom";
import { Sidebar } from "@/src/components/sidebar";
import { ComponentsIndex } from "./components/index";
import { ComponentDetail } from "./components/component-detail";

export const ComponentsPage = () => {
  const sidebarItems = [
    {
      title: "Getting Started",
      items: [
        { title: "Introduction", href: "/docs" },
        { title: "Installation", href: "/docs#installation" },
      ],
    },
    {
      title: "General",
      items: [
        { title: "Overview", href: "/components" },
        { title: "Button", href: "/components/button" },
        { title: "Badge", href: "/components/badge" },
        { title: "Loaders & Spinners", href: "/components/loaders" },
        { title: "Typography", href: "/components/typography" },
      ],
    },
    {
      title: "Layout",
      items: [
        { title: "Card", href: "/components/card" },
        { title: "Bento Grid", href: "/components/bento-grid" },
        { title: "Device Mockups", href: "/components/device-mockups" },
        { title: "Aspect Ratio", href: "/components/aspect-ratio" },
        { title: "Separator", href: "/components/separator" },
        { title: "Scroll Area", href: "/components/scroll-area" },
      ],
    },
    {
      title: "Forms",
      items: [
        { title: "Input", href: "/components/input" },
        { title: "Textarea", href: "/components/textarea" },
        { title: "Checkbox", href: "/components/checkbox" },
        { title: "Radio Group", href: "/components/radio-group" },
        { title: "Switch", href: "/components/switch" },
        { title: "Slider", href: "/components/slider" },
        { title: "Select", href: "/components/select" },
        { title: "Combobox", href: "/components/combobox" },
        { title: "Input OTP", href: "/components/input-otp" },
        { title: "Input Tag", href: "/components/input-tag" },
        { title: "File Upload", href: "/components/file-upload" },
        { title: "Toggle", href: "/components/toggle" },
        { title: "Markdown Editor", href: "/components/markdown-editor" },
      ],
    },
    {
      title: "Data Display",
      items: [
        { title: "Table", href: "/components/table" },
        { title: "Data Table Advanced", href: "/components/data-table-advanced" },
        { title: "Charts", href: "/components/charts" },
        { title: "Calendar", href: "/components/calendar" },
        { title: "Timeline", href: "/components/timeline" },
        { title: "Accordion", href: "/components/accordion" },
        { title: "Avatar", href: "/components/avatar" },
        { title: "Stats", href: "/components/stats" },
        { title: "Skeleton", href: "/components/skeleton" },
        { title: "Kanban", href: "/components/kanban" },
        { title: "Pricing", href: "/components/pricing" },
      ],
    },
    {
      title: "Navigation",
      items: [
        { title: "Tabs", href: "/components/tabs" },
        { title: "Breadcrumbs", href: "/components/breadcrumbs" },
        { title: "Pagination", href: "/components/pagination" },
        { title: "Navigation Menu", href: "/components/navigation-menu" },
        { title: "Menubar", href: "/components/menubar" },
        { title: "Stepper", href: "/components/stepper" },
      ],
    },
    {
      title: "Feedback",
      items: [
        { title: "Alert", href: "/components/alert" },
        { title: "Progress", href: "/components/progress" },
        { title: "Spinner", href: "/components/spinner" },
        { title: "Toast", href: "/components/toast" },
      ],
    },
    {
      title: "Overlay",
      items: [
        { title: "Tooltip", href: "/components/tooltip" },
        { title: "Popover", href: "/components/popover" },
        { title: "Dropdown Menu", href: "/components/dropdown-menu" },
        { title: "Context Menu", href: "/components/context-menu" },
        { title: "Hover Card", href: "/components/hover-card" },
        { title: "Sheet", href: "/components/sheet" },
        { title: "Alert Dialog", href: "/components/alert-dialog" },
        { title: "Dialogs", href: "/components/dialogs" },
        { title: "Cookies Banner", href: "/components/cookies-banner" },
      ],
    },
    {
      title: "Advanced",
      items: [
        { title: "Command Palette", href: "/components/command-palette" },
        { title: "3D Pin", href: "/components/3d-pin" },
        { title: "Hero", href: "/components/hero" },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar
        items={sidebarItems}
        className="hidden lg:block w-60 border-r sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto shrink-0"
      />
      <main className="flex-1 py-12 min-w-0">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route index element={<ComponentsIndex />} />
            <Route path=":componentId" element={<ComponentDetail />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
