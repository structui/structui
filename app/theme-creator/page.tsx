import type { Metadata } from "next";

import { ThemeCreatorClient } from "@/src/components/site/theme-creator-client";

export const metadata: Metadata = {
  title: "Theme Creator — Visual Design Token Editor & CSS Variable Generator",
  description:
    "Design your custom UI theme visually with SUI Theme Creator. Adjust colors, border radius, font size, and spacing. Preview changes live and export CSS custom properties ready for production. Compatible with Tailwind CSS v4, React, Next.js, Astro, and Vue.",
  keywords: [
    "theme creator",
    "CSS variable generator",
    "design token editor",
    "Tailwind CSS theme builder",
    "UI theme generator",
    "color picker design system",
    "custom CSS properties",
    "dark mode theme creator",
    "React theme builder",
    "Next.js theme",
    "Astro theme",
    "design system generator",
    "SUI theme creator",
    "StructUI theme",
    "border radius editor",
    "typography design tool",
  ],
  alternates: { canonical: "/theme-creator" },
  openGraph: {
    type: "website",
    title: "Theme Creator — SUI",
    description:
      "Visual design token editor. Adjust colors, border radius, and typography — then export CSS variables for your project.",
    url: "/theme-creator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SUI Theme Creator",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Theme Creator — SUI",
    description:
      "Visual theme editor. Design tokens, CSS variables, live preview. Export for React, Next.js, Astro, Vue.",
    images: ["/og-image.png"],
    creator: "@structui",
    site: "@structui",
  },
};


export default function Page() {
  return <ThemeCreatorClient />;
}
