function initiation() {
  const startButton = document.querySelector(".start-button");
  const grid = document.querySelector(".grid");
  const score = document.querySelector(".score");

  // ! Grid functions

  const width = 10;
  const gridCellCount = width * width;
  const cells = [];

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

  function startGame() {
    // ! APPLE FUNCTIONS

    let applePosition = 0;

    function addApple(position) {
      cells[position].classList.add("apple");
    }

    function removeApple(position) {
      cells[position].classList.remove("apple");
    }

    function getRandomPosition() {
      return Math.floor(Math.random() * gridCellCount);
    }

    function spawnApple() {
      removeApple(applePosition);
      applePosition = getRandomPosition();
      addApple(applePosition);
      console.log(applePosition);
    }
    spawnApple();

    // ! SNAKE FUNCTIONS

    // ? SPAWN SNAKE

    let snake = [3, 2, 1, 0];

    function renderSnake() {
      snake.forEach((cell) => cells[cell].classList.add("snake"));
    }

    renderSnake();

    function removeSnake() {
      snake.forEach((cell) => cells[cell].classList.remove("snake"));
    }

    // ? MOVING THE SNAKE

    let directionOfTravel;

    function getDirectionOfTravel(event) {
      if (event.key === "ArrowRight") {
        directionOfTravel = "right";
        console.log(directionOfTravel);
      } else if (event.key === "ArrowDown") {
        directionOfTravel = "down";
        console.log(directionOfTravel);
      } else if (event.key === "ArrowLeft") {
        directionOfTravel = "left";
        console.log(directionOfTravel);
      } else if (event.key === "ArrowUp") {
        directionOfTravel = "up";
        console.log(directionOfTravel);
      }
    }

    window.addEventListener("keydown", getDirectionOfTravel);

    function moveSnake(event) {
      removeSnake();
      const x = snake[0] % width;
      const y = Math.floor(snake[0] / width);
      if (event.key === "ArrowRight" && x < width - 1) {
        snake.pop();
        snake.unshift(snake[0] + 1);
      } else if (event.key === "ArrowDown" && y < width - 1) {
        snake.pop();
        snake.unshift(snake[0] + 10);
      } else if (event.key === "ArrowLeft" && x > 0) {
        snake.pop();
        snake.unshift(snake[0] - 1);
      } else if (event.key === "ArrowUp" && y > 0) {
        snake.pop();
        snake.unshift(snake[0] - 10);
      }
      renderSnake();
    }

    window.addEventListener("keydown", moveSnake);

    // ? EATING THE APPLE

    // ? Score function //////////////////////////////////////

    let currentScore = 0;

    function scoreUp() {
      currentScore += 1;
      score.innerHTML = currentScore;
    }

    // ? Snake eats apple ////////////////////////////////////
  }
  // Start game functions ////////////////////////////

  startButton.addEventListener("click", startGame);

  // ! END GAME FUNCTIONS
}

window.addEventListener("DOMContentLoaded", initiation);
