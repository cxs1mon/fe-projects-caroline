import { useContext } from "react";
import { IndexContext, QuestionContext } from "../../context/QuizContext";
import PercentageProgress from "./CorrectProgress";
import Timer from "../hooks/Timer";

export default function QuizProgress() {
  const questions = useContext(QuestionContext);
  const indexContextValue = useContext(IndexContext);
  const [index, setIndex] = indexContextValue;

  const totalQuestions: number = questions.quiz.length;

  const progressWidth:number = (100 / totalQuestions) * (index + 1);
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
        <PercentageProgress/>
        <Timer/>
      </div>
    </>
  );
}
