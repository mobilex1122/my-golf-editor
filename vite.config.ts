import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import segmentsHelper from "./segmentsHelper"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("x-")
        }
      }
    }),
    vueDevTools(),
    segmentsHelper()
  ],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("src/", import.meta.url))
    }
  }
})
