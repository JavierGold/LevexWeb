import { expect, test } from '@playwright/test'

test('ajusta los dos bloques móviles y gestiona el scroll entre rutas', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')

  const advice = page.locator('.advice-section')
  const adviceCopy = page.locator('.advice-section__copy')
  const adviceButton = page.locator('.advice-section__cta')
  const adviceImage = page.locator('.advice-section__visual img')
  await advice.scrollIntoViewIfNeeded()

  const [copyBox, buttonBox, adviceImageBox] = await Promise.all([
    adviceCopy.boundingBox(),
    adviceButton.boundingBox(),
    adviceImage.boundingBox(),
  ])

  expect(copyBox).not.toBeNull()
  expect(buttonBox).not.toBeNull()
  expect(adviceImageBox).not.toBeNull()
  expect(buttonBox.width).toBeLessThan(copyBox.width * 0.72)
  expect(Math.abs(buttonBox.x - copyBox.x)).toBeLessThan(2)
  expect(adviceImageBox.y - (buttonBox.y + buttonBox.height)).toBeGreaterThan(12)
  await advice.screenshot({ path: 'test-results/mobile-advice-spacing.png' })

  await page.getByRole('button', { name: /Abrir menú/i }).click()
  await page
    .locator('#mobile-navigation')
    .getByRole('link', { name: 'Sobre nosotros' })
    .click()
  await page.waitForURL('**/sobre-nosotros')
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)

  const aboutCta = page.locator('.about-hero__cta')
  const aboutMachine = page.locator('.about-hero__media img')
  const [aboutCtaBox, machineBox] = await Promise.all([
    aboutCta.boundingBox(),
    aboutMachine.boundingBox(),
  ])

  expect(aboutCtaBox).not.toBeNull()
  expect(machineBox).not.toBeNull()
  expect(machineBox.y - (aboutCtaBox.y + aboutCtaBox.height)).toBeGreaterThan(40)
  await page.locator('.about-hero').screenshot({
    path: 'test-results/mobile-about-hero-spacing.png',
  })

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.getByRole('button', { name: /Abrir menú/i }).click()
  await page.locator('#mobile-navigation').getByRole('link', { name: 'Equipo' }).click()
  await page.waitForURL('**/#equipos')
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0)
  await expect(page.locator('#equipos')).toBeInViewport()
})
