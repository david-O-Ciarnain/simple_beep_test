// Declare constants
const initialTime = 100;
const levelDuration = 100;
const timeReductionPerLevel = 0.5;

// Declare variables
let level = 1;
let timeLeft = initialTime;
let timerId;

// Get DOM elements
const levelElement = document.getElementById("level");
const timeElement = document.getElementById("time");
const startButton = document.getElementById("start");
const completeButton = document.getElementById("complete");
const resetButton = document.getElementById("reset");
const resultsList = document.getElementById("results-list");

// Define functions
const startLevel = () => {
  // Update level and display it
  levelElement.textContent = `Level: ${level}`;

  // Start the timer and display the time
  timerId = setInterval(() => {
    timeLeft -= 0.1;
    timeElement.textContent = formatTime(timeLeft);
    if (timeLeft < 0) {
      clearInterval(timerId);
      alert("Time's up!");
    }
  }, 100);

  startButton.disabled = true;
};

const completeLevel = () => {
  // Stop the timer and calculate the time taken
  clearInterval(timerId);
  const timeTaken = (levelDuration - timeLeft).toFixed(1);

  // Display the time taken and update the level
  const timeTakenMessageElement = document.createElement("li");
  timeTakenMessageElement.textContent = `Level ${level}: ${timeTaken} seconds`;
  resultsList.appendChild(timeTakenMessageElement);
  level++;
  timeLeft = Math.max(0, initialTime - level * timeReductionPerLevel);

  // Start the next level or end the test
  if (level <= 20) {
    setTimeout(() => {
      startLevel();
    }, 1000);
  } else {

    alert("Test complete!");
  }

  startButton.disabled = false;
};

const resetTest = () => {
  // Reset variables and display
  level = 1;
  timeLeft = initialTime;
  levelElement.textContent = `Level: ${level}`;
  timeElement.textContent = formatTime(timeLeft);
  resultsList.innerHTML = "";
  startButton.disabled = false;
};

// Add event listeners
startButton.addEventListener("click", startLevel);
completeButton.addEventListener("click", completeLevel);
resetButton.addEventListener("click", resetTest);

// Initialize display
levelElement.textContent = `Level: ${level}`;
timeElement.textContent = formatTime(timeLeft);

function formatTime(time) {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (time % 60).toFixed(1).toString().padStart(4, "0");
  return `${minutes}:${seconds}`;
}
