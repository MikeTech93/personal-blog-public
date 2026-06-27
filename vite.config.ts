import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tanstackStart({
      tsr: {
        routesDirectory: './src/routes',
        generatedRouteTree: './src/routeTree.gen.ts',
      },
    }),
    react(),
    tailwindcss(),
  ],
})
