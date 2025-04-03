import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "animate.css";
import "./Timer.css";

export default function Timer() {
  const [seconds, setSeconds] = useState(30);

  const navigate = useNavigate();
  const endQuiz = () => {
    navigate("/end");
  };

  useEffect(() => {
    const timerElement = document.querySelector(".timer");

    const timer = setTimeout(() => {
      if (seconds <= 6) {
        if (timerElement) {
          timerElement.classList.add("low-time");
          timerElement.classList.remove("animate__pulse");
          void (timerElement as HTMLElement).offsetWidth;
          timerElement.classList.add("animate__pulse");
        }
        throw new Error("timerElement was not found");
        
      }

      if (seconds <= 0) {
        endQuiz();
      } else {
        setSeconds((seconds) => seconds - 1);
      }
    }, 1000);

    return () => clearTimeout(timer); // Timer aufräumen, um doppelte Aufrufe zu vermeiden
  }, [seconds]);

  return (
    <>
      <p style={{ width: `50%` }} className="timer animate__animated">{seconds} seconds remaining</p>
    </>
  );
}
