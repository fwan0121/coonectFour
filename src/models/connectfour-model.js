/**
 * @class ConnectFourModel
 * @classdesc This class represents the model for the Connect Four game, managing the game state.
 */
class ConnectFourModel {

    /**
     * @constructor
     * @param {Object} config - The game configuration.
     * @param {Object} board - The game board.
     * @param {Array} players - The list of players.
     */
    constructor(config, board, players) {
        this.config = config;
        this.board = board;
        this.players = players;
        this.currentPlayerIndex = 0;
        this.count = 4;
        this.isWin = false;
    }

    /**
     * Gets the current player.
     * @returns {Object} The current player.
     */
    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }

    /**
     * Switches to the next player.
     */
    switchPlayer() {
        this.currentPlayerIndex = 1 - this.currentPlayerIndex;
    }

    /**
     * Places the current player's disc in the specified column.
     * @param {number} col - The column index.
     * @returns {Object|null} The result of the move or null if the column is full.
     */
    placePlayer(col) {
        let placed = this.board.isFullColumn(col);
        let row;
        if (placed) {
            return null;
        } else {
            for (row = this.config.rows - 1; row >= 0; row--) { 
                if (this.board.getCell(row, col) === " ") {
                    this.board.setCell(row, col, this.getCurrentPlayer().color);
                    return { row, col, player: this.getCurrentPlayer() };
                }
            }
        }
        return null;
    }

    /**
     * Resets the game state.
     */
    resetGame() {
        this.board.reset(this.config.rows, this.config.cols);
        this.currentPlayerIndex = 0;
        this.isWin = false;
    }

    /**
     * Checks if there are `this.count = 4 ` consecutive pieces of the given player 
     * in a line starting from (row, col) in the direction specified by (rowDif, colDif).
     * 
     * @param {number} row - The starting row index.
     * @param {number} col - The starting column index.
     * @param {number} rowDif - The row difference for each step in the line.
     * @param {number} colDif - The column difference for each step in the line.
     * @param {Object} player - The player object containing the color of the player's pieces.
     * @returns {boolean} - True if there are `this.count = 4 ` consecutive pieces of the given player, false otherwise.
     */

    checkLine(row, col, rowDif, colDif, player) {
        let nRow = row;
        let nCol = col;

        for (let i = 0; i < this.count; i++) {
            if (i > 0) {
                nRow += rowDif;
                nCol += colDif;
            }

            if (nRow < 0 || nCol < 0 || nRow >= this.config.rows || nCol >= this.config.cols) {
                return false;
            }

            if(this.board.getCell(nRow,nCol) !== player.color) {
                return false;
            }
        }
        return true;
    }

    /**
     * Checks if the given player has won the game starting from the given cell.
     * This checks for horizontal, vertical, diagonal, and anti-diagonal lines.
     * 
     * @param {number} row - The starting row index.
     * @param {number} col - The starting column index.
     * @param {Object} player - The player object containing the color of the player's pieces.
     * @returns {boolean} - True if the player has won, false otherwise.
     */

    checkWin(row, col, player) {
         //check horizontal
         if (this.checkLine(row, col, 0, 1, player) || this.checkLine(row, col, 0, -1, player)){
            return true;
        }
        //check vertical
        if (this.checkLine(row, col, 1, 0, player) || this.checkLine(row, col, -1, 0, player)) {
            return true;
        }
        // check diagonal bottom-left to top-right
        if (this.checkLine(row, col, 1, 1, player) || this.checkLine(row, col, -1, 1, player)) {
            return true;
        }
        // check diagonal bottom-right to top-left
        if (this.checkLine(row, col, 1, -1, player) || this.checkLine(row, col, -1, -1, player)) {
            return true;
        }
        return false;
    }

}

export default ConnectFourModel;


// folder use lowercase