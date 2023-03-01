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