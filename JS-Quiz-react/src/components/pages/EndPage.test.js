import EndPage from "./EndPage";
import { render, fireEvent, screen } from "@testing-library/react";
import testData from "../../__testdata__/quizTestData.json";
import {
  QuestionContext,
  IndexContext,
  CounterContext,
  TypeContext,
} from "../../context/QuizContext";


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

  it("should use reset button", async () => {
    render(<EndPage />, { wrapper });
    const restartButton = screen.getByTestId("restart");
    expect(restartButton).toBeInTheDocument();
    fireEvent.click(restartButton);
    await new Promise((res) => setTimeout(res, 1000));
    // TODO: fix this test
    expect(screen.getByTestId("startButton")).toBeInTheDocument();
  });
});
