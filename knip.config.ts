import type { KnipConfig } from "knip"

const config: KnipConfig = {
  // Entry point for the application
  entry: ["src/main.tsx"],
  // Project files to analyze
  project: ["src/**/*.{ts,tsx}"],
  // Ignore test, story files, and template files
  ignore: [
    "src/**/*.spec.{ts,tsx}",
    "src/**/*.test.{ts,tsx}",
    "src/**/*.stories.{ts,tsx}",
    "src/**/*.d.ts",
    "src/test/**",
    // Template files - keep as examples
    "src/config/index.ts",
    "src/constants/index.ts",
    "src/hooks/useMobile.ts",
    "src/services/api.ts",
    "src/types/shared.ts",
  ],
  ignoreDependencies: [
    // Build tools that aren't imported but used by tools
    "autoprefixer",
    "postcss",
    // Tailwind CSS - used in CSS imports, not JS imports
    "tailwindcss",
    "@tailwindcss/postcss",
    "tw-animate-css",
  ],
  ignoreExportsUsedInFile: true,
}

export default config
