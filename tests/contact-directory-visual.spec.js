import { expect, test } from '@playwright/test'

test('separa los datos del recurso visual en el panel de contacto', async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/contacto')

  const panel = page.locator('.contact-directory')
  const contactList = page.locator('.contact-directory__list')
  const visual = page.locator('.contact-directory__visual')
  const image = visual.locator('img')

  await panel.scrollIntoViewIfNeeded()
  await expect(image).toHaveAttribute('src', /jirafa_3/)
  await expect
    .poll(() => image.evaluate((element) => element.naturalWidth))
    .toBeGreaterThan(0)

  const [panelBox, listBox, visualBox] = await Promise.all([
    panel.boundingBox(),
    contactList.boundingBox(),
    visual.boundingBox(),
  ])

  expect(panelBox).not.toBeNull()
  expect(listBox).not.toBeNull()
  expect(visualBox).not.toBeNull()
  expect(visualBox.y - (listBox.y + listBox.height)).toBeGreaterThanOrEqual(32)
  expect(visualBox.x).toBeGreaterThanOrEqual(panelBox.x)
  expect(visualBox.x + visualBox.width).toBeLessThanOrEqual(panelBox.x + panelBox.width)
  expect(visualBox.y + visualBox.height).toBeLessThanOrEqual(panelBox.y + panelBox.height)

  await panel.screenshot({
    path: `test-results/contact-directory-${testInfo.project.name}.png`,
  })
})
