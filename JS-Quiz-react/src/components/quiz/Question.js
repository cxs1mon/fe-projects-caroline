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
import useShuffledAnswers from "../hooks/Shuffle";

export default function Questions() {
  const [index, setIndex] = useContext(IndexContext);
  const [counter, setCounter] = useContext(CounterContext);

  const questions = useContext(QuestionContext);
  // for different game types:
  const type = useContext(TypeContext);

  const navigate = useNavigate();
  const endQuiz = () => {
    navigate("/end");
  };

  const combinedanswers = useShuffledAnswers();

  if (!questions) {
    return <div>Loading...</div>;
  } else {
  }

  function checkAnswer(answer) {
    console.log(answer);
    return answer === questions.quiz[index].correct_answer;
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

      let answerState = checkAnswer(element.innerText);

      if (answerState) {
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
        console.log(combinedanswers);
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
