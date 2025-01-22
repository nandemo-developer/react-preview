import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES ? 'react-artwork' : './',
  plugins: [
    react({
      babel: {
        presets: ['jotai/babel/preset'],
      },
    }),
    tsconfigPaths()
  ],
})
