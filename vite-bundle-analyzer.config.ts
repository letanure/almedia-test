import { visualizer } from "rollup-plugin-visualizer"
import { defineConfig } from "vite"
import viteConfig from "./vite.config"

/**
 * Vite config for bundle analysis
 * Usage: pnpm build:analyze
 */
export default defineConfig({
  ...viteConfig,
  plugins: [
    ...viteConfig.plugins,
    visualizer({
      filename: "dist/bundle-analysis.html",
      open: true,
      gzipSize: true,
      brotliSize: true,
      template: "treemap", // or 'sunburst', 'network'
    }),
  ],
  build: {
    ...viteConfig.build,
    // Generate source maps for better analysis
    sourcemap: true,
  },
})
