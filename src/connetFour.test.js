/**
 * @jest-environment jsdom
 */

const { GameConfig, ConnectFour, startGame } = require('./src/connectFour'); 
describe('createBoard', () => {
    let game;
    beforeEach(() => {
        // Set up the DOM environment
        document.body.innerHTML = `
            <div id="board"></div>
            <div id="gameStatus"></div>
            <button id="resetBtn">Reset Game</button>
        `;
        const config = new GameConfig(6, 7);
        game = new ConnectFour(config);
    });

    test('test board is created', () => {
        game.initialize();
        const cells = document.querySelectorAll('.cell');
        let rows = startGame().config.rows;
        let cols = startGame().config.cols;
        expect(cells.length).toBe(rows * cols);
    });
    
    test('throws an error if "board" element does not exist', () => {
        document.body.innerHTML = '';
        expect(() => game.createBoard()).toThrow('Element with ID "board" does not exist in the DOM.');
    });

})


