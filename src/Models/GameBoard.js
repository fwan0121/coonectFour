import GameConfig from './GameConfig';
import Player from './player';

class GameBoard {
    constructor() {
        this.board = Array.from({ length: this.config.rows }, () => Array(this.config.cols).fill(' '));
    }

    reset() {
        this.board = Array.from({ length: this.config.rows }, () => Array(this.config.cols).fill(' '));
    }

    getCell(row, col) {
        return this.board[row, col];
    }

    setCell(row, col, value) {
        this.board[row, col] = value;
    }

    isFullColumn(col) {
        return this.board[0][col] !== ' ';
    }
 }