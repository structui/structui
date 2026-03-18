import type { Metadata } from "next";

import { ThemeCreatorClient } from "@/src/components/site/theme-creator-client";

export const metadata: Metadata = {
  title: "Theme Creator",
  description:
    "Visually design your custom theme with SUI Theme Creator. Adjust colors, border radius, and typography — then export CSS variables for your project.",
  alternates: { canonical: "/theme-creator" },
  openGraph: {
    title: "Theme Creator — SUI",
    description:
      "Design your custom theme visually. Adjust design tokens and export CSS variables instantly.",
    url: "/theme-creator",
  },
};

export default function Page() {
  return <ThemeCreatorClient />;
}
