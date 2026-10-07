import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { applyPalette, initialPalette } from "./palette";

// Set the palette before the first render so the page never flashes the wrong colours.
applyPalette(initialPalette());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
