/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from "vite";
// eslint-disable-next-line import/no-extraneous-dependencies
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "./src/utils/app"),
      "@context": path.resolve(__dirname, "./src/utils/context"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@actions": path.resolve(__dirname, "./src/@types/actions"),
      "@hooks": path.resolve(__dirname, "./src/utils/hooks"),
      "@formatters": path.resolve(__dirname, "./src/utils/formatters"),
      "@router": path.resolve(__dirname, "./src/utils/router"),
      "@axios": path.resolve(__dirname, "./src/utils/axios"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@data": path.resolve(__dirname, "./src/data"),
      "@types": path.resolve(__dirname, "./src/@types"),
    },
  },
  plugins: [react()],
});
