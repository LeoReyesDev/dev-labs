import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: '/labs/smart-contracts/frontend/', // ← AJUSTA SEGÚN TU CARPETA
    build: {
        outDir: 'dist', // o tu carpeta personalizada si has cambiado esto
    },
})
