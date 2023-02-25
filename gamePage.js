var ball = document.getElementById("ball");
var obstacle = document.getElementById("obstacle");
var gameContainer = document.getElementById("game-container");

var ballSpeedX = 5;
var ballSpeedY = 5;
var ballPosX = 0;
var ballPosY = gameContainer.offsetHeight - ball.offsetHeight;
var ballColor = "red";

var obstacleSpeed = 5;
var obstaclePosX = 0;
var obstaclePosY = 0;

var gameLoop;

document.addEventListener("keydown", function(event) {
	if (event.code === "Space") {
		ballSpeedY = -10;
	}
});

function updateBall() {
	ballPosX += ballSpeedX;
    ballPosY += ballSpeedY;

    if (ballPosY < obstacle.offsetHeight && ballPosX + ball.offsetWidth > obstaclePosX && ballPosX < obstaclePosX + obstacle.offsetWidth) {
        ballPosY = obstacle.offsetHeight;
        ballSpeedY = 0;
        ballColor = getRandomColor();
    } else if (ballPosY > gameContainer.offsetHeight - ball.offsetHeight) {
        ballPosY = gameContainer.offsetHeight - ball.offsetHeight;
        ballSpeedY = -ballSpeedY;
        ballColor = getRandomColor();
    }

    if (ballPosX > gameContainer.offsetWidth - ball.offsetWidth || ballPosX < 0) {
        ballSpeedX = -ballSpeedX;
        ballColor = getRandomColor();
    }

    ball.style.top = ballPosY + "px";
    ball.style.left = ballPosX + "px";
    ball.style.backgroundColor = ballColor;
}

function updateObstacle() {
	obstaclePosX += obstacleSpeed;

	if (obstaclePosX > gameContainer.offsetWidth - obstacle.offsetWidth || obstaclePosX < 0) {
		obstacleSpeed = -obstacleSpeed;
	}

	obstacle.style.left = obstaclePosX + "px";
}

function ballExplosion() {
	clearInterval(gameLoop);
	ball.style.animation = "explode 0.5s linear forwards";
}

function getRandomColor() {
	var letters = "0123456789ABCDEF";
	var color = "#";
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

gameLoop = setInterval(function() {
	updateBall();
	updateObstacle();
}, 50);
