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

    function spawnApple() {
      removeApple(applePosition);
      applePosition = getRandomPosition();
      addApple(applePosition);
      console.log(applePosition);
    }
    spawnApple();

    function addApple(position) {
      cells[position].classList.add("apple");
    }

    function removeApple(position) {
      cells[position].classList.remove("apple");
    }

    function getRandomPosition() {
      return Math.floor(Math.random() * gridCellCount);
    }

    // ! SNAKE FUNCTIONS

    // ? Spawn snake

    let snakeArray = [20, 21, 22];
    let snakeHead = 1;
    let previousSnakeHead = 0;
    let snakeBody = 0;

    function addSnake() {
      cells[snakeHead].classList.add("snake");
      cells[snakeBody].classList.add("snake");
      // const snake = snakeArray.forEach((cell) =>
      //   cells[cell].classList.add("snake")
      // );
    }

    addSnake();

    function removeSnake() {
      cells[snakeHead].classList.remove("snake");
      cells[snakeBody].classList.remove("snake");
      // snakeArray.forEach((cell) => cells[cell].classList.remove("snake"));
    }
    // ? Move snake

    function moveRight() {
      snakeHead++;
      console.log(snakeHead);
      previousSnakeHead = snakeHead - 1;
      snakeBody = previousSnakeHead;
      // const testRight = snakeArray.map((cell) => (cell += 1));
    }

    function moveLeft() {
      snakeHead--;
      console.log(snakeHead);
      previousSnakeHead = snakeHead + 1;
      snakeBody = previousSnakeHead;
    }

    function moveUp() {
      snakeHead -= 10;
      console.log(snakeHead);
      previousSnakeHead = snakeHead + 10;
      snakeBody = previousSnakeHead;
    }

    function moveDown() {
      snakeHead += 10;
      console.log(snakeHead);
      previousSnakeHead = snakeHead - 10;
      snakeBody = previousSnakeHead;
    }

    // ? Actual game mechanics

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
}

window.addEventListener("DOMContentLoaded", initiation);
