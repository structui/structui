import type { SetupDefinition, SetupType } from "./types";
import { generateCRM } from "./templates/crm";
import { generateERP } from "./templates/erp";
import { generateSaaS } from "./templates/saas";
import { generateAuthOnly } from "./templates/auth-only";

export const SETUP_REGISTRY: SetupDefinition[] = [
  {
    name: "crm",
    label: "CRM",
    description:
      "Customer relationship management — sign-in/up, dashboard, customers, deals, activities, reports.",
    generate: generateCRM,
  },
  {
    name: "erp",
    label: "ERP",
    description:
      "Enterprise resource planning — dashboard, inventory, orders, procurement, finance, HR, reports.",
    generate: generateERP,
  },
  {
    name: "saas",
    label: "SaaS",
    description:
      "Software-as-a-service — landing page, dashboard, analytics, users, billing (plan picker), settings.",
    generate: generateSaaS,
  },
  {
    name: "auth",
    label: "Auth",
    description:
      "Authentication only — sign-in, sign-up, forgot password, and a protected home page ready to extend.",
    generate: generateAuthOnly,
  },
];

export function findSetup(name: string): SetupDefinition | undefined {
  return SETUP_REGISTRY.find((s) => s.name === name.toLowerCase());
}

export const SETUP_PAGES: Record<SetupType, string[]> = {
  crm: ["Dashboard", "Customers", "Deals", "Activities", "Reports", "Profile"],
  erp: ["Dashboard", "Inventory", "Orders", "Procurement", "Finance", "HR", "Reports", "Profile"],
  saas: ["Landing Page", "Dashboard", "Analytics", "Users", "Billing", "Settings", "Profile"],
  auth: ["Sign In", "Sign Up", "Forgot Password", "Protected Home"],
};

export const SETUP_ICONS: Record<SetupType, string> = {
  crm: "👥",
  erp: "🏭",
  saas: "🚀",
  auth: "🔐",
};

export const SETUP_COLORS: Record<SetupType, string> = {
  crm: "blue",
  erp: "indigo",
  saas: "violet",
  auth: "emerald",
};
