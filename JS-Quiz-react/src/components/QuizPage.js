import Question from "./Question.js";
import QuizProgress from "./QuizProgress.js";
import  Header from "./Header.js";

export default function QuizPage() {
  return (
    <>
      < Header />
      <QuizProgress />
      <Question/>
    </>
  );
}
