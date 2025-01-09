export interface QuizQuestion {
  id: string;
  text: string;
  options: {
    value: string;
    label: string;
  }[];
}

export interface QuizConfig {
  title: string;
  description: string;
  questions: QuizQuestion[];
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
