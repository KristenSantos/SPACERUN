///////////////////
///Ball Control///
/////////////////

const ball = document.querySelector('#ball');
const ballSection = document.querySelector('#ballSection');

// Set the initial position and velocity of the ball
let ballPosition = 0;
let ballVelocity = 0;

// Define a function to update the position of the ball
function updateBallPosition() {
  ball.style.bottom = ballPosition + 'px';
}

// Add an event listener for the space bar keydown event
document.addEventListener('keydown', function(event) {
  if (event.code === 'Space') {
    ballVelocity = 5;
  }
});

// Add an event listener for the space bar keyup event
document.addEventListener('keyup', function(event) {
  if (event.code === 'Space') {
    ballVelocity = -2;
  }
});

// Define a function to update the position of the ball based on its velocity
function updateBallVelocity() {
  ballPosition += ballVelocity;
  if (ballPosition < 0) {
    ballPosition = 0;
    ballVelocity = 0;
  }
  updateBallPosition();

  // Check if the ball has reached the top of the ball section and move the section up if it has
  if (ballPosition > (ballSection.offsetHeight - ball.offsetHeight)) {
    ballSection.style.top = -(ballPosition - (ballSection.offsetHeight - ball.offsetHeight)) + 'px';
  }
}
 
// Set an interval to update the position of the ball every 20 milliseconds
setInterval(updateBallVelocity, 20);

///////////////////
//Obstcle Control/
/////////////////

const obstacle = document.querySelector('.obstacles');

// Set the initial position and direction of the obstacle
let obstaclePosition = 0;
let obstacleDirection = 1;

// Define a function to update the position of the obstacle
function updateObstaclePosition() {
  obstaclePosition += obstacleDirection;
  obstacle.style.left = obstaclePosition + 'px';

  // Reverse direction if obstacle reaches the edge of the screen
  if (obstaclePosition >= (window.innerWidth - obstacle.offsetWidth) || obstaclePosition <= 0) {
    obstacleDirection *= -1;
  }
}

// Set an interval to update the position of the obstacle every 10 milliseconds
setInterval(updateObstaclePosition, 0.01);