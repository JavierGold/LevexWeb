import { expect, test } from '@playwright/test'

async function fillValidForm(form, values = {}) {
  await form.locator('input[name="firstName"]').fill(values.firstName || 'María')
  await form.getByLabel('Apellido').fill(values.lastName || 'López')
  await form
    .getByLabel('Nombre de la empresa')
    .fill(values.companyName || 'Construcciones del Bajío')
  await form.getByLabel('Correo electrónico').fill(values.email || 'maria@example.com')
  await form.getByLabel('Teléfono').fill(values.phone || '479 105 0766')
  await form.getByLabel('Asunto').fill(values.subject || 'Renta de plataforma')
  await form
    .getByLabel('Mensaje')
    .fill(values.message || 'Necesito información para un proyecto.')
}

test('valida Contacto y reutiliza el formulario en el modal COTIZAR', async ({ page }) => {
  const submissions = []
  await page.route('**/__test-contact', async (route) => {
    submissions.push(route.request().postDataJSON())
    await new Promise((resolve) => setTimeout(resolve, 350))
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true }),
    })
  })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/contacto')

  const directory = page.locator('.contact-directory')
  await expect(page.getByRole('heading', { level: 1, name: 'Contacto' })).toBeVisible()
  await expect(directory.getByRole('link', { name: 'contacto@levexco.com' })).toHaveAttribute(
    'href',
    'mailto:contacto@levexco.com',
  )
  await expect(directory.getByRole('link', { name: '479 105 0766' }).first()).toHaveAttribute(
    'href',
    'tel:+524791050766',
  )
  await expect(directory.getByRole('link', { name: '477 117 8881' })).toHaveAttribute(
    'href',
    'tel:+524771178881',
  )
  await expect(directory.getByRole('link', { name: '479 105 0766' }).last()).toHaveAttribute(
    'href',
    'https://wa.me/524791050766',
  )

  const pageForm = page.locator('.contact-form-panel .contact-form')
  await pageForm.getByRole('button', { name: 'Enviar' }).click()
  await expect(pageForm.locator('.contact-form__error')).toHaveCount(7)
  const firstNameField = pageForm.locator('input[name="firstName"]')
  await expect(firstNameField).toBeFocused()

  await firstNameField.fill('María')
  await pageForm.getByLabel('Apellido').fill('López')
  await pageForm.getByLabel('Nombre de la empresa').fill('Construcciones del Bajío')
  await pageForm.getByLabel('Correo electrónico').fill('correo-invalido')
  await pageForm.getByLabel('Teléfono').fill('123')
  await pageForm.getByLabel('Asunto').fill('Renta de plataforma')
  await pageForm.getByLabel('Mensaje').fill('Necesito información para un proyecto.')
  await pageForm.getByRole('button', { name: 'Enviar' }).click()
  await expect(pageForm.getByText('Ingresa un correo electrónico válido.')).toBeVisible()
  await expect(pageForm.getByText('Ingresa un teléfono válido de 10 a 15 dígitos.')).toBeVisible()

  await pageForm.getByLabel('Correo electrónico').fill('maria@example.com')
  await pageForm.getByLabel('Teléfono').fill('479 105 0766')
  await pageForm.getByRole('button', { name: 'Enviar' }).click()
  await expect(pageForm).toHaveAttribute('aria-busy', 'true')
  await expect(pageForm.getByRole('button', { name: 'Enviando…' })).toBeDisabled()
  await expect(page.getByRole('heading', { name: 'Gracias por tu mensaje' })).toBeVisible()
  expect(submissions).toHaveLength(1)
  expect(submissions[0]).toMatchObject({
    firstName: 'María',
    lastName: 'López',
    companyName: 'Construcciones del Bajío',
    email: 'maria@example.com',
    phone: '479 105 0766',
    subject: 'Renta de plataforma',
    message: 'Necesito información para un proyecto.',
    origin: 'Contacto',
  })

  await page.screenshot({
    path: 'test-results/phase6-contact-page.png',
    fullPage: true,
  })

  if (page.viewportSize().width <= 1088) {
    await page.getByRole('button', { name: 'Abrir menú' }).click()
  }
  const quoteTrigger = page.locator('.header-cta:visible')
  await quoteTrigger.click()
  const dialog = page.getByRole('dialog', { name: 'Cuéntanos sobre tu proyecto' })
  await expect(dialog).toBeVisible()
  await expect(dialog.locator('.contact-form')).toHaveCount(1)
  await expect(dialog.locator('input[required], textarea[required]')).toHaveCount(7)
  await expect(dialog.getByRole('button', { name: 'Cerrar cotización' })).toBeFocused()

  const modalForm = dialog.locator('.contact-form')
  await fillValidForm(modalForm, {
    firstName: 'Carlos',
    lastName: 'Ramírez',
    companyName: 'Proyecto Altura',
    email: 'carlos@example.com',
    phone: '477 117 8881',
    subject: 'Cotización desde modal',
    message: 'Solicito disponibilidad y precio del equipo.',
  })
  await modalForm.getByRole('button', { name: 'Enviar' }).click()
  await expect(dialog.getByRole('heading', { name: 'Gracias por tu mensaje' })).toBeVisible()
  expect(submissions).toHaveLength(2)
  expect(submissions[1]).toMatchObject({
    firstName: 'Carlos',
    origin: 'Cotizar',
  })
  await dialog.screenshot({ path: 'test-results/phase6-quote-modal.png' })

  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(quoteTrigger).toBeFocused()

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  )
  expect(hasHorizontalOverflow).toBe(false)
})

test('mantiene el formulario y muestra error cuando AWS rechaza el envío', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop')

  await page.route('**/__test-contact', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 350))
    await route.fulfill({
      status: 502,
      contentType: 'application/json',
      body: JSON.stringify({ ok: false }),
    })
  })
  await page.goto('/contacto')

  const form = page.locator('.contact-form-panel .contact-form')
  await fillValidForm(form)
  await form.getByRole('button', { name: 'Enviar' }).click()

  await expect(form).toHaveAttribute('aria-busy', 'true')
  await expect(form.getByRole('alert')).toContainText('No fue posible completar el envío')
  await expect(form.getByRole('button', { name: 'Enviar' })).toBeEnabled()
  await expect(page.getByRole('heading', { name: 'Gracias por tu mensaje' })).toHaveCount(0)
})
