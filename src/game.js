const tiles = document.querySelectorAll(".tile");
const current = document.getElementById("currentPlayer");

const tileArray = [];
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

export default class Game {
    constructor(player1, player2){
        this.player = [player1, player2];
    }
    
    start(){
        let firstSymbol = this.player[0][1];
        let secondSymbol  = this.player[1][1];
        let currentPlayer = firstSymbol;
        current.textContent = "Turn for " + currentPlayer;
        (currentPlayer === firstSymbol) ?  current.style.color = "#BFCC94" : current.style.color = "#C1292E";

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
    }

    stop(){
        tiles.forEach(tile => {
            tile.textContent = "";
        });
        this.player.length = 0;
    }
}