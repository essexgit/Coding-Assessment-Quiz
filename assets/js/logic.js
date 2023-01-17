// START BUTTON
let questCounter = 0;
let start = document.querySelector("#start");
let startScreen = document.querySelector("#start-screen");
let endScreen = document.querySelector("#end-screen");
let questionScreen = document.querySelector("#questions");
let questContTitle = document.querySelector("#question-title");
let questContChoices = document.querySelector("#choices");
let nextBtn = document.querySelector("#next");
let finalScore = document.querySelector("#final-score");
let initialEnt = document.querySelector("#initials");
let submitBtn = document.querySelector("#submit");
let feebackDiv = document.querySelector("#feedback");
// Timer variables
let whatsTheTime;
let startTime = 64;
let time = document.querySelector("#time"); // referencing time element


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
        questContTitle.textContent = questions[questCounter].title;
        loadQuestionChoices(questCounter);
    } else { endGame(); };
}

// showing, question, choices, chosen, countdown, answers
function showing() {
    questionScreen.classList.remove("hide");
    feebackDiv.classList.add('hide');
    feebackDiv.textContent = '';
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

    // let timeLeft = startTime;
    time.textContent = startTime;
    // countdown
    whatsTheTime = setInterval(function () {
        // time.textContent = timeLeft;
        startTime--;
        time.textContent = startTime;
        if (startTime === 0) {
            clearInterval(whatsTheTime);
        }
    }, 1000);
}

// choose
function choosing(questCounter) {
    questContChoices.addEventListener("click", (event) => {
        let answerID = event.target.id;
        let answerText = event.target.textContent;
        questContChoices.removeEventListener;
        checking(answerText, answerID, questCounter);
    }, { once: true });
}

function checking(answerText, answerID, questCounter) {
    feebackDiv.classList.remove('hide');
    if (answerText === questions[questCounter].answer) {
        correctAnswer(answerID, questCounter);
    } else {
        let correctChoiceIndex = questions[questCounter].choices.indexOf(questions[questCounter].answer);
        wrongAnswer(correctChoiceIndex, answerID, questCounter);
    }
}

function correctAnswer(answerID, questCounter) {
    feebackDiv.textContent = 'Correct';
    let tickBox = document.querySelector(`#${answerID}`);
    tickBox.classList.add("bggreen");
    nextQuestion(questCounter);
}

function wrongAnswer(correctChoiceIndex, answerID, questCounter) {
    feebackDiv.textContent = 'Wrong';
    let tickBox = document.querySelector(`#choice${correctChoiceIndex}`);
    let wrongBox = document.querySelector(`#${answerID}`);
    tickBox.classList.add("bggreen");
    wrongBox.classList.add("bgred");
    startTime = startTime - 10;
    nextQuestion(questCounter);
}

function nextQuestion(questCounter) {
    nextBtn.classList.remove("hide");
}


nextBtn.addEventListener("click", () => {
    clearQuestions();
    questCounter++;
    loadQuestionTitle(questCounter);
});


function clearQuestions() {
    questionScreen.classList.add("hide");
    questContTitle.textContent = "";
    questContChoices.textContent = "";
};

function endGame() {
    clearInterval(whatsTheTime);
    nextBtn.classList.add('hide');
    endScreen.classList.remove('hide');
    finalScore.textContent = startTime;
}

submitBtn.addEventListener("click", () => {
    // final score submit object
    let scoreObj = [];
    scoreObj = JSON.stringify([{
        gameScore: startTime,
        gameInitials: initialEnt.value
    }]);
    let storedScores = localStorage.getItem('scoreObj');
    if (storedScores !== null) {
        scoreObj += storedScores;
    }

    localStorage.setItem('scoreObj', scoreObj);
    location.reload();
});
// End Group
    // result
    // score
    // instructions
    // start button display

// HIGHSCORE function add
    // add initial to score reference
    // add to local storage