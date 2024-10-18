let questionNr = 0;
let questions;
let randomizedAnswers;
let correct = 0;
let interval;
let quizContainer;

let numberOfQuestions = 15;
let timerTime = numberOfQuestions*10-1;
let cooldownTime = 500;

function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}
async function timer() {
    // creates a <p> element
    let timerElement = document.createElement("p");
    timerElement.setAttribute("id", "timer");
    document.body.appendChild(timerElement);

    // sets the first frame of the interval because the interval has a delay of 1 second
    document.getElementById("timer").innerHTML = `${timerTime + 1} seconds remaining`;

    // starts a timer for x seconds
    interval = setInterval(function () {
        document.getElementById("timer").innerHTML = timerTime + " seconds remaining";
        timerTime--;

        if (timerTime < 0) {
            document.getElementById("timer").innerHTML = "Time's up!";
            endQuiz();
        }
    }, 1000);
    return timerElement;
}

async function getData() {
    // URL to get questions from
    const url = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=22&difficulty=easy&type=multiple`;

    // try to fetch the questions
    try {
        const response = await fetch(url);
        // tf the response didn't load correctly throw error with message
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const questionsJson = await response.json();
        // set the questions ariable to the fetched JSON
        questions = questionsJson;

    } catch (error) {
        console.error(error.message);
        return null; // return nothing in case of error
    }
}
async function updateQuestion() {
    // code to execute if questions are not fetched yet

    if (questions == null) {

        // wait till the questions are loaded
        await getData();

        let questionProgress = document.createElement("p");
        let scoreCounter = document.createElement("p");
        let questionCounter = questionNr;

        const outdatedButton = document.getElementById("startBtn");
        outdatedButton.remove();

        quizContainer = document.createElement("div");
        quizContainer.setAttribute("class", "quizContainer")
        document.body.appendChild(quizContainer);

        let timerElement = await timer();
        quizContainer.appendChild(timerElement);

        questionCounter++;
        let qp = document.createTextNode(`Question Number: ${questionCounter}/${questions.results.length}`);
        questionProgress.setAttribute("id", "questionProgress");
        questionProgress.appendChild(qp);
        quizContainer.appendChild(questionProgress);

        let sc = document.createTextNode(`Correct: ${(correct/questions.results.length)*100}%`);
        scoreCounter.setAttribute("id", "scoreCounter");
        scoreCounter.appendChild(sc);
        quizContainer.appendChild(scoreCounter);

        // create the question element
        const questionElement = document.createElement("p");
        questionElement.setAttribute("id", "question");
        quizContainer.appendChild(questionElement);
        // set the text to the first question
        questionElement.innerHTML = questions.results[questionNr].question;

        const answers = questions.results[questionNr].incorrect_answers;
        answers.push(questions.results[questionNr].correct_answer);
        randomizedAnswers = shuffle(answers);

        randomizedAnswers.forEach(answer => {
            const answerElement = document.createElement("button");
            answerElement.setAttribute("class", "answer");
            //document.body.appendChild(answerElement);
            quizContainer.after(answerElement);
            answerElement.innerHTML = answer;
            answerElement.setAttribute("onClick", `check('${answer}');`);
        });

        // code to execute if the questions are already fetched and the questionNr is smaller or equal to 9
    } else if (questionNr < numberOfQuestions) {
        let questionCounter = questionNr;
        questionCounter++;
        let questionProgressElement = document.getElementById("questionProgress");
        questionProgressElement.innerHTML = (`Question Number: ${questionCounter}/${questions.results.length}`);

        let scoreElement = document.getElementById("scoreCounter");
        scoreElement.innerHTML = (`Correct: ${(correct/questions.results.length)*100}%`);

        // get the answers and shufle them for the next question
        const answers = questions.results[questionNr].incorrect_answers;
        answers.push(questions.results[questionNr].correct_answer);
        randomizedAnswers = shuffle(answers);

        document.querySelectorAll(".answer").forEach(element => {
            element.remove();
        });

        randomizedAnswers.forEach(answer => {
            const answerElement = document.createElement("button");
            answerElement.setAttribute("class", "answer");
            document.body.appendChild(answerElement);
            answerElement.innerHTML = answer;
            answerElement.setAttribute("onClick", `check('${answer}');`);

        });

        // replace the text with the next question
        document.getElementById("question").innerHTML = questions.results[questionNr].question;

    } else {
        document.getElementById("question").innerHTML = ("All Questions asked");
    }

}

function endQuiz() {
    clearInterval(interval);

    // lists the elements from the quiz
    const outdatedQuestion = document.querySelectorAll("#question");
    const outdatedTimer = document.getElementById("timer");
    const outdatedProgress = document.getElementById("questionProgress");
    const outdatedScore = document.getElementById("scoreCounter");

    // deletes those elements
    document.querySelectorAll(".answer").forEach(element => {
        element.remove();
    });
    Array.from(outdatedQuestion).forEach(question => question.remove());
    outdatedTimer.remove();
    outdatedProgress.remove();
    outdatedScore.remove();

    // displays the "quiz complete" title
    let endTitleElement = document.createElement("h3");
    let e = document.createTextNode("Quiz Complete!");
    endTitleElement.appendChild(e);

    document.body.appendChild(endTitleElement);

    // displays the score
    let scoreTextElement = document.createElement("p");
    let s = document.createTextNode(`Correct: ${(correct/questions.results.length)*100}%`);
    scoreTextElement.appendChild(s);
    document.body.appendChild(scoreTextElement);

    // restart quiz button
    let restartElement = document.createElement("button");
    let restartText = document.createTextNode("Restart Quiz");
    restartElement.setAttribute("onClick", `location.reload();`);

    restartElement.appendChild(restartText);
    document.body.appendChild(restartElement);
}

function check(answerText) {
    // set buttons on disabled to avoid doubble clicking
    (document.querySelectorAll(".answer")).forEach(answer => {
        answer.disabled = true;
    });
    let answerButtons = document.querySelectorAll(".answer");


    //color the buttons based on the given answer
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons.item(i).style.color = "white";
        // if the given answer is equal to the correct answer of the current question
        if (answerText == questions.results[questionNr].correct_answer) {
            if (answerButtons.item(i).innerHTML == questions.results[questionNr].correct_answer) {
                answerButtons.item(i).style.backgroundColor = "#03AC13";
            };
        // if the given answer is not the correct answer
        } else {
            if (answerButtons.item(i).innerHTML == questions.results[questionNr].correct_answer) {
                // mark the right one green
                answerButtons.item(i).style.backgroundColor = "#03AC13";
            }
        }
    }
    if (answerText == questions.results[questionNr].correct_answer) {
        correct++;
        document.getElementById("scoreCounter").innerHTML = (`Correct: ${(correct/questions.results.length)*100}%`)
    };
    // if questions remain
    if (questionNr < (questions.results.length - 1)) {
        // increas the question number
        questionNr += 1;
        setTimeout(function () {
            updateQuestion();
        }, cooldownTime);
    } else {
        // ends the quiz
        setTimeout(function () {
            endQuiz();
        }, cooldownTime);
    };
};
