# Imagen de la app del celular. Etapa 1: compila con Vite. Las variables VITE_* quedan fijas en el
# código compilado, así que se pasan aquí: por defecto, detrás del gateway (rutas relativas,
# un solo origen) y con la subruta /movil/
FROM node:24-alpine AS compilacion

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
ARG VITE_BASE=/movil/
ARG VITE_NOTIFICACIONES_URL=
ENV VITE_BASE=$VITE_BASE \
    VITE_NOTIFICACIONES_URL=$VITE_NOTIFICACIONES_URL
RUN npm run build

# Etapa 2: solo los archivos estáticos, servidos por nginx sin root
FROM nginxinc/nginx-unprivileged:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=compilacion /app/dist /usr/share/nginx/html
EXPOSE 8080
