import { useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../app/routes.js'
import { primaryNavigation } from '../../config/siteNavigation.js'
import { scrollToSection } from '../../utils/scrollToSection.js'
import BrandMark from '../brand/BrandMark.jsx'
import './site-header.css'

function NavigationLinks({ onNavigate, mobile = false }) {
  const location = useLocation()
  const navigate = useNavigate()

  const linkClasses = (isActive) =>
    ['site-nav__link', mobile ? 'site-nav__link--mobile' : '', isActive ? 'is-active' : '']
      .filter(Boolean)
      .join(' ')

  return primaryNavigation.map(({ label, to, end, hash }) => {
    if (hash) {
      const isActive = location.pathname === ROUTES.home && location.hash === hash

      const handleEquipmentClick = (event) => {
        onNavigate?.()
        if (location.pathname !== ROUTES.home) return

        event.preventDefault()
        if (location.hash !== hash) {
          navigate(to)
          return
        }

        scrollToSection(hash.slice(1))
      }

      return (
        <Link
          key={to}
          className={linkClasses(isActive)}
          to={to}
          aria-current={isActive ? 'page' : undefined}
          onClick={handleEquipmentClick}
        >
          {label}
        </Link>
      )
    }

    return (
      <NavLink
        key={to}
        className={({ isActive }) =>
          linkClasses(isActive && !(to === ROUTES.home && location.hash === '#equipos'))
        }
        to={to}
        end={end}
        onClick={onNavigate}
      >
        {label}
      </NavLink>
    )
  })
}

function HeaderCta({ className, onNavigate, onQuoteRequest }) {
  const handleClick = () => {
    onNavigate?.()
    onQuoteRequest()
  }

  return (
    <button
      className={`header-cta ${className}`}
      type="button"
      onClick={handleClick}
    >
      <span>Cotizar</span>
      <span className="header-cta__arrow" aria-hidden="true">
        <svg viewBox="0 0 20 20" focusable="false">
          <path d="M4 10h11M11 6l4 4-4 4" />
        </svg>
      </span>
    </button>
  )
}

export default function SiteHeader({ onQuoteRequest }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef(null)

  const closeMenu = () => setIsMenuOpen(false)

  const handleHeaderKeyDown = (event) => {
    if (event.key !== 'Escape' || !isMenuOpen) return

    closeMenu()
    menuButtonRef.current?.focus()
  }

  return (
    <header className="site-header" onKeyDown={handleHeaderKeyDown}>
      <a className="skip-link" href="#main-content">
        Saltar al contenido
      </a>

      <div className="site-header__inner">
        <BrandMark className="brand-mark--header" onNavigate={closeMenu} />

        <nav className="site-nav site-nav--desktop" aria-label="Navegación principal">
          <NavigationLinks />
        </nav>

        <HeaderCta
          className="header-cta--desktop"
          onQuoteRequest={onQuoteRequest}
        />

        <button
          ref={menuButtonRef}
          className="menu-toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <span className="menu-toggle__icon" data-open={isMenuOpen} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      {isMenuOpen ? (
        <div className="mobile-menu" id="mobile-navigation">
          <nav className="mobile-menu__inner" aria-label="Navegación móvil">
            <NavigationLinks mobile onNavigate={closeMenu} />
            <HeaderCta
              className="header-cta--mobile"
              onNavigate={closeMenu}
              onQuoteRequest={onQuoteRequest}
            />
          </nav>
        </div>
      ) : null}
    </header>
  )
}
