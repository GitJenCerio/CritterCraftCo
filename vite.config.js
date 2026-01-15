import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Get base path from environment variable or default to repository name
// For GitHub Pages: use '/repository-name/' if deploying a project repo
// Use '/' if deploying to username.github.io
const basePath = process.env.VITE_BASE_PATH || '/CritterCraftCo/'

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
    sourcemap: true
  }
})

