// Igual que formatRelativeTime de bibliotk-ui 0.4.0 (todavía sin publicar): al publicarla,
// importar formatRelativeTime desde "bibliotk-ui" y borrar este archivo
const relativo = new Intl.RelativeTimeFormat("es-ES", { numeric: "auto" });
const fechaCorta = new Intl.DateTimeFormat("es-ES", {
	day: "numeric",
	month: "short",
});

export function tiempoRelativo(valor, ahora = Date.now()) {
	const fecha = new Date(valor);

	if (Number.isNaN(fecha.getTime())) return "";

	const segundos = Math.round((fecha.getTime() - ahora) / 1000);

	if (segundos > -45) return "hace un momento";

	const minutos = Math.round(segundos / 60);

	if (minutos > -60) return relativo.format(minutos, "minute");

	const horas = Math.round(minutos / 60);

	if (horas > -24) return relativo.format(horas, "hour");

	return fechaCorta.format(fecha);
}
