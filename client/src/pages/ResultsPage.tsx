import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Modal } from "@/components/ui/modal";
import { LeadForm } from "@/components/LeadForm";
import { quizConfig } from "../config/quiz";
import type { QuizSession } from "../types/quiz";

export default function ResultsPage() {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [, setLocation] = useLocation();
  const quizId = window.location.pathname.split("/").pop() || "";

  const { data: session, isLoading } = useQuery<QuizSession>({
    queryKey: ["quiz", "results", quizId],
    queryFn: async () => {
      const res = await fetch(`/api/quiz/results/${quizId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch results");
      }
      return res.json();
    },
  });

  const handleLeadSuccess = () => {
    setShowLeadForm(false);
  };

  const interpretation = session?.score ? quizConfig.results.scoreInterpretations[session.score] : null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">{quizConfig.results.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {isLoading ? (
              <>
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-20 w-full" />
              </>
            ) : session && interpretation ? (
              <>
                <div className="text-center space-y-4">
                  <div className="text-2xl font-bold text-primary">
                    {interpretation.title}
                  </div>
                  <p className="text-gray-600">
                    {interpretation.description}
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">Key Recommendations</h3>
                    <ul className="space-y-2">
                      {interpretation.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Your Responses</h3>
                    {Object.entries(session.responses).map(([questionId, answer]) => {
                      const question = quizConfig.questions.find(q => q.id === questionId);
                      if (!question) return null;
                      
                      let displayAnswer = answer;
                      if (question.type === 'multiple-choice') {
                        const option = question.options.find(opt => opt.value === answer);
                        if (option) displayAnswer = option.label;
                      }

                      return (
                        <div key={questionId} className="bg-gray-50 p-4 rounded-lg">
                          <div className="font-medium">{question.text}</div>
                          <div className="text-gray-600">Your answer: {displayAnswer}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    onClick={() => setLocation(`/strategy/${quizId}`)} 
                    className="w-full"
                    variant="default"
                  >
                    Get Your Detailed Strategy
                  </Button>
                </div>
              </>
            ) : (
              <p className="text-center text-gray-600">No results available</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Modal isOpen={showLeadForm} onClose={() => setShowLeadForm(false)}>
        <LeadForm quizId={quizId} onSuccess={handleLeadSuccess} />
      </Modal>
    </div>
  );
}