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
            this.gameStatusElement.setAttribute('aria-live', 'polite');
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
        this.gameStatusElement.setAttribute('role', 'alert');
        this.gameStatusElement.setAttribute('aria-live', 'assertive');
        this.gameStatusElement.focus();
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
     * Announces the move for screen readers.
     * @param {string} message - The message to announce.
     */
    announceMove(message) {
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'assertive');
        liveRegion.setAttribute('role', 'alert');
        liveRegion.style.position = 'absolute';
        liveRegion.style.left = '-9999px';
        liveRegion.style.height = '1px';
        liveRegion.style.width = '1px';
        liveRegion.textContent = message;
        document.body.appendChild(liveRegion);

        // Remove the live region after announcing
        setTimeout(() => {
            document.body.removeChild(liveRegion);
        }, 1000);
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
        let highlighted = false;
        cells.forEach(cell => {
            if (parseInt(cell.dataset.col) === col) {
                cell.classList.add('highlighted-column');
                highlighted = true;
            } else {
                cell.classList.remove('highlighted-column');
            }
        });
        if (highlighted) {
            this.announceMove(`you are in column ${col + 1}`);
        }
    }

}

export default GameView;