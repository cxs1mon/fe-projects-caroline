import { createContext, useState } from "react";

export const QuestionContext = createContext();
export const IndexContext = createContext();
export const CounterContext = createContext();
export const TypeContext = createContext();

const questions = {
  quiz: [
    {
      id: 1,
      type: "mltpCh",
      question: "Which element is said to keep bones strong?",
      wrong_answers: ["Iron", "Potassium", "Sodium"],
      correct_answer: "Calcium",
    },
    {
      id: 2,
      type: "mltpCh",
      question: "What is the largest ocean on Earth?",
      wrong_answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
      correct_answer: "Pacific Ocean",
    },
    {
      id: 3,
      type: "mltpCh",
      question: "Which artist painted the ceiling of the Sistine Chapel?",
      wrong_answers: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso"],
      correct_answer: "Michelangelo",
    },
    {
      id: 4,
      type: "mltpCh",
      question: "Which planet is known as the Red Planet?",
      wrong_answers: ["Jupiter", "Saturn", "Venus"],
      correct_answer: "Mars",
    },
    {
      id: 5,
      type: "t/f",
      question: "Is 5 a prime number?",
      wrong_answers: ["False"],
      correct_answer: "True",
    },
  ],
};


