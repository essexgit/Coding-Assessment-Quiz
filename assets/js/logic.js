// START BUTTON
let start = document.querySelector("#start");
let startButton = start.addEventListener("click", () => {
    timer();
    startGame();
});

function startGame() {
    hiding();
    showing();
    loadQuestionTitle();
    loadQuestionChoices();
    choosing();
}
// loads Q&A

function loadQuestionTitle() {
    let questContTitle = document.querySelector("#question-title");
    questContTitle.textContent = currentQuestion = questions[0].title;
}

function loadQuestionChoices() {
    //set choices container element
    let questContChoices = document.querySelector("#choices");
    // get choice array
    let currentQuestion = questions[0].choices;
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
}

// TIMER function
function timer() {
    let startTime = 3;
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


// ANSWER function
// choose
function choosing() {
    let answerCheck = document.querySelector("#choices");
    answerCheck.addEventListener("click", function (event) {
        let answer = event.target.id;
        let answerText = event.target.textContent;
        console.log(answer);
        console.log(answerText);
        checking(answerText);
    });
}

function checking(chosenString) {
    if (chosenString === questions[0].answer) {
        console.log("correct");
    } else { console.log("Wrong"); }
}

function wrongAnswer() {
}
function correctAnswer() {

}

// if correct
// next

// if wrong
// show correct
// deduct time
// next

// DISPLAY functions
// Run Group
// hiding, start button,instruction
function hiding() {
    let startScreen = document.querySelector("#start-screen");
    startScreen.classList.add("hide");
}
// showing,question, choices, chosen, countdown, answers
function showing() {
    let questionScreen = document.querySelector("#questions");
    questionScreen.classList.remove("hide");
}
// End Group
    // result
    // score
    // instructions
    // start button display

// HIGHSCORE function add
    // add initial to score reference
    // add to local storage