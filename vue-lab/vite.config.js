import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// ✅ Universal fix for CodeSandbox, Gitpod, StackBlitz, localhost, etc.
export default defineConfig({
  plugins: [vue()],
  server: {
    host: "0.0.0.0", // Listen on all interfaces
    port: 5173,
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
      clientPort: 443, // secure websocket for https preview
      host: "localhost",
    },
  },
});
