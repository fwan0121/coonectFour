require('dotenv').config();

module.exports = {
    timeout: 60000,
    use: {
      baseURL: process.env.BASE_URL || 'http://localhost:3000',
      headless: true,
      viewport: { width: 1280, height: 720 },
      actionTimeout: 0,
    },
    testDir: 'public/src/tests/e2e',
  };
  