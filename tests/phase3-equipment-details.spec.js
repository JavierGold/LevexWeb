import { expect, test } from '@playwright/test'

const equipmentRoutes = [
  {
    path: '/equipos/genie-gs-3246',
    brand: 'GENIE',
    model: 'GS-3246',
    images: ['GENIE_1', 'GENIE_2', 'GENIE_3'],
    sampleRow: /Altura máxima de trabajo(?: Métrico)? 11\.60 m(?: US)? 37 ft 6 in/,
  },
  {
    path: '/equipos/jlg-e400ajpn',
    brand: 'JLG',
    model: 'E400AJPN',
    images: ['JLG_1', 'JLG_2', 'JLG_3'],
    sampleRow: /Altura máxima de trabajo(?: Métrico)? 14\.19 m(?: US)? 46 ft 7 in/,
  },
  {
    path: '/equipos/sinoboom-0808-2732',
    brand: 'SINOBOOM',
    model: '0808(2732)',
    images: ['SINOBOOM_1', 'SINOBOOM_2', 'SINOBOOM_3'],
    sampleRow: /Altura máxima de trabajo(?: Métrico)? 10\.1 m(?: US)? 33'2"/,
  },
]

const expectNoHorizontalOverflow = async (page) => {
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    ),
  ).toBe(false)
}

test('los enlaces de HOME-02 conservan las tres rutas de detalle', async ({ page }) => {
  await page.goto('/')

  for (const equipment of equipmentRoutes) {
    await expect(
      page.getByRole('link', {
        name: `Ver equipo ${equipment.brand} ${equipment.model}`,
      }),
    ).toHaveAttribute('href', equipment.path)
  }
})

test('cada ruta carga su modelo, ficha técnica, galería y CTA', async ({
  page,
}, testInfo) => {
  for (const equipment of equipmentRoutes) {
    await page.goto(equipment.path)

    await expect(
      page.getByRole('heading', { level: 1, name: equipment.model }),
    ).toBeVisible()
    await expect(
      page.locator('.equipment-detail__header').getByText(equipment.brand, {
        exact: true,
      }),
    ).toBeVisible()

    const table = page.getByRole('table')
    await expect(table).toBeVisible()
    await expect(table.getByRole('columnheader', { name: 'Especificación' })).toBeAttached()
    await expect(table.getByRole('columnheader', { name: 'Métrico' })).toBeAttached()
    await expect(table.getByRole('columnheader', { name: 'US' })).toBeAttached()
    await expect(table.getByRole('row', { name: equipment.sampleRow })).toBeVisible()

    const quote = page.getByRole('link', { name: 'Solicitar cotización' })
    await expect(quote).toBeVisible()
    await expect(quote).toHaveAttribute(
      'href',
      `/contacto?equipo=${encodeURIComponent(`${equipment.brand} ${equipment.model}`)}`,
    )

    const images = page.locator('.equipment-detail img')
    await expect(images).toHaveCount(equipment.images.length)
    for (let index = 0; index < equipment.images.length; index += 1) {
      const image = images.nth(index)
      await image.scrollIntoViewIfNeeded()
      await expect(image).toHaveAttribute('src', new RegExp(equipment.images[index]))
      await expect
        .poll(async () => image.evaluate((element) => element.naturalWidth))
        .toBeGreaterThan(0)
    }

    await expectNoHorizontalOverflow(page)

    if (['desktop', 'mobile'].includes(testInfo.project.name)) {
      await page.evaluate(() => window.scrollTo(0, 0))
      await page.waitForTimeout(150)
      await page.screenshot({
        path: testInfo.outputPath(`${equipment.model.replaceAll(/[^a-z0-9]/gi, '-')}.png`),
      })
    }
  }
})
