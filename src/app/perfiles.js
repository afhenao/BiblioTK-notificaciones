import { BookOpenText } from "@phosphor-icons/react/BookOpenText";
import { Books } from "@phosphor-icons/react/Books";
import { UsersThree } from "@phosphor-icons/react/UsersThree";

// Los tres perfiles de la demostración. Cada uno recibe lo mismo que esa cuenta en el sistema
// real, pero sin datos personales: el servidor arma los textos del canal demo sin nombres ni correos
export const perfiles = [
	{
		clave: "superadmin",
		nombre: "Superadministrador",
		descripcion: "Cuentas nuevas, perfiles editados y cuentas eliminadas.",
		ejemplo:
			"Crea una cuenta desde la landing o edita un perfil en el computador y el aviso aparecerá aquí.",
		icono: UsersThree,
	},
	{
		clave: "admin",
		nombre: "Bibliotecario",
		descripcion: "Catálogo, préstamos, devoluciones y vencimientos.",
		ejemplo:
			"Pide un libro con una cuenta de lector en el computador, o agrega un material, y el aviso aparecerá aquí.",
		icono: Books,
	},
	{
		clave: "usuario",
		nombre: "Lector",
		descripcion: "Préstamos y cambios de perfil de los lectores.",
		ejemplo:
			"Entra como lector en el computador y pide un libro: aquí verás el aviso al instante.",
		icono: BookOpenText,
	},
];

export function buscarPerfil(clave) {
	return perfiles.find((perfil) => perfil.clave === clave) ?? null;
}
