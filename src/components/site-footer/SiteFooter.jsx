import { Link } from 'react-router-dom'
import machineUrl from '../../../img/home_maquina_1.png'
import facebookIconUrl from '../../../img/icon_facebook.svg'
import instagramIconUrl from '../../../img/icon_instagram.svg'
import { primaryNavigation } from '../../config/siteNavigation.js'
import BrandMark from '../brand/BrandMark.jsx'
import './site-footer.css'

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: instagramIconUrl },
  { label: 'Facebook', href: 'https://www.facebook.com/', icon: facebookIconUrl },
]

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <img
        className="site-footer__machine"
        src={machineUrl}
        alt=""
        width="1254"
        height="1254"
        loading="lazy"
        decoding="async"
      />

      <div className="site-footer__inner">
        <div className="site-footer__content">
          <div className="site-footer__brand">
            <BrandMark className="brand-mark--footer" />
            <p>Renta de plataformas de elevación.</p>
          </div>

          <div className="site-footer__columns">
            <section className="footer-section" aria-labelledby="footer-navigation-title">
              <h2 id="footer-navigation-title">Navegación</h2>
              <nav className="footer-links" aria-label="Navegación del pie de página">
                {primaryNavigation.map(({ label, to }) => (
                  <Link key={to} to={to}>
                    {label}
                  </Link>
                ))}
              </nav>
            </section>

            <section className="footer-section" aria-labelledby="footer-contact-title">
              <h2 id="footer-contact-title">Contacto</h2>
              <div className="footer-links">
                <a href="mailto:contacto@levexco.com">contacto@levexco.com</a>
                <a href="tel:+524791050766">479 105 0766</a>
                <a href="tel:+524771178881">477 117 8881</a>
              </div>
            </section>

            <section className="footer-section" aria-labelledby="footer-offices-title">
              <h2 id="footer-offices-title">Oficinas</h2>
              <address>
                Blv. Campestre 2502 Piso 7
                <br />
                Col. El Refugio Campestre
                <br />
                León, Guanajuato C.P. 37156
              </address>
            </section>

            <section className="footer-section" aria-labelledby="footer-social-title">
              <h2 id="footer-social-title">Redes sociales</h2>
              <div className="footer-links footer-links--social">
                {socialLinks.map(({ label, href, icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                    <span className="footer-social-icon" aria-hidden="true">
                      <img src={icon} alt="" width="24" height="24" />
                    </span>
                    {label}
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="site-footer__legal">
          <p>© 2026 LEVEX</p>
          <p>Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
