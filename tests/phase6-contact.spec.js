import { expect, test } from '@playwright/test'

test('valida Contacto y reutiliza el formulario en el modal COTIZAR', async ({ page }) => {
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
  await expect(pageForm.locator('.contact-form__error')).toHaveCount(6)
  await expect(pageForm.getByLabel('Nombre')).toBeFocused()

  await pageForm.getByLabel('Nombre').fill('María')
  await pageForm.getByLabel('Apellido').fill('López')
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

  await page.screenshot({
    path: 'test-results/phase6-contact-page.png',
    fullPage: true,
  })

  const quoteTrigger = page.getByRole('button', { name: 'Cotizar' })
  await quoteTrigger.click()
  const dialog = page.getByRole('dialog', { name: 'Cuéntanos sobre tu proyecto' })
  await expect(dialog).toBeVisible()
  await expect(dialog.locator('.contact-form')).toHaveCount(1)
  await expect(dialog.locator('input[required], textarea[required]')).toHaveCount(6)
  await expect(dialog.getByRole('button', { name: 'Cerrar cotización' })).toBeFocused()
  await dialog.screenshot({ path: 'test-results/phase6-quote-modal.png' })

  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(quoteTrigger).toBeFocused()

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  )
  expect(hasHorizontalOverflow).toBe(false)
})
