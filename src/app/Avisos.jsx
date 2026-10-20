import { ArrowLeft } from "@phosphor-icons/react/ArrowLeft";
import { ArrowsLeftRight } from "@phosphor-icons/react/ArrowsLeftRight";
import { Bell } from "@phosphor-icons/react/Bell";
import { Books } from "@phosphor-icons/react/Books";
import { UsersThree } from "@phosphor-icons/react/UsersThree";
import { Alert, cn, Logo } from "bibliotk-ui";
import { useEffect, useState } from "react";
import { useAvisosDemo } from "./hooks/useAvisosDemo.js";
import { tiempoRelativo } from "./tiempo.js";

const iconosCategoria = {
	usuarios: UsersThree,
	catalogo: Books,
	prestamos: ArrowsLeftRight,
};

const textosEstado = {
	connected: "En vivo",
	connecting: "Conectando…",
	disconnected: "Sin conexión",
};

const puntosEstado = {
	connected: "bg-pine-300 motion-safe:animate-pulse",
	connecting: "bg-honey-400",
	disconnected: "bg-clay-600",
};

// Lista en vivo de un perfil. Se monta con key={perfil.clave}: al cambiar de perfil empieza de cero
function Avisos({ perfil, onCambiar }) {
	const { avisos, nuevos, estado } = useAvisosDemo(perfil.clave);
	// "hace X minutos" depende de la hora: se recalcula cada 30 s
	const [ahora, setAhora] = useState(() => Date.now());
	const Icono = perfil.icono;

	useEffect(() => {
		const reloj = setInterval(() => setAhora(Date.now()), 30_000);
		return () => clearInterval(reloj);
	}, []);

	useEffect(() => {
		const tituloAnterior = document.title;
		document.title = `${perfil.nombre} · Notificaciones`;

		return () => {
			document.title = tituloAnterior;
		};
	}, [perfil.nombre]);

	return (
		<div className="min-h-dvh bg-sand-100">
			<header className="sticky top-0 z-10 rounded-b-[28px] bg-pine-900 px-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-5 text-sand-50 shadow-[0_18px_40px_-24px_rgb(11_34_28/0.6)]">
				<div className="mx-auto max-w-md">
					<div className="flex items-center justify-between gap-3">
						<Logo tone="light" />
						<span
							role="status"
							className="inline-flex items-center gap-1.5 rounded-full bg-sand-50/10 px-3 py-1.5 text-xs font-semibold"
						>
							<span
								aria-hidden="true"
								className={cn("size-2 rounded-full", puntosEstado[estado])}
							/>
							{textosEstado[estado]}
						</span>
					</div>
					<div className="mt-6 flex items-center gap-3">
						<span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sand-50/10 text-honey-300">
							<Icono aria-hidden="true" className="size-6" />
						</span>
						<div className="min-w-0 flex-1">
							<p className="text-xs font-semibold text-pine-300">Perfil</p>
							<h1 className="truncate font-display text-[1.6rem] leading-tight font-extrabold tracking-[-0.04em]">
								{perfil.nombre}
							</h1>
						</div>
						<button
							type="button"
							onClick={onCambiar}
							className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-sand-50/10 px-3.5 text-sm font-semibold transition-[background-color,transform] duration-150 ease-out-strong hover:bg-sand-50/15 active:scale-[0.97]"
						>
							<ArrowLeft aria-hidden="true" className="size-4" />
							Cambiar
						</button>
					</div>
					<p className="mt-2 text-sm leading-relaxed text-pine-200">
						{perfil.descripcion}
					</p>
				</div>
			</header>

			<main className="mx-auto max-w-md px-4 pt-5 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
				{estado === "disconnected" && (
					<Alert className="mb-4">
						No se pudo conectar con el servicio de notificaciones. Revisa que el
						celular esté en la misma red Wi-Fi que el computador; se reintenta
						solo.
					</Alert>
				)}

				{avisos.length === 0 ? (
					<div className="rounded-[24px] bg-sand-50 p-6 text-center shadow-[inset_0_0_0_1px_var(--color-sand-200)]">
						<Bell aria-hidden="true" className="mx-auto size-8 text-pine-700" />
						<p className="mt-3 font-display text-lg font-extrabold tracking-[-0.03em] text-pine-950">
							Todavía no hay avisos
						</p>
						<p className="mt-1 text-sm leading-relaxed text-ink-soft">
							{perfil.ejemplo}
						</p>
					</div>
				) : (
					<ol aria-live="polite" className="grid gap-3">
						{avisos.map((aviso) => {
							const IconoAviso = iconosCategoria[aviso.categoria] ?? Bell;
							const nuevo = nuevos.has(aviso.id);

							return (
								<li
									key={aviso.id}
									className={cn(
										"flex gap-3 rounded-[22px] p-4",
										nuevo
											? "bg-honey-100 shadow-[inset_0_0_0_1px_rgb(168_112_44/0.25)] motion-safe:animate-rise-sm"
											: "bg-sand-50 shadow-[inset_0_0_0_1px_var(--color-sand-200)]",
									)}
								>
									<span className="grid size-10 shrink-0 place-items-center rounded-xl bg-pine-900 text-honey-300">
										<IconoAviso aria-hidden="true" className="size-5" />
									</span>
									<div className="min-w-0 flex-1">
										<div className="flex items-baseline justify-between gap-2">
											<p className="text-sm font-semibold text-pine-950">
												{aviso.titulo}
											</p>
											<time
												dateTime={aviso.fecha}
												className="shrink-0 text-xs text-ink-faint"
											>
												{tiempoRelativo(aviso.fecha, ahora)}
											</time>
										</div>
										<p className="mt-1 text-[14px] leading-snug text-ink-soft">
											{aviso.mensaje}
										</p>
									</div>
								</li>
							);
						})}
					</ol>
				)}
			</main>
		</div>
	);
}

export default Avisos;
