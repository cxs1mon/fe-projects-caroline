import Question from "../quiz/Question.js";
import QuizProgress from "../quiz/QuizProgress.js";
import  Header from "../layout/Header.js";
import "./QuizPage.css"

export default function QuizPage() {
  return (
    <>
      <Header />
      <QuizProgress className="disbale-scrolling"/>
      <Question/>
    </>
  );
}
