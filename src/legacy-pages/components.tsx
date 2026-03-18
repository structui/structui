// @ts-nocheck
import React from "react";
import { Route, Routes } from "react-router-dom";

import { Sidebar } from "@/src/components/sidebar";
import { getComponentSidebarSections } from "@/src/lib/registry";

import { ComponentDetail } from "./components/component-detail";
import { ComponentsIndex } from "./components/index";

export const ComponentsPage = () => {
  const sidebarItems = getComponentSidebarSections();

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
