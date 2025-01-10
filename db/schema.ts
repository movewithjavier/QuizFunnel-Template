import { pgTable, text, timestamp, jsonb, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const quizSessions = pgTable("quiz_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
  responses: jsonb("responses").$type<Record<string, string>>(),
  score: text("score"),
});

export const leads = pgTable("leads", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionId: uuid("session_id").references(() => quizSessions.id),
  email: text("email").notNull(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type QuizSession = typeof quizSessions.$inferSelect;
export type NewQuizSession = typeof quizSessions.$inferInsert;
export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;

export const insertQuizSessionSchema = createInsertSchema(quizSessions);
export const selectQuizSessionSchema = createSelectSchema(quizSessions);
export const insertLeadSchema = createInsertSchema(leads);
export const selectLeadSchema = createSelectSchema(leads);
