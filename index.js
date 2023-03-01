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
