import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import {
  Home,
  Work,
  Showcase,
  About,
  Lab,
  Contact,
  Missing,
} from "./views/Workshop";
import { restorePerfTier } from "./lib/perf";
import { restorePrefs } from "./lib/a11y";
import "./styles/tokens.css";
import "./styles/global.css";
import "./styles/theme-glyph.css";
import "./styles/shell.css";
import "./styles/rail.css";
import "./styles/boot.css";
import "./styles/mobile-app.css";
import "./styles/a11y.css";
import "./styles/apple.css";
import "./styles/mobile-pass.css";
import "./styles/perf.css";
import "./styles/workshop.css";
restorePerfTier();
restorePrefs();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter useTransitions={false}>
      <Routes>
        <Route element={<App />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Work />} />
          <Route path="showcase" element={<Showcase />} />
          <Route path="about" element={<About />} />
          <Route path="lab" element={<Lab />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
