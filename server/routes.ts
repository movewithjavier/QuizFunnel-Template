import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { quizSessions, leads } from "@db/schema";

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
      where: (sessions, { eq }) => eq(sessions.id, parseInt(id)),
    });
    
    if (!result) {
      res.status(404).json({ message: "Session not found" });
      return;
    }
    
    res.json(result);
  });

  app.post("/api/leads/create", async (req, res) => {
    const { email, name, sessionId } = req.body;
    
    const result = await db.insert(leads)
      .values({ email, name, sessionId })
      .returning();
      
    res.json(result[0]);
  });

  const httpServer = createServer(app);
  return httpServer;
}
