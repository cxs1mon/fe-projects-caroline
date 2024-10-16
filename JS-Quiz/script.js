let questionNr = 0;
let questions;
let randomizedAnswers;
let correct = 0;

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
function timer() {

    // creates a <p> element
    let timerElement = document.createElement("p");
    timerElement.setAttribute("id", "timer");
    document.body.appendChild(timerElement);

    // sets the first frame of the interval because the interval thas a delay of 1second
    document.getElementById("timer").innerHTML = " 30 seconds remaining";

    // starts a timer for 30 seconds
    let secondsLeft = 29;
    interval = setInterval(function () {
        document.getElementById("timer").innerHTML = secondsLeft + " seconds remaining";
        secondsLeft--;

        if (secondsLeft < 0) {
            endQuiz();
            document.getElementById("timer").innerHTML = "Time's up!";
        }
    }, 1000);
}


async function getData() {
    // URL to get questions from
    const url = "https://opentdb.com/api.php?amount=10&type=multiple&category=20";

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
    console.log(questionNr)
    // code to execute if questions are not fetched yet


    if (questions == null) {

        let questionProgress = document.createElement("p");
        let questionCounter = questionNr;

        questionCounter++;
        let qp = document.createTextNode(`Question Number: ${questionCounter}/5`);
        questionProgress.setAttribute("id", "questionProgress");
        questionProgress.appendChild(qp);
        document.body.appendChild(questionProgress);
        const outdatedButton = document.getElementById("startBtn");
        outdatedButton.remove();
        // get the question asynchronously
        await getData();
        // create the question element
        const questionElement = document.createElement("p");
        questionElement.setAttribute("id", "question");
        document.body.appendChild(questionElement);
        // set the text to the first question
        questionElement.innerHTML = questions.results[questionNr].question;
        console.log(questions);

        const answers = questions.results[questionNr].incorrect_answers;
        answers.push(questions.results[questionNr].correct_answer);
        randomizedAnswers = shuffle(answers);



        randomizedAnswers.forEach(answer => {
            // TODO create answer buttons
            const answerElement = document.createElement("button");
            answerElement.setAttribute("id", "answer");
            document.body.appendChild(answerElement);
            // TODO set text of the answer buttons
            answerElement.innerHTML = answer;
            answerElement.setAttribute("onClick", `check('${answer}');`);

            timer();
        });

        // code to execute if the questions are already fetched and the questionNr is smaller or equal to 9
    } else if (questionNr <= 9) {
        let questionCounter = questionNr;
        questionCounter++;
        let questionProgressElement = document.getElementById("questionProgress");
        questionProgressElement.innerHTML = (`Question Number: ${questionCounter}/5`);

        let outdatedAnswers = document.querySelectorAll("#answer");
        outdatedAnswers.forEach(answer => {
            answer.remove();
        });

        const answers = questions.results[questionNr].incorrect_answers;
        answers.push(questions.results[questionNr].correct_answer);
        randomizedAnswers = shuffle(answers);

        randomizedAnswers.forEach(answer => {
            const answerElement = document.createElement("button");
            answerElement.setAttribute("id", "answer");
            document.body.appendChild(answerElement);
            answerElement.innerHTML = answer;
            answerElement.setAttribute("onClick", `check('${answer}');`);

        });

        console.log("questions fetched");
        // replace the text with the next question
        document.getElementById("question").innerHTML = questions.results[questionNr].question;

        // increase the questionNr to display the next question

    } else {
        // remove the buttons 
        let outdatedAnswers = document.querySelectorAll("#answer");
        outdatedAnswers.forEach(answer => {
            answer.remove();
        });
        document.getElementById("question").innerHTML = ("All Questions asked");

        console.log(questionNr);
    }

}

function endQuiz() {
    // lists the elemnts from the quiz
    const outdatedAnswers = document.getElementsByClassName("answers");
    const outdatedQuestion = document.getElementsByClassName("question");
    const outdatedScore = document.getElementsByClassName("counter");
    const outdatedTimer = document.getElementById("timer");
    const outdatedProgress = document.getElementById("questionProgress");

    // delets those elements
    Array.from(outdatedAnswers).forEach(answer => answer.remove());
    Array.from(outdatedQuestion).forEach(question => question.remove());
    Array.from(outdatedScore).forEach(score => score.remove());
    Array.from(outdatedTimer).forEach(timer => timer.remove());
    Array.from(outdatedProgress).forEach(progress => progress.remove());

    // displays the "quiz complete" title
    let endTitleElement = document.createElement("h3");
    let referenceProgressElement = document.getElementById("questionProgress")
    let e = document.createTextNode("Quiz Complete!");
    endTitleElement.appendChild(e);
    referenceProgressElement.parentNode.insertBefore(endTitleElement, referenceProgressElement); // insert title before the existing timer


    // displays the score
    let scoreTextElemennt = document.createElement("p");
    let s = document.createTextNode(`Your Score: ${correct} out of ${questions.length} correct`);
    scoreTextElemennt.appendChild(s);
    document.body.appendChild(scoreTextElemennt);

    // restart quiz button
    let restartElement = document.createElement("button");
    let restartText = document.createTextNode("Restart Quiz");
    restartElement.setAttribute("onClick", `location.reload();`);

    restartElement.appendChild(restartText);
    document.body.appendChild(restartElement);

    // stops the timer
    stopTimer();
}
function stopTimer() {
    clearInterval(interval);
}
function check(answerText) {

    // if questions remain
    if (questionNr < (questions.results.length - 1)) {

        // if the question is answered correctly
        if (answerText == questions.results[questionNr].correct_answer) {
            //increases the correct score
            correct++;
        };

        // increas the question number
        questionNr += 1;

        setTimeout(function () {
            updateQuestion();
        }, 1000);
    } else {
        if (answerText == questions.results[questionNr].correct_answer) {
            correct++;
        };
        console.log("done");
        // ends the quiz
        setTimeout(function () {
            endQuiz();
        }, 1000);

    }
}