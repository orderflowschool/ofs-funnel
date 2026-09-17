import React from "react";
import ReactDOM from "react-dom/client";

/* Self-hosted type — no third-party font request, no FOUT from a CDN,
   and Geist is guaranteed to render rather than silently falling back. */
import '@fontsource-variable/geist';
import '@fontsource-variable/inter';
import '@fontsource/ibm-plex-mono/500.css';
import '@fontsource/ibm-plex-mono/600.css';

import "@/index.css";
import "@/ofs-design.css";
import App from "@/App";

/* Enable scroll-reveal motion. Set before first paint so revealed elements
   start hidden (no flash of content that then jumps away). Skipped when the
   visitor prefers reduced motion — the reveal CSS then falls back to a plain
   fade, but we still gate it on the class so nothing depends on JS timing. */
document.documentElement.classList.add('ofs-js');

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
