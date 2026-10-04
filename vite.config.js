import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base so the build works on any GitHub Pages sub-path.
// Output to build/ to match the Render static site's publish directory.
export default defineConfig({
  base: "./",
  build: { outDir: "build" },
  plugins: [react()],
});
