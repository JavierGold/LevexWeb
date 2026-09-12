import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SiteFooter from '../components/site-footer/SiteFooter.jsx'
import SiteHeader from '../components/site-header/SiteHeader.jsx'
import WhatsAppButton from '../components/whatsapp/WhatsAppButton.jsx'
import { scrollToSection } from '../utils/scrollToSection.js'
import './site-layout.css'

function HashScrollManager() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (!hash) return undefined

    const frame = window.requestAnimationFrame(() => {
      scrollToSection(hash.slice(1))
    })

    return () => window.cancelAnimationFrame(frame)
  }, [hash, pathname])

  return null
}

export default function SiteLayout({ children }) {
  return (
    <div className="site-shell">
      <HashScrollManager />
      <SiteHeader />
      <main className="site-main" id="main-content" tabIndex="-1">
        {children}
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  )
}
