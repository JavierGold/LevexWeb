import { useCallback, useState } from 'react'
import QuoteModal from '../components/quote-modal/QuoteModal.jsx'
import RouteScrollManager from '../components/route-scroll-manager/RouteScrollManager.jsx'
import SiteFooter from '../components/site-footer/SiteFooter.jsx'
import SiteHeader from '../components/site-header/SiteHeader.jsx'
import WhatsAppButton from '../components/whatsapp/WhatsAppButton.jsx'
import './site-layout.css'

export default function SiteLayout({ children }) {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const openQuoteModal = useCallback(() => setIsQuoteModalOpen(true), [])
  const closeQuoteModal = useCallback(() => setIsQuoteModalOpen(false), [])

  return (
    <div className="site-shell">
      <RouteScrollManager />
      <SiteHeader onQuoteRequest={openQuoteModal} />
      <main className="site-main" id="main-content" tabIndex="-1">
        {children}
      </main>
      <SiteFooter />
      <WhatsAppButton />
      <QuoteModal isOpen={isQuoteModalOpen} onClose={closeQuoteModal} />
    </div>
  )
}
