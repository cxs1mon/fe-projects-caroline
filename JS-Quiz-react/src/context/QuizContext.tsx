import { createContext, useState } from "react";

interface QuestionInterface {
  quiz: {
    id: number;
    type: string;
    question: string;
    wrong_answers: string[];
    correct_answer: string;
  }[];
}

export const QuestionContext = createContext<QuestionInterface>({
  quiz: [],
});
export const IndexContext = createContext<[number, React.Dispatch<React.SetStateAction<number>>]>([0, () => {}]);
export const CounterContext = createContext<[number, React.Dispatch<React.SetStateAction<number>>]>([0, () => {}]);
export const TypeContext = createContext<[string, React.Dispatch<React.SetStateAction<string>>]>(["", () => {}]);

export const QuizProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [counter, setCounter] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);
  const [type, setType] = useState<string>("mltpCh");

  let questions = {
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
        wrong_answers: [
          "Leonardo da Vinci",
          "Vincent van Gogh",
          "Pablo Picasso",
        ],
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

  return (
    <QuestionContext.Provider value={questions}>
      <CounterContext.Provider value={[counter, setCounter]}>
        <IndexContext.Provider value={[index, setIndex]}>
          <TypeContext.Provider value={[type, setType]}>
            {children}
          </TypeContext.Provider>
        </IndexContext.Provider>
      </CounterContext.Provider>
    </QuestionContext.Provider>
  );
};
