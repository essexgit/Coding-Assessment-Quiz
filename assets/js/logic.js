// START BUTTON
let questCounter = 0;
let start = document.querySelector("#start");
let startScreen = document.querySelector("#start-screen");
let questionScreen = document.querySelector("#questions");
let questContTitle = document.querySelector("#question-title");
let questContChoices = document.querySelector("#choices");
let nextBtn = document.querySelector("#next");

let startButton = start.addEventListener("click", () => {
    timer();
    startGame();
});


function startGame() {
    hiding();
    loadQuestionTitle(questCounter);
}

function hiding() {
    startScreen.classList.add("hide");
}

// loads Q&A
function loadQuestionTitle(questCounter) {
    showing();
    // check question available
    if (questCounter < questions.length) {
        console.log(`loading ${questCounter}`);
        questContTitle.textContent = questions[questCounter].title;
        loadQuestionChoices(questCounter);
    } else { endGame(); };
}

// showing, question, choices, chosen, countdown, answers
function showing() {
    questionScreen.classList.remove("hide");
}
function loadQuestionChoices(questCounter) {
    // get choice array
    let currentQuestion = questions[questCounter].choices;
    // create & append button
    for (let i = 0; i < currentQuestion.length; i++) {
        let choiceButton = document.createElement("button");
        let choiceString = currentQuestion[i];
        //set button text to choice
        choiceButton.textContent = choiceString;
        // set id to each choice for selection and comparison
        choiceButton.setAttribute("id", `choice${i}`);
        questContChoices.appendChild(choiceButton);
    }
    choosing(questCounter);
}

// TIMER function
function timer() {
    let startTime = 64;
    let timeLeft = startTime;
    // countdown
    whatsTheTime = setInterval(function () {
        let time = document.querySelector("#time");
        timeLeft--;
        time.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(whatsTheTime);
        }
    }, 1000);
}

// CUT TIME
// cut value
// STOP TIMER
// If zero
// last question
// final time

// choose
function choosing(questCounter) {
    questContChoices.addEventListener("click", (event) => {
        let answerID = event.target.id;
        let answerText = event.target.textContent;
        questContChoices.removeEventListener;
        console.log(answerID);
        console.log(answerText);
        checking(answerText, answerID, questCounter);
    }, { once: true });
}

function checking(answerText, answerID, questCounter) {
    if (answerText === questions[questCounter].answer) {
        correctAnswer(answerID, questCounter);
    } else {
        let correctChoiceIndex = questions[questCounter].choices.indexOf(questions[questCounter].answer);
        wrongAnswer(correctChoiceIndex, answerID, questCounter);
    }
}

function correctAnswer(answerID, questCounter) {
    let tickBox = document.querySelector(`#${answerID}`);
    tickBox.classList.add("bggreen");
    nextQuestion(questCounter);
}

function wrongAnswer(correctChoiceIndex, answerID, questCounter) {
    let tickBox = document.querySelector(`#choice${correctChoiceIndex}`);
    let wrongBox = document.querySelector(`#${answerID}`);
    tickBox.classList.add("bggreen");
    wrongBox.classList.add("bgred");
    nextQuestion(questCounter);
}

function nextQuestion(questCounter) {
    nextBtn.classList.remove("hide");
    nextButton(questCounter);
}

function nextButton(questCounter) {
    nextBtn.addEventListener("click", () => {
        clearQuestions();
        questCounter++;
        console.log(` next ${questCounter}`);
        loadQuestionTitle(questCounter);
    });
}

function clearQuestions() {
    questionScreen.classList.add("hide");
    questContTitle.textContent = "";
    questContChoices.textContent = "";
};

function endGame() {
    console.log("end");
}

// End Group
    // result
    // score
    // instructions
    // start button display

// HIGHSCORE function add
    // add initial to score reference
    // add to local storage