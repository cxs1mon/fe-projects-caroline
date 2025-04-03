import Question from "../quiz/Question";
import QuizProgress from "../quiz/QuizProgress";
import  Header from "../layout/Header";
import "./QuizPage.css"

export default function QuizPage() {
  return (
    <>
      <Header />
      <QuizProgress/>
      <Question/>
    </>
  );
}
