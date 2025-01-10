import express, { type Express } from "express";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer, createLogger } from "vite";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { type Server } from "http";
import viteConfig from "../vite.config";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  log("Setting up Vite development server...");
  
  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        if (
          msg.includes("[TypeScript] Found 0 errors. Watching for file changes")
        ) {
          log("no errors found", "tsc");
          return;
        }

        if (msg.includes("[TypeScript] ")) {
          const [errors, summary] = msg.split("[TypeScript] ", 2);
          log(`${summary} ${errors}\u001b[0m`, "tsc");
          return;
        } else {
          viteLogger.error(msg, options);
        }
      },
    },
    server: {
      middlewareMode: true,
      hmr: { server },
    },
    appType: "spa",
  });

  log("Vite server created, setting up middleware...");

  // Use Vite's connect instance as middleware
  app.use(vite.middlewares);

  // Add a middleware to log all requests
  app.use((req, res, next) => {
    log(`${req.method} ${req.url}`, "express");
    next();
  });

  // Handle all non-API routes by serving index.html
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    // Skip API routes
    if (url.startsWith("/api")) {
      return next();
    }

    try {
      let template = fs.readFileSync(
        path.resolve(__dirname, "../client/index.html"),
        "utf-8"
      );
      
      // Apply Vite HTML transforms
      template = await vite.transformIndexHtml(url, template);
      
      res.status(200).set({ "Content-Type": "text/html" }).end(template);
      log(`Served transformed index.html for ${url}`, "vite");
    } catch (e) {
      log(`Error serving index.html: ${e}`, "vite");
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });

  log("Vite middleware setup complete");
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "../dist");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
