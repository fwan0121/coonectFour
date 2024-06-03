import GameConfig from './models/game-config.js';
import GameBoard from './models/game-board.js';
import Player from './models/player.js';
import ConnectFourModel from './models/connectfour-model.js';
import GameView from './views/game-view.js';
import ConnectFourController from './controllers/controller.js';

function startGame() {
    const config = new GameConfig();
    const board = new GameBoard(config.rows, config.cols);
    const players = [
        new Player('Player 1', 'yellow'),
        new Player('Player 2', 'blue')
    ];
    const model = new ConnectFourModel(config, board, players);
    const view = new GameView();
    const controller = new ConnectFourController(model, view);
}

startGame();