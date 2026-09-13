const contactApiUrl = import.meta.env.VITE_CONTACT_API_URL

export async function submitContactForm(payload) {
  if (!contactApiUrl) {
    throw new Error('VITE_CONTACT_API_URL is not configured.')
  }

  const response = await fetch(contactApiUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`Contact API returned ${response.status}.`)
  }

  const result = await response.json()
  if (result?.ok !== true) {
    throw new Error('Contact API did not confirm the submission.')
  }
}
