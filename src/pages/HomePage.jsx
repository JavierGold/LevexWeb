import { Link } from 'react-router-dom'
import { EquipmentCard } from '../components/equipment-card'
import ServiceIcon from '../components/service-icon/ServiceIcon.jsx'
import TestimonialsCarousel from '../components/testimonials-carousel/TestimonialsCarousel.jsx'
import { ROUTES } from '../app/routes'
import { equipmentCatalog } from '../data/equipmentCatalog'
import {
  homeBenefits,
  homeServices,
  homeTestimonials,
  safetyControls,
} from '../data/homeContent.js'
import heroMachine from '../../img/home_maquina_1.webp'
import adviceGiraffe from '../../img/jirafa_2.webp'
import './home-page.css'

export default function HomePage() {
  return (
    <>
      <title>Inicio | LEVEX</title>

      <div className="home-page">
        <section className="home-hero" aria-labelledby="home-hero-title">
          <div className="home-hero__inner">
            <div className="home-hero__copy">
              <p className="home-hero__eyebrow">LEVEX</p>
              <h1 id="home-hero-title">
                Eleva tu proyecto. Nosotros ponemos el alcance.
              </h1>
              <p className="home-hero__lede">
                Equipos confiables para llevar tu proyecto más alto. Encuentra la
                plataforma adecuada para trabajar con seguridad, eficiencia y
                respaldo.
              </p>

              <div className="home-hero__actions">
                <Link
                  className="home-hero__button home-hero__button--primary"
                  to={ROUTES.equipmentSection}
                >
                  <span>Ver equipos</span>
                  <span className="home-hero__button-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
                <Link
                  className="home-hero__button home-hero__button--secondary"
                  to={ROUTES.contact}
                >
                  Contáctanos
                </Link>
              </div>
            </div>

            <div className="home-hero__media">
              <div className="home-hero__machine-stage">
                <img
                  className="home-hero__machine"
                  src={heroMachine}
                  alt="Plataforma articulada LEVEX para trabajos en altura"
                  width="1254"
                  height="1254"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          className="equipment-section"
          id="equipos"
          aria-labelledby="equipment-section-title"
        >
          <div className="equipment-section__inner">
            <header className="equipment-section__header">
              <div>
                <p className="equipment-section__eyebrow">Soluciones de altura</p>
                <h2 id="equipment-section-title">Nuestros equipos</h2>
              </div>
              <span className="equipment-section__rule" aria-hidden="true" />
            </header>

            <div className="equipment-section__grid">
              {equipmentCatalog.map((equipment, index) => (
                <EquipmentCard
                  key={`${equipment.brand}-${equipment.model}`}
                  equipment={equipment}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        <section
          className="advice-section"
          aria-labelledby="advice-section-title"
        >
          <div className="advice-section__inner">
            <div className="advice-section__copy">
              <p className="advice-section__eyebrow advice-reveal">Asesoría personalizada</p>
              <h2 className="advice-reveal" id="advice-section-title">
                ¿Necesitas ayuda para elegir el equipo adecuado?
              </h2>
              <p className="advice-reveal">
                Cuéntanos sobre tu proyecto y te ayudamos a encontrar la plataforma
                que necesitas.
              </p>
              <Link className="advice-section__cta advice-reveal" to={ROUTES.contact}>
                <span>Contáctanos</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="advice-section__visual advice-reveal" aria-hidden="true">
              <span className="advice-section__measure" />
              <img
                src={adviceGiraffe}
                alt=""
                width="1344"
                height="1145"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </section>

        <section className="why-section" aria-labelledby="why-section-title">
          <div className="why-section__inner scroll-reveal">
            <header className="why-section__header">
              <h2 id="why-section-title">¿Por qué trabajar con nosotros?</h2>
            </header>

            <div className="why-section__layout">
              <ul className="benefits-list">
                {homeBenefits.map((benefit) => (
                  <li key={benefit}>
                    <span className="benefits-list__mark" aria-hidden="true">
                      ✓
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <aside className="safety-panel" aria-labelledby="safety-panel-title">
                <div className="safety-panel__icon" aria-hidden="true">
                  <svg viewBox="0 0 32 32">
                    <path d="M16 3 27 7v8c0 7-4.6 11.5-11 14-6.4-2.5-11-7-11-14V7Z" />
                    <path d="m10.5 15.5 3.5 3.5 7.5-8" />
                  </svg>
                </div>
                <h3 id="safety-panel-title">Seguridad Garantizada</h3>
                <p>Todos nuestros equipos cumplen con:</p>
                <ul>
                  {safetyControls.map((control) => (
                    <li key={control}>{control}</li>
                  ))}
                </ul>
                <strong>Tu seguridad es nuestra prioridad.</strong>
              </aside>
            </div>
          </div>
        </section>

        <section
          className="services-section"
          aria-labelledby="services-section-title"
        >
          <div className="services-section__inner scroll-reveal">
            <header className="services-section__header">
              <h2 id="services-section-title">Servicios</h2>
              <span aria-hidden="true" />
            </header>

            <ol className="services-grid">
              {homeServices.map((service, index) => (
                <li key={service.title}>
                  <div className="services-grid__meta">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <span className="services-grid__icon">
                      <ServiceIcon name={service.icon} />
                    </span>
                  </div>
                  <h3>{service.title}</h3>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="testimonials-section"
          aria-labelledby="testimonials-section-title"
        >
          <div className="testimonials-section__inner scroll-reveal">
            <header className="testimonials-section__header">
              <h2 id="testimonials-section-title">Opiniones de nuestros clientes</h2>
            </header>
            <TestimonialsCarousel testimonials={homeTestimonials} />
          </div>
        </section>
      </div>
    </>
  )
}
