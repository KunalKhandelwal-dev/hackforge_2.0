import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";

const bgRoot = document.getElementById("bg-root");
if (bgRoot) {
  ReactDOM.createRoot(bgRoot).render(
    <div className="fixed inset-0 pointer-events-none grid-pattern" />
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);