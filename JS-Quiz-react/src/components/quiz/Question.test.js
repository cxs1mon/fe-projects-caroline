import Question from "./Question.js";
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

describe("Question", () => {
  const wrapper = ({ children }) => (
    <QuestionContext.Provider value={testData}>
      <IndexContext.Provider value={[0, jest.fn()]}>
        <CounterContext.Provider value={[0, jest.fn()]}>
          <TypeContext.Provider value="test">{children}</TypeContext.Provider>
        </CounterContext.Provider>
      </IndexContext.Provider>
    </QuestionContext.Provider>
  );
  let consoleLogSpy;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it("should render question correctly", () => {
    // Wrap with all required contexts
    render(<Question />, { wrapper });
    const questionValue = screen.getByTestId("question").textContent;
    expect(questionValue).toMatch(testData.quiz[0].question);
  });

  it("should click the correct answer", async () => {
    jest.spyOn(console, "log").mockImplementation(() => {});

    render(<Question />, { wrapper });

    const currentIndex = 0;
    const correctAnswer = testData.quiz[currentIndex].correct_answer;
    const answerButtons = screen.getAllByTestId("answer-button");

    // Klick auf eine falsche Antwort
    const correctButton = answerButtons.find(
      (button) => button.textContent === correctAnswer
    );

    fireEvent.click(correctButton, {
      target: { innerText: correctButton.textContent },
    });

    expect(correctButton.textContent).toMatch(correctAnswer);
    expect(consoleLogSpy).toHaveBeenCalledWith("Correct");
    expect(correctButton.style.backgroundColor).toBe("rgb(85, 160, 81)")
  });

  it("should click the incorrect answer", () => {
    jest.spyOn(console, "log").mockImplementation(() => {});

    render(<Question />, { wrapper });

    const currentIndex = 0;
    const correctAnswer = testData.quiz[currentIndex].correct_answer;
    const answerButtons = screen.getAllByTestId("answer-button");

    const incorrectButton = answerButtons.find(
      (button) => button.textContent !== correctAnswer
    );

    fireEvent.click(incorrectButton, {
      target: { innerText: incorrectButton.textContent },
    });

    expect(incorrectButton.textContent).not.toMatch(correctAnswer);
    expect(consoleLogSpy).toHaveBeenCalledWith("False");
    expect(incorrectButton.style.backgroundColor).toBe("rgb(209, 31, 46)")
  });
});
