/**
 * @class GameBoard
 * @classdesc This class represents the game board for Connect Four.
 */
class GameBoard {
    /**
     * @constructor
     * @param {number} rows - The number of rows in the board.
     * @param {number} cols - The number of columns in the board.
     */
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.board = Array.from({ length: rows }, () => Array(cols).fill(' '));
    }

    /**
     * Resets the game board.
     */
    reset(rows, cols) {
        this.board = Array.from({ length: rows }, () => Array(cols).fill(' '));
    }

    /**
     * Gets the value of the cell at the specified row and column.
     * @param {number} row - The row index.
     * @param {number} col - The column index.
     * @returns {string} - The value of the cell.
     * @throws {Error} - If the row or column is out of range.
     */
    getCell(row, col) {
        if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
            throw new Error(`row or col is out of the range`);
        }
        return this.board[row][col];
    }

    /**
     * Sets the value of the cell at the specified row and column.
     * @param {number} row - The row index.
     * @param {number} col - The column index.
     * @param {string} value - The value to set in the cell.
     * @throws {Error} - If the row or column is out of range.
     */
    setCell(row, col, value) {
        if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
            throw new Error(`row or col is out of the range`);
        }
        this.board[row][col] = value;
    }

    /**
     * Checks if the specified column is full.
     * @param {number} col - The column index.
     * @returns {boolean} - True if the column is full, false otherwise.
     */
    isFullColumn(col) {
        return this.board[0][col] !== ' ';
    }
 }

 export default GameBoard;