// Los estilos (fuentes, bibliotk-ui y Tailwind) se enlazan desde index.html
import { IconContext } from "@phosphor-icons/react/dist/lib/context";
import { ErrorBoundary } from "bibliotk-ui";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.jsx";

const iconDefaults = { weight: "bold", size: 18 };

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ErrorBoundary>
			<IconContext.Provider value={iconDefaults}>
				<App />
			</IconContext.Provider>
		</ErrorBoundary>
	</StrictMode>,
);
