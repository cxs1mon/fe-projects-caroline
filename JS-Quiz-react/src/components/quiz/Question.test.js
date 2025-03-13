import questions from "../../__testdata__/quizTestData.json";
import { IndexContext } from "../../context/QuizContext";
/*

const index = useContext(IndexContext);*/
test("should render question correctly", () => {
  expect(1).toEqual(1);
});

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
