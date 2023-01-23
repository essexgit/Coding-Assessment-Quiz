// START BUTTON
let questCounter = 0;
let start = document.querySelector("#start");
let startScreen = document.querySelector("#start-screen");
let endScreen = document.querySelector("#end-screen");
let questionScreen = document.querySelector("#questions");
let questContTitle = document.querySelector("#question-title");
let questContChoices = document.querySelector("#choices");
// let nextBtn = document.querySelector("#next");
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
    if (whatsTheTime <= 0) {
        startTime = 0;
        console.log('endgame at zero time');
        endGame();
    } else if (questCounter < questions.length) {
        questContTitle.textContent = questions[questCounter].title;
        loadQuestionChoices(questCounter);
    } else {
        console.log('end game at zero questions');
        endGame();
    };
}

// showing, question, choices, chosen, countdown, answers
function showing() {
    questionScreen.classList.remove("hide");
    // feebackDiv.classList.add('hide');
    // feebackDiv.textContent = '';
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
        if (startTime <= 0) {
            clearInterval(whatsTheTime);
            startTime = 0;
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
    //removing answer process
    // let tickBox = document.querySelector(`#${answerID}`);
    // tickBox.classList.add("bggreen");
    nextQuestion(questCounter);
}

function wrongAnswer(correctChoiceIndex, answerID, questCounter) {
    feebackDiv.textContent = 'Wrong';

    // removing answer process
    // let tickBox = document.querySelector(`#choice${correctChoiceIndex}`);
    // let wrongBox = document.querySelector(`#${answerID}`);
    // tickBox.classList.add("bggreen");
    // wrongBox.classList.add("bgred");
    startTime = startTime - 10;
    if (startTime <= 0) {
        finishEarly();
    }
    nextQuestion(questCounter);
}

function finishEarly() {
    startTime = 0;
    time.textContent = 0;
    clearQuestions();
    endGame();
}

function nextQuestion(questCounter) {
    clearQuestions();
    questCounter++;
    loadQuestionTitle(questCounter);
    // nextBtn.classList.remove("hide");
}

// removing next button
// nextBtn.addEventListener("click", () => {
// clearQuestions();
// questCounter++;
// loadQuestionTitle(questCounter);
// });


function clearQuestions() {
    questionScreen.classList.add("hide");
    questContTitle.textContent = "";
    questContChoices.textContent = "";
};

function endGame() {
    clearInterval(whatsTheTime);
    // nextBtn.classList.add('hide');
    endScreen.classList.remove('hide');
    finalScore.textContent = startTime;

}

submitBtn.addEventListener("click", () => {
    // capture the initials string
    let newInitials = initialEnt.value;

    // final score submit object ready
    let newScoreQbj = JSON.stringify({
        time: startTime,
        initials: newInitials
    });

    // check if scores array in local storage or make one
    if (localStorage.getItem('scoreObj') === null || localStorage.getItem('scoreObj') === '') {
        localStorage.setItem('scoreObj', '[]'); // create array passing bracket in string
    }
    //get current highscore array
    let oldScoresObjs = JSON.parse(localStorage.getItem('scoreObj'));
    // add new score to array
    oldScoresObjs.push(newScoreQbj);
    //
    localStorage.setItem('scoreObj', JSON.stringify(oldScoresObjs));
    //reload page to restart game
    location.reload();
});