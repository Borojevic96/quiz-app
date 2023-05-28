import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Question, Quiz } from "../types";

interface QuizState {
  quizzes: Quiz[];
  questions: Question[];
  loading: boolean;
}

const initialState: QuizState = {
  quizzes: [],
  questions: [],
  loading: false,
};

export const quiz = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuizzes: (state, action: PayloadAction<Quiz[]>) => {
      state.quizzes = action.payload;
    },
    setSingleQuizData: (state, action: PayloadAction<Quiz>) => {
      state.quizzes.push(action.payload);
    },
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setQuestions, setQuizzes, setSingleQuizData, setLoading } =
  quiz.actions;

export default quiz;
