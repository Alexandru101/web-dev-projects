# Tic-Tac-Toe-Game Documentation
<img width="985" height="836" alt="image" src="https://github.com/user-attachments/assets/fa50fce6-e6a3-40fb-9cc1-39d116d70783" /><br>
[License](https://github.com/Alexandru101/web-dev-projects/blob/main/LICENSE)
[Website](https://Alexandru101.github.io/web-dev-projects/Tic-Tac-Toe%20Game)

## Step 1: Referencing DOM Elements
The first step is selecting the required HTML elements from the page.

tiles stores all game tiles using querySelectorAll.

resetBtn references the reset button.

info references the element used to display game status messages.

The game status is initially set to "Next Turn: X" so players know who starts first.
```
const tiles = document.querySelectorAll(".tile");
const resetBtn = document.getElementById("reset");
const info = document.getElementById("info");
info.textContent = "Next Turn: X";
```

## Step 2: Declaring Game State Variables
Two variables are used to manage the current game state.

currentPlayer determines whose turn it is.

true represents Player X

false represents Player O

winnerFound tracks whether the game has already been won.
This prevents additional moves once a winner is detected
```
let currentPlayer = true;
let winnerFound = false;
```

## Step 3: Creating the Board and Winning Conditions
The board is represented using an array with 9 positions, matching the 3×3 grid. Each position stores either "X", "O", or an empty string.

The winningCombos array defines all possible winning patterns:

3 horizontal rows

3 vertical columns

2 diagonals

Each combination stores the indexes that must contain the same value for a player to win.
```
let board = ["", "", "", "", "", "", "", "", ""];
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
```

## Step 4: Handling Tile Clicks
The clickHandler() function runs whenever a tile is clicked.

It first identifies the clicked tile and its board index using the dataset attribute. The function then stops execution if:

A winner has already been found

The selected tile is already occupied

The current player’s symbol (X or O) is determined based on currentPlayer.

The board array and the tile’s displayed text are then updated with the current move.
```
function clickHandler(event){
    const tile = event.target;
    const index = tile.dataset.index;

    if (winnerFound || board[index] !== "") { return; }

    const currentMove = currentPlayer ? "X" : "O";

    board[index] = currentMove;
    tile.textContent = currentMove;
```

## Step 5: Checking for a Winner
After each move, the game checks every winning combination.

For each combination, three board positions are compared. If all three contain the same non-empty value, a winner is detected.

The winnerFound variable is updated and the game status message is changed to show which player won.
```
    winningCombos.forEach((combo) => {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]){
            winnerFound = true;
            info.textContent = `Player ${board[a]} Won!`;
        }
    });
```

## Step 6: Detecting a Draw
If all board positions are filled and no winner has been found, the game is declared a draw.

The every() method checks whether all board cells contain a value.

If the game ends in a draw, the status message is updated and further moves are prevented.
```
    const isDraw = !winnerFound && board.every(cell => cell !== "");

    if(isDraw){
        info.textContent = "Game Draw";
        winnerFound = true;
```

## Step 7: Switching Turns
If the game is not over, the turn switches to the other player by toggling currentPlayer.

The status message is updated to show whose turn is next.
```
    } else if (!winnerFound) {
        currentPlayer = !currentPlayer;
        info.textContent = currentPlayer ? "Next Turn: X" : "Next Turn: O";
    }
```

## Step 8: Adding UI Animation Feedback
A short animation is applied to the status message whenever it updates.
The popup_animation class is added temporarily and then removed after a short delay.
```
    info.classList.add("popup_animation");
    setTimeout(() => {
        info.classList.remove("popup_animation");
    }, 150);
}
```

## Step 9: Attaching Click Events to Tiles
Each tile is given a click event listener that calls clickHandler().
This allows players to interact with the board.
```
tiles.forEach(tile => {
    tile.addEventListener("click", clickHandler);
})
```

## Step 10: Resetting the Game
The reset button restores the game to its initial state.

The current player is set back to X, the winner state is cleared, and the board array is reset.
All tile text is removed and the status message returns to "Next Turn: X".

A short animation is also applied to the status message to provide visual feedback.
```
resetBtn.addEventListener("click", () => {
    currentPlayer = true;
    winnerFound = false;
    board = ["", "", "", "", "", "", "", "", ""];

    tiles.forEach(tile => {
        tile.textContent = "";
    })

    info.textContent = "Next Turn: X";
    info.classList.add("popup_animation");
    setTimeout(() => {
        info.classList.remove("popup_animation");
    }, 150);
})
```


## Setup Instructions

- Download [Visual Studio Code](https://code.visualstudio.com/) and make sure to have "Live Server" extension installed
- Create a folder for the project and make sure to change the html '<head>' stylesheet "href" suitable for your projects file names (eg what you have named instead of style.css and index.js)
- Create three files within that folder for index.html, index.js and style.css.
- Copy and paste all the code for each of these files that can be found within this project
- Press "Go Live" at the bottom of your visual studio code (IDE)
