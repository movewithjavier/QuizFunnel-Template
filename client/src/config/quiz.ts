import { QuizConfig } from "../types/quiz";

export const quizConfig: QuizConfig = {
  title: "Assessment Title",
  description: "Take this quick assessment to discover your results",
  questions: [
    {
      id: "q1",
      text: "What is your primary goal?",
      options: [
        { value: "growth", label: "Business Growth" },
        { value: "efficiency", label: "Improve Efficiency" },
        { value: "innovation", label: "Drive Innovation" }
      ]
    },
    {
      id: "q2",
      text: "What is your current challenge?",
      options: [
        { value: "time", label: "Time Management" },
        { value: "resources", label: "Resource Allocation" },
        { value: "strategy", label: "Strategic Planning" }
      ]
    },
    {
      id: "q3",
      text: "How would you describe your approach?",
      options: [
        { value: "careful", label: "Methodical & Careful" },
        { value: "fast", label: "Quick & Decisive" },
        { value: "balanced", label: "Balanced Approach" }
      ]
    }
  ]
};
