import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Timer() {
  const [seconds, setSeconds] = useState(30);

  const navigate = useNavigate();
  const endQuiz = () => {
    navigate("/end");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
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
      <p style={{ width: `50%` }}>{seconds} seconds remaining</p>
    </>
  );
}
