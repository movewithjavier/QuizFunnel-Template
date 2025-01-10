import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import App from './App';
import "./index.css";

console.log("main.tsx: Starting application initialization");

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("main.tsx: Root element not found!");
} else {
  console.log("main.tsx: Root element found, creating React root");
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <App />
          <Toaster />
        </QueryClientProvider>
      </StrictMode>,
    );
    console.log("main.tsx: Application rendered successfully");
  } catch (error) {
    console.error("main.tsx: Error rendering application:", error);
    // Update debug div
    const debug = document.getElementById('debug');
    if (debug) {
      debug.innerHTML += `<br>React Error: ${error}`;
    }
  }
}
