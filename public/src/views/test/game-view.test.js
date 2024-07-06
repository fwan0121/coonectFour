import GameView from '../game-view.js';
import { screen } from '@testing-library/dom';


describe('GameView', () => {
    let view;

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="board" data-testid="board"></div>
            <div id="gameStatus" data-testid="gameStatus"></div>
            <button id="resetBtn">Reset</button>
        `;
        view = new GameView();
    });

    test('should render the board correctly', () => {
        view.renderBoard(6, 7);
        const cells = screen.getAllByRole('gridcell', { name: 'empty' });
        expect(cells.length).toBe(42);

        // Ensure boardElement contains the fragment with cells
        const board = screen.getByTestId('board');
        expect(board).toBeInTheDocument();
    });

    test('should update the board and color correctly', () => {
        view.renderBoard(6, 7);
        view.updateBoard(0, 0, 'red');
        const cell = screen.getByRole('gridcell', { name: 'red' });
        expect(cell).toHaveStyle('background-color: red');
    });

    test('should set game status correctly', () => {
        view.setGameStatus(`Player 1 yellow's turn`);
        const gameStatus = screen.getByText(`Player 1 yellow's turn`);
        expect(gameStatus).toBeInTheDocument();
    });

    test('should show winner correctly', () => {
        view.showWinner('Player 1', 'yellow');
        const gameStatus = screen.getByText('Player 1 yellow wins!!');
        expect(gameStatus).toBeInTheDocument();
    });

    test('should render alert when the game over', () => {
        jest.spyOn(window, 'alert').mockImplementation(() => {});
        view.renderGameOver();
        expect(window.alert).toHaveBeenCalledWith('Game is over, please reset');
    });

    test('should render player state correctly', () => {
        view.renderPlayerState({ name: 'Player 1', color: 'red' });
        const gameStatus = screen.getByText("Player 1 red's turn");
        expect(gameStatus).toBeInTheDocument();
    });

    test('should clear the board correctly', () => {
        view.renderBoard(6, 7);
        view.updateBoard(0, 0, 'red');
        view.clearBoard();
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
          expect(cell).toHaveStyle('background-color: white');
          expect(cell).toHaveTextContent('');
        });
      });
    

})