let homePage = document.getElementById('main');
let homeBut = document.getElementById('home');
let pauseBut = document.getElementById('pause');
let pauseMain = document.getElementById('pause-main');
let pausePage = document.getElementById('game-paused');
let gameTap = document.getElementById('balltap');
let gameOver = document.getElementById('gameover');
let overMessage = document.getElementById('game-over');
let showHighScore = document.querySelector('#high-score div');
let screenWidth = window.innerWidth > 600 ? 540 : window.innerWidth;
let screenWidthStyle = 'width:' + String(screenWidth) + 'px';

pauseMain.style.cssText = screenWidthStyle;
homePage.style.cssText = screenWidthStyle;
pauseBut.style.cssText = screenWidthStyle;
homeBut.style.cssText = screenWidthStyle;
pausePage.style.cssText  = screenWidthStyle;
overMessage.style.cssText = screenWidthStyle;

function Over() {
    gameOver.play();
    overMessage.style.display = 'flex';
    pauseBut.style.display = 'none';
    homeBut.style.display = 'flex';
    pauseMain.style.cssText = 'z-index:4';
}
function gameStart() {
    homePage.style.display = 'none';
    pauseBut.style.display = 'flex';
}
function gameResumed() {
    pausePage.style.display = 'none';
    homeBut.style.display = 'none';
    pauseBut.style.display = 'flex';
    pauseMain.style.cssText = 'z-index:2';
}
function gamePaused() {
    pausePage.style.display = 'flex';
    homeBut.style.display = 'flex';
    pauseBut.style.display = 'none';
    pauseMain.style.cssText = 'z-index:4';
}
function mainMenu() {
    window.location.reload();
}
//////////
//LOGIC//
////////

let gamePiece;
function startGame() {
    gameArea.start(); 
    gamePiece = new gameBall();
}
///////////////////
//GAME AREA LOAD//
/////////////////

let gameArea = {
    canvas : document.createElement('canvas'),
    start : function() {
        this.canvas.width = screenWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.backgroundColor = 'none';
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        requestAnimationFrame(updateGameArea);
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};
//CREATED GAMEBALL//
let color = ['rgb(255, 215, 0)','rgb(110, 15, 179)','rgb(255, 20, 147)','rgb(0, 191, 255)'];
let c = 0;
let by = 200;
let dy = 0 ;
let distance = 0;
let ctx;
let bI = Math.floor(Math.random() * 4);
let ballColor = color[bI];
function gameBall() {
    ctx = gameArea.context;
    this.canvasHeight = gameArea.canvas.height;
    this.x = (gameArea.canvas.width)/2;
    this.y = gameArea.canvas.height -  250;
    this.color = ballColor;
    ctx.beginPath();
    this.update = function() {
        ctx.arc(this.x, this.y, 10, 0, 2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        let x = dy;
        document.addEventListener('keydown', function(event) {
            if (event.code === 'Space') {
                gameTap.play();
                dy = 2;
                distance = 0;
            }
        });
        if(gamePiece.y < Math.floor(gamePiece.canvasHeight/2)) {     
            by += 8;   
            score++;
        } 
        if((gamePiece.y >= gamePiece.canvasHeight - 15) && (gamePiece.y <= gamePiece.canvasHeight - 13)) {
            dy = 0;
        }
        if((distance == 11) || (gamePiece.y < Math.floor(gamePiece.canvasHeight/2))) {     
            dy = -1;     
        }
        gamePiece.y -= 3*x; 
        distance++;
    };
    ctx.closePath();
}