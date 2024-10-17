let questionNr = 0;
let questions;
let randomizedAnswers;
let correct = 0;
let interval;

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
    document.getElementById("timer").innerHTML = "20 seconds remaining";

    // starts a timer for 20 seconds
    let secondsLeft = 19;
    interval = setInterval(function () {
        document.getElementById("timer").innerHTML = secondsLeft + " seconds remaining";
        secondsLeft--;

        if (secondsLeft < 0) {
            document.getElementById("timer").innerHTML = "Time's up!";
            endQuiz();
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
    // code to execute if questions are not fetched yet


    if (questions == null) {

        // wait till the questions are loaded
        await getData();


        let questionProgress = document.createElement("p");
        let questionCounter = questionNr;

        const outdatedButton = document.getElementById("startBtn");
        outdatedButton.remove();

        questionCounter++;
        let qp = document.createTextNode(`Question Number: ${questionCounter}/${questions.results.length}`);
        questionProgress.setAttribute("id", "questionProgress");
        questionProgress.appendChild(qp);
        document.body.appendChild(questionProgress);
 
        await timer();

        // create the question element
        const questionElement = document.createElement("p");
        questionElement.setAttribute("id", "question");
        document.body.appendChild(questionElement);
        // set the text to the first question
        questionElement.innerHTML = questions.results[questionNr].question;

        const answers = questions.results[questionNr].incorrect_answers;
        answers.push(questions.results[questionNr].correct_answer);
        randomizedAnswers = shuffle(answers);



        randomizedAnswers.forEach(answer => {
            let timerElement = document.getElementById("timer");
            // TODO create answer buttons
            const answerElement = document.createElement("button");
            answerElement.setAttribute("class", "answer");
            //document.body.appendChild(answerElement);
            timerElement.after(answerElement);
            answerElement.innerHTML = answer;
            answerElement.setAttribute("onClick", `check('${answer}');`);


        });


        // code to execute if the questions are already fetched and the questionNr is smaller or equal to 9
    } else if (questionNr <= 9) {
        let questionCounter = questionNr;
        questionCounter++;
        let questionProgressElement = document.getElementById("questionProgress");
        questionProgressElement.innerHTML = (`Question Number: ${questionCounter}/${questions.results.length}`);

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

        // increase the questionNr to display the next question

    } else {
        // remove the buttons 
        let outdatedAnswers = document.querySelectorAll("#answer");
        outdatedAnswers.forEach(answer => {
            answer.remove();
        });
        document.getElementById("question").innerHTML = ("All Questions asked");

    }

}

function endQuiz() {
    clearInterval(interval);

    // lists the elements from the quiz
    const outdatedQuestion = document.querySelectorAll("#question");
    //const outdatedScore = document.getElementsByClassName("counter");
    const outdatedTimer = document.getElementById("timer");
    const outdatedProgress = document.getElementById("questionProgress");

    // deletes those elements
    document.querySelectorAll(".answer").forEach(element => {
        element.remove();
    });
    Array.from(outdatedQuestion).forEach(question => question.remove());
    //Array.from(outdatedScore).forEach(score => score.remove());
    outdatedTimer.remove();
    outdatedProgress.remove();

    // displays the "quiz complete" title
    let endTitleElement = document.createElement("h3");
    let e = document.createTextNode("Quiz Complete!");
    endTitleElement.appendChild(e);

    document.body.appendChild(endTitleElement);

    // displays the score
    let scoreTextElement = document.createElement("p");
    let s = document.createTextNode(`Your Score: ${correct} out of ${questions.results.length} correct`);
    scoreTextElement.appendChild(s);
    document.body.appendChild(scoreTextElement);

    // restart quiz button
    let restartElement = document.createElement("button");
    let restartText = document.createTextNode("Restart Quiz");
    restartElement.setAttribute("onClick", `location.reload();`);

    restartElement.appendChild(restartText);
    document.body.appendChild(restartElement);

    // stops the timer

}

/*function stopTimer() {
    clearInterval(interval);
}*/
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
        // ends the quiz
        setTimeout(function () {
            endQuiz();
        }, 1000);

    }
}