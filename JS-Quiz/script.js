let questionNr = 0;
let questions;
let correct = 0;
let interval;
let numberOfQuestions;
let timerTime;
const cooldownTime = 1000;

window.onload = function () {
    (document.getElementById("startButton"))
        .addEventListener("click", (e) =>
            startQuiz(e))
};

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
    const timerElement = document.createElement("p");
    timerElement.setAttribute("id", "timer");
    timerElement.classList.add("conatiner__timer");
    document.body.appendChild(timerElement);

    // sets the first frame of the interval because the interval has a delay of 1 second
    document.getElementById("timer").innerHTML = `${timerTime + 1} seconds remaining`;

    // starts a timer for x seconds
    let interval = setInterval(function () {
        document.getElementById("timer").innerHTML = `${timerTime} seconds remaining`;
        timerTime--;

        if (timerTime < 0) {
            document.getElementById("timer").innerHTML = "Time's up!";
            endQuiz();
        }
    }, 1000);
    return timerElement;
}

async function getData(category, difficulty) {
    // URL to get questions from
    const url = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`;


    try {
        const response = await fetch(url);

        if (response.ok) {
            const questionsJson = await response.json();
            questions = questionsJson;
            return { questions };
        } else {
            if (response.status === 429) {
                alert("Too many requests, please wait a second");
                console.error(response.status);
                return (429);
            } else {
                console.error(response.status);
            }
        }

    } catch (error) {
        // if the fetch didn't work
        alert("Network error, please check your network and try again");
        console.error(error);
        return ("network-error");
    }
}

function startQuiz(event) {
    // stops the page from reload, because thats the standard function when clicking the type submit button
    event.preventDefault();

    // gets and saves the chosen category
    let category = document.querySelector('#categorySelect');
    category = category.value;

    // gets and saves the difficulty
    let difficulty = document.querySelector('#inputDifficulty');
    difficulty = difficulty.value;

    // gets ans saves the chosen number of questions
    numberOfQuestions = document.getElementById("inputQuestionNr").value;
    if (numberOfQuestions > 10 || numberOfQuestions < 2) {
        alert("number of Questions must be between 2 & 10")
    } else {
        //sets the timer according to the number of quesstions
        timerTime = numberOfQuestions * 8 - 1;
        // triggers the updateQuestion function and transfers the category and the difficulty for the data fetch
        updateQuestion(category, difficulty);
    }
}

async function updateQuestion(category, difficulty) {
    // code to execute if questions are not fetched yet

    if (questions == null) {

        // wait till the questions are loaded
        const response = await getData(category, difficulty);

        if (response === "network-error") {
            // if the fetch threw an error due to a networ error
            location.reload();
        } else {
            if (response === 429) {
                // if the response status from the fetch was 429, reload the page
                location.reload();
            } else {
                console.log("succesfull fetch");
            }
        }

        const headerTitle = document.body.querySelector("h1");
        headerTitle.innerHTML = `The "${questions.results[1].category}" Quiz!`;


        const questionProgress = document.createElement("div");
        const scoreCounter = document.createElement("p");
        let questionCounter = questionNr;


        const outdatedStartElements = document.getElementById("game-settings-form");
        outdatedStartElements.remove();


        const quizContainer = document.createElement("div");
        quizContainer.setAttribute("class", "quiz-stats-container")
        document.body.appendChild(quizContainer);

        const timerElement = await timer();
        quizContainer.appendChild(timerElement);

        questionCounter++;
        // question progress
        const questionProgressContainer = document.createElement("div");
        questionProgressContainer.setAttribute("id", "progress--outer");
        questionProgressContainer.classList.add("progress--outer");
        questionProgress.setAttribute("id", "progress--inner");
        questionProgress.classList.add("progress--inner");
        questionProgressContainer.appendChild(questionProgress);
        questionProgress.style.width = `${(100 / questions.results.length) * questionCounter}%`;
        quizContainer.appendChild(questionProgressContainer);

        let scoreNumber = (correct / questions.results.length) * 100;
        scoreNumber = scoreNumber.toFixed(1);
        const sc = document.createTextNode(`Correct: ${scoreNumber}%`);
        scoreCounter.setAttribute("id", "scoreCounter");
        scoreCounter.classList.add("scoreCounter");
        scoreCounter.appendChild(sc);
        quizContainer.appendChild(scoreCounter);

        // create the question element
        const questionElement = document.createElement("p");
        questionElement.setAttribute("id", "question");
        questionElement.classList.add("question");
        quizContainer.appendChild(questionElement);
        // set the text to the first question
        questionElement.innerHTML = questions.results[questionNr].question;

        const answers = questions.results[questionNr].incorrect_answers;
        answers.push(questions.results[questionNr].correct_answer);
        const randomizedAnswers = shuffle(answers);

        randomizedAnswers.forEach(answer => {
            const answerElement = document.createElement("button");
            answerElement.setAttribute("class", "quiz-answer");
            quizContainer.after(answerElement);
            answerElement.innerHTML = answer;
            answerElement.addEventListener("click", () => check(answer));
        });

        // code to execute if the questions are already fetched and the questionNr is smaller or equal to 9
    } else if (questionNr < numberOfQuestions) {
        let questionCounter = questionNr;
        questionCounter++;
        let questionProgressElement = document.getElementById("progress--inner");
        questionProgressElement.style.width = `${(100 / questions.results.length) * questionCounter}%`;

        let scoreElement = document.getElementById("scoreCounter");
        let scoreNumber = (correct / questions.results.length) * 100;
        scoreNumber = scoreNumber.toFixed(1);
        scoreElement.innerHTML = `Correct: ${scoreNumber}%`;

        // get the answers and shufle them for the next question
        const answers = questions.results[questionNr].incorrect_answers;
        answers.push(questions.results[questionNr].correct_answer);
        randomizedAnswers = shuffle(answers);

        document.querySelectorAll(".quiz-answer").forEach(element => {
            element.remove();
        });

        randomizedAnswers.forEach(answer => {
            const answerElement = document.createElement("button");
            answerElement.setAttribute("class", "quiz-answer");
            document.body.appendChild(answerElement);
            answerElement.innerHTML = answer;
            answerElement.addEventListener("click", () => check(answer));
        });

        // replace the text with the next question
        document.getElementById("question").innerHTML = questions.results[questionNr].question;

    } else {
        document.getElementById("question").innerHTML = "All Questions asked";
    }

}

function endQuiz() {
    clearInterval(interval);

    // lists the elements from the quiz
    const outdatedQuestion = document.querySelectorAll("#question");
    const outdatedTimer = document.getElementById("timer");
    const outdatedProgress = document.getElementById("progress--inner");
    const outdatedScore = document.getElementById("scoreCounter");
    const outdateQuizContainer = document.querySelector(".quiz-stats-container");

    // deletes those elements
    document.querySelectorAll(".quiz-answer").forEach(element => {
        element.remove();
    });
    Array.from(outdatedQuestion).forEach(question => question.remove());
    outdatedTimer.remove();
    outdatedProgress.remove();
    outdatedScore.remove();
    outdateQuizContainer.remove();

    // displays the "quiz complete" title
    const endTitleElement = document.createElement("h3");
    const e = document.createTextNode("Quiz Complete!");
    endTitleElement.appendChild(e);

    document.body.appendChild(endTitleElement);

    // displays the score
    const scoreTextElement = document.createElement("p");
    let scoreNumber = (correct / questions.results.length) * 100;
    scoreNumber = scoreNumber.toFixed(1);
    const s = document.createTextNode(`Correct: ${scoreNumber}%`);
    scoreTextElement.appendChild(s);
    document.body.appendChild(scoreTextElement);

    // restart quiz button
    const restartElement = document.createElement("button");
    const restartText = document.createTextNode("Restart Quiz");
    restartElement.addEventListener("click", function () {
        location.reload();
    });

    restartElement.appendChild(restartText);
    document.body.appendChild(restartElement);

    questions = undefined;
};

function check(answerText) {
    // set buttons on disabled to avoid doubble clicking
    (document.querySelectorAll(".quiz-answer")).forEach(answer => {
        answer.disabled = true;
    });

    let correct_answer = questions.results[questionNr].correct_answer;

    answerText = answerText.replace('&auml;', 'ä');
    answerText = answerText.replace('&ouml;', 'ö');
    answerText = answerText.replace('&uuml;', 'ü');
    answerText = answerText.replace('&aring;', 'å');
    answerText = answerText.replace('&#039;', '\'');
    answerText = answerText.replace('&oacute;', 'ó');
    answerText = answerText.replace('&ograve;', 'ò');
    answerText = answerText.replace('&ocirc;', 'ô');
    answerText = answerText.replace('&otilde;', 'õ');
    answerText = answerText.replace('&iacute;', 'í');
    answerText = answerText.replace('&lt;', '<');
    answerText = answerText.replace('&gt;', '>');
    answerText = answerText.replace('&quot;', '"');
    answerText = answerText.replace('&ntilde;', 'ñ');

    correct_answer = correct_answer.replace('&auml;', 'ä');
    correct_answer = correct_answer.replace('&ouml;', 'ö');
    correct_answer = correct_answer.replace('&uuml;', 'ü');
    correct_answer = correct_answer.replace('&aring;', 'å');
    correct_answer = correct_answer.replace('&#039;', '\'');
    correct_answer = correct_answer.replace('&oacute;', 'ó');
    correct_answer = correct_answer.replace('&ograve;', 'ò');
    correct_answer = correct_answer.replace('&ocirc;', 'ô');
    correct_answer = correct_answer.replace('&otilde;', 'õ');
    correct_answer = correct_answer.replace('&iacute;', 'í');
    correct_answer = correct_answer.replace('&lt;', '<');
    correct_answer = correct_answer.replace('&gt;', '>');
    correct_answer = correct_answer.replace('&quot;', '"');
    correct_answer = correct_answer.replace('&ntilde;', 'ñ');

    let answerButtons = document.querySelectorAll(".quiz-answer");


    //color the buttons based on the given answer
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons.item(i).style.color = "white";
        // if the given answer is equal to the correct answer of the current question
        if (answerButtons.item(i).innerHTML === correct_answer) {
            answerButtons.item(i).style.backgroundColor = "#55A051";
        };
    }
    if (answerText === correct_answer) {
        correct++;
        let scoreNumber = (correct / questions.results.length) * 100;
        scoreNumber = scoreNumber.toFixed(1);
        document.getElementById("scoreCounter").innerHTML = (`Correct: ${scoreNumber}%`)
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
