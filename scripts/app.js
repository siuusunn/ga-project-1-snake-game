function initiation() {
  // ! GETTERS
  const playButton = document.querySelector(".play-button");
  const grid = document.querySelector(".grid");
  const score = document.querySelector(".score");
  const gameOverText = document.querySelector(".game-over");

  // VARIABLES
  const width = 10;
  const gridCellCount = width * width;
  const cells = [];

  let applePosition = 0;
  let snake = [43, 42, 41, 40];
  let directionOfTravel = "right";

  let snakeSpeed = 500;
  let timer;

  let currentScore = 0;

  // ! Grid functions

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
    if (event.keyCode === 39 && directionOfTravel !== "left") {
      directionOfTravel = "right";
    } else if (event.keyCode === 40 && directionOfTravel !== "up") {
      directionOfTravel = "down";
    } else if (event.keyCode === 37 && directionOfTravel !== "right") {
      directionOfTravel = "left";
    } else if (event.keyCode === 38 && directionOfTravel !== "down") {
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
        return directionOfTravel;
      } else if (directionOfTravel === "down" && y < width - 1) {
        removeSnake();
        moveDown();
        renderSnake();
        return directionOfTravel;
      } else if (directionOfTravel === "left" && x > 0) {
        removeSnake();
        moveLeft();
        renderSnake();
        return directionOfTravel;
      } else if (directionOfTravel === "up" && y > 0) {
        removeSnake();
        moveUp();
        renderSnake();
        return directionOfTravel;
      }
    }, snakeSpeed);
  }

  // ? CHECK IF EATS APPLE

  function eatsApple() {
    if (cells[snake[0]].classList.contains("apple")) {
      spawnApple();
      scoreUp();
      snake.push("10");
      clearInterval(timer);
      renderSnake();
      speedUp();
      moveSnake();
    }
  }

  // ? CHECK FOR COLLISION

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

  function scoreUp() {
    currentScore += 1;
    score.innerHTML = currentScore;
  }

  // ! SPEED UP FUNCTIONS

  function speedUp() {
    snakeSpeed = snakeSpeed - 20;
    return snakeSpeed;
  }

  // ! START GAME FUNCTIONS
  function startGame() {
    removeSnake();
    snake = [43, 42, 41, 40];
    clearInterval(timer);
    directionOfTravel = "right";
    snakeSpeed = 500;
    currentScore = "0";
    renderSnake();
    gameOverText.innerHTML = "";
    score.innerHTML = "0";
    playButton.disabled = true;
    spawnApple();
    moveSnake();
  }

  // ! END GAME FUNCTIONS

  function gameOver() {
    gameOverText.innerHTML = "Game over";
    playButton.disabled = false;
    clearInterval(timer);
  }

  // // ! PLAY AGAIN FUNCTIONS

  // function restartGame() {
  //   window.location.reload();
  // }

  // ! SETTERS

  window.addEventListener("keydown", getDirectionOfTravel);
  playButton.addEventListener("click", startGame);
  // playAgainButton.addEventListener("click", restartGame);
}

window.addEventListener("DOMContentLoaded", initiation);
