import { expect, test } from '@playwright/test'

const isCompactHeader = (page) => page.viewportSize().width <= 1088

const expectNoHorizontalOverflow = async (page) => {
  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  )
  expect(hasOverflow).toBe(false)
}

test('header conserva navegación activa y presenta CTA Cotizar', async ({ page }) => {
  await page.goto('/')

  const header = page.locator('header')
  const logo = header.locator('.brand-mark--header')
  await expect(logo).toBeVisible()

  const logoBox = await logo.boundingBox()
  expect(logoBox.width).toBeGreaterThanOrEqual(148)
  expect(logoBox.height).toBeGreaterThanOrEqual(43)

  let navigation
  let cta
  if (isCompactHeader(page)) {
    await page.getByRole('button', { name: 'Abrir menú' }).click()
    navigation = page.getByRole('navigation', { name: 'Navegación móvil' })
    cta = page.locator('.header-cta--mobile')
  } else {
    navigation = page.getByRole('navigation', { name: 'Navegación principal' })
    cta = page.locator('.header-cta--desktop')
  }

  await expect(navigation.getByRole('link', { name: 'Inicio' })).toHaveAttribute(
    'aria-current',
    'page',
  )
  await expect(navigation.getByRole('link', { name: 'Equipo' })).toHaveAttribute(
    'href',
    '/#equipos',
  )
  await expect(cta).toBeVisible()
  await expect(cta).toHaveText(/Cotizar/i)
  await expect(cta.locator('.header-cta__arrow')).toBeVisible()

  const radius = await cta.evaluate((element) => Number.parseFloat(getComputedStyle(element).borderRadius))
  expect(radius).toBeGreaterThanOrEqual(24)

  const arrow = cta.locator('.header-cta__arrow')
  const arrowColor = await arrow.evaluate((element) => getComputedStyle(element).color)
  expect(arrowColor).toBe('rgb(255, 255, 255)')
  const transformBeforeHover = await arrow.evaluate((element) => getComputedStyle(element).transform)
  await cta.hover()
  await page.waitForTimeout(200)
  const transformAfterHover = await arrow.evaluate((element) => getComputedStyle(element).transform)
  expect(transformAfterHover).not.toBe(transformBeforeHover)

  await expectNoHorizontalOverflow(page)
})

test('Equipo navega desde otra ruta a Inicio con el hash estable', async ({ page }) => {
  await page.goto('/sobre-nosotros')

  let navigation
  if (isCompactHeader(page)) {
    await page.getByRole('button', { name: 'Abrir menú' }).click()
    navigation = page.getByRole('navigation', { name: 'Navegación móvil' })
  } else {
    navigation = page.getByRole('navigation', { name: 'Navegación principal' })
  }

  await navigation.getByRole('link', { name: 'Equipo' }).click()
  await expect(page).toHaveURL('/#equipos')
})

test('footer mantiene maquinaria tenue y muestra títulos e iconos locales', async ({ page }) => {
  await page.goto('/')

  const footer = page.locator('footer')
  await footer.scrollIntoViewIfNeeded()

  for (const title of ['Navegación', 'Contacto', 'Oficinas', 'Redes sociales']) {
    await expect(footer.getByRole('heading', { name: title })).toBeVisible()
  }

  const instagram = footer.getByRole('link', { name: 'Instagram' })
  const facebook = footer.getByRole('link', { name: 'Facebook' })
  await expect(instagram.locator('img')).toBeVisible()
  await expect(instagram.locator('img')).toHaveAttribute('src', /^data:image\/svg\+xml/)
  await expect(facebook.locator('img')).toBeVisible()
  await expect(facebook.locator('img')).toHaveAttribute('src', /^data:image\/svg\+xml/)

  const machineOpacity = await footer
    .locator('.site-footer__machine')
    .evaluate((element) => Number.parseFloat(getComputedStyle(element).opacity))
  expect(machineOpacity).toBeLessThanOrEqual(0.2)

  const socialIcon = instagram.locator('.footer-social-icon')
  const transformBeforeHover = await socialIcon.evaluate((element) => getComputedStyle(element).transform)
  await instagram.hover()
  await page.waitForTimeout(200)
  const transformAfterHover = await socialIcon.evaluate((element) => getComputedStyle(element).transform)
  expect(transformAfterHover).not.toBe(transformBeforeHover)

  const whatsappBox = await page
    .getByRole('link', { name: /Contactar a LEVEX por WhatsApp/i })
    .boundingBox()
  for (const socialLink of [instagram, facebook]) {
    const socialLinkBox = await socialLink.boundingBox()
    const overlapsWhatsApp =
      socialLinkBox.x < whatsappBox.x + whatsappBox.width &&
      socialLinkBox.x + socialLinkBox.width > whatsappBox.x &&
      socialLinkBox.y < whatsappBox.y + whatsappBox.height &&
      socialLinkBox.y + socialLinkBox.height > whatsappBox.y
    expect(overlapsWhatsApp).toBe(false)
  }

  await expectNoHorizontalOverflow(page)
})

test('WhatsApp permanece fijo, accesible y dentro del viewport', async ({ page }) => {
  await page.goto('/')

  const whatsapp = page.getByRole('link', { name: /Contactar a LEVEX por WhatsApp/i })
  await expect(whatsapp).toBeVisible()
  await expect(whatsapp).toHaveAttribute('href', 'https://wa.me/524791050766')
  await expect(whatsapp).toHaveAttribute('target', '_blank')
  await expect(whatsapp).toHaveAttribute('rel', /noopener/)
  await expect(whatsapp.locator('img')).toBeVisible()
  await expect(whatsapp.locator('img')).toHaveAttribute('src', /^data:image\/svg\+xml/)

  const initialBox = await whatsapp.boundingBox()
  expect(initialBox.width).toBeGreaterThanOrEqual(68)
  expect(initialBox.height).toBeGreaterThanOrEqual(68)
  await expect(whatsapp).toHaveText('')

  const position = await whatsapp.evaluate((element) => getComputedStyle(element).position)
  expect(position).toBe('fixed')

  await page.locator('footer').scrollIntoViewIfNeeded()
  const scrolledBox = await whatsapp.boundingBox()
  expect(Math.abs(scrolledBox.y - initialBox.y)).toBeLessThan(2)
  expect(scrolledBox.x).toBeGreaterThanOrEqual(0)
  expect(scrolledBox.x + scrolledBox.width).toBeLessThanOrEqual(page.viewportSize().width)

  await expectNoHorizontalOverflow(page)
})
