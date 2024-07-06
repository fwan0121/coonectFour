/**
 * @class GameConfig
 * @classdesc This class represents the configuration settings for the Connect Four game.
 */
class GameConfig {
    /**
     * @constructor
     * @param {number} [rows=6] - The number of rows in the board.
     * @param {number} [cols=7] - The number of columns in the board.
     */
    constructor(rows = 6, cols = 7) {
        this.rows = rows;
        this.cols = cols;
    }
}

export default GameConfig;