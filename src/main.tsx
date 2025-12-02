import React from "react";
import ReactDOM from "react-dom/client";
// import { LedgerProvider } from "./context/LedgerContext";
import App from "./App";
import "./index.css";
import "./i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <LedgerProvider> */}
    <App />
    {/* </LedgerProvider> */}
  </React.StrictMode>
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.ts").then(() => {
      console.log("SW registered");
    });
  });
}