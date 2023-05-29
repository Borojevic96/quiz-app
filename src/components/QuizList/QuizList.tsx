import React from "react";
import { useSelector } from "react-redux";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import { DeleteOutlined, Slideshow } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Quiz, QuizActions } from "@types";
import { getLoading, getQuizzes } from "@selectors/app.selectors.ts";
import style from "./QuizList.module.scss";

const QuizList: React.FC<QuizActions> = ({
  onClickEditQuiz,
  onClickDeleteQuiz,
}) => {
  const navigate = useNavigate();
  const quizzes = useSelector(getQuizzes);
  const loading = useSelector(getLoading);

  if (loading) {
    return <LinearProgress />;
  }

  if (!quizzes?.length) {
    return (
      <p>
        Currently, there are no quizzes available. You can create a new quiz by
        clicking the "CREATE NEW" button.
      </p>
    );
  }

  return (
    <List disablePadding className={style["quiz-list"]}>
      {quizzes.map((quiz: Quiz) => (
        <ListItem
          key={quiz.id}
          divider
          onClick={() => onClickEditQuiz(quiz.id)}
        >
          <ListItemText primary={quiz.name} />
          <ListItemSecondaryAction>
            <Tooltip title="Start quiz">
              <IconButton
                edge="end"
                aria-label="Start quiz"
                onClick={() => navigate(`/quiz/${quiz.id}/view`)}
              >
                <Slideshow />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete quiz">
              <IconButton
                edge="end"
                aria-label="Delete quiz"
                onClick={() => onClickDeleteQuiz(quiz.id)}
              >
                <DeleteOutlined />
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default React.memo(QuizList);
