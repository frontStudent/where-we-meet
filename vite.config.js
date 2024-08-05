import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve("./src"),
      "@components": resolve("./src/components"),
      "@assets": resolve("./src/assets"),
      "@store": resolve("./src/store"),
      "@utils": resolve("./src/utils"),
    },
  },
});
