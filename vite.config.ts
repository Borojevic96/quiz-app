import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import tsconfigPaths from "vite-tsconfig-paths";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: "@assets", replacement: path.resolve(__dirname, "./src/assets") },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "./src/components"),
      },
      { find: "@pages", replacement: path.resolve(__dirname, "./src/pages") },
      {
        find: "@reducers",
        replacement: path.resolve(__dirname, "./src/reducers"),
      },
      {
        find: "@selectors",
        replacement: path.resolve(__dirname, "./src/selectors"),
      },
      { find: "@types", replacement: path.resolve(__dirname, "./src/types") },
      { find: "@utils", replacement: path.resolve(__dirname, "./src/utils") },
    ],
  },
  plugins: [react(), eslint({ failOnError: true }), tsconfigPaths()],
  server: {
    port: 3000,
  },
});
