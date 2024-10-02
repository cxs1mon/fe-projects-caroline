let questions = ['What color is the sky?', 'What is 2 + 2 ?'];
let answers = [
    { answer1: 'blue', answer2: '0' },
    { answer1: '0', answer2: '4' }
];
let correctAnswers = ['blue', '4'];

let firstObjectKeys = Object.keys(answers[0]);

function removeStart() {
    const outdatedButton = document.getElementById('startBtn');
    outdatedButton.remove();
    createQuestions();
}

let correct = 0;
let questionNr = 0;

function createQuestions() {
    let counterElement = document.createElement('p');
    let c = document.createTextNode(correct);
    counterElement.appendChild(c);
    document.body.appendChild(counterElement);

    let questionTextElement = document.createElement('p');
    let q = document.createTextNode(questions[questionNr]);
    questionTextElement.setAttribute('class', 'question');
    questionTextElement.appendChild(q);
    document.body.appendChild(questionTextElement);

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
function endPage() {
    const outdatedAnswers = document.getElementById('answers');
    const outdatedQuestions = document.getElementById('question');
    outdatedAnswers.remove();
    outdatedQuestions.remove();
}

function check() {
    if (questionNr < questions.length) {
        questionNr += 1;

        nextQuestion();
    } else {
        console.log("done");
        endPage();
    }
}