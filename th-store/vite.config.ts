import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // hoặc đặt '0.0.0.0' nếu muốn cố định
    port: 5000, // đổi cổng nếu bạn muốn
  },
})


