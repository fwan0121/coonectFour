/**
 * @class GameView
 * @classdesc This class represents the view for the Connect Four game, managing the UI.
 */
class GameView {
    constructor() {
        this.boardElement = document.getElementById('board');
        this.gameStatusElement = document.getElementById('gameStatus');
        this.resetButton = document.getElementById('resetBtn');
    }

    /**
     * Renders the game board.
     * @param {number} rows - The number of rows in the board.
     * @param {number} cols - The number of columns in the board.
     */
    renderBoard(rows, cols) {
        if (!this.boardElement) {
            throw new Error('Element with ID "board" does not exist in the DOM.');
        }
        this.boardElement.innerHTML = '';
        this.boardElement.style.gridTemplateColumns = `repeat(${cols}, 35px)`;

        const fragment = document.createDocumentFragment();
        for (let i = 0; i < rows; i++) {
            for (let j = 0 ; j < cols; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = i.toString();
                cell.dataset.col = j.toString();
                cell.setAttribute('role', 'gridcell');
                cell.setAttribute('aria-label', 'empty');
                cell.textContent = ' ';
                fragment.append(cell);
            }
        }
        this.boardElement.appendChild(fragment);
    }

    /**
     * Updates the board with the player's move.
     * @param {number} row - The row index of the move.
     * @param {number} col - The column index of the move.
     * @param {string} color - The color of the player's disc.
     */
    updateBoard(row, col, color) {
        const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        if (cell) {
            cell.style.backgroundColor = color;
            cell.setAttribute('aria-label', color);
        } else {
            console.error(`Cell at row ${row}, col ${col} not found`);
        }
    }

    /**
     * Sets the game status message.
     * @param {string} message - The status message to display.
     */
    setGameStatus(message) {
        if (this.gameStatusElement) {
            this.gameStatusElement.textContent = message;
        } else {
            console.warn('Warning: Element with ID "gameStatus" not found');
        }
    }

    /**
     * Displays the winner of the game.
     * @param {string} winner - The name of the winning player.
     * @param {string} color - The color of the winning player's discs.
     */
    showWinner(winner, color) {
        this.setGameStatus(`${winner} ${color} wins!!`);
    }

    /**
     * Renders the game over message.
     */
    renderGameOver() {
        alert('Game is over, please reset');
    }

    /**
     * Renders the current player's turn.
     * @param {Object} player - The current player.
     */
    renderPlayerState(player) {
        this.setGameStatus(`${player.name} ${player.color}'s turn`);
    }

    /**
     * Clears the game board.
     */
    clearBoard() {
        if(this.boardElement) {
            const cells = this.boardElement.querySelectorAll('.cell');
            cells.forEach(cell => {
                cell.style.backgroundColor = 'white';
                cell.setAttribute('aria-label', 'empty');
                cell.textContent = ' ';
            });
        }
    }

    /**
     * Highlights the column where the player place a disc.
     * @param {number} col - The column index to highlight.
     */
    highlightColumn(col) {
        const cells = this.boardElement.querySelectorAll('.cell');
        cells.forEach(cell => {
            if (parseInt(cell.dataset.col) === col) {
                cell.classList.add('highlighted-column');
            } else {
                cell.classList.remove('highlighted-column');
            }
        });
    }    
    
}

export default GameView;