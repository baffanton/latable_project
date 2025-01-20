import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 5173,
  },
  base: "http://backend:8080",
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@shared", replacement: path.resolve(__dirname, "./src/shared") },
      { find: "@app", replacement: path.resolve(__dirname, "./src/app") },
      { find: "@widgets", replacement: path.resolve(__dirname, "./src/widgets") },
      { find: "@pages", replacement: path.resolve(__dirname, "./src/pages") },
      { find: "@entities", replacement: path.resolve(__dirname, "./src/entities") },
      { find: "@features", replacement: path.resolve(__dirname, "./src/features") },
    ],
  },
});
