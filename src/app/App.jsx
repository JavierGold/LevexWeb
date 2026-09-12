import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTES } from './routes.js'
import FoundationPage from '../pages/FoundationPage.jsx'
import HomePage from '../pages/HomePage.jsx'
import SiteLayout from '../layouts/SiteLayout.jsx'

const EquipmentDetailPage = lazy(
  () => import('../pages/EquipmentDetailPage.jsx'),
)

const AboutPage = lazy(() => import('../pages/AboutPage.jsx'))

const aboutPageFallback = (
  <main className="route-loading" aria-live="polite">
    Cargando Sobre Nosotros…
  </main>
)

const equipmentDetailFallback = (
  <main className="route-loading" aria-live="polite">
    Cargando equipo…
  </main>
)

const secondaryPages = [
  { path: ROUTES.contact, title: 'Contacto' },
]

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
        {secondaryPages.map(({ path, title }) => (
          <Route
            key={path}
            path={path}
            element={<FoundationPage title={title} />}
          />
        ))}
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
