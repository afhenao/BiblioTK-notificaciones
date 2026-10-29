# BiblioTK-notificaciones — App del celular (demostración)

Parte del sistema BiblioTK (ver `../CLAUDE.md`). App pensada para el celular, con fines ilustrativos: se abre escaneando el QR "Notificaciones" de la landing, se elige un perfil (superadministrador, bibliotecario o lector) y llegan en vivo los avisos que recibiría una cuenta de ese tipo mientras alguien usa BiblioTK en el computador. React 19 + Vite 8 + Tailwind CSS 4 + `socket.io-client`; sin router.

- **Arranque:** `npm run dev` → http://localhost:5177 y, en la red local, `http://<IP del computador>:5177` (`server.host: true`). El celular y el computador deben estar en la misma red Wi-Fi; si no, por un túnel al 5177 (p. ej. `cloudflared tunnel --url http://localhost:5177`).
- **Docker:** `Dockerfile` en dos etapas (compila con Vite → nginx sin root con `nginx.conf`). Las `VITE_*` quedan fijas al compilar: por defecto, detrás del gateway de `../InfraBiblioTK` (rutas relativas, un solo origen) y con la subruta `/movil/`. `VITE_BASE` es esa subruta (`base` de Vite y `basename` del router; en desarrollo, `/`).
- **Librería de interfaz:** `bibliotk-ui` `^0.4.0` de npm (`Logo`, `Alert`, `cn`, `formatRelativeTime`, `ErrorBoundary`), mismo `globals.css` que los demás fronts.
- **Socket por el mismo origen:** la app siempre abre el socket en la dirección con la que entró el celular (IP de la red, túnel o gateway). En desarrollo, el `proxy` de Vite reenvía `/NotificacionesBiblioTK` (con `ws: true`) a `localhost:3006`, así que el celular solo necesita llegar al 5177 y da igual en qué red esté el computador. `allowedHosts` acepta los túneles comunes (`*.trycloudflare.com`, `*.ngrok-free.app`, `*.ngrok.app`, `*.loca.lt`) para cuando el celular está en otra red.
- **Variables opcionales (`.env.local`):** `VITE_PORT` (5177), `VITE_NOTIFICACIONES_URL` (solo si el servicio vive en otra dirección pública; sin ella, el mismo origen), `VITE_BASE` (subruta, `/movil/` detrás del gateway), `VITE_ALLOWED_HOSTS` (más hosts de túnel, separados por coma) y `NOTIFICACIONES_PROXY` (destino del proxy, por defecto `http://localhost:3006`).

## Estructura

```
src/
  main.jsx
  app/
    App.jsx            # Selección ↔ avisos; recuerda el perfil en localStorage (comodidad, no sesión)
    Seleccion.jsx      # Los tres perfiles
    Avisos.jsx         # Cabecera con el perfil y el estado ("En vivo"), lista de avisos (nuevos resaltados)
    perfiles.js        # Clave, nombre, descripción, ejemplo e ícono de cada perfil
    hooks/useAvisosDemo.js
    styles/globals.css
  service/
    NotificacionesService.js  # conectarPerfilDemo(perfil, …) → mismo origen (proxy de Vite al 3006)
```

## Cómo funciona

- Se conecta a `NotificacionesBiblioTK` con `auth: { demo: "superadmin" | "admin" | "usuario" }`, sin cookie ni sesión: el servidor lo mete en la sala `demo:<perfil>`, que solo recibe textos **sin datos personales** (nunca nombres, correos ni cédulas).
- Al conectar llega el historial del perfil (las últimas 20); cada aviso nuevo aparece arriba, resaltado, y hace vibrar el teléfono en Android (`navigator.vibrate`).
- `Avisos` se monta con `key={perfil}`: al cambiar de perfil empieza de cero (otra sala, otro historial).
- Perfil "lector" (opción acordada): recibe los avisos de **todos** los lectores, como si fueran propios.

## Pendientes conocidos

- Es pública a propósito (cualquiera con el QR la abre): por eso el canal demo no lleva datos personales.
- Si el celular no carga, revisar que el router no aísle a los clientes del Wi-Fi y que el Firewall de Windows deje entrar a Node.js.
