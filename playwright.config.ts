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
    // Always start a fresh server. Reusing one across a rebuild serves a stale
    // .next: the HTML arrives but its client chunks 404, hydration dies, and
    // every assertion that depends on it fails for reasons nothing to do with
    // the code under test.
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
