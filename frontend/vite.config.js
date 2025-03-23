import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],  // ✅ Required for React to work properly
  server: {
    host: '0.0.0.0',   // ✅ Needed for Render deployment
    strictPort: true,
    port: 5173,        // ✅ Ensure correct port
  },
  preview: {
    allowedHosts: ["forex-pmae.onrender.com"], // ✅ Allow Render hostname
  },
});
