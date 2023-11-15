let playerScore = 0;
let computerScore = 0;
const cells = document.querySelectorAll('.cell');
const playerScoreEl = document.getElementById('playerScore');
const computerScoreEl = document.getElementById('computerScore');
const winnerOverlay = document.getElementById('winnerOverlay');
const winnerMessage = document.getElementById('winnerMessage');
const resetButton = document.getElementById('resetButton');

resetButton.addEventListener('click', resetScores);

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick, { once: true });
});

function handleCellClick(e) {
    const cell = e.target;
    cell.innerText = 'X';
    if (checkWin('X')) {
        playerScore++;
        endGame('You Win!');
    } else if (isBoardFull()) {
        endGame('Draw');
    } else {
        computerTurn();
    }
}

function computerTurn() {
    let emptyCells = Array.from(cells).filter(c => c.innerText === '');
    let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.innerText = 'O';
    if (checkWin('O')) {
        computerScore++;
        endGame('Computer Wins');
    } else if (isBoardFull()) {
        endGame('Draw');
    }
}

function checkWin(player) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].innerText === player;
        });
    });
}

function isBoardFull() {
    return Array.from(cells).every(cell => {
        return cell.innerText === 'X' || cell.innerText === 'O';
    });
}

function endGame(message) {
    winnerMessage.innerText = message;
    winnerOverlay.style.display = 'flex';
    updateScores();
}

function startGame() {
    cells.forEach(cell => {
        cell.innerText = '';
        cell.addEventListener('click', handleCellClick, { once: true });
    });
    winnerOverlay.style.display = 'none';
}

function resetScores() {
    playerScore = 0;
    computerScore = 0;
    updateScores();
    startGame();
}

function updateScores() {
    playerScoreEl.innerText = `You: ${playerScore}`;
    computerScoreEl.innerText = `Computer: ${computerScore}`;
}

startGame();
