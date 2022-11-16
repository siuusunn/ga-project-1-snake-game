function initiation() {
  // GETTERS
  const gameOverText = document.querySelector(".game-over-text");
  const playButton = document.querySelector(".play-button");
  const grid = document.querySelector(".grid");
  const score = document.querySelector(".score");
  const highScoreLi1 = document.querySelector("#high-score-1");
  const highScoreLi2 = document.querySelector("#high-score-2");
  const highScoreLi3 = document.querySelector("#high-score-3");
  const difficultyDisplay = document.querySelector(".difficulty-text");
  const easyButton = document.querySelector("#easy-button");
  const mediumButton = document.querySelector("#medium-button");
  const hardButton = document.querySelector("#hard-button");
  const mobilePlayButton = document.querySelector(".mobile-play-button");
  const numPadUpButton = document.querySelector(".up-button");
  const numPadDownButton = document.querySelector(".down-button");
  const numPadLeftButton = document.querySelector(".left-button");
  const numPadRightButton = document.querySelector(".right-button");

  // VARIABLES
  const width = 10;
  const gridCellCount = width * width;
  const cells = [];

  let applePosition = 0;
  let snake = [42, 41, 40];
  let directionOfTravel = "right";

  let snakeSpeed = 500;
  let currentDifficulty = "easy";
  let timer;

  let currentScore = 0;
  const highScores = [0, 0, 0];

  // GRID FUNCTIONS

  function createGrid() {
    for (let index = 0; index < gridCellCount; index++) {
      const cell = document.createElement("div");
      cell.setAttribute("data-index", index);
      // cell.setAttribute("class", "cell");
      cells.push(cell);
      grid.appendChild(cell);
    }
  }
  createGrid();

  // APPLE FUNCTIONS

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

  // SNAKE FUNCTIONS

  // ---- SPAWN SNAKE

  function renderSnake() {
    snake.forEach((snakeBody) => cells[snakeBody].classList.add("snake"));
  }

  function removeSnake() {
    snake.forEach((snakeBody) => cells[snakeBody].classList.remove("snake"));
  }

  // ---- GET DIRECTION OF TRAVEL

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

  // ---- NUM PAD CONTROLS

  function numPadControlUp() {
    if (directionOfTravel !== "down") {
      return (directionOfTravel = "up");
    }
  }

  function numPadControlDown() {
    if (directionOfTravel !== "up") {
      return (directionOfTravel = "down");
    }
  }

  function numPadControlLeft() {
    if (directionOfTravel !== "right") {
      return (directionOfTravel = "left");
    }
  }

  function numPadControlRight() {
    if (directionOfTravel !== "left") {
      return (directionOfTravel = "right");
    }
  }

  // ---- MOVING THE SNAKE

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

  // CHECK IF EATS APPLE

  function eatsApple() {
    if (cells[snake[0]].classList.contains("apple")) {
      spawnApple();
      scoreUp();
      snake.push(42);
      clearInterval(timer);
      renderSnake();
      speedUp();
      moveSnake();
    }
  }

  // CHECK FOR COLLISION

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

  // SCORE FUNCTIONS

  function scoreUp() {
    currentScore += 100;
    score.innerHTML = currentScore;
  }

  // SPEED UP FUNCTIONS

  function speedUp() {
    snakeSpeed = snakeSpeed - 20;
    return snakeSpeed;
  }

  // CHOOSE DIFFICULTY FUNCTIONS

  function easyDifficulty() {
    difficultyDisplay.textContent = "Noob";
    currentDifficulty = "easy";
    snakeSpeed = 500;
  }

  function mediumDifficulty() {
    difficultyDisplay.textContent = "Veteran";
    currentDifficulty = "medium";
    snakeSpeed = 300;
  }

  function hardDifficulty() {
    difficultyDisplay.textContent = "Expert";
    currentDifficulty = "hard";
    snakeSpeed = 100;
  }

  // START GAME FUNCTIONS

  function startGame() {
    removeGameOverText();
    removeSnake();
    snake = [43, 42, 41, 40];
    clearInterval(timer);
    directionOfTravel = "right";
    currentScore = 0;
    score.innerHTML = currentScore;
    renderSnake();
    playButton.disabled = true;
    spawnApple();
    checkGameSpeed();
    moveSnake();
  }

  //CHECK GAME SPEED TO ALLOW RESET

  function checkGameSpeed() {
    if (currentDifficulty === "easy") {
      snakeSpeed = 500;
    } else if (currentDifficulty === "medium") {
      snakeSpeed = 300;
    } else if (currentDifficulty === "hard") {
      snakeSpeed = 100;
    }
  }

  // END GAME FUNCTIONS

  function gameOver() {
    playButton.disabled = false;
    clearInterval(timer);
    displayGameOverText();
    checkHighScore();
  }

  function displayGameOverText() {
    gameOverText.textContent = "GAME OVER";
  }

  function removeGameOverText() {
    gameOverText.textContent = "";
  }

  // CHECK HIGH SCORE

  function checkHighScore() {
    if (currentScore > highScores[0]) {
      highScores[1] = highScores[0];
      highScoreLi2.textContent = highScores[0];
      highScores[0] = currentScore;
      highScoreLi1.textContent = currentScore;
    } else if (
      currentScore < highScores[0] &&
      currentScore > highScores[1] &&
      currentScore > highScores[2]
    ) {
      highScores[2] = highScores[1];
      highScoreLi3.textContent = highScores[1];
      highScores[1] = currentScore;
      highScoreLi2.textContent = currentScore;
    } else if (currentScore < highScores[1] && currentScore > highScores[2]) {
      highScores[2] = currentScore;
      highScoreLi3.textContent = currentScore;
    }
  }

  // PREVENT ARROW KEYS FROM SCROLLING THE PAGE
  function preventScrolling(event) {
    if (
      event.keyCode === 37 ||
      event.keyCode === 38 ||
      event.keyCode === 39 ||
      event.keyCode === 40
    ) {
      event.preventDefault();
    }
  }

  // SETTERS

  window.addEventListener("keydown", getDirectionOfTravel);
  playButton.addEventListener("click", startGame);
  easyButton.addEventListener("click", easyDifficulty);
  mediumButton.addEventListener("click", mediumDifficulty);
  hardButton.addEventListener("click", hardDifficulty);
  window.addEventListener("keydown", preventScrolling);
  numPadUpButton.addEventListener("click", numPadControlUp);
  numPadDownButton.addEventListener("click", numPadControlDown);
  numPadLeftButton.addEventListener("click", numPadControlLeft);
  numPadRightButton.addEventListener("click", numPadControlRight);
  mobilePlayButton.addEventListener("click", startGame);
}

window.addEventListener("DOMContentLoaded", initiation);
