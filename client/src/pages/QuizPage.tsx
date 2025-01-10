import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { quizConfig } from "../config/quiz";
import { Progress } from "@/components/ui/progress";
import { useMutation } from "@tanstack/react-query";
import type { QuizResponse, QuizQuestion, MultipleChoiceQuestion, SliderQuestion } from "../types/quiz";
import { Slider } from "@/components/ui/slider";

export default function QuizPage() {
  console.log("QuizPage: Component mounting");
  
  const [, setLocation] = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<QuizResponse>({});

  console.log("QuizPage: Current question index:", currentQuestion);
  console.log("QuizPage: Current responses:", responses);

  const submitQuiz = useMutation({
    mutationFn: async (responses: QuizResponse) => {
      console.log("QuizPage: Submitting responses:", responses);
      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ responses }),
      });
      return res.json();
    },
    onSuccess: (data) => {
      console.log("QuizPage: Submit successful, redirecting to results", data);
      setLocation(`/results/${data.id}`);
    },
  });

  const question = quizConfig.questions[currentQuestion];
  console.log("QuizPage: Current question:", question);

  const progress = ((currentQuestion + 1) / quizConfig.questions.length) * 100;

  const handleNext = () => {
    if (currentQuestion < quizConfig.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      submitQuiz.mutate(responses);
    }
  };

  const renderQuestion = (question: QuizQuestion) => {
    switch (question.type) {
      case 'multiple-choice':
        return (
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
        );
      case 'slider':
        return (
          <div className="space-y-8 px-1">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{question.minLabel}</span>
              <span>{question.maxLabel}</span>
            </div>
            <Slider
              value={[responses[question.id] !== undefined ? Number(responses[question.id]) : question.defaultValue || question.min]}
              onValueChange={(value) => {
                setResponses(prev => ({...prev, [question.id]: value[0].toString()}));
              }}
              max={question.max}
              min={question.min}
              step={question.step}
              className="w-full"
            />
            <div className="text-center text-lg font-medium">
              {responses[question.id] !== undefined ? responses[question.id] : question.defaultValue || question.min}
            </div>
          </div>
        );
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
            {renderQuestion(question)}
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={handleNext}
              disabled={responses[question.id] === undefined}
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