import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // for the line import "@testing-library/jest-dom";
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.{test,spec}.{js,ts,jsx,tsx}"],
    transformMode: {
      web: [/\.[jt]sx?$/],
    },
  },
});
