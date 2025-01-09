import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import type { QuizSession } from "../types/quiz";

export default function SharedResultsPage() {
  const [, setLocation] = useLocation();
  const sessionId = window.location.pathname.split("/").pop();

  const { data: session } = useQuery<QuizSession>({
    queryKey: [`/api/quiz/results/${sessionId}`],
  });

  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-xl shadow-lg border-primary/10">
        <CardHeader>
          <CardTitle className="text-2xl text-center bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-primary">{session.score}</h2>
              <p className="mt-2 text-gray-600">
                Want to find out your own results?
              </p>
            </div>
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => setLocation("/")}
              size="lg"
            >
              Take the Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}