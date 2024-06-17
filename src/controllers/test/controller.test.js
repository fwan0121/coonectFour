// This is only for demo internal test by using spyOn

import ConnectFourModel from '../../models/connectfour-model.js';
import GameBoard from '../../models/game-board.js';
import Player from '../../models/player.js';
import GameView from '../../views/game-view.js';
import ConnectFourController from '../controller.js';
import GameConfig from '../../models/game-config.js'

jest.mock('../../models/game-config.js');
jest.mock('../../models/game-board.js');
jest.mock('../../models/player.js');
jest.mock('../../models/connectfour-model.js');
jest.mock('../../views/game-view.js');

describe('ConnnectFourcontroller', () => {
    let config;
    let board;
    let players;
    let model;
    let view;
    let controller;

    beforeEach(() => {
        //Set up the HTML for testing
        document.body.innerHTML = `
            <div id="board"></div>
            <div id="gameStatus"></div>
            <button id="resetBtn">Reset</button>
        `;

        //Initialise mock implementations with default values
        GameConfig.mockImplementation(() => ({
            rows: 6,
            cols: 7,
        }));

        GameBoard.mockImplementation((rows, cols) => ({
            rows: rows,
            cols: cols,
            board: Array.from({ length: rows }, () => Array(cols).fill(' '))
        }));

        Player.mockImplementation((name, color) => ({
            name: name,
            color: color
        }));

        ConnectFourModel.mockImplementation((config, board, players) => ({
            config: config,
            board: board,
            players: players,
            isWin: false,
            getCurrentPlayer: jest.fn().mockReturnValue(players[0]),
            placePlayer: jest.fn(),
            checkWin: jest.fn(),
            switchPlayer: jest.fn(),
            resetGame: jest.fn()
        }));

        GameView.mockImplementation(() => ({
            boardElement: document.getElementById('board'),
            gameStatusElement: document.getElementById('gameStatus'),
            resetButton: document.getElementById('resetBtn'),
            renderBoard: jest.fn(),
            renderPlayerState: jest.fn(),
            updateBoard: jest.fn(),
            showWinner: jest.fn(),
            clearBoard: jest.fn(),
            renderGameOver: jest.fn()
        }));


        config = new GameConfig(6, 7);
        board = new GameBoard(config.rows, config.cols);
        players = [
            new Player('Player 1', 'yellow'),
            new Player('Player 2', 'blue')
        ];
        model = new ConnectFourModel(config, board, players);
        view = new GameView();

        view.boardElement = document.getElementById('board');
        view.gameStatusElement = document.getElementById('gameStatus');
        view.resetButton = document.getElementById('resetBtn');

        controller = new ConnectFourController(model, view);
        
    })

    test('should initalise the game', () => {
        jest.spyOn(view, 'renderBoard');
        jest.spyOn(view, 'renderPlayerState');
        jest.spyOn(view.boardElement, 'addEventListener');
        jest.spyOn(view.resetButton, 'addEventListener');

        controller.init();

        expect(view.renderBoard).toHaveBeenCalledWith(config.rows, config.cols);
        expect(view.renderPlayerState).toHaveBeenCalledWith(model.getCurrentPlayer());
        expect(view.boardElement.addEventListener).toHaveBeenCalledTimes(1);
        expect(view.resetButton.addEventListener).toHaveBeenCalledTimes(1);
    })

    test('should handle attachment on board element', () => {
        jest.spyOn(view.boardElement, 'addEventListener');
        jest.spyOn(view.resetButton, 'addEventListener');

        controller.attachEventListeners();

        expect(view.boardElement.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
        expect(view.resetButton.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
    })

    test('should handle player move on the board', () => {
        const col = 0;
        const result = { row: 5, col: 0, player: players[0] };
        jest.spyOn(model, 'placePlayer').mockReturnValue(result);
        jest.spyOn(view, 'updateBoard');
        jest.spyOn(model, 'checkWin').mockReturnValue(false);
        jest.spyOn(view, 'renderPlayerState');

        controller.handleMove(col);

        expect(model.placePlayer).toHaveBeenCalledWith(col);
        expect(view.updateBoard).toHaveBeenCalledWith(result.row, result.col, result.player.color);
        expect(model.checkWin).toHaveBeenCalledWith(result.row, result.col, result.player);
        expect(view.renderPlayerState).toHaveBeenCalledWith(model.getCurrentPlayer());
    })

    test('should update the board and show winner if a player wins', () => {
        const col = 0;
        const result = { row: 5, col: 0, player: players[0] };
        jest.spyOn(view, 'updateBoard');
        jest.spyOn(view, 'showWinner');
        jest.spyOn(model, 'placePlayer').mockReturnValue(result);
        jest.spyOn(model, 'checkWin').mockReturnValue(true);

        controller.handleMove(col);

        expect(view.updateBoard).toHaveBeenCalledWith(result.row, result.col, result.player.color);
        expect(view.showWinner).toHaveBeenCalledWith(result.player.name, result.player.color);
        expect(model.isWin).toBe(true);
    });

    test('should handle reset and initalise the game', () => {
        jest.spyOn(model, 'resetGame');
        jest.spyOn(view, 'clearBoard');
        jest.spyOn(view, 'renderBoard');
        jest.spyOn(view, 'renderPlayerState');

        controller.handleReset();

        expect(model.resetGame).toHaveBeenCalled();
        expect(view.clearBoard).toHaveBeenCalled();
        expect(view.renderBoard).toHaveBeenCalledWith(config.rows, config.cols);
        expect(view.renderPlayerState).toHaveBeenCalledWith(model.getCurrentPlayer());
    })
})