// three array for the questions, the possible answers and the correct answers
let questions = ["What are the four official languages spoken in Switzerland?", "Which Swiss city is known as the headquarters of many international organizations, including the Red Cross?", "What is the name of the famous mountain located in the Swiss Alps, often associated with Switzerland's iconic imagery?", "How does the Swiss political system operate, particularly in terms of its federal structure and direct democracy?", "What are some traditional Swiss dishes that are well-known both within and outside the country?"];
let answers = [
    { answer1: "German, French, Italian, Romansh", answer2: "German, English, French, Italian", answer3: "German, French, Spanish, Italian" },
    { answer1: "Zurich", answer2: "Geneva", answer3: "Bern" },
    { answer1: "Matterhorn", answer2: "Mont Blanc", answer3: "Eiger" },
    { answer1: "It is a unitary state with centralized power", answer2: "It is a federal state with cantonal autonomy and direct democracy", answer3: "It is a monarchy with a parliamentary system" },
    { answer1: "Fondue, Rösti, Raclette", answer2: "Pizza, Pasta, Tiramisu", answer3: "Sushi, Tempura, Ramen" }
];
let correctAnswers = ["German, French, Italian, Romansh", "Geneva", "Matterhorn", "It is a federal state with cantonal autonomy and direct democracy", "Fondue, Rösti, Raclette"];

// reads the key of the (first, second, ...) object in the answers array 
let firstObjectKeys = Object.keys(answers[0]);

// a counter for the score and the current question
let correct = 0;
let questionNr = 0;

let interval;  // Globale Variable, um das Interval zu speichern

function timer() {
    // Startet den Timer für 10 Sekunden

    // Erstellt ein neues <p> Element für den Timer
    let timerElement = document.createElement("p");
    timerElement.setAttribute("id", "timer");

    // Fügt das Timer-Element zum Dokument hinzu
    document.body.appendChild(timerElement);

    // Aktualisiert den Timer alle 1 Sekunde
    let secondsLeft = 30;
    interval = setInterval(function () {
        document.getElementById("timer").innerHTML = secondsLeft + " seconds remaining";
        secondsLeft--;

        if (secondsLeft < 0) {
            endQuiz();
            document.getElementById("timer").innerHTML = "Time's up!";
        }
    }, 1000);
}

// does the main setup for the quiz
function mainSetup() {

    //remove start button
    const outdatedButton = document.getElementById("startBtn");
    outdatedButton.remove();

    // load first question
    let questionTextElement = document.createElement("p");
    let q = document.createTextNode(questions[questionNr]);
    questionTextElement.setAttribute("class", "question");
    questionTextElement.appendChild(q);
    document.body.appendChild(questionTextElement);
    timer();
    loadQuestion();
}

function loadQuestion() {
    for (let i = 0; i < firstObjectKeys.length; i++) {
        let answerButton = document.createElement("button");
        let buttonText = answers[questionNr][firstObjectKeys[i]];
        let b = document.createTextNode(buttonText);
        answerButton.setAttribute("onClick", `check('${buttonText}');`);
        answerButton.setAttribute("class", "answers");
        answerButton.setAttribute("id", `btn${i}`);
        answerButton.appendChild(b);
        document.body.appendChild(answerButton);
    }
}

function nextQuestion() {
    let elements = document.getElementsByClassName("question");
    for (let i = 0; i < elements.length; i++) {
        elements[i].innerHTML = questions[questionNr];
    }

    let answerElements = document.getElementsByClassName("answers");

    for (let j = 0; j < answerElements.length; j++) {
        let buttonText = answers[questionNr][firstObjectKeys[j]];
        answerElements[j].innerText = buttonText;  // Update the button text
        answerElements[j].setAttribute("onClick", `check('${buttonText}');`);  // Update the onClick attribute
    }
}

function endQuiz() {
    const outdatedAnswers = document.getElementsByClassName("answers");
    const outdatedQuestion = document.getElementsByClassName("question");
    const outdatedScore = document.getElementsByClassName("counter");
    const outdatedTimer = document.getElementById("timer");

    Array.from(outdatedAnswers).forEach(answer => answer.remove());
    Array.from(outdatedQuestion).forEach(question => question.remove());
    Array.from(outdatedScore).forEach(score => score.remove());
    Array.from(outdatedTimer).forEach(timer => timer.remove());


    let endTitleElement = document.createElement("h3");
    let e = document.createTextNode("Quiz Complete!");
    endTitleElement.appendChild(e);
    document.body.appendChild(endTitleElement);

    let scoreTextElemennt = document.createElement("p");
    let s = document.createTextNode(`Your Score: ${correct} out of ${questions.length} correct`);
    scoreTextElemennt.appendChild(s);
    document.body.appendChild(scoreTextElemennt);

    stopTimer();
}

// Funktion, die ausgeführt wird, wenn der Button geklickt wird
function stopTimer() {
    clearInterval(interval);
}

function check(answerText) {
    if (questionNr < (questions.length - 1)) {

        if (answerText == correctAnswers[questionNr]) {
            correct++;
        };

        questionNr += 1;
        nextQuestion();
    } else {
        if (answerText == correctAnswers[questionNr]) {
            correct++;
        };
        console.log("done");
        endQuiz();
    }
}
