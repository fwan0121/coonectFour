import GameConfig from './game-config.js';
import GameBoard from './game-board.js';
import Player from './player.js';
import ConnectFourModel from './connectfour-model.js';

describe('ConnectFourModel', () => {
    let config;
    let gameboard;
    let players;
    let model;

    beforeEach(() => {
        config = new GameConfig(6, 7);
        gameboard = new GameBoard(config.rows, config.cols);
        players = [
        new Player('Player 1', 'yellow'),
        new Player('Player 2', 'blue')
        ];
        model = new ConnectFourModel(config, gameboard, players);
    });
    test('should initalise the model with given cofig, gameboard, and player', () => {
        expect(model.config.rows).toBe(6);
        expect(model.config.cols).toBe(7);
        expect(model.board).toBe(gameboard);
        expect(model.players[0].name).toBe('Player 1');
        expect(model.players[1].name).toBe('Player 2');
        expect(model.currentPlayerIndex).toBe(0);
        expect(model.isWin).toBe(false);
    })
    
    test('should get current player', () => {
        expect(model.getCurrentPlayer().name).toBe('Player 1');
    });

    test('should get current player after switchPlayer', () => {
        model.switchPlayer();
        expect(model.getCurrentPlayer().name).toBe('Player 2');
        model.switchPlayer();
        expect(model.getCurrentPlayer().name).toBe('Player 1');
    });
    
    test('should place a player on the board', () => {
        const res = model.placePlayer(1);
        expect(res.row).toBe(5);
        expect(res.col).toBe(1);
        expect(res.player.name).toBe('Player 1');
        expect(res.player.color).toBe('yellow');
    });

    test('should return null when place a player on the full column', () => {
        for (let i = 0; i < config.rows; i++) {
            model.placePlayer(2);
        }
        const res = model.placePlayer(2);
        expect(res).toBeNull();
    });

    test('should reset the game', () => {
        model.placePlayer(4);
        model.placePlayer(2);
        model.placePlayer(0);
        model.resetGame();
        expect(model.isWin).toBeFalsy();
        expect(model.getCurrentPlayer()).toBe(players[0]);
        for (let row = 0; row < config.rows; row++) {
            for (let col = 0; col < config.cols; col++) {
                expect(model.board.getCell(row, col)).toBe(' ');
            }
        }
    });

})