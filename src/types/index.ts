export interface Question {
  id: number;
  question: string;
  answer: string;
}

export interface Quiz {
  id: number;
  name: string;
  questions: Question[];
}

export interface QuizActions {
  onClickDeleteQuiz: (quizId: number) => void;
  onClickEditQuiz: (quizId: number) => void;
}
