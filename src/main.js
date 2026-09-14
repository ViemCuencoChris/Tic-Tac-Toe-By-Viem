import './style.css'

const entryPlayer = document.getElementById("enterPlayers");
const gameBoard = document.getElementById("mainGame");

const playBtn = document.getElementById("play");
const resetBtn = document.getElementById("reset");

const entryError = document.getElementById("errorA");

const tiles = document.querySelectorAll(".tile");
const current = document.getElementById("currentPlayer");

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

function winner(tileArray){
    let winner;

    winningCombinations.forEach(index => {
        const first = tileArray[index[0]].textContent;
        const second = tileArray[index[1]].textContent;
        const third = tileArray[index[2]].textContent;
        
        if(first !== "" && second !== "" && third !== ""){
            if(first === second && second === third){
                if(first === "X"){
                    winner = "X";
                    return;
                } else {
                    winner = "O";
                    return;
                }
            }
        }
    });

    return winner;
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
  const playerList =[player1, player2];

  firstSymbol = playerList[0][1];
  secondSymbol  = playerList[1][1];
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

let tileArray = [];
let firstSymbol;
let secondSymbol;
let currentPlayer;

tiles.forEach(tile => {
    tileArray.push(tile);

    tile.addEventListener("click", () => {
        if(tile.textContent !== ""){
            return;
        }

        if(currentPlayer === "X"){
            tile.style.color = "#BFCC94";
        } if(currentPlayer === "O"){
            tile.style.color = "#C1292E";
        }
        
        tile.textContent = currentPlayer;

        const win = winner(tileArray);

        if(win === "X"){
            console.log("X won");
            return;
        } else if(win === "O"){
            console.log("O won");
            return;
        } else {
            const draw = tileArray.every(tile => {
                return tile.textContent !== ""
            });

            if(draw){
                console.log("Draw");
                return;
            }
        }

        currentPlayer = (currentPlayer === firstSymbol) ? secondSymbol : firstSymbol;
        current.textContent = "Turn for " + currentPlayer;
        (currentPlayer === firstSymbol) ?  current.style.color = "#BFCC94" : current.style.color = "#C1292E";
    });
});