import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"), // your main app
        sw: resolve(__dirname, "src/service-worker.ts"), // service worker entry
      },
      output: {
        entryFileNames: "[name].js", // output as sw.js and main.js
      },
    },
  },
});