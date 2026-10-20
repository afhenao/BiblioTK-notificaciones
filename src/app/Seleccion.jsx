import { ArrowRight } from "@phosphor-icons/react/ArrowRight";
import { Logo } from "bibliotk-ui";
import { perfiles } from "./perfiles.js";

function Seleccion({ onElegir }) {
	return (
		<main className="grain relative isolate min-h-dvh overflow-hidden bg-pine-900 px-5 pt-[max(2rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))] text-sand-50">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -top-28 -right-24 size-80 rounded-full border border-honey-400/35 shadow-[0_0_0_40px_rgb(217_165_90/0.06),0_0_0_80px_rgb(217_165_90/0.04)]"
			/>
			<div className="relative mx-auto max-w-md">
				<Logo tone="light" />
				<p className="mt-12 text-sm font-semibold text-honey-300 motion-safe:animate-rise">
					Notificaciones en vivo
				</p>
				<h1 className="mt-3 font-display text-[2.6rem] leading-[0.98] font-extrabold tracking-[-0.045em] motion-safe:animate-rise">
					¿Con qué perfil quieres mirar?
				</h1>
				<p className="mt-4 text-[15px] leading-relaxed text-pine-200 motion-safe:animate-rise">
					Usa BiblioTK en el computador y aquí te llegará al instante lo que
					vería una cuenta de ese tipo.
				</p>
				<ul className="mt-8 grid gap-3">
					{perfiles.map((perfil, indice) => {
						const Icono = perfil.icono;

						return (
							<li
								key={perfil.clave}
								className="motion-safe:animate-rise"
								style={{ animationDelay: `${120 + indice * 60}ms` }}
							>
								<button
									type="button"
									onClick={() => onElegir(perfil.clave)}
									className="flex w-full items-center gap-4 rounded-[24px] bg-sand-50 p-4 text-left text-ink shadow-[0_18px_40px_-24px_rgb(0_0_0/0.6)] transition-transform duration-150 ease-out-strong active:scale-[0.98]"
								>
									<span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-pine-900 text-honey-300">
										<Icono aria-hidden="true" className="size-6" />
									</span>
									<span className="min-w-0 flex-1">
										<span className="block font-display text-lg font-extrabold tracking-[-0.03em] text-pine-950">
											{perfil.nombre}
										</span>
										<span className="mt-0.5 block text-[13px] leading-snug text-ink-soft">
											{perfil.descripcion}
										</span>
									</span>
									<ArrowRight
										aria-hidden="true"
										className="size-5 shrink-0 text-pine-700"
									/>
								</button>
							</li>
						);
					})}
				</ul>
				<p className="mt-8 text-xs leading-relaxed text-pine-300">
					Es una demostración: los avisos no muestran nombres, correos ni
					cédulas. El celular y el computador deben estar en la misma red Wi-Fi.
				</p>
			</div>
		</main>
	);
}

export default Seleccion;
