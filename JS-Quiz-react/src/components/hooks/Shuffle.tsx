import { useState, useEffect, useContext } from "react";
import { QuestionContext } from "../../context/QuizContext";

function shuffleArray(array:string[]) {
  let currentIndex: number = array.length;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    let randomIndex:number = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

export default function useShuffledAnswers() {
  const questions = useContext(QuestionContext);
  const [combinedAnswers, setCombinedAnswers] = useState<string[][]>([]);

  useEffect(() => {
    if (questions.quiz) {
      const shuffledAnswers:string[][] = questions.quiz.map((question) => {
        const answers = question.wrong_answers.concat(question.correct_answer);
        return shuffleArray(answers);
      });
      setCombinedAnswers(shuffledAnswers);
    }
  }, [questions]);

  return combinedAnswers;
}
