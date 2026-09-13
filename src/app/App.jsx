import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTES } from './routes.js'
import HomePage from '../pages/HomePage.jsx'
import SiteLayout from '../layouts/SiteLayout.jsx'

const EquipmentDetailPage = lazy(
  () => import('../pages/EquipmentDetailPage.jsx'),
)

const AboutPage = lazy(() => import('../pages/AboutPage.jsx'))
const ContactPage = lazy(() => import('../pages/ContactPage.jsx'))

const aboutPageFallback = (
  <div className="route-loading" role="status" aria-live="polite">
    Cargando Sobre Nosotros…
  </div>
)

const contactPageFallback = (
  <div className="route-loading" role="status" aria-live="polite">
    Cargando Contacto…
  </div>
)

const equipmentDetailFallback = (
  <div className="route-loading" role="status" aria-live="polite">
    Cargando equipo…
  </div>
)

export default function App() {
  return (
    <SiteLayout>
      <Routes>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route
          path={ROUTES.about}
          element={
            <Suspense fallback={aboutPageFallback}>
              <AboutPage />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.contact}
          element={
            <Suspense fallback={contactPageFallback}>
              <ContactPage />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.equipment}
          element={
            <Suspense fallback={equipmentDetailFallback}>
              <EquipmentDetailPage />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
      </Routes>
    </SiteLayout>
  )
}
