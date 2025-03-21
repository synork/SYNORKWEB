const cells = document.querySelectorAll('.TicTacToe div');
const message = document.getElementById('message');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleCellClick(index) {
    if (!gameActive || gameBoard[index] !== '') return;

    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    if (checkWin()) {
        message.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (checkDraw()) {
        message.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `It's ${currentPlayer}'s turn`;

    if (currentPlayer === 'O') {
        botMove();
    }
}

function botMove() {
    if (!gameActive) return;

    let emptyCells = [];
    gameBoard.forEach((cell, index) => {
        if (cell === '') {
            emptyCells.push(index);
        }
    });

    if (emptyCells.length > 0) {
        let randomIndex = Math.floor(Math.random() * emptyCells.length);
        let botIndex = emptyCells[randomIndex];

        gameBoard[botIndex] = 'O';
        cells[botIndex].textContent = 'O';

        if (checkWin()) {
            message.textContent = 'O wins!';
            gameActive = false;
            return;
        }

        if (checkDraw()) {
            message.textContent = "It's a draw!";
            gameActive = false;
            return;
        }

        currentPlayer = 'X';
        message.textContent = "It's X's turn";
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function checkDraw() {
    return gameBoard.every(cell => cell !== '');
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

message.textContent = "It's X's turn";
