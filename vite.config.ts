import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input:'./src/genQrcode.ts',
      // 确保外部化处理依赖
      preserveEntrySignatures:'allow-extension',
      external: ['vue'],
      output:{
        format:'es',
        entryFileNames:"[name].mjs",
        assetFileNames:"[name].[ext]",
        globals: {
          vue: 'Vue',
        },
      }
    },
  },
})
