const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function capture() {
  console.log('Launching Chromium for frontend screenshot capture...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }, // Mobile iPhone 13 / 14 viewport
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });

  const page = await context.newPage();
  const baseUrl = 'http://localhost:8081';

  console.log(`Navigating to ${baseUrl}...`);
  await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  const screenshotDir = path.resolve(__dirname, '../docs/screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  // 1. Dashboard (Overview)
  console.log('Capturing Screen 1: Dashboard...');
  await page.screenshot({ path: path.join(screenshotDir, '01_dashboard.png') });

  // 2. Muscle Explorer
  console.log('Capturing Screen 2: Muscle Explorer...');
  await page.getByRole('tab', { name: /muscle/i }).click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(screenshotDir, '02_muscle_explorer.png') });

  // 3. Exercise Library
  console.log('Capturing Screen 3: Exercise Library...');
  await page.getByRole('tab', { name: /exercise/i }).click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(screenshotDir, '03_exercise_library.png') });

  // 4. Exercise Detail Modal
  console.log('Capturing Screen 4: Exercise Detail Modal...');
  // Click on "Standard Push-up" card
  const pushupCard = page.locator('text=Standard Push-up').first();
  if (await pushupCard.isVisible()) {
    await pushupCard.click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(screenshotDir, '04_exercise_detail_modal.png') });
    // Close modal
    const closeBtn = page.locator('text=✕').first();
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
      await page.waitForTimeout(1000);
    }
  }

  // 5. Training Templates
  console.log('Capturing Screen 5: Training Templates...');
  await page.getByRole('tab', { name: /training/i }).click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(screenshotDir, '05_training_templates.png') });

  // 6. Live Workout Logger
  console.log('Capturing Screen 6: Live Workout Logger...');
  const startBtn = page.locator('text=Start →').first();
  if (await startBtn.isVisible()) {
    await startBtn.click();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(screenshotDir, '06_live_workout_logger.png') });
    // Cancel or return from session
    const cancelBtn = page.locator('text=Cancel Session').first();
    if (await cancelBtn.isVisible()) {
      await cancelBtn.click();
      await page.waitForTimeout(1000);
    }
  } else {
    const freeBtn = page.locator('text=+ Free Workout').first();
    if (await freeBtn.isVisible()) {
      await freeBtn.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(screenshotDir, '06_live_workout_logger.png') });
    }
  }

  // 7. Coverage and Balance Analysis
  console.log('Capturing Screen 7: Coverage and Balance Analysis...');
  await page.getByRole('tab', { name: /analysis/i }).click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(screenshotDir, '07_coverage_analysis.png') });

  console.log('All 7 screenshots captured successfully!');
  await browser.close();
}

capture().catch((err) => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});
