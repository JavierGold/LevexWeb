import { Link } from 'react-router-dom'
import logoUrl from '../../../img/logo.webp'
import { ROUTES } from '../../app/routes.js'
import './brand-mark.css'

export default function BrandMark({ className = '', onNavigate }) {
  const classes = ['brand-mark', className].filter(Boolean).join(' ')

  return (
    <Link
      className={classes}
      to={ROUTES.home}
      aria-label="LEVEX, ir al inicio"
      onClick={onNavigate}
    >
      <img
        className="brand-mark__image"
        src={logoUrl}
        width="1680"
        height="945"
        alt="LEVEX"
      />
    </Link>
  )
}
