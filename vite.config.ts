import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import { readdirSync } from 'node:fs'

const yearsDir = fileURLToPath(new URL('./src/data/years', import.meta.url))
const availableYears = readdirSync(yearsDir)
  .filter((name) => /^\d{4}\.ts$/.test(name))
  .map((name) => Number(name.replace('.ts', '')))
  .sort((a, b) => a - b)
const availableDecades = [
  ...new Set(availableYears.map((year) => `${Math.floor(year / 10) * 10}s`)),
]

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 4719,
    allowedHosts: ['.ngrok-free.app'],
    watch: {
      ignored: ['**/docs/**'],
    },
  },
  // @ts-expect-error vite-ssg extends vite config at runtime
  ssgOptions: {
    dirStyle: 'nested',
    formatting: 'minify',
    includedRoutes: () => [
      '/au',
      ...availableDecades.map((decade) => `/au/${decade}`),
      ...availableYears.map((year) => `/au/${year}`),
    ],
  },
})
