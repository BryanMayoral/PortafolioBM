import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite' //importamos tailwind


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()], //agregamos tailwind como plugin
})

