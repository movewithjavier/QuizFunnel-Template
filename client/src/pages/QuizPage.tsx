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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-xl shadow-lg border-primary/10">
        <CardHeader className="space-y-4">
          <CardTitle className="text-2xl text-center bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            {quizConfig.title}
          </CardTitle>
          <Progress value={progress} className="h-2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">
              {question.text}
            </h2>
            <RadioGroup
              value={responses[question.id]}
              onValueChange={(value) => {
                setResponses(prev => ({...prev, [question.id]: value}));
              }}
              className="space-y-3"
            >
              {question.options.map((option) => (
                <div key={option.value} 
                  className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent transition-colors">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label 
                    htmlFor={option.value}
                    className="flex-grow cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={handleNext}
              disabled={!responses[question.id]}
              size="lg"
            >
              {currentQuestion < quizConfig.questions.length - 1 ? "Next" : "See Results"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}