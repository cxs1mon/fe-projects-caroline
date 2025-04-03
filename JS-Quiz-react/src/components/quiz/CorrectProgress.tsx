import { useContext, useEffect, useState } from "react";
import React from "react";
import { CounterContext, QuestionContext } from "../../context/QuizContext";

const CounterProgress: React.FC = () => {
  const counterContext = useContext(CounterContext);
  const questionContext = useContext(QuestionContext);
  const [percentage, setPercentage] = useState<number>(0);

  if (!counterContext || !questionContext) {
    throw new Error("CounterContext or QuestionContext is not provided");
  }

  const [counter, setCounter] = counterContext; 
  const questions = questionContext; 

  const totalQuestions: number = questions.quiz.length;

  useEffect(() => {
    setPercentage((counter / totalQuestions) * 100); 
  }, [counter, totalQuestions]); 

  return (
    <p style={{ width: `50%` }} data-testid="correct">
      Correct: {percentage}%
    </p>
  );
};

export default CounterProgress;