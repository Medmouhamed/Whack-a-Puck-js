const startBtn = document.getElementById("startBtn");
const board = document.getElementById("board");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");

let score = 0;
let timer;
let gameTime = 0;
let activeSquare = null;
let moveInterval;

startBtn.addEventListener("click", startGame);

function startGame() {

  const duration = parseInt(document.getElementById("gameDuration").value);
  const rows = parseInt(document.getElementById("boardRows").value);
  const cols = parseInt(document.getElementById("boardCols").value);
  const speed = parseInt(document.getElementById("speed").value);

  score = 0;
  gameTime = duration;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = gameTime;

  board.innerHTML = "";
  board.style.gridTemplateColumns = `repeat(${cols}, 70px)`;
  board.style.gridTemplateRows = `repeat(${rows}, 70px)`;

  for (let i = 0; i < rows * cols; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.addEventListener("click", handleHit);
    board.appendChild(square);
  }

  movePuck(speed);
  startTimer(duration);
}

function movePuck(speed) {
  clearInterval(moveInterval);
  moveInterval = setInterval(() => {
    if (activeSquare) {
      activeSquare.classList.remove("active");
      activeSquare.innerHTML = "";
    }
    const squares = document.querySelectorAll(".square");
    const randomIndex = Math.floor(Math.random() * squares.length);
    activeSquare = squares[randomIndex];
    activeSquare.classList.add("active");
    activeSquare.innerHTML = "";
  }, speed);
}

function handleHit(e) {
  if (e.target.classList.contains("active")) {
    score++;
    scoreDisplay.textContent = score;
    e.target.classList.remove("active");
    e.target.innerHTML = "";
  }
}

function startTimer(duration) {
  clearInterval(timer);
  timer = setInterval(() => {
    gameTime--;
    timerDisplay.textContent = gameTime;
    if (gameTime <= 0) {
      clearInterval(timer);
      clearInterval(moveInterval);
      alert(` Time's up! Your score: ${score}`);
    }
  }, 1000);
}



