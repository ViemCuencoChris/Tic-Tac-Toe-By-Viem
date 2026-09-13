import './style.css'
import Player from './player.js';
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

playBtn.addEventListener("click", () => {
  const firstPlayer = document.getElementById("firstPlayerName").value;
  const secondPlayer = document.getElementById("secondPlayerName").value;
  const firstPlayerSymbol = document.getElementById("firstPlayerSymbol").value;
  const secondPlayerSymbol = document.getElementById("secondPlayerSymbol").value;

  if(firstPlayer === "" || secondPlayer === "" || firstPlayerSymbol === secondPlayerSymbol){
    entryError.classList.remove("hidden");
    setTimeout(() => {
      entryError.classList.add("hidden");
  }, 1000);
    return;
  }

  changeAnimation(entryPlayer, gameBoard);

  const player1 = new Player(firstPlayer, firstPlayerSymbol);
  const player2 = new Player(secondPlayer, secondPlayerSymbol);

  const game = new Game(player1, player2);
  game.start();
});

resetBtn.addEventListener("click", () => {
  changeAnimation(gameBoard, entryPlayer);

  const game = new Game();
  game.stop();
});