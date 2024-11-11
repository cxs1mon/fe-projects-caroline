class quizComponent extends HTMLElement {
    constructor() {
        super();

        // Variablen
        this.questionNr = 0;
        this.questions = undefined;
        this.correct = 0;
        this.interval = undefined;
        this.numberOfQuestions = undefined;
        this.timerTime = undefined;
        this.cooldownTime = 1000;

        const template = document.createElement('template');

        // HTML Code
        template.innerHTML = `
        <style>
        button {
            height: 6vh;
            margin: 2% 0;
            display: block;
            width: 100%;
            color: white;
            background-color: #4a5759;
            border-radius: 10px;
            border: 0;
        }

        button:focus {
            border-radius: 10px;
            border: 1px solid;
        }

        button:disabled {
            background-color: #c9c8c5;
            border: 1px solid #4a5759;
        }

        .game-settings-form__input {
            margin: 1% 0 3% 0;
            padding: 2%;
            border-radius: 5px;
            border: 1px solid;
            background-color: #f0d4b8;
        }

        .game-settings-form {
            display: flex;
            flex-direction: column;
            width: 100%;
        }

        .title{
            margin-bottom: 30px;
        }

        .quiz-stats-container{
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 8vh 12vh 16vh;
            grid-template-areas:
                "progress progress"
                "score timer"
                "question question"
            ;
            height: fit-content;
            margin-bottom: 25px;
        }

        .container__timer {
            grid-area: timer;
        }

        .progress--inner {
            background-color: #AF8F6F;
            height: 20px;
            border-radius: 5px;
        }

        .progress--outer {
            padding: 5px;
            grid-area: progress;
            width: 100%;
            border-color: rgba(0, 0, 0, 0.4);
            background-color: rgba(0, 0, 0, 0.1);
            height: 30px;
            border-radius: 5px;
            border-width: 1px;
            border-style: solid;
        }

        .question {
            grid-area: question;
        }

        .scoreCounter {
            grid-area: score;
        }
        </style>
            <h1 class="title">The Custom Quiz!</h1>
            <form id="game-settings-form" class="game-settings-form">
                <label for="categorySelect" class="game-settings-form__label">Choose your preferred genre:</label>
                <select id="categorySelect" class="game-settings-form__input">
                    <option value="9" selected="selected">General Knowledge</option>
                    <option value="10">Entertainment: Books</option>
                    <option value="11">Entertainment: Film</option>
                    <option value="12">Entertainment: Music</option>
                    <option value="14">Entertainment: Television</option>
                    <option value="15">Entertainment: Video Games</option>
                    <option value="16">Entertainment: Board Games</option>
                    <option value="17">Science & Nature</option>
                    <option value="18">Science: Computers</option>
                    <option value="19">Science: Mathematics</option>
                    <option value="20">Mythology</option>
                    <option value="21">Sports</option>
                    <option value="22">Geography</option>
                    <option value="23">History</option>
                    <option value="24">Politics</option>
                    <option value="27">Animals</option>
                    <option value="28">Vehicles</option>
                    <option value="29">Entertainment: Comics</option>
                    <option value="31">Entertainment: Japanese Anime & Manga</option>
                    <option value="32">Entertainment: Cartoon & Animations</option>
                </select>
                <label for="inputQuestionNr" class="game-settings-form__label">Select the number of questions:<span style="color: red;">*</span></label>
                <input id="inputQuestionNr" class="game-settings-form__input" type="number" placeholder="2-10" min="2" max="10">
                <label for="inputDifficulty" class="game-settings-form__label">Choos your difficulty:</label>
                <select id="inputDifficulty" class="game-settings-form__input">
                    <option value="easy">Easy</option>
                    <option value="medium" selected="selected">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <button type="submit" class="game-settings-form__submit" id="startButton">Start Quiz</button>
            </form>
        `;

        this.attachShadow({ mode: `open` });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Funktionen
        this.shuffle = this.shuffle.bind(this);
        this.timer = this.timer.bind(this);
        this.getData = this.getData.bind(this);
        this.createAnswers = this.createAnswers.bind(this);
        this.decodeAnswer = this.decodeAnswer.bind(this);
        this.startQuiz = this.startQuiz.bind(this);
        this.updateQuestion = this.updateQuestion.bind(this);
        this.endQuiz = this.endQuiz.bind(this);
        this.check = this.check.bind(this);

    }

    // Callbacks
    connectedCallback() {
        console.log("Component loaded");
        this.shadowRoot.getElementById("startButton").addEventListener("click", (e) => this.startQuiz(e));
    }


    // JS-Code    
    shuffle(array) {
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
    };

    async timer() {
        // creates a <p> element
        const timerElement = document.createElement("p");
        timerElement.setAttribute("id", "timer");
        timerElement.classList.add("conatiner__timer");
        this.shadowRoot.appendChild(timerElement);

        // sets the first frame of the interval because the interval has a delay of 1 second
        this.shadowRoot.getElementById("timer").innerHTML = `${this.timerTime + 1} seconds remaining`;

        // starts a timer for x seconds
        this.interval = setInterval(() => {
            this.shadowRoot.getElementById("timer").innerHTML = `${this.timerTime} seconds remaining`;
            this.timerTime--;

            if (this.timerTime < 0) {
                this.shadowRoot.getElementById("timer").innerHTML = "Time's up!";
                this.endQuiz();
            }
        }, 1000);
        return timerElement;
    };

    async getData(category, difficulty) {
        // URL to get questions from
        const url = `https://opentdb.com/api.php?amount=${this.numberOfQuestions}&category=${category}&difficulty=${difficulty}`;


        try {
            const response = await fetch(url);

            if (response.ok) {
                const questionsJson = await response.json();
                //this.questions = questionsJson;
                return { questionsJson };
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
    };

    async createAnswers(randomizedAnswers) {
        const answerContainer = document.createElement("div");
        answerContainer.classList.add("answer-container")

        randomizedAnswers.forEach(answer => {
            const answerElement = document.createElement("button");
            answerElement.setAttribute("class", "answer-container__item");
            this.shadowRoot.appendChild(answerElement);
            answerElement.innerHTML = answer;
            answerElement.addEventListener("click", () => this.check(answer));
            answerContainer.after(answerElement);

        });
        return answerContainer;
    };

    async decodeAnswer(text) {

        text = text.replace('&auml;', 'ä');
        text = text.replace('&ouml;', 'ö');
        text = text.replace('&uuml;', 'ü');
        text = text.replace('&aring;', 'å');
        text = text.replace('&#039;', '\'');
        text = text.replace('&oacute;', 'ó');
        text = text.replace('&ograve;', 'ò');
        text = text.replace('&ocirc;', 'ô');
        text = text.replace('&otilde;', 'õ');
        text = text.replace('&iacute;', 'í');
        text = text.replace('&lt;', '<');
        text = text.replace('&gt;', '>');
        text = text.replace('&quot;', '"');
        text = text.replace('&ntilde;', 'ñ');

        return text;
    };


    startQuiz(event) {
        // stops the page from reload, because thats the standard function when clicking the type submit button
        event.preventDefault();

        // gets and saves the chosen category
        let category = this.shadowRoot.querySelector('#categorySelect');
        category = category.value;

        // gets and saves the difficulty
        let difficulty = this.shadowRoot.querySelector('#inputDifficulty');
        difficulty = difficulty.value;

        // gets ans saves the chosen number of questions
        this.numberOfQuestions = this.shadowRoot.getElementById("inputQuestionNr").value;
        if (this.numberOfQuestions > 10 || this.numberOfQuestions < 2) {
            alert("number of Questions must be between 2 & 10")
        } else {
            //sets the timer according to the number of quesstions
            this.timerTime = this.numberOfQuestions * 8 - 1;
            // triggers the updateQuestion function and transfers the category and the difficulty for the data fetch
            this.updateQuestion(category, difficulty);
        }
    };

    async updateQuestion(category, difficulty) {
        // code to execute if questions are not fetched yet

        if (this.questions == null) {

            // wait till the questions are loaded
            this.questions = await this.getData(category, difficulty);

            if (this.questions === "network-error") {
                // if the fetch threw an error due to a networ error
                location.reload();
            } else {
                if (this.questions === 429) {
                    // if the response status from the fetch was 429, reload the page
                    location.reload();
                } else {
                    console.log("succesfull fetch");
                }
            };

            const headerTitle = this.shadowRoot.querySelector("h1");
            headerTitle.innerHTML = `The "${this.questions.questionsJson.results[1].category}" Quiz!`;

            const questionProgress = document.createElement("div");
            this.shadowRoot.appendChild(questionProgress);

            const scoreCounter = document.createElement("p");
            this.shadowRoot.appendChild(scoreCounter);

            let questionCounter = this.questionNr;

            const outdatedStartElements = this.shadowRoot.getElementById("game-settings-form");
            outdatedStartElements.remove();

            const quizContainer = document.createElement("div");
            quizContainer.setAttribute("class", "quiz-stats-container")
            this.shadowRoot.appendChild(quizContainer);

            const timerElement = await this.timer();
            quizContainer.appendChild(timerElement);

            questionCounter++;
            // question progress
            const questionProgressContainer = document.createElement("div");
            questionProgressContainer.setAttribute("id", "progress--outer");
            questionProgressContainer.classList.add("progress--outer");
            questionProgress.setAttribute("id", "progress--inner");
            questionProgress.classList.add("progress--inner");
            questionProgressContainer.appendChild(questionProgress);
            questionProgress.style.width = `${(100 / this.questions.questionsJson.results.length) * questionCounter}%`;
            quizContainer.appendChild(questionProgressContainer);

            let scoreNumber = (this.correct / this.questions.questionsJson.results.length) * 100;
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
            questionElement.innerHTML = this.questions.questionsJson.results[this.questionNr].question;

            const answers = this.questions.questionsJson.results[this.questionNr].incorrect_answers;
            answers.push(this.questions.questionsJson.results[this.questionNr].correct_answer);
            const randomizedAnswers = this.shuffle(answers);

            await this.createAnswers(randomizedAnswers);

            // code to execute if the questions are already fetched and the questionNr is smaller or equal to 9
        } else if (this.questionNr < this.numberOfQuestions) {
            let questionCounter = this.questionNr;
            questionCounter++;
            let questionProgressElement = this.shadowRoot.getElementById("progress--inner");
            questionProgressElement.style.width = `${(100 / this.questions.questionsJson.results.length) * questionCounter}%`;

            let scoreElement = this.shadowRoot.getElementById("scoreCounter");
            let scoreNumber = (this.correct / this.questions.questionsJson.results.length) * 100;
            scoreNumber = scoreNumber.toFixed(1);
            scoreElement.innerHTML = `Correct: ${scoreNumber}%`;

            // get the answers and shufle them for the next question
            const answers = this.questions.questionsJson.results[this.questionNr].incorrect_answers;
            answers.push(this.questions.questionsJson.results[this.questionNr].correct_answer);
            const randomizedAnswers = this.shuffle(answers);

            this.shadowRoot.querySelectorAll(".answer-container__item").forEach(element => {
                element.remove();
            });

            await this.createAnswers(randomizedAnswers);

            // replace the text with the next question
            this.shadowRoot.getElementById("question").innerHTML = this.questions.questionsJson.results[this.questionNr].question;
        } else {
            this.shadowRoot.getElementById("question").innerHTML = "All Questions asked";
        }
    };

    endQuiz() {
        clearInterval(this.interval);

        // select all elements from the quiz
        let outdatedElements = this.shadowRoot.querySelectorAll("#question, #timer, #progress--inner, #scoreCounter, .quiz-stats-container, .answer-container__item")

        // remove all those elemens
        outdatedElements.forEach(outdatedElement => {
            outdatedElement.remove();
        });

        // displays the "quiz complete" title
        const endTitleElement = document.createElement("h3");
        const e = document.createTextNode("Quiz Complete!");
        endTitleElement.appendChild(e);

        this.shadowRoot.appendChild(endTitleElement);

        // displays the score
        const scoreTextElement = document.createElement("p");
        let scoreNumber = (this.correct / this.questions.questionsJson.results.length) * 100;
        scoreNumber = scoreNumber.toFixed(1);
        const s = document.createTextNode(`Correct: ${scoreNumber}%`);
        scoreTextElement.appendChild(s);
        this.shadowRoot.appendChild(scoreTextElement);

        // restart quiz button
        const restartElement = document.createElement("button");
        const restartText = document.createTextNode("Restart Quiz");
        restartElement.addEventListener("click", function () {
            location.reload();
        });

        restartElement.appendChild(restartText);
        this.shadowRoot.appendChild(restartElement);

        this.questions = undefined;
    };

    async check(answerText) {

        // set buttons on disabled to avoid doubble clicking
        (this.shadowRoot.querySelectorAll(".answer-container__item")).forEach(answer => {
            answer.disabled = true;
        });

        let correct_answer = this.questions.questionsJson.results[this.questionNr].correct_answer;

        answerText = await this.decodeAnswer(answerText);
        correct_answer = await this.decodeAnswer(correct_answer);

        let answerButtons = this.shadowRoot.querySelectorAll(".answer-container__item");

        //color the buttons based on the given answer
        for (let i = 0; i < answerButtons.length; i++) {
            answerButtons.item(i).style.color = "white";
            // if the given answer is equal to the correct answer of the current question
            if (answerButtons.item(i).innerHTML === correct_answer) {
                answerButtons.item(i).style.backgroundColor = "#55A051";
            };
        }
        if (answerText === correct_answer) {
            this.correct++;
            let scoreNumber = (this.correct / this.questions.questionsJson.results.length) * 100;
            scoreNumber = scoreNumber.toFixed(1);
            this.shadowRoot.getElementById("scoreCounter").innerHTML = (`Correct: ${scoreNumber}%`)
        };
        // if questions remain
        if (this.questionNr < (this.questions.questionsJson.results.length - 1)) {
            // increas the question number
            this.questionNr += 1;
            setTimeout(() => {
                this.updateQuestion();
            }, this.cooldownTime);
        } else {
            // ends the quiz
            setTimeout(() => {
                this.endQuiz();
            }, this.cooldownTime);
        };
    };
}
customElements.define(`quiz-component`, quizComponent);