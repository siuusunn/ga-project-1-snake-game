function initiation() {
  const startButton = document.querySelector(".start-button");
  const grid = document.querySelector(".grid");
  const score = document.querySelector(".score");

  // Grid functions

  const width = 10;
  const gridCellCount = width * width;
  const cells = [];

  function createGrid() {
    for (let index = 0; index < gridCellCount; index++) {
      const cell = document.createElement("div");
      cell.setAttribute("data-index", index);
      cell.setAttribute("class", "cell");
      cells.push(cell);
      grid.appendChild(cell);
    }
  }

  createGrid();

  // APPLE FUNCTIONS

  let applePosition = 0;
  let currentScore = 0;

  function addApple(position) {
    cells[position].classList.add("apple");
  }

  function removeApple(position) {
    cells[position].classList.remove("apple");
  }

  function getRandomPosition() {
    return Math.floor(Math.random() * gridCellCount);
  }

  function scoreUp() {
    currentScore += 1;
    score.innerHTML = currentScore;
  }

  function appleEaten() {
    removeApple(applePosition);
    applePosition = getRandomPosition();
    addApple(applePosition);
    scoreUp();
  }

  addApple(Math.floor(Math.random() * gridCellCount));

  // SNAKE FUNCTIONS
  // ? Spawn snake
  let snakeHead = 1;
  let previousSnakeHead = 0;
  let snakeBody = 0;

  function addSnake() {
    cells[snakeHead].classList.add("snake");
    cells[snakeBody].classList.add("snake");
  }

  function removeSnake() {
    cells[snakeHead].classList.remove("snake");
    cells[snakeBody].classList.remove("snake");
  }

  function moveRight() {
    snakeHead++;
    previousSnakeHead = snakeHead - 1;
    snakeBody = previousSnakeHead;
  }

  function moveLeft() {
    snakeHead--;
    previousSnakeHead = snakeHead + 1;
    snakeBody = previousSnakeHead;
  }

  function moveUp() {
    snakeHead -= 10;
    previousSnakeHead = snakeHead + 10;
    snakeBody = previousSnakeHead;
  }

  function moveDown() {
    snakeHead += 10;
    previousSnakeHead = snakeHead - 10;
    snakeBody = previousSnakeHead;
  }

  // ? Move snake

  function moveSnake(event) {
    removeSnake(snakeHead);
    const x = snakeHead % width;
    const y = Math.floor(snakeHead / width);
    if (event.key === "ArrowRight" && x < width - 1) {
      moveRight();
    } else if (event.key === "ArrowUp" && y > 0) {
      moveUp();
    } else if (event.key === "ArrowLeft" && x > 0) {
      moveLeft();
    } else if (event.key === "ArrowDown" && y < width - 1) {
      moveDown();
    }
    addSnake(snakeHead);
  }

  window.addEventListener("keydown", moveSnake);

  // Start game functions
}

window.addEventListener("DOMContentLoaded", initiation);
