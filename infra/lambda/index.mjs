import { SendEmailCommand, SESv2Client } from '@aws-sdk/client-sesv2'

const ses = new SESv2Client({})
const senderEmail = process.env.SENDER_EMAIL
const recipientEmail = process.env.RECIPIENT_EMAIL
const allowedOrigins = new Set(
  (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
)

const fieldRules = Object.freeze({
  firstName: { label: 'Nombre', maxLength: 80 },
  lastName: { label: 'Apellido', maxLength: 80 },
  companyName: { label: 'Nombre de la empresa', maxLength: 120 },
  email: { label: 'Correo', maxLength: 254 },
  phone: { label: 'Teléfono', maxLength: 30 },
  subject: { label: 'Asunto', maxLength: 120 },
  message: { label: 'Mensaje', maxLength: 2000 },
})

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const phoneCharactersPattern = /^[+\d\s().-]+$/
const validOrigins = new Set(['Contacto', 'Cotizar'])

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
    body: JSON.stringify(body),
  }
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    }
    return entities[character]
  })
}

function normalizeSubmission(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null

  const submission = {}
  for (const [name, rule] of Object.entries(fieldRules)) {
    const value = input[name]
    if (typeof value !== 'string') return null

    const normalizedValue = value.trim()
    if (!normalizedValue || normalizedValue.length > rule.maxLength) return null
    submission[name] = normalizedValue
  }

  if (!emailPattern.test(submission.email)) return null

  const phoneDigits = submission.phone.replace(/\D/g, '')
  if (
    !phoneCharactersPattern.test(submission.phone) ||
    phoneDigits.length < 10 ||
    phoneDigits.length > 15
  ) {
    return null
  }

  if (!validOrigins.has(input.origin)) return null
  submission.origin = input.origin

  return submission
}

function renderValue(value, multiline = false) {
  const escapedValue = escapeHtml(value)
  return multiline ? escapedValue.replace(/\r?\n/g, '<br>') : escapedValue
}

function createHtmlEmail(submission) {
  const rows = [
    ['Nombre', submission.firstName],
    ['Apellido', submission.lastName],
    ['Nombre de la empresa', submission.companyName],
    ['Correo', submission.email],
    ['Teléfono', submission.phone],
    ['Asunto', submission.subject],
    ['Origen del formulario', submission.origin],
  ]
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 0;color:#5d6a62;font-size:12px;font-weight:700;vertical-align:top;width:180px;">${label}</td>
          <td style="padding:10px 0;color:#18221c;font-size:14px;font-weight:600;vertical-align:top;">${renderValue(value)}</td>
        </tr>`,
    )
    .join('')

  return `<!doctype html>
<html lang="es">
  <body style="margin:0;padding:0;background:#f2f5f2;font-family:Arial,sans-serif;color:#18221c;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f2f5f2;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#ffffff;border:1px solid #d5ddd7;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:28px 32px;background:#0d3922;color:#ffffff;">
                <div style="display:inline-block;padding:5px 10px;border:2px solid #ffffff;border-radius:4px;font-size:22px;font-weight:800;letter-spacing:-1px;">LEVEX</div>
                <h1 style="margin:24px 0 8px;font-size:28px;line-height:1.15;">Nueva solicitud de contacto</h1>
                <p style="margin:0;color:#b8e7c5;font-size:14px;">Formulario: ${renderValue(submission.origin)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 8px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">${rows}</table>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 32px;">
                <div style="padding:20px;border-radius:10px;background:#f2f5f2;border-left:4px solid #1f5531;">
                  <div style="margin-bottom:8px;color:#1f5531;font-size:12px;font-weight:700;">Mensaje</div>
                  <div style="color:#18221c;font-size:14px;line-height:1.65;">${renderValue(submission.message, true)}</div>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

function createTextEmail(submission) {
  return [
    'Nueva solicitud de contacto LEVEX',
    '',
    `Nombre: ${submission.firstName}`,
    `Apellido: ${submission.lastName}`,
    `Nombre de la empresa: ${submission.companyName}`,
    `Correo: ${submission.email}`,
    `Teléfono: ${submission.phone}`,
    `Asunto: ${submission.subject}`,
    `Origen del formulario: ${submission.origin}`,
    '',
    'Mensaje:',
    submission.message,
  ].join('\n')
}

export async function handler(event) {
  const requestOrigin = event.headers?.origin
  if (requestOrigin && !allowedOrigins.has(requestOrigin)) {
    return jsonResponse(403, { ok: false, message: 'Origen no permitido.' })
  }

  const contentType = event.headers?.['content-type'] || ''
  if (!contentType.toLowerCase().startsWith('application/json')) {
    return jsonResponse(415, { ok: false, message: 'Tipo de contenido no permitido.' })
  }

  let input
  try {
    const body = event.isBase64Encoded
      ? Buffer.from(event.body || '', 'base64').toString('utf8')
      : event.body
    input = JSON.parse(body || '')
  } catch {
    return jsonResponse(400, { ok: false, message: 'Solicitud inválida.' })
  }

  const submission = normalizeSubmission(input)
  if (!submission) {
    return jsonResponse(400, { ok: false, message: 'Revisa los datos enviados.' })
  }

  try {
    await ses.send(
      new SendEmailCommand({
        FromEmailAddress: senderEmail,
        Destination: { ToAddresses: [recipientEmail] },
        ReplyToAddresses: [submission.email],
        Content: {
          Simple: {
            Subject: {
              Data: `Nueva solicitud LEVEX — ${submission.origin}`,
              Charset: 'UTF-8',
            },
            Body: {
              Html: { Data: createHtmlEmail(submission), Charset: 'UTF-8' },
              Text: { Data: createTextEmail(submission), Charset: 'UTF-8' },
            },
          },
        },
      }),
    )

    return jsonResponse(200, { ok: true })
  } catch (error) {
    console.error('SES send failed', {
      requestId: event.requestContext?.requestId,
      errorName: error?.name,
    })
    return jsonResponse(502, { ok: false, message: 'No fue posible enviar el mensaje.' })
  }
}
