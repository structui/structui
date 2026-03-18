import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";

import "./globals.css";

import { auth } from "@/src/auth";
import { AppShell } from "@/src/components/site/app-shell";
import { getGitHubStarCount } from "@/src/lib/github";

const BASE_URL = "https://structui.dev";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1115" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "SUI — Source-First React Component Library",
    template: "%s | SUI",
  },
  description:
    "SUI (StructUI) is a source-first React component library with 50+ production-ready components, theme creator, blocks, and CLI. Built with Tailwind CSS v4 and Radix UI.",
  keywords: [
    "React components",
    "UI library",
    "Tailwind CSS",
    "Radix UI",
    "Next.js",
    "TypeScript",
    "component registry",
    "design system",
    "SUI",
    "StructUI",
    "open source",
    "shadcn alternative",
    "headless UI",
    "accessible components",
    "theme creator",
  ],
  authors: [{ name: "StructUI", url: BASE_URL }],
  creator: "StructUI",
  publisher: "StructUI",
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "SUI — StructUI",
    title: "SUI — Source-First React Component Library",
    description:
      "Build real interfaces with full source ownership. 50+ components, theme creator, blocks system, and CLI. No black-box dependencies.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SUI — Source-First React Component Library",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SUI — Source-First React Component Library",
    description:
      "Build real interfaces with full source ownership. 50+ components, theme creator, blocks system, and CLI.",
    images: ["/og-image.png"],
    creator: "@structui",
    site: "@structui",
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-16x16.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [session, starCount] = await Promise.all([auth(), getGitHubStarCount()]);

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body>
        <AppShell session={session} starCount={starCount}>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
