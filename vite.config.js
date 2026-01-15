import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Get base path from environment variable
// For GitHub Pages: use '/repository-name/' if deploying a project repo
// Use '/' if deploying to username.github.io
// Default to '/' (will be overridden by VITE_BASE_PATH in CI/CD)
const basePath = process.env.VITE_BASE_PATH || '/'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: basePath,
  server: {
    port: 8000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    // Ensure assets are properly referenced
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js'
      }
    }
  }
})

