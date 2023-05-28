import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./reducer/app.ts";

export const store = configureStore({
  reducer: {
    [quizReducer.name]: quizReducer.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
