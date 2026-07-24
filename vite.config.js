import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Repo name is "-", so GitHub Pages URL is https://maksymutvenko.github.io/-/
export default defineConfig({
  base: '/-/',
  plugins: [react()],
})
