import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// dev config

// export default defineConfig(({ mode }) => ({
//   plugins: [
//     react(),
//     eslintPlugin({
//       lintOnStart: true,
//       failOnError: mode === "production",
//     }),
//   ],
//   build: {
//     chunkSizeWarningLimit: 1000,
//   },
//   server: {
//     open: true,
//     proxy: {
//       "/api": "http://127.0.0.1:8000",
//     }
//   },
// }));

// Exchange the functions before pushing to prod

// Prod config

export default defineConfig((mode) => ({
  plugins: [
    react(),
    eslintPlugin({
      lintOnStart: true,
      failOnError: mode === "production",
    }),
  ],
  build: { chunkSizeWarningLimit: 1000, },
  server: mode === "development" ? {
    open: true,
    proxy: {
      '/api': "https://127.0.0.1:8000",  // needs to be 5000 on laptop   
    },
  } : undefined,
}));