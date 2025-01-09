import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { quizConfig } from "../config/quiz";
import { Progress } from "@/components/ui/progress";
import { useMutation } from "@tanstack/react-query";
import type { QuizResponse } from "../types/quiz";

export default function QuizPage() {
  const [, setLocation] = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<QuizResponse>({});

  const submitQuiz = useMutation({
    mutationFn: async (responses: QuizResponse) => {
      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ responses }),
      });
      return res.json();
    },
    onSuccess: (data) => {
      setLocation(`/results/${data.id}`);
    },
  });

  const question = quizConfig.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizConfig.questions.length) * 100;

  const handleNext = () => {
    if (currentQuestion < quizConfig.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      submitQuiz.mutate(responses);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">{quizConfig.title}</CardTitle>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">{question.text}</h2>
            <RadioGroup
              value={responses[question.id]}
              onValueChange={(value) => {
                setResponses(prev => ({...prev, [question.id]: value}));
              }}
            >
              {question.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
            <Button 
              className="w-full"
              onClick={handleNext}
              disabled={!responses[question.id]}
            >
              {currentQuestion < quizConfig.questions.length - 1 ? "Next" : "See Results"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
