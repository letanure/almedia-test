import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React core libraries
          "react-vendor": ["react", "react-dom", "react-router-dom"],

          // UI component library
          "ui-vendor": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-label",
            "@radix-ui/react-popover",
            "@radix-ui/react-radio-group",
            "@radix-ui/react-select",
            "@radix-ui/react-separator",
            "@radix-ui/react-slot",
            "@radix-ui/react-tooltip",
          ],

          // State management
          "state-vendor": ["mobx", "mobx-react-lite"],

          // Form handling
          "form-vendor": ["react-hook-form", "@hookform/resolvers", "zod"],

          // Date and utilities
          "utils-vendor": [
            "date-fns",
            "clsx",
            "class-variance-authority",
            "tailwind-merge",
          ],

          // Animation
          "animation-vendor": ["motion"],

          // Icons and UI utilities
          "icons-vendor": ["lucide-react"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
