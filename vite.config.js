import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { terser } from 'rollup-plugin-terser';

// https://vitejs.dev/config/
export default defineConfig({
  compress: 'brotli',
  plugins: [react()],
  build: {
    plugins: [terser()],
    compress: {
      algorithm: 'brotli',
      force: true,
    },
  },
});