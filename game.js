"use strict"

//initialize variables used for DOM manipulation
const choices = document.getElementById("choices");
const submitChoice= document.getElementById("submit-choice");
const robotChoice = document.getElementById("robot-choice");
const userChoice = document.getElementById("user-choice");
const winner = document.getElementById("winner");
const robotScore = document.getElementById("robot-score");
const userScore = document.getElementById("user-score");
const tieCount = document.getElementById("tie-count");
const resetBtn = document.getElementById("reset-btn");
const playerName = document.getElementById("guest");
const username = document.getElementById("username");
const submitUsername = document.getElementById("submit-user");
const continueAsGuest = document.getElementById("cont-guest");

/**
 *Robot object
 *Contains choices and score properties with two methods
 *getChoice takes a random index at the length of the choices array to get a random choice
 *incrementScore increments robot's score
 */
const robot = {
    choices: ["Rock", "Paper", "Scissors"],
    score: 0,
    getChoice: function () {
        let randomIndex = Math.floor(Math.random() * this.choices.length);
        return this.choices[randomIndex];
    },
    incrementScore: function () {
        this.score++;
        robotScore.innerHTML = this.score;
    },
};

/**
 *User object
 *Score is the only property
 *incrementScore method that increments user's score
 */
const user = {
    score: 0,
    incrementScore: function () {
        this.score++;
        userScore.innerHTML = this.score;
    },
};

//Initialize tie variable and set to 0
let tie = 0;

//Increment function to increment tie value
function incrementTie() {
    tie++;
    tieCount.innerHTML = tie;
}

/**
 * Event listener added onto submit button
 * When clicked calls a function that compares user input to robot choice and gets a result and increments scores or ties
 * prevents default so that the page doesn't reload on submit
 */
submitChoice.addEventListener("click", function (event) {
    event.preventDefault();
    let choicesVal = choices.value.trim().toLowerCase();
    let choiceRoboVal = robot.getChoice().toLowerCase();
    userChoice.innerHTML = "You chose: " + choicesVal;
    robotChoice.innerHTML = "Mr. Robot chose: " + choiceRoboVal;
    if(choicesVal === choiceRoboVal) {
        winner.innerHTML = "Tie";
        incrementTie();
    } else if (choicesVal === "rock" && choiceRoboVal === "paper" || choicesVal === "paper" && choiceRoboVal === "scissors" || choicesVal === "scissors" && choiceRoboVal === "rock") {
        winner.innerHTML = "Mr. Robot Won!";
        robot.incrementScore();
    } else if (choicesVal === "rock" && choiceRoboVal === "scissors" || choicesVal === "paper" && choiceRoboVal === "rock" || choicesVal === "scissors" && choiceRoboVal === "paper"){
        winner.innerHTML = "You Won!";
        user.incrementScore()
    }else {
        userChoice.innerHTML = "PLEASE ENTER ROCK, PAPER, OR SCISSORS";
    }
})

//function that opens up modal and blurs background also disables any user select
function openModal() {
    const addBlur = document.getElementById("add-blur");
    const hideModal = document.querySelector(".hidden");
    hideModal.classList.remove("hide");
    addBlur.classList.add("blur");
}

/**
 *Event Listener added onto the reset button
 *On Click calls a function that resets object scores back to zero
 *resets all the html for scores as well and resets username
 *opens the modal as well
 */
resetBtn.addEventListener("click", () => {
    robot.score = 0;
    user.score = 0;
    tie = 0;
    userScore.innerHTML = 0;
    robotScore.innerHTML = 0;
    tieCount.innerHTML = 0;
    robotChoice.innerHTML = "Mr. Robot chose:";
    userChoice.innerHTML = "You chose:";
    winner.innerHTML = "";
    playerName.innerHTML = "Guest";
    openModal();
});

//when page is initialized or reset modal is open
window.onload = openModal;

/**
 *Event Listener add onto the continue as guest button
 *calls a function when clicked that removes background blur class from the background
 *sets modal display to none
 */
continueAsGuest.addEventListener("click", () => {
    const addBlur = document.getElementById("add-blur");
    const hideModal = document.querySelector(".hidden");
    hideModal.classList.add("hide");
    addBlur.classList.remove("blur");
});

/**
 *Event Listener add onto the submit username button
 *replaces the inner html for username to inputted username
 *calls a function when clicked that removes background blur class from the background
 *sets modal display to none
 */
submitUsername.addEventListener("click", () => {
    const addBlur = document.getElementById("add-blur");
    const usernameValue = username.value;
    const hideModal = document.querySelector(".hidden");
    hideModal.classList.add("hide");
    playerName.innerHTML = usernameValue;
    addBlur.classList.remove("blur");
});
