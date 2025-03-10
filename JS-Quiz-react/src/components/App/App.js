import { createContext, React, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import EndPage from "../EndPage.js";
import QuizPage from "../QuizPage.js";
import StartPage from "../StartPage.js";
import "./App.css";

export const QuestionContext = createContext();
export const IndexContext = createContext();
export const CounterContext = createContext();

export default function App() {
  const questions = {
    "quiz": [
      {
        "id": 1,
        "question": "Which element is said to keep bones strong?",
        "wrong_answers": ["Iron", "Potassium", "Sodium"],
        "correct_answer": "Calcium"
      },
      {
        "id": 2,
        "question": "What is the largest ocean on Earth?",
        "wrong_answers": ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
        "correct_answer": "Pacific Ocean"
      },
      {
        "id": 3,
        "question": "Which artist painted the ceiling of the Sistine Chapel?",
        "wrong_answers": ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso"],
        "correct_answer": "Michelangelo"
      },
      {
        "id": 4,
        "question": "Which planet is known as the Red Planet?",
        "wrong_answers": ["Jupiter", "Saturn", "Venus"],
        "correct_answer": "Mars"
      },
      {
        "id": 5,
        "question": "Is 5 a prime number?",
        "wrong_answers": ["False"],
        "correct_answer": "True"
      }
    ]
  }

  const [index, setIndex] = useState(0);
  const [counter, setCounter] = useState(0);

  return (
    <Router>
      <IndexContext.Provider value={[index, setIndex]}>
        <QuestionContext.Provider value={questions}>
          <CounterContext.Provider value={[counter, setCounter]}>
            <Routes>
              <Route path="/" element={<StartPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/end" element={<EndPage />} />
            </Routes>
          </CounterContext.Provider>
        </QuestionContext.Provider>
      </IndexContext.Provider>
    </Router>
  );
}
