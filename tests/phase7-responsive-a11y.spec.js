import { expect, test } from '@playwright/test'

const routes = [
  ['inicio', '/', true],
  ['sobre-nosotros', '/sobre-nosotros', true],
  ['contacto', '/contacto', true],
  ['equipo-genie', '/equipos/genie-gs-3246', true],
  ['equipo-jlg', '/equipos/jlg-e400ajpn', false],
  ['equipo-sinoboom', '/equipos/sinoboom-0808-2732', false],
]

async function expectHealthyLayout(page) {
  await page.waitForLoadState('networkidle')
  await page.evaluate(() => document.fonts.ready)

  await page.evaluate(async () => {
    const step = Math.max(window.innerHeight * 0.8, 500)
    for (let position = 0; position < document.documentElement.scrollHeight; position += step) {
      window.scrollTo(0, position)
      await new Promise((resolve) => requestAnimationFrame(resolve))
    }
    window.scrollTo(0, 0)
  })

  const diagnostics = await page.evaluate(() => {
    const viewportWidth = document.documentElement.clientWidth
    const overflowingElements = [
      ...document.querySelectorAll('a, button, input, textarea, h1, h2, h3, p, address, table'),
    ]
      .filter((element) => {
        const style = getComputedStyle(element)
        if (style.display === 'none' || style.visibility === 'hidden') return false
        const rect = element.getBoundingClientRect()
        return rect.width > 0 && (rect.left < -1 || rect.right > viewportWidth + 1)
      })
      .slice(0, 10)
      .map((element) => ({
        tag: element.tagName.toLowerCase(),
        className: element.className,
        rect: element.getBoundingClientRect().toJSON(),
      }))

    const brokenImages = [...document.images]
      .filter((image) => image.complete && image.naturalWidth === 0)
      .map((image) => image.currentSrc || image.src)

    return {
      documentOverflow: document.documentElement.scrollWidth - viewportWidth,
      overflowingElements,
      brokenImages,
      h1Count: document.querySelectorAll('h1').length,
      mainCount: document.querySelectorAll('main').length,
      undersizedControls: [...document.querySelectorAll('button, input, textarea')]
        .filter((element) => {
          const rect = element.getBoundingClientRect()
          const style = getComputedStyle(element)
          return style.display !== 'none' && rect.width > 0 && (rect.width < 24 || rect.height < 24)
        })
        .map((element) => ({
          tag: element.tagName.toLowerCase(),
          className: element.className,
          label: element.getAttribute('aria-label') || element.textContent?.trim(),
        })),
    }
  })

  expect(diagnostics, JSON.stringify(diagnostics, null, 2)).toEqual({
    documentOverflow: 0,
    overflowingElements: [],
    brokenImages: [],
    h1Count: 1,
    mainCount: 1,
    undersizedControls: [],
  })
}

test('auditoría global responsive, navegación e interacción', async ({ page }, testInfo) => {
  test.setTimeout(60_000)
  const runtimeErrors = []
  page.on('console', (message) => {
    if (message.type() === 'error') {
      const location = message.location()
      runtimeErrors.push(`console: ${message.text()} (${location.url || 'sin URL'})`)
    }
  })
  page.on('pageerror', (error) => runtimeErrors.push(`pageerror: ${error.message}`))
  page.on('response', (response) => {
    if (response.status() >= 400) {
      runtimeErrors.push(`response ${response.status()}: ${response.url()}`)
    }
  })
  await page.emulateMedia({ reducedMotion: 'reduce' })

  for (const [name, path, capture] of routes) {
    await page.goto(path)
    await expectHealthyLayout(page)
    if (capture) {
      await page.screenshot({
        path: testInfo.outputPath(`${name}-${page.viewportSize().width}.png`),
        fullPage: true,
      })
    }
  }

  await page.goto('/')
  const carousel = page.locator('.testimonials-carousel')
  await carousel.scrollIntoViewIfNeeded()
  await carousel.getByRole('button', { name: 'Opinión siguiente' }).click()
  await expect(carousel.locator('.testimonials-carousel__controls > span')).toHaveText(
    '02 / 04',
  )
  await expect(
    carousel.getByRole('button', { name: 'Mostrar opinión 2 de 4' }),
  ).toHaveAttribute('aria-pressed', 'true')

  const menuToggle = page.getByRole('button', { name: 'Abrir menú' })
  if (await menuToggle.isVisible()) {
    await menuToggle.click()
    await expect(page.getByRole('navigation', { name: 'Navegación móvil' })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(menuToggle).toBeFocused()
    await menuToggle.click()
  }

  const quoteTrigger = page.locator('.header-cta:visible').first()
  await quoteTrigger.click()
  const dialog = page.getByRole('dialog', { name: 'Cuéntanos sobre tu proyecto' })
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('button', { name: 'Cerrar cotización' })).toBeFocused()
  await dialog.getByRole('button', { name: 'Enviar' }).click()
  await expect(dialog.locator('.contact-form__error')).toHaveCount(7)
  const firstName = dialog.locator('input[name="firstName"]')
  await expect(firstName).toBeFocused()
  await expect(firstName).toHaveCSS('outline-style', 'solid')
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(quoteTrigger).toBeFocused()
  expect(runtimeErrors).toEqual([])
})
