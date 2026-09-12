import { expect, test } from '@playwright/test'

test('Fase 5 presenta Sobre Nosotros con sus tres bloques', async ({ page }) => {
  await page.goto('/sobre-nosotros')

  await expect(
    page.getByRole('heading', { level: 1, name: '¿Quiénes somos?' }),
  ).toBeVisible()
  await expect(
    page.getByRole('link', { name: 'Hablemos de tu proyecto' }),
  ).toHaveAttribute('href', '/contacto')
  await expect(
    page.getByRole('heading', {
      level: 2,
      name: 'Elevación segura, alcance preciso y máximo rendimiento',
    }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { level: 2, name: 'Aplicaciones' }),
  ).toBeVisible()
  await expect(page.locator('.applications-grid > li')).toHaveCount(7)
  await expect(
    page.locator('.applications-section__visual img'),
  ).toHaveAttribute('src', /jirafa_1/)

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  )
  expect(hasHorizontalOverflow).toBe(false)

  await page.screenshot({
    path: 'test-results/phase5-about.png',
    fullPage: true,
  })
})
