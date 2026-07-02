import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // For a user/organization page (repo named exactly "<username>.github.io"),
  // the site is served from the domain root, so base stays '/'. If you ever
  // deploy this as a *project* page instead (e.g. username.github.io/polo-designs),
  // set VITE_BASE=/polo-designs/ when building, or hardcode it below.
  base: process.env.VITE_BASE || '/',
  server: {
    port: 5173,
    open: true,
  },
  build: {
    target: 'es2020',
    sourcemap: false,
    outDir: 'dist',
  },
})
