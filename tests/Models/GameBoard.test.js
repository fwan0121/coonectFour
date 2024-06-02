import GameBoard from '../../src/Models/GameBoard.js'; 

describe('GameBoard', () => { 
    test('should create a Game board with empty array', () => {
        const gameBoard = new GameBoard();
        expect(gameBoard.board).toEqual([]);
        expect(gameBoard.rols).toBe(undefined);
        expect(gameBoard.cols).toBe(undefined);
    });
    
})