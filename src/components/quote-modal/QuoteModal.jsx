import { useEffect, useRef } from 'react'
import ContactForm from '../contact-form/ContactForm.jsx'
import './quote-modal.css'

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export default function QuoteModal({ isOpen, onClose }) {
  const panelRef = useRef(null)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined

    const previouslyFocusedElement = document.activeElement
    const previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus()
    })

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusableElements = Array.from(
        panelRef.current?.querySelectorAll(focusableSelector) ?? [],
      )
      if (!focusableElements.length) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements.at(-1)

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousBodyOverflow
      previouslyFocusedElement?.focus()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleBackdropPointerDown = (event) => {
    if (event.target === event.currentTarget) onClose()
  }

  return (
    <div
      className="quote-modal"
      role="presentation"
      onMouseDown={handleBackdropPointerDown}
    >
      <section
        ref={panelRef}
        className="quote-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-modal-title"
      >
        <button
          ref={closeButtonRef}
          className="quote-modal__close"
          type="button"
          aria-label="Cerrar cotización"
          onClick={onClose}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <header className="quote-modal__header">
          <p>Cotizar</p>
          <h2 id="quote-modal-title">Cuéntanos sobre tu proyecto</h2>
        </header>

        <ContactForm />
      </section>
    </div>
  )
}
