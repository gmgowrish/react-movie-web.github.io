import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import App from "./App";
import { tmdb } from "./api/tmdb";
import "./styles/global.css";

// Start the hero data request immediately, in parallel with the first render.
tmdb("/trending/all/day").catch(() => {});

// HashRouter keeps deep links working on GitHub Pages (no server-side rewrites).
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </HashRouter>
  </React.StrictMode>
);
