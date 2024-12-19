import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api':{
        target: "http://localhost:3001",
        secure: false,
        changeOrigin: true,
      }
    }
  },
  css: {
    postcss: './postcss.config.js',  // Ensure this is pointing to your PostCSS config
  },
})