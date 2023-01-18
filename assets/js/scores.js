// HIGHSCORE function manage
let highScoreList = document.querySelector("#highscores");
let clearHighScore = document.querySelector("#clear");
let highScoreStore = JSON.parse(localStorage.getItem("scoreObj"));

// PAGE
// check if scores array in local storage or make one
window.onload = function () {
    if (localStorage.getItem('scoreObj') === null) {
        localStorage.setItem('scoreObj', '[]'); // create array passing bracket in string
    }
    // grab local storage array and sort
    let highScoreData = JSON.parse(localStorage.getItem('scoreObj'));
    // sort array by times, highest first
    highScoreData.sort((a, b) => (a.time < b.time) ? 1 : -1);

    highScoreData.forEach(element => {
        //pull object element values out of array
        let val = Object.values(JSON.parse(element));
        let li = document.createElement("li");
        // add value to list element
        li.textContent = `${val}`;
        highScoreList.appendChild(li);
    });
};

let clearButton = clearHighScore.addEventListener("click", clearScores);
function clearScores() {
    localStorage.scoreObj = [];
    location.reload();
}



        // rank by score
    //  clear highscores button
        // delete highscores from local storage
        // upload from local storage