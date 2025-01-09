import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import type { QuizSession } from "../types/quiz";

export default function ResultsPage() {
  const [, setLocation] = useLocation();
  const sessionId = window.location.pathname.split("/").pop();

  const { data: session } = useQuery<QuizSession>({
    queryKey: [`/api/quiz/results/${sessionId}`],
  });

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Your Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-primary">{session.score}</h2>
              <p className="mt-2 text-gray-600">
                Based on your responses, here's your initial assessment.
              </p>
            </div>
            <Button 
              className="w-full"
              onClick={() => setLocation(`/details/${sessionId}`)}
            >
              Get Detailed Analysis
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
