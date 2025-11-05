import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ✅ Universal fix for CodeSandbox, Gitpod, StackBlitz, localhost, etc.
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Listen on all interfaces
    port: 5174,
    strictPort: true,
    cors: true,
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      "0.0.0.0",
      // 👇 explicitly allow CodeSandbox dynamic hosts
      ".csb.app",
      ".codesandbox.io",
    ],
    // ✅ fallback: dynamically accept any origin at runtime
    origin: "http://localhost:5173",
    hmr: {
      clientPort: 443, // force secure WebSocket for HTTPS preview
      host: "localhost",
    },
  },
});
