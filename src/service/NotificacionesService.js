import { io } from "socket.io-client";

// Siempre el mismo origen con el que entró el celular (IP de la red, túnel o gateway): en desarrollo
// el proxy de Vite lo reenvía al 3006, así que funciona aunque el celular esté en otra red.
// VITE_NOTIFICACIONES_URL solo si el servicio vive en otra dirección pública
const notificacionesUrl = import.meta.env.VITE_NOTIFICACIONES_URL || undefined;

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
