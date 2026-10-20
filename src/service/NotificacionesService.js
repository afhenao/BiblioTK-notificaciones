import { io } from "socket.io-client";

// Sin variable: el servicio corre en el mismo computador que sirve esta app, así que se usa el mismo
// host (la IP de la red local con la que entró el celular) en el puerto 3006. Con
// VITE_NOTIFICACIONES_URL vacía (detrás del gateway), el mismo origen
const configurada = import.meta.env.VITE_NOTIFICACIONES_URL;
const notificacionesUrl =
	configurada ?? `${window.location.protocol}//${window.location.hostname}:3006`;

// Perfil de demostración: sin cookie ni sesión, el servidor solo le manda textos sin datos personales
export function conectarPerfilDemo(
	perfil,
	{ alCambiarEstado, alRecibirHistorial, alRecibir },
) {
	const socket = io(notificacionesUrl || undefined, {
		path: "/NotificacionesBiblioTK/socket.io",
		transports: ["websocket"],
		auth: { demo: perfil },
	});

	socket.on("connect", () => alCambiarEstado("connected"));
	socket.on("connect_error", () => alCambiarEstado("disconnected"));
	socket.io.on("reconnect_attempt", () => alCambiarEstado("connecting"));
	socket.on("disconnect", () => alCambiarEstado("disconnected"));
	socket.on("historial", alRecibirHistorial);
	socket.on("notificacion", alRecibir);

	return () => socket.disconnect();
}
