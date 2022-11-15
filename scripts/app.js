function initiation() {
  // ! GETTERS
  const startButton = document.querySelector(".start-button");
  const grid = document.querySelector(".grid");
  const score = document.querySelector(".score");
  const gameOverText = document.querySelector(".game-over");
  const playAgainButton = document.querySelector(".play-again-button");

  // ! Grid functions

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

  // ! APPLE FUNCTIONS

  let applePosition = 0;
  const snake = [3, 2, 1, 0];
  let directionOfTravel = "right";

  function addApple(position) {
    cells[position].classList.add("apple");
  }

  function removeApple(position) {
    cells[position].classList.remove("apple");
  }

  function getRandomPosition() {
    let randomPosition = Math.floor(Math.random() * gridCellCount);
    while (snake.includes(randomPosition)) {
      randomPosition = Math.floor(Math.random() * gridCellCount);
    }
    return randomPosition;
  }

  function spawnApple() {
    removeApple(applePosition);
    applePosition = getRandomPosition();
    addApple(applePosition);
  }

  // ! SNAKE FUNCTIONS

  // ? SPAWN SNAKE

  function renderSnake() {
    snake.forEach((cell) => cells[cell].classList.add("snake"));
  }

  function removeSnake() {
    snake.forEach((cell) => cells[cell].classList.remove("snake"));
  }

  // ? GET DIRECTION OF TRAVEL

  function getDirectionOfTravel(event) {
    switch (event.keyCode) {
      case 39:
        directionOfTravel = "right";
        break;
      case 40:
        directionOfTravel = "down";
        break;
      case 37:
        directionOfTravel = "left";
        break;
      case 38:
        directionOfTravel = "up";
    }
    return directionOfTravel;
  }

  // ? MOVING THE SNAKE

  function moveRight() {
    snake.pop();
    snake.unshift(snake[0] + 1);
  }

  function moveLeft() {
    snake.pop();
    snake.unshift(snake[0] - 1);
  }

  function moveUp() {
    snake.pop();
    snake.unshift(snake[0] - 10);
  }

  function moveDown() {
    snake.pop();
    snake.unshift(snake[0] + 10);
  }

  let snakeSpeed = 500;
  let timer;

  function moveSnake() {
    timer = setInterval(() => {
      const x = snake[0] % width;
      const y = Math.floor(snake[0] / width);

      eatsApple();
      checkForCollision();

      if (directionOfTravel === "right" && x < width - 1) {
        removeSnake();
        moveRight();
        renderSnake();
      } else if (directionOfTravel === "down" && y < width - 1) {
        removeSnake();
        moveDown();
        renderSnake();
      } else if (directionOfTravel === "left" && x > 0) {
        removeSnake();
        moveLeft();
        renderSnake();
      } else if (directionOfTravel === "up" && y > 0) {
        removeSnake();
        moveUp();
        renderSnake();
      }
    }, snakeSpeed);
  }

  // ? EATING THE APPLE

  function eatsApple() {
    if (cells[snake[0]].classList.contains("apple")) {
      spawnApple();
      scoreUp();
      snake.push("10");
      renderSnake();
      snakeSpeed = snakeSpeed - 100;
    }
  }

  // ? CHECK IF HITS THE WALL

  function checkForCollision() {
    if (
      (snake[0] + width >= width * width && directionOfTravel === "down") ||
      (snake[0] % width === width - 1 && directionOfTravel === "right") ||
      (snake[0] % width === 0 && directionOfTravel === "left") ||
      (snake[0] - width <= 0 && directionOfTravel === "up") ||
      (directionOfTravel === "right" &&
        cells[snake[0] + 1].classList.contains("snake")) ||
      (directionOfTravel === "down" &&
        cells[snake[0] + 10].classList.contains("snake")) ||
      (directionOfTravel === "left" &&
        cells[snake[0] - 1].classList.contains("snake")) ||
      (directionOfTravel === "up" &&
        cells[snake[0] - 10].classList.contains("snake"))
    ) {
      gameOver();
    }
  }

  // ! SCORE FUNCTIONS

  let currentScore = 0;

  function scoreUp() {
    currentScore += 1;
    score.innerHTML = currentScore;
  }

  // ! SPEED UP FUNCTIONS

  // ! START GAME FUNCTIONS
  function startGame() {
    renderSnake();
    gameOverText.innerHTML = "";
    startButton.disabled = true;
    spawnApple();
    moveSnake();
  }

  // ! END GAME FUNCTIONS

  function gameOver() {
    gameOverText.innerHTML = "Game over";
    startButton.disabled = false;
    clearInterval(timer);
  }

  // ! PLAY AGAIN FUNCTIONS

  // ! SETTERS

  window.addEventListener("keydown", getDirectionOfTravel);
  startButton.addEventListener("click", startGame);
}

window.addEventListener("DOMContentLoaded", initiation);
