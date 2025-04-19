import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import { nodePolyfills } from "vite-plugin-node-polyfills"

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      protocolImports: true,
    }),
  ],
  resolve: {
    alias: {
      "cookie-consent-kit": path.resolve(__dirname, "../src"),
    },
  },
})
