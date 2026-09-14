import './style.css'
import Game from './game.js';

const entryPlayer = document.getElementById("enterPlayers");
const gameBoard = document.getElementById("mainGame");

const playBtn = document.getElementById("play");
const resetBtn = document.getElementById("reset");

const entryError = document.getElementById("errorA");

function changeAnimation(first, second){
  first.style.opacity = '0';
  setTimeout(() => {
    first.classList.add("hidden");
    second.classList.remove("hidden");
    second.style.opacity = '100';
  }, 1000);
}

function getPlayer(){
  const firstPlayer = document.getElementById("firstPlayerName").value;
  const secondPlayer = document.getElementById("secondPlayerName").value;
  const firstPlayerSymbol = document.getElementById("firstPlayerSymbol").value;
  const secondPlayerSymbol = document.getElementById("secondPlayerSymbol").value;
  
  if(firstPlayer === "" || secondPlayer === "" || firstPlayerSymbol === secondPlayerSymbol){
    entryError.classList.remove("hidden");
    setTimeout(() => {
      entryError.classList.add("hidden");
  }, 1000);
    return false;
  }

  const player1 = [firstPlayer, firstPlayerSymbol];
  const player2 = [secondPlayer, secondPlayerSymbol];

  const game = new Game(player1, player2);

  return game;
}

playBtn.addEventListener("click", () => {
  const game = getPlayer();

  if(!game){
    return;
  }

  changeAnimation(entryPlayer, gameBoard);


  game.start();
});

resetBtn.addEventListener("click", () => {
  const game = getPlayer();

  changeAnimation(gameBoard, entryPlayer);

  game.stop();
});