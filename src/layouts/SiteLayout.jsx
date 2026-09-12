import RouteScrollManager from '../components/route-scroll-manager/RouteScrollManager.jsx'
import SiteFooter from '../components/site-footer/SiteFooter.jsx'
import SiteHeader from '../components/site-header/SiteHeader.jsx'
import WhatsAppButton from '../components/whatsapp/WhatsAppButton.jsx'
import './site-layout.css'

export default function SiteLayout({ children }) {
  return (
    <div className="site-shell">
      <RouteScrollManager />
      <SiteHeader />
      <main className="site-main" id="main-content" tabIndex="-1">
        {children}
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  )
}
