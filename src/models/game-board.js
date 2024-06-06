class GameBoard {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.board = Array.from({ length: rows }, () => Array(cols).fill(' '));
    }

    reset(rows, cols) {
        this.board = Array.from({ length: rows }, () => Array(cols).fill(' '));
    }

    getCell(row, col) {
        if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
            throw new Error(`row or col is out of the range`);
        }
        return this.board[row][col];
    }

    setCell(row, col, value) {
        if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
            throw new Error(`row or col is out of the range`);
        }
        this.board[row][col] = value;
    }

    isFullColumn(col) {
        return this.board[0][col] !== ' ';
    }
 }

 export default GameBoard;