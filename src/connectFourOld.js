class GameConfig {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
    }
}

class ConnectFour {
    constructor(config) {
        this.config = config;
        this.board = Array.from({ length: this.config.rows }, () => Array(this.config.cols).fill(' '));
        this.player = 'yellow';
        this.count = 4;
        this.isWin = false;
    }

    initialize() {
        // console.log("Initializing the game board...");
        this.createBoard();
        this.attachEventListeners();
    }


    createBoard() {
        const board = document.getElementById('board');
        if (!board) {
            throw new Error('Element with ID "board" does not exist in the DOM.');
        }

        board.innerHTML = '';
        board.style.gridTemplateColumns = `repeat(${this.config.cols}, 30px)`;

        const fragment = document.createDocumentFragment();
        for (let i = 0; i < this.config.rows; i++) {
            for (let j = 0 ; j < this.config.cols; j++) {
                const cell = document.createElement('div');
                cell.classList = 'cell';
                cell.dataset.row = i.toString();
                cell.dataset.col = j.toString();
                cell.textContent = this.board[i][j];
                fragment.append(cell);
            }
        }
        board.appendChild(fragment);
    }

    attachEventListeners() {
        const board = document.getElementById('board');
        board.addEventListener('click', event => {
            if (this.isWin) {
                alert('game is over, please reset');
                return;
            }
            const cell = event.target;
            if (cell.classList.contains('cell')) {
                const row = parseInt(cell.dataset.row);
                const col = parseInt(cell.dataset.col);
                this.placePlayer(row, col);
            }
        });
        //reset button
        const resetBtn = document.getElementById('resetBtn');
        resetBtn.addEventListener('click',() => this.resetGame());
    }

    placePlayer(row, col) {
        let placed = false;
        let i;
        for (i = this.config.rows - 1; i >= 0; i--) {
            if (this.board[i][col] === ' ') {
                this.board[i][col] = this.player;
                placed = true;
                break;
            }
        }
        if (!placed) {
            alert("Column is full! Please try another one.");
            return;
        }
        this.updateBoard(i, col, this.player);
        if (this.checkWin(i, col, this.player)) {
            document.getElementById('gameStatus').textContent = `${this.player} ${this.player.color} is win!!`;
            this.isWin = true;
            return
        }
        this.switchPlayer();
    }

    updateBoard(row, col, player) {
        const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        cell.style.backgroundColor = player;
    }

    switchPlayer() {
        if (this.player === 'yellow') {
            this.player = 'blue';
        } else {
            this.player = 'yellow';
        }
        document.getElementById('gameStatus').textContent = `Player ${this.player}'s turn`;
    }

    resetGame() {
        this.board = Array.from({ length: this.config.rows }, () => Array(this.config.cols).fill(' '));
        this.player = 'yellow';
        this.createBoard();
        document.getElementById('gameStatus').textContent = `Player ${this.player}'s turn`;
        this.isWin = false;
    }
    
    getPlayer(row, col) { //return player
       return this.board[row][col];
    }

    //check whether one player successfully connect a line -> return boolean
    checkLine(row, col, rowDif, colDif, player) {
        let nRow = row;
        let nCol = col;
        // console.log(nRow,nCol);
        for (let i = 0; i < this.count; i++) {
            if (i > 0) {
                nRow = nRow + rowDif;
                nCol = nCol + colDif;
            }
            if (nRow < 0 || nCol < 0 || nRow >= this.config.rows || nCol >= this.config.cols) {
                return false;
            }
            // console.log(nRow,nCol);
            if (this.getPlayer(nRow,nCol) !== player) {
                return false;
            }
        }
        return true;
    }
    // return whether specific player win or not
    checkWin(row, col, player) {
        //check horizontal
        if (this.checkLine(row, col, 0, 1, player)) {
            return true;
        }
        //check vertical
        if (this.checkLine(row, col, 1, 0, player)) {
            return true;
        }
        // //check diagonal
        if (this.checkLine(row, col, 1, 1, player) || this.checkLine(row, col, 1, -1, player)) {
            return true;
        }
        return false;
    }
}

function startGame() {
    const config = new GameConfig(6, 7);
    const game = new ConnectFour(config);
    game.initialize(); // Call the initialize method

    const gameStatus = document.getElementById('gameStatus');
    if (gameStatus) {
        gameStatus.textContent = 'Player yellow starts the game.';
    } else {
        console.warn('Warning: Element with ID "gameStatus" not found');
    }

    return { game, config };
}

startGame();

export {GameConfig, ConnectFour, startGame};