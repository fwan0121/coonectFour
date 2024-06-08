import fs from 'fs';
import path from 'path';
import GameConfig from './game-config.js';
import GameBoard from './game-board.js';
import Player from './player.js';
import ConnectFourModel from './connectfour-model.js';

const readBoardFromFile = (filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const rows = fileContent.trim().split('\n').map(row => row.trim().split(' '));
    return rows;
};

const setBoardState = (board, state) => {
    for (let row = 0; row < state.length; row++) {
        for (let col = 0; col < state[row].length; col++) {
            const value = state[row][col];
            if (value === '1') {
                board.setCell(row, col, 'yellow');
            } else if (value === '2') {
                board.setCell(row, col, 'blue');
            }
        }
    }
};

describe('ConnectFourModel', () => {
    let config;
    let gameboard;
    let players;
    let model;
    let count = 4;

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
        expect(model.getCurrentPlayer()).toBe(players[1]);
        model.switchPlayer();
        expect(model.getCurrentPlayer()).toBe(players[0]);
    });
    
    test('should place a player on the board', () => {
        const res = model.placePlayer(1);
        expect(res.row).toBe(5); // to the buttom of the row
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

    describe('checkWin', () => {
        test('should check horizontal win', () => {
            const boardState = readBoardFromFile(path.resolve(__dirname, '../file/horizontal-01.txt'));
            setBoardState(model.board, boardState);
            const res = model.checkWin(5, 0, players[0]);
            expect(res).toBe(true);
        })

        test('should check vertical line', () => {
            const boardState = readBoardFromFile(path.resolve(__dirname, '../file/vertical-01.txt'));
            setBoardState(model.board, boardState);
            const res = model.checkWin(5, 1, players[0]);
            expect(res).toBe(true);
        });

        test('should check diagonal win bottom-left to top-right', () => {
            const boardState = readBoardFromFile(path.resolve(__dirname, '../file/diagonal-bltr-01.txt'));
            setBoardState(model.board, boardState);
            const res = model.checkWin(5, 0, players[0]);
            expect(res).toBe(true);
        });
        
        test('should check diagonal win top-left to bottom-right', () => {
            const boardState = readBoardFromFile(path.resolve(__dirname, '../file/diagonal-bltr-01.txt'));
            setBoardState(model.board, boardState);
            const res = model.checkWin(2, 3, players[0]);
            expect(res).toBe(true);
        });
        
        test('should check diagonal win bottom-right to top-left', () => {
            const boardState = readBoardFromFile(path.resolve(__dirname, '../file/diagonal-brtl-01.txt'));
            setBoardState(model.board, boardState);
            const res = model.checkWin(5, 4, players[0]);
            expect(res).toBe(true);
        });
        
        test('should check diagonal win top-right to bottom-left', () => {
            const boardState = readBoardFromFile(path.resolve(__dirname, '../file/diagonal-brtl-01.txt'));
            setBoardState(model.board, boardState);
            const res = model.checkWin(2, 1, players[0]);
            expect(res).toBe(true);
        });
  

    })

})