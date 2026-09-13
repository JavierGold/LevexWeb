import { expect, test } from '@playwright/test'

test('Hero muestra la máquina completa dentro de su área visual', async ({ page }) => {
  await page.goto('/')
  const hero = page.locator('.home-hero')
  const machine = page.locator('.home-hero__machine')

  await expect(machine).toBeVisible()
  await expect(machine).toHaveCSS('object-fit', 'contain')
  await page.waitForTimeout(1100)

  const [heroBox, machineBox] = await Promise.all([
    hero.boundingBox(),
    machine.boundingBox(),
  ])
  expect(machineBox.x).toBeGreaterThanOrEqual(heroBox.x)
  expect(machineBox.y).toBeGreaterThanOrEqual(heroBox.y)
  expect(machineBox.x + machineBox.width).toBeLessThanOrEqual(
    heroBox.x + heroBox.width,
  )
  expect(machineBox.y + machineBox.height).toBeLessThanOrEqual(
    heroBox.y + heroBox.height,
  )
})

test('WhatsApp usa el PNG local y conserva el botón de icono único', async ({
  page,
}) => {
  await page.goto('/')
  const button = page.getByRole('link', {
    name: /Contactar a LEVEX por WhatsApp/i,
  })
  const icon = button.locator('img')

  await expect(button).toBeVisible()
  await expect(button).toHaveText('')
  await expect(icon).toHaveAttribute('src', /whatsapp_logo\.webp/)
  await expect
    .poll(async () => icon.evaluate((image) => image.naturalWidth))
    .toBeGreaterThan(0)
})
