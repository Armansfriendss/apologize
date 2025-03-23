import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // enables access from network (0.0.0.0)
    port: 5173, // optional: set custom port
  }
})
