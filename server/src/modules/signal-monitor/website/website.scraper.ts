import { chromium } from "playwright";

export async function scrapeWebsitePage(url: string): Promise<string> {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  });

  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    // Remove dynamic/noisy elements like scripts, styles, and SVG markup before text extraction
    await page.evaluate(() => {
      const selectors = ["script", "style", "noscript", "svg", "iframe"];
      selectors.forEach((s) => document.querySelectorAll(s).forEach((el) => el.remove()));
    });

    const bodyText = await page.innerText("body");
    return bodyText.replace(/\s+/g, " ").trim();
  } finally {
    await browser.close();
  }
}