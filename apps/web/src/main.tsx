import "./main.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { HostProvider, createStandaloneHost, ensureMockOpenAI } from "@chatui/runtime";
import { AppsSDKUIProvider } from "@chatui/ui";
import { Router } from "./Router";

if (import.meta.env.DEV) {
  ensureMockOpenAI();
}

const host = createStandaloneHost(import.meta.env.VITE_API_BASE ?? "http://localhost:8787");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HostProvider host={host}>
      <AppsSDKUIProvider linkComponent="a">
        <Router />
      </AppsSDKUIProvider>
    </HostProvider>
  </StrictMode>
);
