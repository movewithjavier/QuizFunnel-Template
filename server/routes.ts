import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { quizSessions, leads } from "@db/schema";
import { eq } from "drizzle-orm";
import { subscribeToConvertKit } from "./services/convertkit";
import { log } from "./vite";

export function registerRoutes(app: Express): Server {
  app.post("/api/quiz/submit", async (req, res) => {
    const { responses } = req.body;
    
    // Simple scoring logic - can be customized
    const score = Object.values(responses).includes("growth") ? "Growth Oriented" : "Efficiency Focused";
    
    const result = await db.insert(quizSessions)
      .values({ responses, score })
      .returning();
      
    res.json(result[0]);
  });

  app.get("/api/quiz/results/:id", async (req, res) => {
    const { id } = req.params;
    const result = await db.query.quizSessions.findFirst({
      where: eq(quizSessions.id, id),
    });
    
    if (!result) {
      res.status(404).json({ message: "Session not found" });
      return;
    }
    
    res.json(result);
  });

  app.post("/api/leads/subscribe", async (req, res) => {
    try {
      const { email, name, sessionId } = req.body;

      // Validate required fields
      if (!email || !sessionId) {
        res.status(400).json({ message: "Email and session ID are required" });
        return;
      }

      // Get quiz results
      const quiz = await db.query.quizSessions.findFirst({
        where: eq(quizSessions.id, sessionId),
      });

      if (!quiz) {
        res.status(404).json({ message: "Quiz session not found" });
        return;
      }

      // Subscribe to ConvertKit
      log("Subscribing to ConvertKit...", "convertkit");
      await subscribeToConvertKit({
        email,
        name,
        quizId: sessionId.toString(),
        score: quiz.score,
      });

      // Save lead to database
      const lead = await db.insert(leads)
        .values({ email, name, sessionId })
        .returning();

      res.json({
        message: "Successfully subscribed",
        lead: lead[0],
      });
    } catch (error) {
      log(`ConvertKit subscription error: ${error}`, "convertkit");
      res.status(500).json({ 
        message: "Failed to subscribe", 
        error: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
