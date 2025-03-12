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
    genre: "9",
    numberOfQuestions: "",
    difficulty: "easy",
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
    //getData(formData.numberOfQuestions, formData.genre, formData.difficulty);
  };

  /*
  async function getData(numberOfQuestions, category, difficulty) {
    // URL to get questions from
    const url = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`;

    try {
      const response = await fetch(url);

      if (response.ok) {
        const questionsJson = await response.json();
        console.log({ questionsJson });
      } else {
        if (response.status === 429) {
          alert("Too many requests, please wait a second");
          console.error(response.status);
          return 429;
        } else {
          console.error(response.status);
        }
      }
    } catch (error) {
      // if the fetch didn't work
      alert("Network error, please check your network and try again");
      console.error(error);
      return "network-error";
    }

  }*/

  return (
    <>
      < Header></ Header>
      <form
        id="game-settings-form"
        className="game-settings-form"
        onSubmit={handleSubmit}
      >
        <label htmlFor="categorySelect" className="game-settings-form__label">
          Choose your preferred genre:
        </label>
        <select
          id="categorySelect"
          className="game-settings-form__input "
          name="genre"
          onChange={handleChange}
          value={formData.genre}
        >
          <option value="9">General Knowledge</option>
          <option value="10">Entertainment: Books</option>
          <option value="11">Entertainment: Film</option>
          <option value="12">Entertainment: Music</option>
          <option value="14">Entertainment: Television</option>
          <option value="15">Entertainment: Video Games</option>
          <option value="16">Entertainment: Board Games</option>
          <option value="17">Science & Nature</option>
          <option value="18">Science: Computers</option>
          <option value="19">Science: Mathematics</option>
          <option value="20">Mythology</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="24">Politics</option>
          <option value="27">Animals</option>
          <option value="28">Vehicles</option>
          <option value="29">Entertainment: Comics</option>
          <option value="31">Entertainment: Japanese Anime & Manga</option>
          <option value="32">Entertainment: Cartoon & Animations</option>
        </select>
        <label htmlFor="inputQuestionNr" className="game-settings-form__label">
          Select the number of questions:<span style={{ color: "red" }}>*</span>
        </label>
        <input
          id="inputQuestionNr"
          className="game-settings-form__input"
          type="number"
          placeholder="2-10"
          min="2"
          max="10"
          name="numberOfQuestions"
          onChange={handleChange}
          value={formData.numberOfQuestions}
        />
        <label htmlFor="inputDifficulty" className="game-settings-form__label">
          Choos your difficulty:
        </label>
        <select
          id="inputDifficulty"
          className="game-settings-form__input"
          name="difficulty"
          onChange={handleChange}
          value={formData.difficulty}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
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
