import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotDir = path.join(__dirname, 'screenshots');

// Create screenshots directory if it doesn't exist
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

async function captureScreenshots() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
  });

  try {
    const page = await browser.newPage();

    // Set viewport sizes for different devices
    const viewports = [
      { name: 'mobile', width: 375, height: 812 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1440, height: 900 },
    ];

    for (const viewport of viewports) {
      await page.setViewport({ width: viewport.width, height: viewport.height });
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

      const filename = path.join(screenshotDir, `screenshot-${viewport.name}.png`);
      await page.screenshot({ path: filename, fullPage: true });
      console.log(`✓ Captured ${viewport.name} screenshot: ${filename}`);
    }

    // Full page scroll screenshot for desktop
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

    // Get full page height
    const fullHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.setViewport({ width: 1440, height: fullHeight });

    const fullPageFilename = path.join(screenshotDir, 'screenshot-full-page.png');
    await page.screenshot({ path: fullPageFilename });
    console.log(`✓ Captured full page screenshot: ${fullPageFilename}`);

    // Quote modal screenshot (desktop)
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await page.evaluate(() => openQuoteModal());
    await new Promise(r => setTimeout(r, 500)); // wait for animation
    const quoteFilename = path.join(screenshotDir, 'screenshot-quote-modal.png');
    await page.screenshot({ path: quoteFilename });
    console.log(`✓ Captured quote modal screenshot: ${quoteFilename}`);

    console.log('\n✅ All screenshots captured successfully!');
  } catch (error) {
    console.error('Error capturing screenshots:', error);
  } finally {
    await browser.close();
  }
}

captureScreenshots();
