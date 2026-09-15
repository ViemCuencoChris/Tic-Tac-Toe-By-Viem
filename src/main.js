import './style.css'

const entryPlayer = document.getElementById("enterPlayers");
const gameBoard = document.getElementById("mainGame");

const playBtn = document.getElementById("play");
const resetBtn = document.getElementById("reset");

const entryError = document.getElementById("errorA");

const tiles = document.querySelectorAll(".tile");
const current = document.getElementById("currentPlayer");

const displayWinner = document.getElementById("winnerContainer");
const winnerName = document.getElementById("winner");

let tileArray = [];
let first;
let second;
let firstSymbol;
let secondSymbol;
let currentPlayer;

tiles.forEach(tile => {
  tileArray.push(tile);

  tile.addEventListener("click", () => {
    if(tile.textContent !== ""){
        return;
    }

    tile.style.color = (currentPlayer === firstSymbol) ? "#BFCC94" : "#C1292E";;
    tile.textContent = currentPlayer;

    let end = winner();

    if(end){
      return;
    }

    currentPlayer = (currentPlayer === firstSymbol) ? secondSymbol : firstSymbol;
    current.textContent = "Turn for " + currentPlayer;
    current.style.color = (currentPlayer === firstSymbol) ? "#BFCC94" :"#C1292E";
  });
});

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function changeAnimation(first, second){
  first.style.opacity = '0';
  setTimeout(() => {
    first.classList.add("hidden");
    second.classList.remove("hidden");
    second.style.opacity = '100';
  }, 1000);
}

function displayWinnerAnimation(symbol, name){
  if(symbol === "X"){
    displayWinner.style.borderColor = (currentPlayer === firstSymbol) ? "#BFCC94" : "#C1292E";
    winnerName.textContent = name;
    winnerName.style.color = (currentPlayer === firstSymbol) ? "#BFCC94" : "#C1292E";
  } else if (symbol === "O") {
    displayWinner.style.borderColor = (currentPlayer === firstSymbol) ? "#BFCC94" : "#C1292E";
    winnerName.textContent = name;
    winnerName.style.color = (currentPlayer === firstSymbol) ? "#BFCC94" : "#C1292E";
  } else {
    displayWinner.style.borderColor = "#F0F4EF";
    winnerName.style.color = "#F0F4EF";
    winnerName.textContent = "DRAW";
  }

  displayWinner.classList.remove("hidden");
  displayWinner.style.opacity = "100";
  setTimeout(() => {
    displayWinner.style.opacity = "";
    reset();
    changeAnimation(gameBoard, entryPlayer);
    displayWinner.classList.add("hidden");
  }, 1500);
}

function winner(){
  let stop;

  winningCombinations.forEach(index => {
      const firstIndex = tileArray[index[0]].textContent;
      const secondIndex = tileArray[index[1]].textContent;
      const thirdIndex = tileArray[index[2]].textContent;
      
      if(firstIndex !== "" && secondIndex !== "" && thirdIndex !== ""){
          if(firstIndex === secondIndex && secondIndex === thirdIndex){
              if(firstIndex === "X"){
                if(firstSymbol === firstIndex){
                  displayWinnerAnimation(firstSymbol, first);
                  stop = true;
                  return;
                } else {
                  displayWinnerAnimation(secondSymbol, second);
                  stop = true;
                  return;
                }
              } 
              
              if(firstIndex === "O") {
                if(firstSymbol === firstIndex){
                  displayWinnerAnimation(firstSymbol, first);
                  stop = true;
                  return;
                } else {
                  displayWinnerAnimation(secondSymbol, second);
                  stop = true;
                  return;
                }
              }
          }
      }
  });

  if(stop != true){
    const draw = tileArray.every(slot => {
      return slot.textContent !== ""
    });

    if(draw){
      stop = true;
      displayWinnerAnimation("", "");
    }
  }

  return stop;
}

function play(){
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

  const player1 = [firstPlayer, firstPlayerSymbol];
  const player2 = [secondPlayer, secondPlayerSymbol];

  first = player1[0];
  second = player2[0];
  firstSymbol = player1[1];
  secondSymbol  = player2[1];
  currentPlayer = firstSymbol;

  current.textContent = "Turn for " + currentPlayer;
  (currentPlayer === firstSymbol) ?  current.style.color = "#BFCC94" : current.style.color = "#C1292E";
}

function reset(){
  const firstPlayer = document.getElementById("firstPlayerName");
  const secondPlayer = document.getElementById("secondPlayerName");
  const firstPlayerSymbol = document.getElementById("firstPlayerSymbol");
  const secondPlayerSymbol = document.getElementById("secondPlayerSymbol");

  tiles.forEach(tile => {
      tile.textContent = "";
      tile.style.color = "";
  });

  firstPlayer.value = "";
  secondPlayer.value = "";
  firstPlayerSymbol.selectedIndex = 0;
  secondPlayerSymbol.selectedIndex = 0;
}

playBtn.addEventListener("click", () => {
  changeAnimation(entryPlayer, gameBoard);

  play();
});

resetBtn.addEventListener("click", () => {
  changeAnimation(gameBoard, entryPlayer);

  reset();
});