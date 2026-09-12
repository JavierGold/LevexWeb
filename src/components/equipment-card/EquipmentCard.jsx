import { Link } from 'react-router-dom'
import './equipment-card.css'

export default function EquipmentCard({ equipment, index }) {
  return (
    <article
      className="equipment-card"
      style={{ '--equipment-card-offset': `${1.4 + index * 0.25}rem` }}
    >
      <Link
        className="equipment-card__link"
        to={equipment.detailPath}
        aria-label={`Ver equipo ${equipment.brand} ${equipment.model}`}
      >
        <div className="equipment-card__media">
          <span className="equipment-card__index" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <img
            className={`equipment-card__image ${equipment.imageClassName}`}
            src={equipment.image}
            alt={equipment.imageAlt}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="equipment-card__content">
          <p className="equipment-card__brand">{equipment.brand}</p>
          <h3 className="equipment-card__model">{equipment.model}</h3>
          <p className="equipment-card__summary">{equipment.summary}</p>

          <span className="equipment-card__cta" aria-hidden="true">
            <span>Ver equipo</span>
            <span className="equipment-card__arrow">→</span>
          </span>
        </div>
      </Link>
    </article>
  )
}
