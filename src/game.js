const tiles = document.querySelectorAll('.tile');

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
                winner = first;
                return;
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
        let firstSymbol = this.player[0].symbol;
        let secondSymbol  = this.player[1].symbol;
        let currentPlayer = firstSymbol;

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

                let win = winner(tileArray);

                currentPlayer = (currentPlayer === firstSymbol) ? secondSymbol : firstSymbol;
            });
        });
    }

    stop(){
        tiles.forEach(tile => {
            tile.textContent = "";
        });
    }
}