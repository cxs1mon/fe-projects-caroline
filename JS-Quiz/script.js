// three array for the questions, the possible answers and the correct answers
let questions = ['What color is the sky?', 'What is 2 + 2 ?'];
let answers = [
    { answer1: 'blue', answer2: 'trees', answer3: 'dog' },
    { answer1: 'plant', answer2: '4', answer3: 'cat' }
];
let correctAnswers = ['blue', '4'];

// reads the key of the (first, second, ...) object in the answers array 
let firstObjectKeys = Object.keys(answers[0]);

// a counter for the score and the current question
let correct = 0;
let questionNr = 0;



/*
function timer() {
    let timer = setTimeout(endQuiz, 10000);
    let timerElement = document.createElement('p');
    counterElement.setAttribute('id', 'timer');
    let t = document.createTextNode(timer);
    counterElement.appendChild(t);
    document.body.appendChild(timerElement);
    setInterval((document.getElementById('timer').innerHTML = timer), 1000)
}*/

let interval;  // Globale Variable, um das Interval zu speichern

function timer() {
    // Startet den Timer für 10 Sekunden

    // Erstellt ein neues <p> Element für den Timer
    let timerElement = document.createElement('p');
    timerElement.setAttribute('id', 'timer');

    // Fügt das Timer-Element zum Dokument hinzu
    document.body.appendChild(timerElement);

    // Aktualisiert den Timer alle 1 Sekunde
    let secondsLeft = 10;
    interval = setInterval(function() {
        document.getElementById('timer').innerHTML = secondsLeft + " seconds remaining";
        secondsLeft--;

        if (secondsLeft < 0) {
            endQuiz();
            document.getElementById('timer').innerHTML = "Time's up!";
        }
    }, 1000);
}

// does the main setup for the quiz
function mainSetup() {

    //remove start button
    const outdatedButton = document.getElementById('startBtn');
    outdatedButton.remove();

    // load first question
    let questionTextElement = document.createElement('p');
    let q = document.createTextNode(questions[questionNr]);
    questionTextElement.setAttribute('class', 'question');
    questionTextElement.appendChild(q);
    document.body.appendChild(questionTextElement);
    timer();
    loadQuestion();
}

function loadQuestion() {
    for (let i = 0; i < firstObjectKeys.length; i++) {
        let answerButton = document.createElement('button');
        let b = document.createTextNode(answers[questionNr][firstObjectKeys[i]]);
        answerButton.setAttribute('onClick', 'check();');
        answerButton.setAttribute('class', 'answers');
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
        let answerContent = "";

        answerContent += answers[questionNr][firstObjectKeys[j]];
        answerElements[j].innerHTML = answerContent;
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


    let endTitleElement = document.createElement('h3');
    let e = document.createTextNode("Quiz Complete!");
    endTitleElement.appendChild(e);
    document.body.appendChild(endTitleElement);

    let scoreTextElemennt = document.createElement('p');
    let s = document.createTextNode(`Your Score: ${correct} out of 2 correct`);
    scoreTextElemennt.appendChild(s);
    document.body.appendChild(scoreTextElemennt);

    stopTimer();
}

// Funktion, die ausgeführt wird, wenn der Button geklickt wird
function stopTimer() {
    clearInterval(interval);
}

function check() {
    if (questionNr < (questions.length - 1)) {
        questionNr += 1;
        nextQuestion();
    } else {
        console.log("done");
        endQuiz();
    }
}
