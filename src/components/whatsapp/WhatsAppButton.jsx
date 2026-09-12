import whatsappIconUrl from '../../../img/whatsapp_logo.png'
import './whatsapp-button.css'

const WHATSAPP_URL = 'https://wa.me/524791050766'

export default function WhatsAppButton() {
  return (
    <a
      className="whatsapp-button"
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar a LEVEX por WhatsApp; abre en una pestaña nueva"
    >
      <span className="whatsapp-button__icon" aria-hidden="true">
        <img src={whatsappIconUrl} alt="" width="128" height="128" />
      </span>
    </a>
  )
}
