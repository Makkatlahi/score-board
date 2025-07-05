// Variables
let scoreHomeEl = document.querySelector(".score-home");
let scoreGuestEl = document.querySelector(".score-guest");

// get timer elements
let timerDisplayEl = document.getElementById("timer-display");
let startTimerEl = document.getElementById("start-timer");
let pauseTimerEl = document.getElementById("pause-timer");
let resetTimerEl = document.getElementById("reset-timer");

let homeScore = 0;
let guestScore = 0;

let timerInterval;
let totalSeconds = 2400; //40 min = 1/2 Rugby Match Duration

function incrementHomeScore(amount) {
  homeScore += amount;
  scoreHomeEl.textContent = homeScore;
  updateLeadMessage();
}

function incrementGuestScore(amount) {
  guestScore += amount;
  scoreGuestEl.textContent = guestScore;
  updateLeadMessage();
}

function updateTimerDisplay() {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  timerDisplayEl.textContent = `${minutes}:${seconds}`;
}

function startTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(function () {
    if (totalSeconds > 0) {
      totalSeconds--;
      updateTimerDisplay();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  pauseTimer();
  totalSeconds = 2400;
  updateTimerDisplay();
}

function newGame() {
  homeScore = 0;
  guestScore = 0;
  scoreHomeEl.textContent = homeScore;
  scoreGuestEl.textContent = guestScore;
  resetTimer();
  updateLeadMessage();
}

function updateLeadMessage() {
  const leadMessageEl = document.getElementById("lead-message");
  if (homeScore > guestScore) {
    leadMessageEl.textContent = "Home is in the lead!";
    leadMessageEl.classList.add("show");
  } else if (guestScore > homeScore) {
    leadMessageEl.textContent = "Guest is in the lead!";
    leadMessageEl.classList.add("show");
  } else if (homeScore === guestScore && homeScore > 0) {
    leadMessageEl.textContent = "It's a Tie!";
    leadMessageEl.classList.add("show");
  } else {
    leadMessageEl.classList.remove("show"); // Hide on tie
  }
}
updateLeadMessage();
updateTimerDisplay();
