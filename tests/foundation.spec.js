import { expect, test } from '@playwright/test'

const routes = [
  { path: '/', heading: 'Inicio' },
  { path: '/sobre-nosotros', heading: 'Sobre Nosotros' },
  { path: '/contacto', heading: 'Contacto' },
  { path: '/equipos/equipo-base', heading: 'Detalle de equipo' },
]

for (const { path, heading } of routes) {
  test(`${path} carga su página base sin overflow horizontal`, async ({ page }) => {
    const response = await page.goto(path)

    expect(response?.ok()).toBe(true)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading)
    await expect(page.getByRole('img', { name: 'LEVEX' }).first()).toBeVisible()
    await expect(page).toHaveTitle(`${heading} | LEVEX`)

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    )

    expect(hasHorizontalOverflow).toBe(false)
  })
}
