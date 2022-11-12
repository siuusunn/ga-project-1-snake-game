function initiation() {
  const startButton = document.querySelector(".start-button");
  const grid = document.querySelector(".grid");
  const score = document.querySelector(".score");
  // const allCellTest = document.querySelectorAll(".cell");
  // const cellTest = allCellTest.

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

  function startGame() {
    // ! APPLE FUNCTIONS

    let applePosition = 0;
    let snake = [3, 2, 1, 0];
    let directionOfTravel = "right";

    function addApple(position) {
      cells[position].classList.add("apple");
    }

    function removeApple(position) {
      cells[position].classList.remove("apple");
    }

    // function getRandomPosition() {
    //   return Math.floor(Math.random() * gridCellCount);
    // }

    function getRandomPosition() {
      let randomPosition = Math.floor(Math.random() * gridCellCount);
      while (snake.includes(randomPosition)) {
        randomPosition = Math.floor(Math.random() * gridCellCount);
        // return randomPosition;
      }
      return randomPosition;
    }

    function spawnApple() {
      removeApple(applePosition);
      applePosition = getRandomPosition();
      addApple(applePosition);
    }
    spawnApple();

    // ! SNAKE FUNCTIONS

    // ? SPAWN SNAKE

    function renderSnake() {
      snake.forEach((cell) => cells[cell].classList.add("snake"));
    }

    renderSnake();

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
    }

    window.addEventListener("keydown", getDirectionOfTravel);

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
      setInterval(() => {
        const x = snake[0] % width;
        const y = Math.floor(snake[0] / width);
        removeSnake();
        if (directionOfTravel === "right" && x < width - 1) {
          moveRight();
        } else if (directionOfTravel === "down" && y < width - 1) {
          moveDown();
        } else if (directionOfTravel === "left" && x > 0) {
          moveLeft();
        } else if (directionOfTravel === "up" && y > 0) {
          moveUp();
        }
        renderSnake();
      }, 300);
    }

    moveSnake();

    // ? CONTROLLING THE SNAKE

    function controlSnake(event) {
      removeSnake();
      const x = snake[0] % width;
      const y = Math.floor(snake[0] / width);
      if (event.keyCode === 39 && x < width - 1) {
        moveRight();
      } else if (event.keyCode === 40 && y < width - 1) {
        moveDown();
      } else if (event.keyCode === 37 && x > 0) {
        moveLeft();
      } else if (event.keyCode === 38 && y > 0) {
        moveUp();
      }
      renderSnake();
    }

    window.addEventListener("keydown", controlSnake);

    // ? EATING THE APPLE

    // ! SCORE FUNCTIONS

    let currentScore = 0;

    function scoreUp() {
      currentScore += 1;
      score.innerHTML = currentScore;
    }

    // ! END GAME FUNCTIONS
  }

  startButton.addEventListener("click", startGame);
}

window.addEventListener("DOMContentLoaded", initiation);
