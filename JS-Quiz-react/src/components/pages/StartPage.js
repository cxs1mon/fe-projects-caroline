import { React, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./StartPage.css";
import { TypeContext } from "../../context/QuizContext";
import Header from "../layout/Header.js";

export default function StartPage() {
  const navigate = useNavigate();
  const startQuiz = () => {
    navigate("/quiz");
  };

  const { type, setType } = useContext(TypeContext);

  const handleChange = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with:", type);
    startQuiz();
  };

  return (
    <>
      <Header></Header>
      <form
        id="game-settings-form"
        className="game-settings-form"
        onSubmit={handleSubmit}
      >
        <label htmlFor="inputType" className="game-settings-form__label">
          Choose Quiz Type:
        </label>
        <select
          id="inputType"
          className="game-settings-form__input"
          name="type"
          onChange={handleChange}
          value={type}
          required
        >
          <option value="t/f">True/False</option>
          <option value="mltpCh">Multiple Choice</option>
          <option value="both">Both</option>
        </select>
        <button
          type="submit"
          className="game-settings-form__submit"
          id="startButton"
        >
          Start Quiz
        </button>
      </form>
    </>
  );
}
