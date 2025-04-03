import { Route, Routes } from "react-router-dom";
import "./App.css";
import EndPage from "./components/pages/EndPage";
import StartPage from "./components/pages/StartPage"
import QuizPage from "./components/pages/QuizPage"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/end" element={<EndPage />} />
    </Routes>
  );
}
