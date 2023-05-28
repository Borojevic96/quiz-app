import { RootState } from "../store.ts";

export const getQuizzes = (state: RootState) => state.quiz.quizzes;
export const getQuestions = (state: RootState) => state.quiz.questions;

export const getLoading = (state: RootState) => state.quiz.loading;
