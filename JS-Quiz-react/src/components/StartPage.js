import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./APIStartPage.css";
import  Header from "./Header.js";

export default function StartPage() {
  const navigate = useNavigate();
  const startQuiz = () => {
    navigate("/quiz");
  };

  const [formData, setFormData] = useState({
        type: "t/f",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update only the changed field in our state object
    setFormData((prevData) => ({
      ...prevData, // Keep all existing data
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with:", formData);
    startQuiz();
  };


  return (
    <>
      < Header></ Header>
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
          value={formData.type}
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
