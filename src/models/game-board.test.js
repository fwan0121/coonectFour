import GameBoard from './game-board.js'; 

describe('GameBoard', () => { 
    let gameBoard;

    beforeEach(() => {
        gameBoard = new GameBoard(6,7);
    })
    test('should initalise a board with given rows and cols', () => {
        expect(gameBoard.rows).toBe(6);
        expect(gameBoard.cols).toBe(7);
        expect(gameBoard.board.length).toBe(6);
        expect(gameBoard.board[0].length).toBe(7);
        gameBoard.board.forEach(row => {
            expect(row.length).toBe(7);
        })
    });

    test('should reset the board', () => {
        gameBoard.setCell(0, 0, 'black');
        gameBoard.reset();
        gameBoard.board.forEach(row => {
            row.forEach(cell => {
                expect(cell).toBe(' ');
            })
        })
    })
    
    test('should set and get cell value', () => {
        gameBoard.setCell(0, 0, 'black');
        expect(gameBoard.getCell(0, 0)).toBe('black');
    })

    test('should throw error if getCell out of the range', () => {
        expect(() => gameBoard.getCell(8, 9)).toThrow(new Error('row or col is out of the range'));
    });

    test('should throw error if setCell out of the range', () => {
        expect(() => gameBoard.setCell(8, 9, 'black')).toThrow(new Error('row or col is out of the range'));
    });

    test('should check if a column is full', () => {
        for (let i = 0; i < gameBoard.rows; i++) {
            gameBoard.setCell(i, 0, 'A');
        }
        expect(gameBoard.isFullColumn(0)).toBe(true);
        expect(gameBoard.isFullColumn(2)).toBe(false);
    })
})