module.exports = {
    timeout: 60000,
    use: {
      headless: true,
      viewport: { width: 1280, height: 720 },
      actionTimeout: 0,
    },
    testDir: 'tests/e2e',
  };
  