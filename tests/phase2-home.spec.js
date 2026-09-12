import { expect, test } from '@playwright/test'

const equipment = [
  {
    brand: 'GENIE',
    model: 'GS-3246',
    path: '/equipos/genie-gs-3246',
  },
  {
    brand: 'JLG',
    model: 'E400AJPN',
    path: '/equipos/jlg-e400ajpn',
  },
  {
    brand: 'SINOBOOM',
    model: '0808(2732)',
    path: '/equipos/sinoboom-0808-2732',
  },
]

const expectNoHorizontalOverflow = async (page) => {
  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  )
  expect(hasOverflow).toBe(false)
}

test('Inicio presenta Hero y catálogo responsive con el contenido definido', async ({
  page,
}, testInfo) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Eleva tu proyecto. Nosotros ponemos el alcance.',
    }),
  ).toBeVisible()
  await expect(page.getByText(/Equipos confiables para llevar tu proyecto/)).toBeVisible()

  const heroImage = page.getByAltText(
    'Plataforma articulada LEVEX para trabajos en altura',
  )
  await expect(heroImage).toBeVisible()
  expect(
    await heroImage.evaluate((image) => image.complete && image.naturalWidth > 0),
  ).toBe(true)
  await page.waitForTimeout(1100)
  await page.screenshot({
    path: testInfo.outputPath(`hero-${page.viewportSize().width}.png`),
  })

  await expect(page.getByRole('link', { name: 'Ver equipos' })).toHaveAttribute(
    'href',
    '/#equipos',
  )
  await expect(page.getByRole('link', { name: 'Contáctanos' })).toHaveAttribute(
    'href',
    '/contacto',
  )

  const section = page.locator('#equipos')
  await section.scrollIntoViewIfNeeded()
  await expect(page.getByRole('heading', { name: 'Nuestros equipos' })).toBeVisible()

  const cards = page.locator('.equipment-card')
  await expect(cards).toHaveCount(3)

  for (const item of equipment) {
    const cardLink = page.getByRole('link', {
      name: `Ver equipo ${item.brand} ${item.model}`,
    })
    await cardLink.scrollIntoViewIfNeeded()
    await expect(cardLink).toBeVisible()
    await expect(cardLink).toHaveAttribute('href', item.path)
    await expect(cardLink.getByText(item.brand, { exact: true })).toBeVisible()
    await expect(cardLink.getByRole('heading', { name: item.model })).toBeVisible()

    const image = cardLink.locator('img')
    await expect
      .poll(async () => image.evaluate((element) => element.naturalWidth > 0))
      .toBe(true)
  }

  if (page.viewportSize().width >= 1280) {
    const firstCard = page.getByRole('link', { name: 'Ver equipo GENIE GS-3246' })
    const transformBeforeHover = await firstCard.evaluate(
      (element) => getComputedStyle(element).transform,
    )
    await firstCard.hover()
    await page.waitForTimeout(300)
    const transformAfterHover = await firstCard.evaluate(
      (element) => getComputedStyle(element).transform,
    )
    expect(transformAfterHover).not.toBe(transformBeforeHover)
  }

  await expectNoHorizontalOverflow(page)
  await section.scrollIntoViewIfNeeded()
  await page.waitForTimeout(350)
  await page.screenshot({
    path: testInfo.outputPath(`equipos-${page.viewportSize().width}.png`),
  })
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(250)
  await page.screenshot({
    path: testInfo.outputPath(`inicio-${page.viewportSize().width}.png`),
    fullPage: true,
  })
})

test('CTAs, ancla Equipo y tarjetas navegan a sus destinos', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('link', { name: 'Ver equipos' }).click()
  await expect(page).toHaveURL('/#equipos')

  const section = page.locator('#equipos')
  await expect(section).toBeInViewport()
  await expect
    .poll(async () => section.evaluate((element) => element.getBoundingClientRect().top))
    .toBeLessThanOrEqual(100)

  if (page.viewportSize().width <= 1088) {
    await page.getByRole('button', { name: 'Abrir menú' }).click()
    await expect(
      page
        .getByRole('navigation', { name: 'Navegación móvil' })
        .getByRole('link', { name: 'Equipo' }),
    ).toHaveAttribute('aria-current', 'page')
  } else {
    await expect(
      page
        .getByRole('navigation', { name: 'Navegación principal' })
        .getByRole('link', { name: 'Equipo' }),
    ).toHaveAttribute('aria-current', 'page')
  }

  await page.goto('/')
  await page
    .getByRole('link', { name: 'Ver equipo GENIE GS-3246' })
    .scrollIntoViewIfNeeded()
  await page.getByRole('link', { name: 'Ver equipo GENIE GS-3246' }).click()
  await expect(page).toHaveURL('/equipos/genie-gs-3246')
  await expect(page.getByRole('heading', { name: 'Detalle de equipo' })).toBeVisible()

  for (const item of equipment.slice(1)) {
    await page.goto('/')
    const link = page.getByRole('link', {
      name: `Ver equipo ${item.brand} ${item.model}`,
    })
    await link.scrollIntoViewIfNeeded()
    await link.click()
    await expect(page).toHaveURL(item.path)
    await expect(page.getByRole('heading', { name: 'Detalle de equipo' })).toBeVisible()
  }
})

test('las animaciones respetan la preferencia de movimiento reducido', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')

  await expect(page.locator('.home-hero__copy')).toHaveCSS('animation-name', 'none')
  await expect(page.locator('.home-hero__machine')).toHaveCSS(
    'animation-name',
    'none',
  )
  await expect(page.locator('.equipment-card').first()).toHaveCSS(
    'animation-name',
    'none',
  )
})
