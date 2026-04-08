import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import { readdirSync } from 'node:fs'
import { execSync } from 'node:child_process'

const yearsDir = fileURLToPath(new URL('./src/data/years', import.meta.url))
const availableYears = readdirSync(yearsDir)
  .filter((name) => /^\d{4}\.ts$/.test(name))
  .map((name) => Number(name.replace('.ts', '')))
  .sort((a, b) => a - b)
const availableDecades = [
  ...new Set(availableYears.map((year) => `${Math.floor(year / 10) * 10}s`)),
]
const socialImageVersion = execSync('git rev-parse --short HEAD')
  .toString()
  .trim()

export default defineConfig({
  define: {
    __SOCIAL_IMAGE_VERSION__: JSON.stringify(socialImageVersion),
  },
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '127.0.0.1',
    port: 4719,
    strictPort: true,
    allowedHosts: ['.ngrok-free.app'],
    hmr: {
      host: '127.0.0.1',
      clientPort: 4719,
    },
    watch: {
      ignored: ['**/docs/**'],
    },
  },
  // @ts-expect-error vite-ssg extends vite config at runtime
  ssgOptions: {
    dirStyle: 'nested',
    formatting: 'minify',
    includedRoutes: () => [
      '/',
      '/au',
      ...availableDecades.map((decade) => `/au/${decade}`),
      ...availableYears.map((year) => `/au/${year}`),
    ],
  },
})
