import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    port: 5173,
    // Only enable proxy in development
    proxy: mode === 'development' ? {
      '/api': {
        target: 'http://localhost:5000', // Local backend during dev
        changeOrigin: true,
      },
    } : undefined, // No proxy in production
  },
  // Production-specific settings
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
}));