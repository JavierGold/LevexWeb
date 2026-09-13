import genieImage from '../../img/GENIE_1.webp'
import jlgImage from '../../img/JLG_1.webp'
import sinoboomImage from '../../img/SINOBOOM_1.webp'

export const equipmentCatalog = [
  {
    brand: 'GENIE',
    model: 'GS-3246',
    summary:
      '11.60 m de altura máxima de trabajo y capacidad de plataforma de 318 kg.',
    image: genieImage,
    imageAlt: 'Plataforma de tijera GENIE GS-3246',
    detailPath: '/equipos/genie-gs-3246',
    imageClassName: 'equipment-card__image--genie',
  },
  {
    brand: 'JLG',
    model: 'E400AJPN',
    summary:
      '14.19 m de altura máxima de trabajo y capacidad de plataforma de 230 kg.',
    image: jlgImage,
    imageAlt: 'Plataforma articulada JLG E400AJPN',
    detailPath: '/equipos/jlg-e400ajpn',
    imageClassName: 'equipment-card__image--jlg',
  },
  {
    brand: 'SINOBOOM',
    model: '0808(2732)',
    summary:
      '10.1 m de altura máxima de trabajo y capacidad de plataforma de 250 kg.',
    image: sinoboomImage,
    imageAlt: 'Plataforma de tijera SINOBOOM 0808(2732)',
    detailPath: '/equipos/sinoboom-0808-2732',
    imageClassName: 'equipment-card__image--sinoboom',
  },
]
