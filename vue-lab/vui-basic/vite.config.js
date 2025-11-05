import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: {
    host: "0.0.0.0",
    port: 5174, // or 5175 depending on your setup
    strictPort: true,
    cors: true,
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      "0.0.0.0",
      ".codesandbox.io",
      ".csb.app" // 👈 this wildcard allows ANY sandbox hostname
    ],
  },
});
