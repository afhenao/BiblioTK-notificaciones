import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    // Detrás del gateway la app vive en una subruta (VITE_BASE=/movil/); en desarrollo, en la raíz
    base: env.VITE_BASE || '/',
    plugins: [
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      tailwindcss()
    ],
    resolve: {
      dedupe: ["react", "react-dom", "@phosphor-icons/react"],
    },
    server: {
      port: Number(env.VITE_PORT) || 5177,
      // host: el celular entra por la IP del computador en la red local, no por localhost
      host: true,
      warmup: {
        clientFiles: ['./src/main.jsx', './src/app/*.jsx'],
      },
    },
    preview: {
      port: Number(env.VITE_PORT) || 5177,
      host: true,
    },
  }
})
