import { expect, test } from '@playwright/test'

test('corrige únicamente las imágenes del Hero y Aplicaciones', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/sobre-nosotros')

  const heroMachine = page.locator('.about-hero__media img')
  await expect(heroMachine).toHaveAttribute('src', /GENIE_1/)
  await expect(heroMachine).toBeVisible()
  await expect
    .poll(() => heroMachine.evaluate((image) => image.naturalWidth))
    .toBeGreaterThan(0)
  await page.locator('.about-hero').screenshot({
    path: 'test-results/phase5-hero-genie.png',
  })

  const giraffeFigure = page.locator('.applications-section__visual')
  const giraffeImage = giraffeFigure.locator('img')
  await giraffeFigure.scrollIntoViewIfNeeded()
  await expect(giraffeImage).toHaveAttribute('src', /jirafa_1/)
  await expect
    .poll(() => giraffeImage.evaluate((image) => image.naturalWidth))
    .toBeGreaterThan(0)

  const figureStyles = await giraffeFigure.evaluate((figure) => {
    const styles = getComputedStyle(figure)
    const overlay = getComputedStyle(figure, '::after')

    return {
      backgroundColor: styles.backgroundColor,
      borderTopWidth: styles.borderTopWidth,
      overlayContent: overlay.content,
    }
  })

  expect(figureStyles).toEqual({
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderTopWidth: '0px',
    overlayContent: 'none',
  })
  await page.locator('.applications-section__layout').screenshot({
    path: 'test-results/phase5-giraffe-transparent.png',
  })
})
