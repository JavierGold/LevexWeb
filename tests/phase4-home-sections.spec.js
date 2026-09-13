import { expect, test } from '@playwright/test'

const expectedServices = [
  'Renta por día, semana o mes',
  'Venta de equipos seminuevos',
  'Entrega en sitio',
  'Asesoría personalizada',
]

const phaseFourSections = [
  ['advice', '.advice-section'],
  ['benefits', '.why-section'],
  ['services', '.services-section'],
  ['testimonials', '.testimonials-section'],
]

test('las cuatro secciones muestran el contenido definido y se adaptan al viewport', async ({
  page,
}, testInfo) => {
  await page.goto('/')

  const advice = page.locator('.advice-section')
  await advice.scrollIntoViewIfNeeded()
  await expect(
    advice.getByRole('heading', {
      name: '¿Necesitas ayuda para elegir el equipo adecuado?',
    }),
  ).toBeVisible()
  await expect(advice.getByRole('link', { name: 'Contáctanos' })).toHaveAttribute(
    'href',
    '/contacto',
  )
  const giraffe = advice.locator('img')
  await expect(giraffe).toHaveAttribute('src', /jirafa_2\.webp/)
  await expect
    .poll(async () => giraffe.evaluate((image) => image.naturalWidth))
    .toBeGreaterThan(0)

  const why = page.locator('.why-section')
  await why.scrollIntoViewIfNeeded()
  await expect(
    why.getByRole('heading', { name: '¿Por qué trabajar con nosotros?' }),
  ).toBeVisible()
  await expect(why.locator('.benefits-list > li')).toHaveCount(8)
  await expect(
    why.getByRole('heading', { name: 'Seguridad Garantizada' }),
  ).toBeVisible()
  await expect(why.locator('.safety-panel li')).toHaveCount(6)
  await expect(why.getByText('Tu seguridad es nuestra prioridad.')).toBeVisible()

  const services = page.locator('.services-section')
  await services.scrollIntoViewIfNeeded()
  await expect(services.getByRole('heading', { name: 'Servicios' })).toBeVisible()
  await expect(services.locator('.services-grid > li')).toHaveCount(4)
  for (const service of expectedServices) {
    await expect(services.getByRole('heading', { name: service })).toBeVisible()
  }
  await expect(services.locator('.services-grid__icon svg')).toHaveCount(4)

  const testimonials = page.locator('.testimonials-section')
  await testimonials.scrollIntoViewIfNeeded()
  await expect(
    testimonials.getByRole('heading', { name: 'Opiniones de nuestros clientes' }),
  ).toBeVisible()
  await expect(testimonials.locator('.testimonials-carousel__indicator')).toHaveCount(4)

  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    ),
  ).toBe(false)

  if (['desktop', 'mobile'].includes(testInfo.project.name)) {
    for (const [name, selector] of phaseFourSections) {
      const section = page.locator(selector)
      await section.scrollIntoViewIfNeeded()
      await page.waitForTimeout(250)
      await page.screenshot({
        path: testInfo.outputPath(`${name}-${page.viewportSize().width}.png`),
      })
    }
  }
})

test('el carrusel responde a flechas e indicadores y conserva los testimonios', async ({
  page,
}) => {
  await page.goto('/')
  const carousel = page.locator('.testimonials-carousel')
  await carousel.scrollIntoViewIfNeeded()

  await expect(carousel.getByText(/Muy buena experiencia/)).toBeVisible()
  await carousel.getByRole('button', { name: 'Opinión siguiente' }).click()
  await expect(carousel.getByText(/Excelente servicio y equipos/)).toBeVisible()

  await carousel.getByRole('button', { name: 'Mostrar opinión 4 de 4' }).click()
  await expect(carousel.getByText(/Equipos en nuevos y una excelente atención/)).toBeVisible()
  await expect(carousel.locator('.testimonials-carousel__controls > span')).toHaveText(
    '04 / 04',
  )

  await carousel.getByRole('button', { name: 'Opinión anterior' }).click()
  await expect(carousel.locator('.testimonials-carousel__controls > span')).toHaveText(
    '03 / 04',
  )
  await expect(
    carousel.getByRole('button', { name: 'Mostrar opinión 3 de 4' }),
  ).toHaveAttribute('aria-pressed', 'true')
})
