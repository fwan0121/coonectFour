import GameBoard from 'game-board.js'; 

describe('GameBoard', () => { 
    test('should create a Game board with empty array', () => {
        const gameBoard = new GameBoard();
        expect(gameBoard.board).toEqual([]);
        expect(gameBoard.rols).toBe(undefined);
        expect(gameBoard.cols).toBe(undefined);
    });
    
    test('should check whether a column is full', () => {
        const gameBoard = new GameBoard(6, 7);
        expect(gameBoard.isFullColumn(0)).toBe(false);
        for (let i = 0; i < 6; i++) {
            gameBoard.setCell(i, 0, 'yelllow' );
        }
        expect(gameBoard.isFullColumn(0)).toBe(true);
    })
})