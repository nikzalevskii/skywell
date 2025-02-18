import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import postcssPresetEnv from "postcss-preset-env";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [autoprefixer(), postcssPresetEnv({ stage: 1 })],
    },
  },
});
