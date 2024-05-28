import GameConfig from './GameConfig';
import GameBoard from './GameBoard';
import Player from './player';

class ConnectFour {
    constructor() {
        this.config = new GameConfig();
        this.board = new GameBoard(this.config.rows, this.config.cols);
        this.players = [
            new Player('Player 1', 'yellow'),
            new Player('Player 2', 'blue')
        ];
        this.currentPlayerIndex = 0;
        this.count = 4;
        this.isWin = false;
    }

    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }

    switchPlayer() {
        this.currentPlayerIndex = 1 - this.currentPlayerIndex;
    }

}