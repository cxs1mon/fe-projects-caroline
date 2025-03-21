import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CounterContext, IndexContext } from "../../context/QuizContext";
import CounterProgress from "../quiz/CorrectProgress";
import  Header from "../layout/Header";


export default function EndPage() {

  const [index, setIndex] = useContext(IndexContext)
  const [counter, setCounter] = useContext(CounterContext)

  const navigate = useNavigate();
  const restartQuiz = () => {
    setIndex(0);
    setCounter(0);
    navigate("/");
  };

  return (

  <>
  < Header/>
  <h3>Quiz Complete!</h3>
  <CounterProgress/>
  <button onClick={restartQuiz} data-testid="restart">Restart Quiz</button>
  </>
  );
}
