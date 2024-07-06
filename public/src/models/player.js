/**
 * @class Player
 * @classdesc This class represents a player in the Connect Four game.
 */
class Player {
    /**
     * @constructor
     * @param {string} name - The name of the player.
     * @param {string} color - The color of the player's discs.
     */
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
}

export default Player