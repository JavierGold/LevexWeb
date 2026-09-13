import { Navigate, Link, useParams } from 'react-router-dom'
import TechnicalTable from '../components/technical-table/TechnicalTable.jsx'
import { ROUTES } from '../app/routes.js'
import { getEquipmentBySlug } from '../data/equipmentDetails.js'
import './equipment-detail-page.css'

export default function EquipmentDetailPage() {
  const { equipmentSlug } = useParams()
  const equipment = getEquipmentBySlug(equipmentSlug)

  if (!equipment) {
    return <Navigate to={ROUTES.home} replace />
  }

  const quotePath = `${ROUTES.contact}?equipo=${encodeURIComponent(
    `${equipment.brand} ${equipment.model}`,
  )}`
  const galleryClassName = equipment.photos.length === 1 ? ' is-single' : ''

  return (
    <>
      <title>{`${equipment.brand} ${equipment.model} | LEVEX`}</title>

      <div className="equipment-detail">
        <section
          className="equipment-detail__overview"
          aria-labelledby="equipment-detail-title"
        >
          <div className="equipment-detail__overview-inner">
            <div className="equipment-detail__panel">
              <Link className="equipment-detail__back" to={ROUTES.equipmentSection}>
                <span aria-hidden="true">←</span>
                Todos los equipos
              </Link>

              <header
                className={`equipment-detail__header${
                  equipment.model.length > 9 ? ' is-long-model' : ''
                }`}
              >
                <p>{equipment.brand}</p>
                <h1 id="equipment-detail-title">{equipment.model}</h1>
              </header>

              <dl className="equipment-detail__highlights">
                {equipment.highlights.map((highlight) => (
                  <div key={highlight.label}>
                    <dt>{highlight.label}</dt>
                    <dd>{highlight.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="equipment-detail__specifications">
                <h2>Especificaciones técnicas</h2>
                <TechnicalTable rows={equipment.specifications} />
              </div>

              <Link className="equipment-detail__quote" to={quotePath}>
                <span>Solicitar cotización</span>
                <span className="equipment-detail__quote-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>

            <div
              className={`equipment-detail__photos${galleryClassName}`}
              role="group"
              aria-label={`Galería de ${equipment.brand} ${equipment.model}`}
            >
              {equipment.photos.map((photo, index) => (
                <figure className="equipment-detail__photo" key={photo.src}>
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                    decoding="async"
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section
          className="equipment-detail__drawing-section"
          aria-labelledby="equipment-drawing-title"
        >
          <div className="equipment-detail__drawing-inner">
            <header className="equipment-detail__drawing-header">
              <h2 id="equipment-drawing-title">Vistas técnicas</h2>
              <p>{`${equipment.brand} ${equipment.model}`}</p>
            </header>
            <figure className="equipment-detail__drawing">
              <img
                src={equipment.drawing.src}
                alt={equipment.drawing.alt}
                width={equipment.drawing.width}
                height={equipment.drawing.height}
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </section>
      </div>
    </>
  )
}
