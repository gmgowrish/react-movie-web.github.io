import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// Public demo key; override with VITE_TMDB_API_KEY in .env or CI.
const DEMO_TMDB_KEY = "89e6737d6edec588bddb03c4a212fbb9";

// Relative base so the build works on any GitHub Pages sub-path.
// Output to build/ to match the Render static site's publish directory.
export default defineConfig(({ mode }) => {
  const apiKey = loadEnv(mode, process.cwd()).VITE_TMDB_API_KEY || DEMO_TMDB_KEY;
  return {
    base: "./",
    build: { outDir: "build" },
    define: { __TMDB_API_KEY__: JSON.stringify(apiKey) },
    plugins: [
      react(),
      {
        name: "inject-tmdb-key",
        transformIndexHtml: (html) => html.replaceAll("__TMDB_API_KEY__", apiKey),
      },
    ],
  };
});
