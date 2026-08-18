import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  workers: 1,
  reporter: [['list']],
  use: {
    ...devices['Desktop Chrome'],
    baseURL: 'http://127.0.0.1:3100',
    // Drives the installed Google Chrome rather than Playwright's bundled
    // Chromium, which has no macOS 13 build. CI can drop this line.
    channel: 'chrome',
  },
  webServer: {
    command: 'npx next start -p 3100',
    url: 'http://127.0.0.1:3100',
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
