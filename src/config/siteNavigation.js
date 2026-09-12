import { ROUTES } from '../app/routes.js'

export const primaryNavigation = Object.freeze([
  { label: 'Inicio', to: ROUTES.home, end: true },
  { label: 'Sobre nosotros', to: ROUTES.about },
  { label: 'Equipo', to: ROUTES.equipmentSection, hash: '#equipos' },
  { label: 'Contacto', to: ROUTES.contact },
])
