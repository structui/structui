export type SetupType = "crm" | "erp" | "saas" | "auth";

export type AuthProvider = "next-auth" | "better-auth" | "basic-auth" | "none";

export type ColorPalette =
  | "slate"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "rose"
  | "orange"
  | "emerald"
  | "teal"
  | "zinc";

export interface SetupOptions {
  projectTitle: string;
  colorPalette: ColorPalette;
  authProvider: AuthProvider;
  basePath: string; // absolute path where files will be written
}

export interface SetupFile {
  path: string; // relative to basePath
  content: string;
}

export interface SetupResult {
  files: SetupFile[];
  dependencies: string[];
  devDependencies: string[];
  instructions: string[];
}

export interface SetupDefinition {
  name: SetupType;
  label: string;
  description: string;
  generate: (options: SetupOptions) => SetupResult;
}
