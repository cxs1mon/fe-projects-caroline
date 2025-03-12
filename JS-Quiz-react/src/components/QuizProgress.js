import { useContext } from "react";
import { IndexContext, QuestionContext } from "./App/App";
import PercentageProgress from "./CorrectProgress";
import Timer from "./Timer";

export default function QuizProgress() {
  const questions = useContext(QuestionContext);
  const [index, setIndex] = useContext(IndexContext);

  const totalQuestions = questions.quiz.length;

  const progressWidth = (100 / totalQuestions) * (index +1 );
  return (
    <>
      <div id="progress--outer" className="progress--outer">
        <div
          id="progress--inner"
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
