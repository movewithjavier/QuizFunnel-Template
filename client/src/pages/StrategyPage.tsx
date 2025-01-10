import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { quizConfig } from "../config/quiz";
import type { QuizSession } from "../types/quiz";

export default function StrategyPage() {
  const sessionId = window.location.pathname.split("/").pop() || "";
  const [error, setError] = useState<string | null>(null);

  const { data: session, isLoading } = useQuery({
    queryKey: ["session", sessionId],
    queryFn: async () => {
      const res = await fetch(`/api/quiz/results/${sessionId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch session data");
      }
      return res.json() as Promise<QuizSession>;
    },
    retry: false,
    onError: (err) => {
      setError("Unable to load your strategy. Please check the URL and try again.");
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl">
          <CardContent className="p-6">
            Loading your strategy...
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !session?.score) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl">
          <CardContent className="p-6 text-center">
            {error || "Strategy not found"}
          </CardContent>
        </Card>
      </div>
    );
  }

  const strategyContent = quizConfig.strategy.sections[session.score];
  const resultContent = quizConfig.results.scoreInterpretations[session.score];

  if (!strategyContent || !resultContent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl">
          <CardContent className="p-6 text-center">
            Strategy content not found
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader className="space-y-4">
          <CardTitle className="text-3xl text-center bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            {strategyContent.title}
          </CardTitle>
          <p className="text-center text-muted-foreground">
            {strategyContent.description}
          </p>
        </CardHeader>
        <CardContent className="space-y-8 p-6">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Key Focus Areas</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {strategyContent.keyPoints.map((point, i) => (
                <li key={i} className="bg-accent/50 p-4 rounded-lg">
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Recommendations</h3>
            <div className="space-y-4">
              {strategyContent.recommendations.map((rec, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <span className="font-bold text-primary">{i + 1}.</span>
                  <p>{rec}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Next Steps</h3>
            <div className="space-y-4">
              {strategyContent.nextSteps.map((step, i) => (
                <div key={i} className="flex items-center space-x-3 p-4 bg-accent/50 rounded-lg">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded-full">
                    {i + 1}
                  </span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
