import { expect, test } from '@playwright/test'

const contactEndpoint = 'https://1pnyjgnls6.execute-api.us-east-1.amazonaws.com/contact'

async function fillContactForm(form, subject) {
  await form.locator('[name="firstName"]').fill('Prueba')
  await form.locator('[name="lastName"]').fill('Fase 9')
  await form.locator('[name="companyName"]').fill('LEVEX QA')
  await form.locator('[name="email"]').fill('qa@example.com')
  await form.locator('[name="phone"]').fill('479 105 0766')
  await form.locator('[name="subject"]').fill(subject)
  await form
    .locator('[name="message"]')
    .fill('Validación controlada del formulario desde http://localhost:5173.')
}

test('confirma el envío real antes de mostrar el estado de éxito', async ({ page }) => {
  await page.goto('http://localhost:5173/contacto')

  const form = page.locator('.contact-form-panel .contact-form')
  await fillContactForm(form, 'Validación real Fase 9')

  const [response] = await Promise.all([
    page.waitForResponse(
      (candidate) =>
        candidate.url() === contactEndpoint && candidate.request().method() === 'POST',
    ),
    form.getByRole('button', { name: 'Enviar' }).click(),
  ])

  expect(response.status()).toBe(200)
  await expect(response.json()).resolves.toMatchObject({ ok: true })
  await expect(page.getByRole('heading', { name: 'Gracias por tu mensaje' })).toBeVisible()
  await expect(
    page.getByText(
      'Hemos recibido tu información. Nos pondremos en contacto contigo lo antes posible.',
    ),
  ).toBeVisible()
})

test('conserva el formulario y muestra error si la API falla', async ({ page }) => {
  await page.route(contactEndpoint, (route) =>
    route.fulfill({
      status: 502,
      contentType: 'application/json',
      body: JSON.stringify({ ok: false }),
    }),
  )
  await page.goto('http://localhost:5173/contacto')

  const form = page.locator('.contact-form-panel .contact-form')
  await fillContactForm(form, 'Validación de error Fase 9')
  await form.getByRole('button', { name: 'Enviar' }).click()

  await expect(form.getByRole('alert')).toContainText('No fue posible completar el envío')
  await expect(form.getByRole('button', { name: 'Enviar' })).toBeEnabled()
  await expect(page.getByRole('heading', { name: 'Gracias por tu mensaje' })).toHaveCount(0)
})
