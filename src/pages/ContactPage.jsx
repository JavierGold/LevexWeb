import ContactForm from '../components/contact-form/ContactForm.jsx'
import { contactDetails } from '../data/contactContent.js'
import contactGiraffe from '../../img/jirafa_3.webp'
import './contact-page.css'

export default function ContactPage() {
  return (
    <>
      <title>Contacto | LEVEX</title>

      <div className="contact-page">
        <section className="contact-hero" aria-labelledby="contact-hero-title">
          <div className="contact-hero__inner">
            <p className="contact-eyebrow contact-eyebrow--light">Hablemos</p>
            <div className="contact-hero__content">
              <h1 id="contact-hero-title">Contacto</h1>
              <p>
                Cuéntanos sobre tu proyecto. Te ayudaremos a encontrar la plataforma
                adecuada para trabajar con seguridad y eficiencia.
              </p>
            </div>
          </div>
        </section>

        <section className="contact-workspace" aria-label="Información y formulario">
          <div className="contact-workspace__inner scroll-reveal">
            <aside className="contact-directory" aria-labelledby="contact-directory-title">
              <header>
                <p className="contact-eyebrow">Datos de contacto</p>
                <h2 id="contact-directory-title">Estamos para ayudarte</h2>
              </header>

              <div className="contact-directory__list">
                <section className="contact-channel" aria-labelledby="contact-email-title">
                  <h3 id="contact-email-title">Correo</h3>
                  <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
                </section>

                <section className="contact-channel" aria-labelledby="contact-phones-title">
                  <h3 id="contact-phones-title">Teléfonos</h3>
                  <div>
                    {contactDetails.phones.map((phone) => (
                      <a key={phone.href} href={phone.href}>
                        {phone.label}
                      </a>
                    ))}
                  </div>
                </section>

                <section className="contact-channel" aria-labelledby="contact-whatsapp-title">
                  <h3 id="contact-whatsapp-title">WhatsApp</h3>
                  <a
                    href={contactDetails.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${contactDetails.whatsapp.label}; abre en una pestaña nueva`}
                  >
                    {contactDetails.whatsapp.label}
                  </a>
                </section>

                <section className="contact-channel" aria-labelledby="contact-offices-title">
                  <h3 id="contact-offices-title">Oficinas</h3>
                  <address>
                    {contactDetails.address.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </address>
                </section>
              </div>

              <figure className="contact-directory__visual" aria-hidden="true">
                <img
                  src={contactGiraffe}
                  alt=""
                  width="1254"
                  height="1254"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </aside>

            <section className="contact-form-panel" aria-labelledby="contact-form-title">
              <header className="contact-form-panel__header">
                <p className="contact-eyebrow">Escríbenos</p>
                <h2 id="contact-form-title">Envíanos tu mensaje</h2>
              </header>
              <ContactForm origin="Contacto" />
            </section>
          </div>
        </section>
      </div>
    </>
  )
}
