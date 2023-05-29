import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AxiosResponse } from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import { Button, LinearProgress } from "@mui/material";
import restClient from "@utils/restClient.ts";
import { quizzesMockedData } from "@utils/dataProvider.ts";
import fakeNetworkDelay from "@utils/fakeNetworkDelay.ts";
import { Question, Quiz } from "@types";
import { getLoading, getQuizzes } from "@selectors/app.selectors.ts";
import { setLoading, setSingleQuizData } from "@reducers/app.ts";
import "swiper/swiper.scss";
import style from "./QuizView.module.scss";

SwiperCore.use([Navigation]);

const QuizView = () => {
  const params = useParams();
  const quizId = params.id;
  const loading = useSelector(getLoading);
  const quizzes = useSelector(getQuizzes);
  const dispatch = useDispatch();
  const isApiUrlExisting: string = import.meta.env?.VITE_API_URL;
  const quizData = quizzes?.find((quiz: Quiz) => quiz.id === Number(quizId));
  const [showAnswer, setShowAnswer] = useState(false);
  const [hideNextQuestionButton, setHideNextQuestionButton] = useState(false);
  const mockedDataForCurrentQuiz: Quiz | undefined = quizzesMockedData.find(
    (quiz: Quiz) => quiz.id === Number(quizId)
  );

  const fetchQuizData = () => {
    dispatch(setLoading(true));

    if (isApiUrlExisting) {
      restClient
        .get<{ data: Quiz }>(`quizzes/${quizId}`)
        .then((response: AxiosResponse) => {
          dispatch(setSingleQuizData(response.data));
        })
        .catch(() => {
          // handle error
        })
        .finally(() => dispatch(setLoading(false)));
    } else {
      fakeNetworkDelay(() => {
        dispatch(setLoading(false));
        dispatch(setSingleQuizData(mockedDataForCurrentQuiz as Quiz));
      });
    }
  };

  useEffect(() => {
    if (!quizzes?.length) {
      fetchQuizData();
    }
  }, []);

  if (loading) {
    return <LinearProgress />;
  }

  if (!quizData?.id || !quizData?.questions?.length) {
    return (
      <h1 className={style["quiz-slider__no-data"]}>
        Currently, there are no questions available in the quiz.
      </h1>
    );
  }

  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      navigation={{
        nextEl: ".swiper-next",
      }}
      speed={600}
      allowTouchMove={false}
      className={style["quiz-slider"]}
      runCallbacksOnInit={false}
      onSlideChange={() => {
        setTimeout(() => setShowAnswer(false), 50);
      }}
      onReachEnd={() => setHideNextQuestionButton(true)}
    >
      {quizData.questions.map((singleQuestion: Question) => {
        return (
          <SwiperSlide
            key={singleQuestion.id}
            className={style["quiz-slider__single-slide"]}
          >
            <div className={style["quiz-slider__single-slide-wrapper"]}>
              <h2 className={style["quiz-slider__single-slide-question"]}>
                {singleQuestion.question}
              </h2>
              <div className={style["quiz-slider__single-slide-actions"]}>
                <Button
                  size="large"
                  disabled={showAnswer}
                  variant={showAnswer ? "outlined" : "contained"}
                  className={style["quiz-slider__single-slide-answer"]}
                  onClick={() => setShowAnswer((prevState) => !prevState)}
                >
                  {showAnswer ? singleQuestion.answer : "Answer"}
                </Button>
                {!hideNextQuestionButton && (
                  <Button
                    className="swiper-next"
                    variant="outlined"
                    size="large"
                  >
                    Next question
                  </Button>
                )}
              </div>
            </div>
          </SwiperSlide>
        );
      })}
      <SwiperSlide className={style["quiz-slider__single-slide"]}>
        <h1>
          Thank you for visiting our quiz! We hope you enjoyed testing your
          knowledge.
          <br />
          Join us again soon for more challenges and fun!
        </h1>
      </SwiperSlide>
    </Swiper>
  );
};

export default QuizView;
