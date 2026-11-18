import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import type { Language } from "./i18n";
import "./index.css";
import "./original-parity.css";

const root = document.getElementById("root")!;
// Use the server's language for the first render, never a query-param guess.
const initialLanguage: Language = root.dataset.language === "ru" ? "ru" : "en";
const query = new URLSearchParams(location.search);
const legacyLanguage = query.get("lang");
if (legacyLanguage === "ru" || legacyLanguage === "en") {
  query.delete("lang");
  const rest = query.toString();
  const destination = `${import.meta.env.BASE_URL}${legacyLanguage}/${rest ? `?${rest}` : ""}${location.hash}`;
  if (location.pathname + location.search + location.hash !== destination) location.replace(destination);
}
const app = <React.StrictMode><App initialLanguage={initialLanguage} /></React.StrictMode>;
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
