import { renderToString } from "react-dom/server";
import LegacyApp from "./App";
import LightApp from "./LightApp";
const App = import.meta.env.VITE_REFRESH_VARIANT === "light" ? LightApp : LegacyApp;
import type { Language } from "./i18n";
export function render(language: Language): string {
  return renderToString(<App initialLanguage={language} />);
}
