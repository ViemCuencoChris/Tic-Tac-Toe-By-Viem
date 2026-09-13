import './style.css'
import Player from './player.js';

const entryPlayer = document.getElementById("enterPlayers");
const gameBoard = document.getElementById("mainGame");

const firstPlayer = document.getElementById("firstPlayerName");
const firstPlayerSymbol = document.getElementById("firstPlayerSymbol");
const secondPlayer = document.getElementById("secondPlayerName");
const secondPlayerSymbol = document.getElementById("secondPlayerSymbol");

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
  if(firstPlayer.value === "" || secondPlayer.value === "" || firstPlayerSymbol.value === secondPlayerSymbol.value){
    entryError.classList.remove("hidden");
    setTimeout(() => {
      entryError.classList.add("hidden");
  }, 1000);
    return;
  }

  changeAnimation(entryPlayer, gameBoard);

  const player1 = new Player(firstPlayer, firstPlayerSymbol);
  const player2 = new Player(secondPlayer, secondPlayerSymbol);

  const playerList = [player1, player2]

  
});

resetBtn.addEventListener("click", () => {
  changeAnimation(gameBoard, entryPlayer);

  firstPlayer.value = "";
  secondPlayer.value = "";
  firstPlayerSymbol.selectedIndex = 0;
  secondPlayerSymbol.selectedIndex = 0;
});