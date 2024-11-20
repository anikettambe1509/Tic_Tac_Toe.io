const board = document.getElementById('board');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset-btn');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal 1
  [2, 4, 6], // Diagonal 2
];

// Create the board cells
function createBoard() {
  board.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-cell-index', i);
    board.appendChild(cell);
  }
}

createBoard();

// Check for winner
function checkWinner() {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      gameActive = false;
      statusDisplay.textContent = `Player ${gameState[a]} Wins!`;
      return true;
    }
  }

  if (!gameState.includes('')) {
    gameActive = false;
    statusDisplay.textContent = `It's a Draw!`;
    return true;
  }

  return false;
}

// Handle cell click
board.addEventListener('click', (e) => {
  if (!gameActive) return;

  const clickedCell = e.target;
  const cellIndex = clickedCell.getAttribute('data-cell-index');

  if (!clickedCell.classList.contains('cell') || gameState[cellIndex]) return;

  gameState[cellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  clickedCell.classList.add('taken');

  if (!checkWinner()) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
  }
});

// Reset the game
resetButton.addEventListener('click', () => {
  gameActive = true;
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  statusDisplay.textContent = `Player X's Turn`;
  createBoard();
});
