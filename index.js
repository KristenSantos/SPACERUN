// ///////////////////
// ///Ball Control///
// /////////////////

const ball = document.querySelector('#ball');
const ballSection = document.querySelector('#ballSection');
const body = document.querySelector('body')

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
 
// // Set an interval to update the position of the ball every 20 milliseconds
setInterval(updateBallVelocity, 20);

///////////////////
//Obstcle Control/
/////////////////
let rectangles = []
let isGameOver = true

class Rectangle {
    constructor(newRectangleBottom){
      this.bottom = newRectangleBottom
      this.left = Math.random() * 1430
      this.visual = document.createElement('div')
      this.direction = 'left'
      this.speed = 5 // adjust speed as needed
  
      // rest of the constructor code
      const visual = this.visual
      visual.classList.add('rectangleObst')
      visual.style.left = this.left + 'px'
      visual.style.bottom = this.bottom + 'px';
      grid.appendChild(visual)
    }
  }
  
  
  function createRectangleObst() {
    for(let i = 0; i < RectangleObstCount; i++){
      let RectangleObstGap = 600 / RectangleObstCount
      let newRectangleBottom = 200 + i * RectangleObstGap;
      let newRectangleObs = new Rectangle(newRectangleBottom)
      rectangles.push(newRectangleObs)
      console.log(rectangles)
  
    }
  }

  function moveRectangleObst() {
    if(rocketBottomSpace > 200){
      rectangles.forEach(rectangle => {
        if (rectangle.direction === 'left') {
          rectangle.left -= rectangle.speed
        } else {
          rectangle.left += rectangle.speed
        }
        let visual = rectangle.visual
        visual.style.left = rectangle.left + 'px'
  
        // change direction if rectangle hits left or right edge of grid
        if (rectangle.left <= 0) {
          rectangle.direction = 'right'
        } else if (rectangle.left >= (grid.offsetWidth - visual.offsetWidth)) {
          rectangle.direction = 'left'
        }
  
        // rest of the function code
        if(rectangle.bottom < 10){
          let firstRectangle = rectangles[0].visual
          firstRectangle.classList.remove('retangle')
          rectangles.shift()
          let newRectangleObs = new Rectangle(600)
          rectangles.push(newRectangleObs)
        }
  
      })
    }
  }

  function startGame() {
    if(!isGameOver){
      createRectangleObst()
      createRocket()
      setInterval(moveRectangleObst, .1)
      // fly()
    }
   
  }
  startGame()