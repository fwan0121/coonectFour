import Player from 'player.js'; 

describe('Player', () => {
    test('should create a Player with name and color', () => {
        const player = new Player();
        expect(player.name).toBe('Player 1');
        expect(player.color).toBe('yellow');
    });
    
    test('should create a Player with given name and color', () => {
        const player = new Player('Player123', 'red');
        expect(player.name).toBe('Player123');
        expect(player.color).toBe('red');
    });

});

