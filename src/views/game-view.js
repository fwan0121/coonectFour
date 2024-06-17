class GameView {
    constructor() {
        this.boardElement = document.getElementById('board');
        this.gameStatusElement = document.getElementById('gameStatus');
        this.resetButton = document.getElementById('resetBtn');
    }

    renderBoard(rows, cols) {
        if (!this.boardElement) {
            throw new Error('Element with ID "board" does not exist in the DOM.');
        }
        this.boardElement.innerHTML = '';
        this.boardElement.style.gridTemplateColumns = `repeat(${cols}, 30px)`;

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

    updateBoard(row, col, color) {
        const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        if (cell) {
            cell.style.backgroundColor = color;
            cell.setAttribute('aria-label', color);
        } else {
            console.error(`Cell at row ${row}, col ${col} not found`);
        }
    }

    setGameStatus(message) {
        if (this.gameStatusElement) {
            this.gameStatusElement.textContent = message;
        } else {
            console.warn('Warning: Element with ID "gameStatus" not found');
        }
    }

    showWinner(winner, color) {
        this.setGameStatus(`${winner} ${color} wins!!`);
    }

    renderGameOver() {
        alert('Game is over, please reset');
    }

    renderPlayerState(player) {
        this.setGameStatus(`${player.name} ${player.color}'s turn`);
    }

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