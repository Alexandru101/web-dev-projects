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
end
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
