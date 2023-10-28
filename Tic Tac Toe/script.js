const board = document.getElementById('board');
const message = document.getElementById('message');
const cells = document.querySelectorAll('.cell[data-cell]');
const result = document.getElementById('result');
const winMessage = document.getElementById('win-message');
const drawMessage = document.getElementById('draw-message');
const newGameButton = document.getElementById('new-game-button');

let currentPlayer = 'X';
let gameOver = false;

// Create the Tic-Tac-Toe grid
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Handle a cell click
function handleCellClick(event) {
    const cell = event.target;

    if (cell.textContent === '' && !gameOver) {
        cell.textContent = currentPlayer;
        checkWinner(currentPlayer);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Check for a winner
function checkWinner(player) {
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

    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (cells[a].textContent === player && cells[b].textContent === player && cells[c].textContent === player) {
            message.textContent = '';
            winMessage.textContent = `Player ${player} wins!`;
            result.style.display = 'block';
            gameOver = true;
            return;
        }
    }

    if ([...cells].every(cell => cell.textContent !== '')) {
        message.textContent = '';
        drawMessage.textContent = "It's a draw!";
        result.style.display = 'block';
        gameOver = true;
    }
}

// New game button click event
newGameButton.addEventListener('click', () => {
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
    gameOver = false;
    result.style.display = 'none';
    message.textContent = `Player X's turn`;
});
