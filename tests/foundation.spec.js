import { expect, test } from '@playwright/test'

const routes = [
  {
    path: '/',
    heading: 'Eleva tu proyecto. Nosotros ponemos el alcance.',
    title: 'Inicio | LEVEX',
  },
  {
    path: '/sobre-nosotros',
    heading: '¿Quiénes somos?',
    title: 'Sobre Nosotros | LEVEX',
  },
  { path: '/contacto', heading: 'Contacto', title: 'Contacto | LEVEX' },
  {
    path: '/equipos/genie-gs-3246',
    heading: 'GS-3246',
    title: 'GENIE GS-3246 | LEVEX',
  },
]

for (const { path, heading, title } of routes) {
  test(`${path} carga su página base sin overflow horizontal`, async ({ page }) => {
    const response = await page.goto(path)

    expect(response?.ok()).toBe(true)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading)
    await expect(page.getByRole('img', { name: 'LEVEX' }).first()).toBeVisible()
    await expect(page).toHaveTitle(title)

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    )

    expect(hasHorizontalOverflow).toBe(false)
  })
}
