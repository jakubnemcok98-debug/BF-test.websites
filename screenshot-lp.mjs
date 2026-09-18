import puppeteer from 'puppeteer';

const url = 'http://localhost:3000/landing-pages/lp-ai-agents.html';
const viewports = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'desktop', width: 1440, height: 900 },
];

const browser = await puppeteer.launch();
for (const vp of viewports) {
  const page = await browser.newPage();
  await page.setViewport({ width: vp.width, height: vp.height });
  await page.goto(url, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 300));

  // Scroll through the page so IntersectionObserver-based reveals fire before capture
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < scrollHeight; y += vp.height / 2) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await new Promise(r => setTimeout(r, 120));
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 300));

  await page.screenshot({ path: `./screenshots/lp-${vp.name}-full.png`, fullPage: true });
  await page.close();
}
await browser.close();
console.log('done');
