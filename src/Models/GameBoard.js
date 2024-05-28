import GameConfig from './GameConfig';
import Player from './player';

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
        return this.board[row][col];
    }

    setCell(row, col, value) {
        this.board[row][col] = value;
    }

    isFullColumn(col) {
        return this.board[0][col] !== ' ';
    }
 }

 export default GameBoard;