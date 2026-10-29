import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')

  // El socket va por el mismo origen de la app y Vite lo reenvía al servicio local: el celular solo
  // necesita llegar al 5177, sea por la IP de la red o por un túnel (cuando está en otra red)
  const proxy = {
    '/NotificacionesBiblioTK': {
      target: env.NOTIFICACIONES_PROXY || 'http://localhost:3006',
      ws: true,
    },
  }

  // Vite rechaza hosts desconocidos: se aceptan los de los túneles comunes y los de VITE_ALLOWED_HOSTS
  const allowedHosts = [
    '.trycloudflare.com',
    '.ngrok-free.app',
    '.ngrok.app',
    '.loca.lt',
    ...(env.VITE_ALLOWED_HOSTS ?? '').split(',').map((host) => host.trim()).filter(Boolean),
  ]

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
      allowedHosts,
      proxy,
      warmup: {
        clientFiles: ['./src/main.jsx', './src/app/*.jsx'],
      },
    },
    preview: {
      port: Number(env.VITE_PORT) || 5177,
      host: true,
      allowedHosts,
      proxy,
    },
  }
})
