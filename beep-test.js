// Constants
const LEVEL_DURATION = 100;
const INITIAL_TIME = 100;
const TIME_REDUCTION_PER_LEVEL = 0.5;

// Variables
let level = 1;
let timeLeft = INITIAL_TIME;
let timerId;

// DOM elements
const levelElement = document.getElementById("level");
const timeElement = document.getElementById("time");
const startButton = document.getElementById("start");
const completeButton = document.getElementById("complete");
const resetButton = document.getElementById("reset");

// Functions
const startLevel = () => {
  // Update level and display it
  levelElement.textContent = `Level: ${level}`;

  // Start the timer and display the time
  timerId = setInterval(() => {
    timeLeft -= 0.1;
    if (timeLeft <= 0) {
      clearInterval(timerId);
      alert("Time's up!");
    } else {
      timeElement.textContent = formatTime(timeLeft);
    }
  }, 100);

  // Disable start button
  startButton.disabled = true;
  completeButton.disabled = false;
};

const completeLevel = () => {
  // Stop the timer and calculate the time taken
  clearInterval(timerId);
  const timeTaken = (LEVEL_DURATION - timeLeft).toFixed(1);

  const levelList = document.getElementById("level-list");
  const completedLevelElement = document.createElement("li");
  completedLevelElement.textContent = `Level ${level - 1} completed in ${timeTaken} seconds`;
  completedLevelElement.classList.add("completed"); // add completed class
  levelList.appendChild(completedLevelElement);
  level++;

  // Start the next level or end the test
  if (level <= 20) {
    timeLeft = INITIAL_TIME - level * TIME_REDUCTION_PER_LEVEL;
    startLevel();
  } else {
    alert("Test complete!");
    reset();
  }
};

const reset = () => {
  level = 1;
  timeLeft = INITIAL_TIME;
  levelElement.textContent = `Level: ${level}`;
  timeElement.textContent = formatTime(timeLeft);
  const levelList = document.getElementById("level-list");
  while (levelList.firstChild) {
    levelList.removeChild(levelList.firstChild);
  }
  startButton.disabled = false;
};

// Format time as MM:SS
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toFixed(1)
    .toString()
    .padStart(4, "0")}`;
};

// Event listeners
startButton.addEventListener("click", startLevel);
completeButton.addEventListener("click", completeLevel);
resetButton.addEventListener("click", reset);

// Initialize display
levelElement.textContent = `Level: ${level}`;
timeElement.textContent = formatTime(timeLeft);