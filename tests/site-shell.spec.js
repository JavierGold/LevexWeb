import { expect, test } from '@playwright/test'

const isCompactHeader = (page) => page.viewportSize().width <= 1088

test('header y footer se adaptan sin overflow', async ({ page }) => {
  await page.goto('/')

  const desktopNavigation = page.getByRole('navigation', { name: 'Navegación principal' })
  const menuButton = page.getByRole('button', { name: 'Abrir menú' })

  if (isCompactHeader(page)) {
    await expect(desktopNavigation).toBeHidden()
    await expect(menuButton).toBeVisible()
    await menuButton.click()
    await expect(page.getByRole('navigation', { name: 'Navegación móvil' })).toBeVisible()
  } else {
    await expect(desktopNavigation).toBeVisible()
    await expect(menuButton).toBeHidden()
  }

  const footer = page.locator('.site-footer')
  await expect(footer.getByRole('heading', { name: 'Navegación' })).toBeVisible()
  await expect(footer.getByRole('heading', { name: 'Contacto' })).toBeVisible()
  await expect(footer.getByRole('heading', { name: 'Oficinas' })).toBeVisible()
  await expect(footer.getByRole('heading', { name: 'Redes sociales' })).toBeVisible()
  await expect(footer.locator('.site-footer__machine')).toBeVisible()

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  )
  expect(hasHorizontalOverflow).toBe(false)
})

test('la navegación actualiza ruta, estado activo y menú móvil', async ({ page }) => {
  await page.goto('/')

  const getNavigation = async () => {
    if (isCompactHeader(page)) {
      await page.getByRole('button', { name: 'Abrir menú' }).click()
      return page.getByRole('navigation', { name: 'Navegación móvil' })
    }

    return page.getByRole('navigation', { name: 'Navegación principal' })
  }

  let navigation = await getNavigation()
  await expect(navigation.getByRole('link', { name: 'Inicio' })).toHaveAttribute(
    'aria-current',
    'page',
  )

  await navigation.getByRole('link', { name: 'Sobre nosotros' }).click()
  await expect(page).toHaveURL('/sobre-nosotros')

  if (isCompactHeader(page)) {
    await expect(page.getByRole('navigation', { name: 'Navegación móvil' })).toHaveCount(0)
  }

  navigation = await getNavigation()
  await expect(navigation.getByRole('link', { name: 'Sobre nosotros' })).toHaveAttribute(
    'aria-current',
    'page',
  )

  await navigation.getByRole('link', { name: 'Contacto' }).click()
  await expect(page).toHaveURL('/contacto')
})

test('CTA, contacto, navegación de footer y redes tienen destinos válidos', async ({ page }) => {
  await page.goto('/')

  if (isCompactHeader(page)) {
    await page.getByRole('button', { name: 'Abrir menú' }).click()
    await page.locator('.header-cta--mobile').click()
  } else {
    await page.locator('.header-cta--desktop').click()
  }

  const dialog = page.getByRole('dialog', { name: 'Cuéntanos sobre tu proyecto' })
  await expect(dialog).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()

  const footer = page.locator('.site-footer')
  await expect(footer.getByRole('link', { name: 'contacto@levexco.com' })).toHaveAttribute(
    'href',
    'mailto:contacto@levexco.com',
  )
  await expect(footer.getByRole('link', { name: '479 105 0766' })).toHaveAttribute(
    'href',
    'tel:+524791050766',
  )
  await expect(footer.getByRole('link', { name: '477 117 8881' })).toHaveAttribute(
    'href',
    'tel:+524771178881',
  )

  for (const label of ['Instagram', 'Facebook']) {
    const link = footer.getByRole('link', { name: new RegExp(label, 'i') })
    await expect(link).toHaveAttribute('href', /^https:\/\//)
    await expect(link).toHaveAttribute('rel', /noopener/)
  }

  await footer
    .getByRole('navigation', { name: 'Navegación del pie de página' })
    .getByRole('link', { name: 'Inicio', exact: true })
    .click()
  await expect(page).toHaveURL('/')
})
