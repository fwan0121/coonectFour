const { test, expect } = require('@playwright/test');


test.describe('Connect Four Game', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('has to display the title', async ({ page }) => {
        const title = await page.locator('h1');
        await expect(title).toHaveText('Connect four');
    });

    test('has start a new game', async ({ page }) => {
        await expect(page.locator('#board')).toBeVisible();
        await expect(page.locator('.cell').first()).toBeVisible();
    })

    test('can show current player status', async ({ page }) => {
        const cells = page.locator('.cell');
        await cells.nth(0).click(); // Player 1
  
        const status = await page.locator('#gameStatus');
        await expect(status).toHaveText("Player 2 blue's turn");
    });

    test('can reset the game', async ({ page }) => {
        const resetBtn = await page.locator('#resetBtn');
        await resetBtn.click();
        const cells = page.locator('.cell');

         // Check if all cells are reset
        for (let i = 0; i < await cells.count(); i++) {
            //hasn't been place the players
            await expect(cells.nth(i)).not.toHaveCSS('background-color', 'red');
            await expect(cells.nth(i)).not.toHaveCSS('background-color', 'blue');
        }

        const status = await page.locator('#gameStatus');
        await expect(status).toHaveText("Player 1 yellow's turn");
    })

})