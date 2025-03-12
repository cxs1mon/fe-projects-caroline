import { useContext, useEffect, useState } from "react";
import { CounterContext, QuestionContext } from "./App/App";

export default function CounterProgress() {
  const correct = useContext(CounterContext);
  const questions = useContext(QuestionContext);
  const [percentage, setPercentage] = useState(0);

  const totalQuestions = questions.quiz.length

  useEffect(() => {
    setPercentage((correct[0] / totalQuestions) * 100);
  }, correct);

  return (
    <>
      <p style={{ width: `50%` }}>Correct: {percentage}%</p>
    </>
  );
}
