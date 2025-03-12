import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CounterContext,
  IndexContext,
  QuestionContext,
  TypeContext,
} from "../../context/QuizContext";
import "animate.css";
import "./Question.css";

export default function Questions() {
  const [index, setIndex] = useContext(IndexContext);
  const [counter, setCounter] = useContext(CounterContext);
  const [combinedanswers, setCombinedanswers] = useState([]);

  const questions = useContext(QuestionContext);
  // for different game types:
  const type = useContext(TypeContext);

  const navigate = useNavigate();
  const endQuiz = () => {
    navigate("/end");
  };

  useEffect(() => {
    setCombinedanswers(
      questions.quiz.map((question) => {
        const answers = question.wrong_answers.concat(question.correct_answer);
        return shuffle(answers);
      })
    );
  }, []);

  function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  if (!questions) {
    return <div>Loading...</div>;
  } else {
  }

  const handleClick = (e) => {
    const answers = Array.from(
      document.getElementsByClassName("answer-container__item")
    );

    answers.map((element) => {
      if (element.innerText === questions.quiz[index].correct_answer) {
        element.style.backgroundColor = "#ADC4AB";
      }

      element.disabled = true;

      if (e.target.innerText === questions.quiz[index].correct_answer) {
        e.target.classList.remove("animate__bounceInRight");
        e.target.classList.add("animate__heartBeat");
        e.target.style.backgroundColor = "#55A051";
        setCounter(counter + 1);
      } else {
        e.target.style.backgroundColor = "#D11F2E";
        e.target.classList.remove("animate__bounceInRight");
        e.target.classList.add("animate__shakeX");
      }
    });

    setTimeout(() => {
      if (index >= questions.quiz.length - 1) {
        endQuiz();
      } else {
        setIndex(index + 1);
      }
    }, 1500);
  };

  return (
    <div>
      <p id="question" className="question">
        {questions.quiz[index].question}
      </p>
      <div className="answer-container">
        {combinedanswers[index] &&
          combinedanswers[index].map((answer) => (
            <button
              key={answer}
              className="answer-container__item animate__animated animate__bounceInRight"
              onClick={handleClick}
            >
              {answer}
            </button>
          ))}
      </div>
    </div>
  );
}
