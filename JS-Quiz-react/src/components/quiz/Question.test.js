import Question from "./Question.js"
import {render, screen} from "@testing-library/react"
import testData from "../../__testdata__/quizTestData.json"
import { QuestionContext, IndexContext, CounterContext, TypeContext } from "../../context/QuizContext";

// Jest will automatically use the manual mock from __mocks__ directory
jest.mock('react-router-dom');

// Mock for the useShuffledAnswers hook
jest.mock('../hooks/Shuffle', () => () => {
  // Return a mock array of answers
  return [[
    ["Iron", "Potassium", "Sodium", "Calcium"],
    ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Michelangelo"],
    ["Jupiter", "Saturn", "Venus", "Mars"],
    ["False", "True"]
  ]];
});

describe('Question', () => {
  it('should render question correctly', () => {
    // Wrap with all required contexts
    const wrapper = ({ children }) => (
      <QuestionContext.Provider value={testData}>
        <IndexContext.Provider value={[0, jest.fn()]}>
          <CounterContext.Provider value={[0, jest.fn()]}>
            <TypeContext.Provider value="test">
              {children}
            </TypeContext.Provider>
          </CounterContext.Provider>
        </IndexContext.Provider>
      </QuestionContext.Provider>
    );
    
    render(<Question />, { wrapper });
    const questionValue = screen.getByTestId("question").textContent;
    expect(questionValue).toMatch(testData.quiz[0].question)
  })
})

/*
it('should render question correctly')
brauche: fragen, aktueller index, 
ablauf: quiz starten, aktueller index nehmen, frage mit demaktuellen index vergleichen mit p element im DOM mit id question und class question
*/
/*
it('should handle answer selection')
2 tests korrekte antwort, 2 tests falsche antwort
brauche: aktueller index,fragen -> korrekte antwort, combined answers, liste answer buttons
ablauf: 
1. quiz starten, aktueller index, antwort möglichkeiten vom aktuellen index combinedanswers[x] holen, fragen[x].korrekte antwort speichern, liste mit buttons durchgehen, wenn text gleich korrekter antwort ist klicken, prüfen dass answerState true ist
2. quiz starten, aktueller index, antwort möglichkeiten vom aktuellen index combinedanswers[x] holen, fragen[x].korrekte antwort speichern, liste mit buttons durchgehen, wenn text nicht gleich korrekter antwort ist klicken, prüfen dass answerState false ist
*/

/*
it('should calculate score correctly')
brauche: aktueller index,fragen -> korrekte antwort, liste answer buttons, score
ablauf: quiz starten, aktuellen score speichern, aktueller index, antwort möglichkeiten vom aktuellen index combinedanswers[x] holen, fragen[x].korrekte antwort speichern, liste mit buttons durchgehen, wenn text gleich korrekter antwort ist klicken
*/
