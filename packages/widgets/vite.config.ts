import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        "chat-view": resolve(__dirname, "src/chat-view/index.html"),
        "kitchen-sink-lite": resolve(__dirname, "src/kitchen-sink-lite/index.html"),
        "pizzaz-table": resolve(__dirname, "src/pizzaz-table/index.html"),
        "search-results": resolve(__dirname, "src/search-results/index.html"),
      },
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
    outDir: "dist",
    emptyOutDir: true,
  },
});