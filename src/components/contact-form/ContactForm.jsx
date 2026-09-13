import { useId, useState } from 'react'
import { submitContactForm } from '../../services/contactApi.js'
import './contact-form.css'

const initialValues = Object.freeze({
  firstName: '',
  lastName: '',
  companyName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
})

const fields = Object.freeze([
  Object.freeze({
    name: 'firstName',
    label: 'Nombre',
    type: 'text',
    autoComplete: 'given-name',
    maxLength: 80,
  }),
  Object.freeze({
    name: 'lastName',
    label: 'Apellido',
    type: 'text',
    autoComplete: 'family-name',
    maxLength: 80,
  }),
  Object.freeze({
    name: 'companyName',
    label: 'Nombre de la empresa',
    type: 'text',
    autoComplete: 'organization',
    maxLength: 120,
    wide: true,
  }),
  Object.freeze({
    name: 'email',
    label: 'Correo electrónico',
    type: 'email',
    autoComplete: 'email',
    inputMode: 'email',
    maxLength: 254,
  }),
  Object.freeze({
    name: 'phone',
    label: 'Teléfono',
    type: 'tel',
    autoComplete: 'tel',
    inputMode: 'tel',
    maxLength: 30,
  }),
  Object.freeze({
    name: 'subject',
    label: 'Asunto',
    type: 'text',
    autoComplete: 'off',
    maxLength: 120,
    wide: true,
  }),
  Object.freeze({
    name: 'message',
    label: 'Mensaje',
    autoComplete: 'off',
    maxLength: 2000,
    multiline: true,
    wide: true,
  }),
])

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const phoneCharactersPattern = /^[+\d\s().-]+$/

function validateField(name, value) {
  const normalizedValue = value.trim()
  if (!normalizedValue) return 'Este campo es obligatorio.'

  if (name === 'email' && !emailPattern.test(normalizedValue)) {
    return 'Ingresa un correo electrónico válido.'
  }

  if (name === 'phone') {
    const digits = normalizedValue.replace(/\D/g, '')
    if (!phoneCharactersPattern.test(normalizedValue) || digits.length < 10 || digits.length > 15) {
      return 'Ingresa un teléfono válido de 10 a 15 dígitos.'
    }
  }

  return ''
}

function FormField({ field, formId, value, error, onBlur, onChange }) {
  const inputId = `${formId}-${field.name}`
  const errorId = `${inputId}-error`
  const isComplete = Boolean(value.trim()) && !validateField(field.name, value)
  const className = [
    'contact-form__field',
    field.wide ? 'contact-form__field--wide' : '',
    error ? 'is-invalid' : '',
    isComplete ? 'is-complete' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const sharedProps = {
    id: inputId,
    name: field.name,
    value,
    maxLength: field.maxLength,
    autoComplete: field.autoComplete,
    required: true,
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? errorId : undefined,
    onBlur: () => onBlur(field.name),
    onChange: (event) => onChange(field.name, event.target.value),
  }

  return (
    <div className={className}>
      <label htmlFor={inputId}>
        {field.label} <span aria-hidden="true">*</span>
      </label>
      {field.multiline ? (
        <textarea {...sharedProps} rows="5" />
      ) : (
        <input
          {...sharedProps}
          type={field.type}
          inputMode={field.inputMode}
        />
      )}
      {error ? (
        <span className="contact-form__error" id={errorId}>
          {error}
        </span>
      ) : null}
    </div>
  )
}

export default function ContactForm({ origin, onSubmit = submitContactForm }) {
  const formId = useId()
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const handleChange = (name, value) => {
    setValues((currentValues) => ({ ...currentValues, [name]: value }))
    setErrors((currentErrors) => {
      if (!currentErrors[name]) return currentErrors
      return { ...currentErrors, [name]: validateField(name, value) }
    })
    if (status === 'error') setStatus('idle')
  }

  const handleBlur = (name) => {
    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: validateField(name, values[name]),
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = Object.fromEntries(
      fields.map(({ name }) => [name, validateField(name, values[name])]),
    )
    const firstInvalidField = fields.find(({ name }) => nextErrors[name])

    if (firstInvalidField) {
      setErrors(nextErrors)
      event.currentTarget.elements.namedItem(firstInvalidField.name)?.focus()
      return
    }

    const normalizedValues = Object.fromEntries(
      Object.entries(values).map(([name, value]) => [name, value.trim()]),
    )

    setErrors({})
    setStatus('submitting')

    try {
      await onSubmit({ ...normalizedValues, origin })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
    setStatus('idle')
  }

  if (status === 'success') {
    return (
      <div className="contact-form__success" role="status" aria-live="polite">
        <span className="contact-form__success-icon" aria-hidden="true">
          <svg viewBox="0 0 32 32" focusable="false">
            <path d="m8.5 16.5 5 5 10-11" />
          </svg>
        </span>
        <h3>Gracias por tu mensaje</h3>
        <p>
          Hemos recibido tu información. Nos pondremos en contacto contigo lo antes
          posible.
        </p>
        <button type="button" onClick={resetForm}>
          Enviar otro mensaje
        </button>
      </div>
    )
  }

  return (
    <form
      className="contact-form"
      noValidate
      aria-busy={status === 'submitting'}
      onSubmit={handleSubmit}
    >
      {status === 'error' ? (
        <div className="contact-form__submit-error" role="alert">
          No fue posible completar el envío. Revisa tu información e inténtalo de
          nuevo.
        </div>
      ) : null}

      {fields.map((field) => (
        <FormField
          key={field.name}
          field={field}
          formId={formId}
          value={values[field.name]}
          error={errors[field.name]}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      ))}

      <div className="contact-form__actions">
        <p>* Campos obligatorios</p>
        <button type="submit" disabled={status === 'submitting'}>
          <span>{status === 'submitting' ? 'Enviando…' : 'Enviar'}</span>
          <span className="contact-form__submit-arrow" aria-hidden="true">
            →
          </span>
        </button>
      </div>
    </form>
  )
}
