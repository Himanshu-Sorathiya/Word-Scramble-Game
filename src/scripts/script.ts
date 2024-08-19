/**
 * The container element for displaying the scrambled answer.
 * @type {HTMLDivElement}
 */
const answerArea = document.querySelector(".answer-area")! as HTMLDivElement;

/**
 * The container element for displaying the riddle or puzzle.
 * @type {HTMLDivElement}
 */
const riddleArea = document.querySelector(".riddle")! as HTMLDivElement;

/**
 * The span element that displays the remaining time.
 * @type {HTMLElement}
 */
const timerCounter = document.querySelector(".timer") as HTMLElement;

/**
 * The input field where the user types their guess.
 * @type {HTMLInputElement}
 */
const input = document.querySelector(".input-area")! as HTMLInputElement;

/**
 * The button to check the user's guess.
 * @type {HTMLButtonElement}
 */
const checkBtn = document.querySelector(".btn-check")! as HTMLButtonElement;

/**
 * The button to refresh the riddle and reset the game.
 * @type {HTMLButtonElement}
 */
const refreshBtn = document.querySelector(".btn-refresh")! as HTMLButtonElement;

/**
 * Index of the currently selected riddle from the riddles array.
 * @type {number}
 */
let randomIndex: number;

/**
 * The current riddle text to be displayed.
 * @type {string}
 */
let riddle: string;

/**
 * The current answer text to be guessed by the player.
 * @type {string}
 */
let answer: string;

/**
 * Interval ID for the timer, used to clear the interval when needed.
 * @type {number}
 */
let timerInterval: number;

/**
 * Initializes the game by selecting a random riddle, setting up the display,
 * and starting the timer.
 * @function
 */
function initialization(): void {
  randomIndex = Math.trunc(Math.random() * riddles.length);

  riddle = riddles[randomIndex].riddle;
  answer = riddles[randomIndex].answer.toUpperCase();

  riddleArea.textContent = riddle;

  answerArea.innerHTML = answer
    .split("")
    .sort(() => Math.random() - 0.5)
    .map((char) => `<span>${char}</span>`)
    .join("");

  resetInput();

  clearInterval(timerInterval);

  startTimer();
}

/**
 * Starts a 30-second countdown timer, updates the timer display every second,
 * and handles the end of the timer by showing the correct answer and reinitializing the game.
 * @function
 */
function startTimer(): void {
  let timeLeft: number = 30;
  timerCounter.textContent = String(timeLeft);

  timerInterval = setInterval(() => {
    timeLeft--;
    timerCounter.textContent = String(timeLeft);

    if (timeLeft < 0) {
      alert(`Correct answer was ${answer}!`);

      initialization();
    }
  }, 1000);
}

/**
 * Resets the input field by clearing its value and optionally setting focus.
 * @function
 */
function resetInput(): void {
  input.value = "";
  input.blur();
}

/**
 * Handles the click event on the check button by comparing the user's input with the answer,
 * providing feedback, and reinitializing the game if the answer is correct.
 * @function
 */
checkBtn.addEventListener("click", function () {
  const userGuess = input.value.toUpperCase();

  if (userGuess === answer) {
    alert(`Success, you guessed it right!`);

    initialization();
  } else {
    alert(`Nope, ${userGuess} is not the right answer!`);

    resetInput();
  }
});

/**
 * Adds an event listener to the refresh button to reinitialize the game when clicked.
 * @function
 */
refreshBtn.addEventListener("click", initialization);

/**
 * Initializes the game when the DOM content is fully loaded.
 * @function
 */
window.addEventListener("DOMContentLoaded", initialization);
