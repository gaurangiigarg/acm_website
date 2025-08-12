import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [tailwindcss(), react(), glsl()],
    base: mode === 'production'
      ? '/acm_website/' // for GitHub Pages
      : '/',            // for local dev or Netlify
  }
})
