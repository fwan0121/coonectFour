import ConnectFourModel from './Models/ConnectFourModel';
import GameView from './Views/GameView';
import ConnectFourController from './Controllers/Controller';

function startGame() {
    const model = new ConnectFourModel();
    const view = new GameView();
    const controller = new ConnectFourController(model, view);
}

startGame();