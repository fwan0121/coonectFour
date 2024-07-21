const { test, expect } = require('@playwright/test');
const { injectAxe, checkA11y } = require('axe-playwright');
const AxeBuilder = require('@axe-core/playwright').default;


test.describe('Accessibility tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await injectAxe(page);
    });

    test('export scan results as a test attachment', async ({ page }, testInfo) => {
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        await testInfo.attach('accessibility-scan-results', {
            body: JSON.stringify(accessibilityScanResults, null, 2),
            contentType: 'application/json'
        });
        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should have no accessibility violations', async ({ page }) => {
        const results = await page.evaluate(async () => {
            return new Promise((resolve, reject) => {
                axe.run(document, (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
            });
        });
        // console.log(results);
        expect(results.violations.length).toBe(0);
    });
   
});


