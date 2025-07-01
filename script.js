
const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = false;
let mode = '';

function setMode(selectedMode) {
    mode = selectedMode;
    resetGame();
    statusElement.innerText = "X's turn";
    gameActive = true;
}

function renderBoard() {
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.className = 'cell';
        cellElement.innerText = cell || '';
        cellElement.addEventListener('click', () => handleMove(index));
        boardElement.appendChild(cellElement);
    });
}

function handleMove(index) {
    if (!gameActive || board[index]) return;
    board[index] = currentPlayer;
    renderBoard();
    if (checkWinner()) {
        statusElement.innerText = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    } else if (board.every(cell => cell)) {
        statusElement.innerText = "It's a draw!";
        gameActive = false;
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusElement.innerText = `${currentPlayer}'s turn`;

    if (mode === 'computer' && currentPlayer === 'O') {
        setTimeout(computerMove, 500);
    }
}

function computerMove() {
    let emptyIndices = board.map((v, i) => v === null ? i : null).filter(v => v !== null);
    let move = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    handleMove(move);
}

function checkWinner() {
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];
    return winPatterns.some(pattern => 
        pattern.every(index => board[index] === currentPlayer)
    );
}

function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    gameActive = true;
    renderBoard();
    statusElement.innerText = `${currentPlayer}'s turn`;
}

renderBoard();
