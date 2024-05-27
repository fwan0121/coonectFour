import GameConfig from './GameConfig';
import Player from './player';

class GameBoard {
    constructor() {
        this.config = new GameConfig();
        this.board = Array.from({ length: this.config.rows }, () => Array(this.config.cols).fill(' '));
        this.player = new Player();
        this.count = 4;
    }
}