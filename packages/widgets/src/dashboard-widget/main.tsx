import { DashboardPage } from "@chatui/ui";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../styles.css";

// Widget-specific dashboard with minimal chrome
function DashboardWidget() {
  return (
    <DashboardPage
      onNavigate={(page) => {
        // In a widget, you might post messages to parent
        window.parent?.postMessage({ type: "navigate", page }, "*");
      }}
      headerSlot={
        <div className="text-white/60 text-sm">
          ChatGPT Dashboard Widget
        </div>
      }
    />
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DashboardWidget />
  </StrictMode>
);