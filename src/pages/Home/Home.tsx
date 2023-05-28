import { useCallback, useEffect, useMemo, useState } from "react";
import { AxiosResponse } from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { QuizRounded } from "@mui/icons-material";
import restClient from "../../utils/restClient.ts";
import { setLoading, setQuestions, setQuizzes } from "../../reducer/app.ts";
import { Question, Quiz, QuizActions } from "../../types";
import {
  questionsMockedData,
  quizzesMockedData,
} from "../../utils/dataProvider.ts";
import QuizList from "../../components/QuizList";
import QuizForm from "../../components/QuizForm";
import { getQuizzes } from "../../selectors/app.selectors.ts";
import fakeNetworkDelay from "../../utils/fakeNetworkDelay.ts";
import style from "./Home.module.scss";

interface SelectedQuiz {
  edit: Quiz | null;
  delete: Quiz | null;
}

const Home = () => {
  const dispatch = useDispatch();
  const quizzes = useSelector(getQuizzes);
  const isApiUrlExisting: string = import.meta.env?.VITE_API_URL;
  const [dialogOpened, setDialogOpened] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<SelectedQuiz>({
    edit: null,
    delete: null,
  });

  const handleDialog = useCallback(() => {
    setDialogOpened((prevState) => !prevState);
    setTimeout(() => {
      if (selectedQuiz.delete?.name || selectedQuiz.edit?.name) {
        setSelectedQuiz({ edit: null, delete: null });
      }
    }, 100);
  }, [selectedQuiz]);

  const fetchQuizzes = () => {
    dispatch(setLoading(true));

    if (isApiUrlExisting) {
      restClient
        .get<{ data: Quiz[] }>("/quizzes")
        .then((response: AxiosResponse) => {
          dispatch(setQuizzes(response.data));
        })
        .catch(() => {
          // handle error
        })
        .finally(() => dispatch(setLoading(false)));
    } else {
      fakeNetworkDelay(() => {
        dispatch(setLoading(false));
        dispatch(setQuizzes(quizzesMockedData));
      });
    }
  };

  const fetchQuestions = () => {
    dispatch(setLoading(true));

    if (isApiUrlExisting) {
      restClient
        .get<{ data: Question[] }>("/questions")
        .then((response: AxiosResponse) => {
          dispatch(setQuestions(response.data));
        })
        .catch(() => {
          // handle error
        })
        .finally(() => dispatch(setLoading(false)));
    } else {
      fakeNetworkDelay(() => {
        dispatch(setLoading(false));
        dispatch(setQuestions(questionsMockedData));
      });
    }
  };

  useEffect(() => {
    fetchQuizzes();
    fetchQuestions();
  }, []);

  const onClickEditQuiz: QuizActions["onClickEditQuiz"] = (quizId) => {
    const currentQuiz: Quiz | null =
      quizzes?.find((quiz: Quiz) => quiz.id === quizId) || null;

    setSelectedQuiz({ edit: currentQuiz, delete: null });
    setDialogOpened((prevState) => !prevState);
  };

  const onClickDeleteQuiz: QuizActions["onClickDeleteQuiz"] = (quizId) => {
    const currentQuiz: Quiz | null =
      quizzes?.find((quiz: Quiz) => quiz.id === quizId) || null;

    setSelectedQuiz({ edit: null, delete: currentQuiz });
    setDialogOpened((prevState) => !prevState);
  };

  const onDeleteQuiz = useCallback(() => {
    dispatch(setLoading(true));
    setDialogOpened(false);

    if (isApiUrlExisting) {
      restClient
        .delete(`${selectedQuiz.delete?.id}`)
        .then(() => fetchQuizzes())
        .finally(() => dispatch(setLoading(false)));
    } else {
      const newArrayOfQuizzes: Quiz[] = quizzes.filter(
        (quiz: Quiz) => quiz.id !== selectedQuiz.delete?.id
      );
      setTimeout(() => {
        dispatch(setLoading(false));
        dispatch(setQuizzes(newArrayOfQuizzes));
      }, 500);
    }
  }, [selectedQuiz]);

  const dialogData = useMemo(() => {
    let title = "Create new quiz";
    let actionName = "Create";
    let content = (
      <QuizForm
        selectedQuiz={selectedQuiz.edit}
        callback={() => {
          fetchQuizzes();
          fetchQuestions();
        }}
        handleDialog={handleDialog}
      />
    );

    if (selectedQuiz?.edit?.name) {
      title = `Edit: ${selectedQuiz.edit.name}`;
      actionName = "Update";
    } else if (selectedQuiz?.delete?.name) {
      title = "Delete quiz";
      actionName = "Delete";
      content = (
        <p>
          Are you sure you want to permanently delete{" "}
          <b>{selectedQuiz.delete?.name || "this quiz"}</b>? Please proceed with
          caution when making this decision.
        </p>
      );
    }

    return { title, actionName, content };
  }, [selectedQuiz]);

  return (
    <div className={style.home}>
      <Dialog
        open={dialogOpened}
        onClose={handleDialog}
        scroll="paper"
        fullWidth
        className={style.home__dialog}
      >
        <DialogTitle>{dialogData.title}</DialogTitle>
        <DialogContent>{dialogData.content}</DialogContent>
        <DialogActions>
          <Button onClick={handleDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={
              selectedQuiz.delete?.id
                ? onDeleteQuiz
                : () => {
                    const submitQuizFormButton =
                      document.getElementById("submit");
                    if (submitQuizFormButton) {
                      submitQuizFormButton.click();
                    }
                  }
            }
          >
            {dialogData.actionName}
          </Button>
        </DialogActions>
      </Dialog>
      <div className={style.home__header}>
        <h1>All quizzes</h1>
        <Button
          variant="outlined"
          size="large"
          startIcon={<QuizRounded />}
          onClick={handleDialog}
        >
          Create new
        </Button>
      </div>
      <QuizList
        onClickEditQuiz={onClickEditQuiz}
        onClickDeleteQuiz={onClickDeleteQuiz}
      />
    </div>
  );
};

export default Home;
