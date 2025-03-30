import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue2 from "@vitejs/plugin-vue2";

// https://vitejs.dev/config/
export default defineConfig({
  base: 'project-meowshop/',
  plugins: [vue2()],
  css: {
    preprocessorOptions: {
      sass: {
        api: 'modern-compiler' // or "modern"
      }
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
