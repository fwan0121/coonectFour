import ConnectFourModel from '../Models/ConnectFourModel';
import GameView from '../Views/GameView';

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init();
    }

    init() {
        this.view.renderBoard(this.model.config.rows, this.model.config.cols);
        this.view.renderPlayerState(this.model.getCurrentPlayer());
        this.attachEventListeners();
    }

    attachEventListeners() {
        this.view.boardElement.addEventListener('click', event => {
            if(this.model.isWin) {
                this.view.renderGameOver();
                return;
            }
            const cell = event.target;
            if(cell.classList.contains('cell')) {
                const col = parseInt(cell.dataset.col);
                this.handleMove(col);
            }
        })
        //reset button
        this.view.resetButton.addEventListener('click', () => this.handleReset());
    }

    handleMove(col) {
        const result = this.model.placePlayer(col);
        if (!result) {
            alert("Column is full! Please try another one.");
            return;
        }

        this.view.updateBoard(result.row, result.col, result.player.color);
        if (this.model.checkWin(result.row, result.col, result.player)) {
            this.view.showWinner(result.player.name, result.player.color);
            this.model.isWin = true;
            return;
        }
        this.model.switchPlayer();
        this.view.renderPlayerState(this.model.getCurrentPlayer());
    }

    handleReset() {
        this.model.resetGame();
        this.view.clearBoard();
        this.view.renderBoard(this.model.config.rows, this.model.config.cols);
        this.view.renderPlayerState(this.model.getCurrentPlayer());
    }

}


export default Controller;
