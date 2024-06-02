import GameConfig from '../../src/Models/GameConfig.js'; 

describe('GameConfig', () => {
    test('should create a GameConfig with default rows and cols', () => {
        const config = new GameConfig();
        expect(config.rows).toBe(6);
        expect(config.cols).toBe(7);
    });
    
    test('should create a GameConfig in specific rows and cols', () => {
        const config = new GameConfig(12, 14);
        expect(config.rows).toBe(12);
        expect(config.cols).toBe(14);
    });

})