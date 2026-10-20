import { useEffect, useState } from "react";
import { conectarPerfilDemo } from "../../service/NotificacionesService.js";

const MAX_AVISOS = 30;

// Historial y avisos en vivo de un perfil. Quien lo usa se monta con key={perfil}, así que al
// cambiar de perfil empieza de cero
export function useAvisosDemo(perfil) {
	const [avisos, setAvisos] = useState([]);
	const [nuevos, setNuevos] = useState(() => new Set());
	const [estado, setEstado] = useState("connecting");

	useEffect(
		() =>
			conectarPerfilDemo(perfil, {
				alCambiarEstado: setEstado,
				alRecibirHistorial: setAvisos,
				alRecibir: (aviso) => {
					setAvisos((lista) =>
						[aviso, ...lista.filter((a) => a.id !== aviso.id)].slice(
							0,
							MAX_AVISOS,
						),
					);
					setNuevos((ids) => new Set(ids).add(aviso.id));
					// Un toque corto en Android (iOS lo ignora); vale porque ya se tocó la pantalla al elegir perfil
					navigator.vibrate?.(80);
				},
			}),
		[perfil],
	);

	return { avisos, nuevos, estado };
}
