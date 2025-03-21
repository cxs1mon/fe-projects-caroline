import { useContext } from "react";
import { IndexContext, QuestionContext } from "../../context/QuizContext";
import PercentageProgress from "./CorrectProgress";
import Timer from "../hooks/Timer";

export default function QuizProgress() {
  const questions = useContext(QuestionContext);
  const [index, setIndex] = useContext(IndexContext);

  const totalQuestions = questions.quiz.length;

  const progressWidth = (100 / totalQuestions) * (index + 1);
  return (
    <>
      <div id="progress--outer" className="progress--outer">
        <div
          id="progress--inner"
          data-testid="progressbar--inner"
          className="progress--inner"
          style={{ width: `${progressWidth}%` }}
        />
      </div>
      <div style={{ display: `flex` }}>
        <PercentageProgress index={index} />
        <Timer />
      </div>
    </>
  );
}
