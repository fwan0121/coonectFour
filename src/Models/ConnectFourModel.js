import GameConfig from './GameConfig';
import GameBoard from './GameBoard';
import Player from './player';

class ConnectFourModel {
    constructor() {
        this.config = new GameConfig();
        this.board = new GameBoard(this.config.rows, this.config.cols);
        this.players = [
            new Player('Player 1', 'yellow'),
            new Player('Player 2', 'blue')
        ];
        this.currentPlayerIndex = 0;
        this.count = 4;
        this.isWin = false;
    }

    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }

    switchPlayer() {
        this.currentPlayerIndex = 1 - this.currentPlayerIndex;
    }
    
    placePlayer(col) {
        let placed = this.board.isFullColumn(col);
        let row;
        for (row = this.config.rows - 1; row >= 0; row--) { 
            if (this.board.getCell(row, col) === " ") {
                this.board.setCell(row, col, this.getCurrentPlayer().color);
                placed = true;
                break;                
            }
        }
        if (!placed) {
            return null
        }
        return { row, col, player: this.getCurrentPlayer() };
    }

    resetGame() {
        this.board.reset();
        this.currentPlayerIndex = 0;
        this.isWin = false;
    }

    checkLine(row, col, rowDif, colDif, player) {
        let nRow = row;
        let nCol = col;

        for (let i = 0; i < this.count; i++) {
            if (i > 0) {
                nRow += rowDif;
                nCol += colDif;
            }

            if (nRow < 0 || nCol < 0 || nRow >= this.config.rows || nCol >= this.config.cols) {
                return false;
            }

            if(this.board.getCell(nRow,nCol) !== player.color) {
                return false;
            }
        }
        return true;
    }

    checkWin(row, col, player) {
         //check horizontal
         if (this.checkLine(row, col, 0, 1, player) || this.checkLine(row, col, 0, -1, player)){
            return true;
        }
        //check vertical
        if (this.checkLine(row, col, 1, 0, player)) {
            return true;
        }
        // //check diagonal
        if (this.checkLine(row, col, 1, 1, player) || this.checkLine(row, col, 1, -1, player)) {
            return true;
        }
        return false;
    }

}

export default ConnectFourModel;