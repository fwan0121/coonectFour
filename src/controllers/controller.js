class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.currentCol = 0;  // Track the currently selected column for keyboard navigation
        this.init();
    }

    init() {
        this.view.renderBoard(this.model.config.rows, this.model.config.cols);
        this.view.renderPlayerState(this.model.getCurrentPlayer());
        this.attachEventListeners();
        this.view.highlightColumn(this.currentCol);
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
       
        this.view.boardElement.addEventListener('mouseover', event => {
            const cell = event.target;
            if (cell.classList.contains('cell')) {
                const col = parseInt(cell.dataset.col);
                this.view.highlightColumn(col); // Highlight column on mouseover
            }
        });
        
        this.view.boardElement.addEventListener('mouseout', () => {
            this.view.highlightColumn(-1); // Remove highlight on mouseout
        });

        //reset button
        this.view.resetButton.addEventListener('click', () => this.handleReset());
         // Add keyboard event listener
        document.addEventListener('keydown', event => this.handleKeyPress(event));
    }

    
    
    handleKeyPress(event) {
        switch (event.key) {
            case 'ArrowLeft':
                this.currentCol = (this.currentCol - 1 + this.model.config.cols) % this.model.config.cols;
                break;
            case 'ArrowRight':
                this.currentCol = (this.currentCol + 1) % this.model.config.cols;
                break;
            case 'Enter':
                this.handleMove(this.currentCol);
                break;
        }
        this.view.highlightColumn(this.currentCol);
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
        this.view.highlightColumn(this.currentCol);
    }

}


export default Controller;
