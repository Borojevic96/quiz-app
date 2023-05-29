import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, FieldArray } from "formik";
import {
  Autocomplete,
  Button,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { DeleteOutlined, Add } from "@mui/icons-material";
import fakeNetworkDelay from "@utils/fakeNetworkDelay.ts";
import restClient from "@utils/restClient.ts";
import { Question, Quiz } from "@types";
import { getQuestions, getQuizzes } from "@selectors/app.selectors.ts";
import { setLoading, setQuizzes } from "@reducers/app.ts";
import style from "./QuizForm.module.scss";

export interface QuizFormValues extends Omit<Quiz, "id"> {
  id?: number;
}
const QuizForm: React.FC<{
  selectedQuiz: Quiz | null;
  callback: () => void;
  handleDialog: () => void;
}> = ({ selectedQuiz, callback, handleDialog }) => {
  const dispatch = useDispatch();
  const questions = useSelector(getQuestions);
  const quizzes = useSelector(getQuizzes);
  const isApiUrlExisting: string = import.meta.env?.VITE_API_URL;
  const initialValues = selectedQuiz || { name: "", questions: [] };

  // use this function to go to the bottom of all questions after a new question is added
  const scrollToBottom = () => {
    const contentElement = document.getElementsByClassName(
      "MuiDialogContent-root"
    );

    setTimeout(() => {
      contentElement[0].scrollTo({
        top: contentElement[0].scrollHeight - 20,
        behavior: "smooth",
      });
    }, 10);
  };

  const onSubmit = (formValues: QuizFormValues) => {
    handleDialog();

    dispatch(setLoading(true));

    if (isApiUrlExisting) {
      if (formValues?.id) {
        restClient
          .put(`quizzes/${formValues.id}`, formValues)
          .then(() => {
            callback();
          })
          .finally(() => dispatch(setLoading(false)));
      } else {
        restClient
          .post("quizzes", formValues)
          .then(() => {
            callback();
          })
          .finally(() => dispatch(setLoading(false)));
      }
    } else {
      const updatedQuizzesState = [...quizzes];
      if (!formValues?.id) {
        updatedQuizzesState.push({ ...formValues, id: quizzes.length + 1 });
      } else {
        const quizIndex = updatedQuizzesState.findIndex(
          (quiz) => quiz.id === formValues.id
        );

        if (quizIndex !== -1) {
          updatedQuizzesState[quizIndex] = { ...(formValues as Quiz) };
        }
      }

      fakeNetworkDelay(() => {
        dispatch(setLoading(false));
        dispatch(setQuizzes(updatedQuizzesState));
      });
    }
  };

  return (
    <div className={style["quiz-form"]}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, handleChange }) => {
          const unusedQuestions = questions.filter((question: Question) => {
            if (values?.questions?.length) {
              return !values.questions.some((formValuesQuestion: Question) => {
                return question.question === formValuesQuestion.question;
              });
            }
            return question;
          });

          return (
            <Form>
              <p className={style["quiz-form__labels"]}>Quiz name</p>
              <TextField
                id="name"
                type="text"
                onChange={handleChange}
                value={values.name}
                required
              />
              <p className={style["quiz-form__labels"]}>Quiz questions</p>
              <FieldArray
                name="questions"
                render={(arrayHelpers) => (
                  <div
                    className={`${style["quiz-form__questions"]} ${
                      unusedQuestions?.length
                        ? style["quiz-form__questions-expanded-padding"]
                        : ""
                    }
                 `}
                  >
                    {values.questions?.length
                      ? values.questions.map((question, index) => {
                          return (
                            <div
                              key={`${question}_${index}`}
                              className={style["quiz-form__questions-single"]}
                            >
                              <Tooltip title="Remove question from quiz">
                                <IconButton
                                  edge="end"
                                  aria-label="Delete"
                                  onClick={() => arrayHelpers.remove(index)}
                                  className={
                                    style["quiz-form__questions-single-delete"]
                                  }
                                >
                                  <DeleteOutlined />
                                </IconButton>
                              </Tooltip>
                              <div
                                className={
                                  style[
                                    "quiz-form__questions-single-input-wrapper"
                                  ]
                                }
                              >
                                <p
                                  className={
                                    style[
                                      "quiz-form__questions-single-input-wrapper-label"
                                    ]
                                  }
                                >
                                  Question:
                                </p>
                                <Field name={`questions.${index}.question`} />
                              </div>
                              <div
                                className={
                                  style[
                                    "quiz-form__questions-single-input-wrapper"
                                  ]
                                }
                              >
                                <p
                                  className={
                                    style[
                                      "quiz-form__questions-single-input-wrapper-label"
                                    ]
                                  }
                                >
                                  Answer:
                                </p>
                                <Field name={`questions.${index}.answer`} />
                              </div>
                            </div>
                          );
                        })
                      : "Currently, there are no questions available in the quiz."}
                    <div className={style["quiz-form__actions"]}>
                      <Button
                        variant="outlined"
                        className={style["quiz-form__actions-add-question"]}
                        onClick={() => {
                          arrayHelpers.push({
                            id: values.questions.length + 1,
                            question: "",
                            answer: "",
                          });

                          scrollToBottom();
                        }}
                        startIcon={<Add />}
                      >
                        Add new question
                      </Button>
                      {!!unusedQuestions?.length && (
                        <Autocomplete
                          options={unusedQuestions}
                          sx={{ width: "100%" }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Add a question from previous quizzes"
                            />
                          )}
                          onChange={(_, newValue) => {
                            if (newValue?.question && newValue?.answer) {
                              arrayHelpers.push({
                                ...newValue,
                                id: values.questions.length + 1,
                              });

                              scrollToBottom();
                            }
                          }}
                          getOptionLabel={(option: Question) => option.question}
                        />
                      )}
                    </div>
                    <button id="submit" type="submit" hidden>
                      Submit
                    </button>
                  </div>
                )}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default React.memo(QuizForm);
