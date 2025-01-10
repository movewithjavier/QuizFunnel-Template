export type QuestionType = 'multiple-choice' | 'slider';

export interface BaseQuestion {
  id: string;
  text: string;
  type: QuestionType;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: {
    value: string;
    label: string;
  }[];
}

export interface SliderQuestion extends BaseQuestion {
  type: 'slider';
  min: number;
  max: number;
  step: number;
  minLabel: string;
  maxLabel: string;
  defaultValue?: number;
}

export type QuizQuestion = MultipleChoiceQuestion | SliderQuestion;

export interface ResultsContent {
  title: string;
  description: string;
  scoreInterpretations: {
    [key: string]: {
      title: string;
      description: string;
      recommendations: string[];
    };
  };
}

export interface StrategyContent {
  title: string;
  description: string;
  sections: {
    title: string;
    content: string;
  }[];
}

export interface QuizConfig {
  title: string;
  description: string;
  questions: QuizQuestion[];
  results: ResultsContent;
  strategy: StrategyContent;
}

export interface QuizResponse {
  [questionId: string]: string;
}

export interface QuizSession {
  id: number;
  responses: QuizResponse;
  score: string;
}

export interface Lead {
  email: string;
  name?: string;
  sessionId: number;
}
