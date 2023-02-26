const ball = document.getElementById("ball");
const obstacles = document.querySelectorAll(".obstacle");
const gameContainer = document.getElementById("game-container");

let ballSpeedX = 0;
let ballSpeedY = 0;
let ballPosX = gameContainer.offsetWidth / 2 - ball.offsetWidth / 2;
let ballPosY = gameContainer.offsetHeight - ball.offsetHeight;
let ballColor = "red";

let obstacleSpeed = 5;
let obstaclePosX = 0;
let obstacleSpacing = 100;
let obstaclePosY = obstacleSpacing;

for (let i = 0; i < obstacles.length; i++) {
  const obstacle = obstacles[i];
  obstacle.style.top = `${obstaclePosY}px`;
  obstaclePosY += obstacleSpacing;
}

let gameLoop;
let gameStarted = false;
let spaceKeyDown = false;

document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && !gameStarted) {
    gameStarted = true;
    ballSpeedY = -10;
  } else if (event.code === "Space") {
    spaceKeyDown = true;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    spaceKeyDown = false;
    ballSpeedY = 10;
  }
});

function updateBall() {
  if (!gameStarted) {
    return;
  }
  ballPosX += ballSpeedX;
  ballPosY += ballSpeedY;

  if (spaceKeyDown) {
    ballSpeedY = -10;
  } else {
    ballSpeedY = 10;
  }

  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];
    if (ballPosY < obstacle.offsetTop + obstacle.offsetHeight &&
        ballPosX + ball.offsetWidth > obstacle.offsetLeft &&
        ballPosX < obstacle.offsetLeft + obstacle.offsetWidth) {
      ballPosY = obstacle.offsetTop + obstacle.offsetHeight;
      ballSpeedY = 0;
      ballColor = getRandomColor();
    }
  }

  if (ballPosY < 0) {
    ballPosY = 0;
    ballSpeedY = -ballSpeedY;
    ballColor = getRandomColor();
  } else if (ballPosY > gameContainer.offsetHeight - ball.offsetHeight) {
    ballPosY = gameContainer.offsetHeight - ball.offsetHeight;
    ballSpeedY = -ballSpeedY;
    ballColor = getRandomColor();
  }

  if (ballPosX > gameContainer.offsetWidth - ball.offsetWidth ||
      ballPosX < 0) {
    ballSpeedX = -ballSpeedX;
    ballColor = getRandomColor();
  }

  ball.style.top = `${ballPosY}px`;
  ball.style.left = `${ballPosX}px`;
  ball.style.backgroundColor = ballColor;

  checkGameOver();
}

function updateObstacles() {
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];
    let obstaclePosX = parseInt(obstacle.style.left) || 0;
    obstaclePosX += obstacleSpeed;
    if (obstaclePosX > gameContainer.offsetWidth - obstacle.offsetWidth ||
        obstaclePosX < 0) {
      obstacleSpeed = -obstacleSpeed;
    }
    obstacle.style.left = `${obstaclePosX}px`;
  }
}

function checkGameOver() {
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];
    if (ballPosY + ball.offsetHeight > obstacle.offsetTop &&
        ballPosX + ball.offsetWidth > obstacle.offsetLeft &&
        ballPosX < obstacle.offsetLeft + obstacle.offsetWidth) {
      ballExplosion();
      setTimeout(() => {
        alert("Game Over!");
        window.location.reload();
      }, 500);
      return;
    }
  }
}



function ballExplosion() {
    clearInterval(gameLoop);
    ball.style.animation = "explode 0.5s linear forwards";
}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

gameLoop = setInterval(() => {
    updateBall();
    updateObstacles();
}, 50);
