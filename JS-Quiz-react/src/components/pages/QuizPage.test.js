import CorrectProgress from "../quiz/CorrectProgress";
import QuizPage from "./QuizPage";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import testData from "../../__testdata__/quizTestData.json";
import {
  QuestionContext,
  IndexContext,
  CounterContext,
  TypeContext,
} from "../../context/QuizContext";

// Jest will automatically use the manual mock from __mocks__ directory
jest.mock("react-router-dom");

// Mock for the useShuffledAnswers hook
jest.mock("../hooks/Shuffle", () => () => {
  // Return a mock array of answers
  return [
    ["Iron", "Potassium", "Sodium", "Calcium"],
    ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Michelangelo"],
    ["Jupiter", "Saturn", "Venus", "Mars"],
    ["False", "True"],
  ];
});

describe("correctProgress", () => {
  const wrapper = ({ children }) => (
    <QuestionContext.Provider value={testData}>
      <IndexContext.Provider value={[0, jest.fn()]}>
        <CounterContext.Provider value={[0, jest.fn()]}>
          <TypeContext.Provider value="test">{children}</TypeContext.Provider>
        </CounterContext.Provider>
      </IndexContext.Provider>
    </QuestionContext.Provider>
  );

  let currentIndex = 0;
  /*
  let consoleLogSpy;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });*/
  /*
it('should render question correctly')
brauche: fragen, aktueller index, 
ablauf: quiz starten, aktueller index nehmen, frage mit demaktuellen index vergleichen mit p element im DOM mit id question und class question
*/
  it("should update the score", () => {
    // Spy to check if button was clicked
    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});
    // Wrap with all required contexts
    render(<QuizPage />, { wrapper });
    const answerButtons = screen.getAllByTestId("answer-button");
    const correctAnswer = testData.quiz[currentIndex].correct_answer;
    let correctProgress = screen.getByTestId("correct");

    const correctButton = answerButtons.find(
      (button) => button.textContent === correctAnswer
    );

    expect(correctButton).toBeDefined();

    fireEvent.click(correctButton, {
      target: { innerText: correctButton.textContent },
    });

    expect(correctButton.textContent).toMatch(correctAnswer);
    expect(consoleLogSpy).toHaveBeenCalledWith("Correct");
    expect(correctButton.style.backgroundColor).toBe("rgb(85, 160, 81)");

    correctProgress = screen.getByTestId("correct");
    // TODO: button was clicked but does not update the score
    expect(correctProgress.textContent).not.toBe("Correct: 0%");
  });

  it("should update the progressbar", async () => {
    render(<QuizPage />, { wrapper });
    let progressbar = screen.getByTestId("progressbar--inner");
    console.log(progressbar.style.width);
    let question = screen.getByTestId("question");
    let progresswidth = (100 / testData.quiz.length) * (currentIndex + 1);

    console.log("Question 1", question.textContent);
    // first question, progressbar should be 20%
    expect(progressbar.style.width).toBe(progresswidth + "%");

    console.log(progressbar.style.width);

    // press an answer to continue
    const answerButtons = screen.getAllByTestId("answer-button");
    fireEvent.click(answerButtons[0]);

    // waits 2500ms
    await new Promise((res) => setTimeout(res, 2500));

    // TODO: progressbar should now be 40%
    const updatedProgressbar = screen.getByTestId("progressbar--inner"); // updated progressbar
    expect(updatedProgressbar.style.width).toBe("40%");

    // question does not change
    question = screen.getByTestId("question");
    console.log("question 2", question.textContent);
    console.log(progressbar.style.width);
    console.log(progresswidth);
  });

  it("should render the next question", () => {});

  it("should use reset button", () => {});
});
