import { useState } from "react";
import Avisos from "./Avisos.jsx";
import { buscarPerfil } from "./perfiles.js";
import Seleccion from "./Seleccion.jsx";

// El perfil elegido se recuerda en este celular (solo una comodidad: no es una sesión)
const CLAVE_PERFIL = "bibliotk:notificaciones:perfil";

function leerPerfil() {
	try {
		return buscarPerfil(localStorage.getItem(CLAVE_PERFIL))?.clave ?? null;
	} catch {
		return null;
	}
}

function guardarPerfil(clave) {
	try {
		if (clave) localStorage.setItem(CLAVE_PERFIL, clave);
		else localStorage.removeItem(CLAVE_PERFIL);
	} catch {
		// Sin almacenamiento (modo privado): se vuelve a elegir al recargar
	}
}

function App() {
	const [clave, setClave] = useState(leerPerfil);
	const perfil = buscarPerfil(clave);

	function elegir(nueva) {
		guardarPerfil(nueva);
		setClave(nueva);
	}

	if (!perfil) return <Seleccion onElegir={elegir} />;

	return (
		<Avisos key={perfil.clave} perfil={perfil} onCambiar={() => elegir(null)} />
	);
}

export default App;
