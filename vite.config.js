import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // For GitHub Pages: use '/repository-name/' if deploying a project repo
  // Use '/' if deploying to username.github.io
  base: process.env.VITE_BASE_PATH || (process.env.NODE_ENV === 'production' ? '/CritterCraftCo/' : '/'),
  server: {
    port: 8000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})

