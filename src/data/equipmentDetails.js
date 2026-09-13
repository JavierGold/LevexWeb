import genieImageOne from '../../img/GENIE_1.webp'
import genieImageTwo from '../../img/GENIE_2.webp'
import genieDrawing from '../../img/GENIE_3.webp'
import jlgImageOne from '../../img/JLG_1.webp'
import jlgImageTwo from '../../img/JLG_2.webp'
import jlgDrawing from '../../img/JLG_3.webp'
import sinoboomImageOne from '../../img/SINOBOOM_1.webp'
import sinoboomImageTwo from '../../img/SINOBOOM_2.webp'
import sinoboomDrawing from '../../img/SINOBOOM_3.webp'

const equipmentDetails = [
  {
    slug: 'genie-gs-3246',
    brand: 'GENIE',
    model: 'GS-3246',
    highlights: [
      { label: 'Altura de trabajo', value: '11.60 m' },
      { label: 'Capacidad', value: '318 kg' },
      { label: 'Alimentación', value: '24 V DC' },
    ],
    specifications: [
      ['Altura máxima de trabajo', '11.60 m', '37 ft 6 in'],
      ['Altura máxima de plataforma', '9.60 m', '31 ft 6 in'],
      ['Capacidad de plataforma', '318 kg', '700 lb'],
      ['Longitud del equipo replegado/recogido', '2.36 m', '7 ft 9 in'],
      ['Ancho total del equipo', '1.17 m', '3 ft 10 in'],
      ['Distancia entre ejes', '1.78 m', '5 ft 10 in'],
      ['Distancia/altura libre al suelo', '0.13 m', '5 in'],
      ['Velocidad de traslación', '4.0 km/h', '2.5 mph'],
      ['Radio de giro', '0 / 2.20 m', '0 / 7 ft 4 in'],
      ['Peso del equipo', '2,208 kg', '4,867 lb'],
      ['Fuente / sistema de alimentación', '24 V DC', '24 V DC'],
      [
        'Baterías',
        '4 × 6 V / 210 Ah (FLA); 4 × 6 V / 220 Ah (AGM); 1 × 24 V / 90 Ah o 100 Ah (litio)',
        '—',
      ],
      ['Tipo de neumáticos', '38 × 13 cm', '15 × 5 in'],
    ],
    photos: [
      {
        src: genieImageOne,
        alt: 'GENIE GS-3246 elevada, vista completa',
        width: 1254,
        height: 1254,
      },
      {
        src: genieImageTwo,
        alt: 'GENIE GS-3246 en configuración compacta',
        width: 1254,
        height: 1254,
      },
    ],
    drawing: {
      src: genieDrawing,
      alt: 'Plano técnico de la GENIE GS-3246',
      width: 1821,
      height: 864,
    },
  },
  {
    slug: 'jlg-e400ajpn',
    brand: 'JLG',
    model: 'E400AJPN',
    highlights: [
      { label: 'Altura de trabajo', value: '14.19 m' },
      { label: 'Capacidad', value: '230 kg' },
      { label: 'Alimentación', value: '48 V DC' },
    ],
    specifications: [
      ['Altura máxima de trabajo', '14.19 m', '46 ft 7 in'],
      ['Capacidad de plataforma', '230 kg', '507 lb'],
      ['Longitud del equipo replegado/recogido', '6.71 m', '22 ft'],
      ['Ancho total del equipo', '1.50 m', '4 ft 11 in'],
      ['Distancia entre ejes', '2.01 m', '6 ft 7 in'],
      ['Distancia/altura libre al suelo', '0.13 m', '5.1 in'],
      ['Velocidad de traslación', '4.8 km/h', '3.0 mph'],
      ['Radio de giro interior / exterior', '0.86 m / 3.15 m', '2 ft 10 in / 10 ft 4 in'],
      ['Peso del equipo', '6,850 kg', '15,102 lb'],
      ['Fuente / sistema de alimentación', '48 V DC', '48 V DC'],
      ['Baterías', '8 × 6 V / 370 Ah', '—'],
      [
        'Neumáticos delanteros',
        '22 × 6 × 17.05; macizos, no dejan huella',
        '—',
      ],
      ['Neumáticos traseros', '25 × 7-12; macizos, no dejan huella', '—'],
    ],
    photos: [
      {
        src: jlgImageOne,
        alt: 'JLG E400AJPN en configuración replegada',
        width: 1254,
        height: 1254,
      },
      {
        src: jlgImageTwo,
        alt: 'JLG E400AJPN extendida, vista completa',
        width: 1254,
        height: 1254,
      },
    ],
    drawing: {
      src: jlgDrawing,
      alt: 'Plano técnico de la JLG E400AJPN',
      width: 1824,
      height: 862,
    },
  },
  {
    slug: 'sinoboom-0808-2732',
    brand: 'SINOBOOM',
    model: '0808(2732)',
    highlights: [
      { label: 'Altura de trabajo', value: '10.1 m' },
      { label: 'Capacidad', value: '250 kg' },
      { label: 'Alimentación', value: '24 V DC' },
    ],
    specifications: [
      ['Altura máxima de trabajo', '10.1 m', "33'2\""],
      ['Altura máxima de plataforma', '8.1 m', "26'7\""],
      ['Capacidad de plataforma', '250 kg', '551 lb'],
      ['Longitud replegada', '2.39 m', "7'10\""],
      ['Ancho total', '0.81 m', "2'8\""],
      ['Distancia entre ejes', '1.85 m', "6'1\""],
      ['Altura libre al suelo', '0.10 m', '4"'],
      ['Velocidad de traslación replegada', '3.2 km/h', '2 mph'],
      ['Radio de giro interior/exterior', '0 / 2.1 m', "0 / 6'11\""],
      ['Peso', '1,970 kg', '4,344 lb'],
      ['Alimentación', '24 V DC', '24 V DC'],
      ['Baterías', '6 V × 4 / 225 Ah', '—'],
      ['Neumáticos sólidos', '380 × 125 mm', '15 × 5"'],
    ],
    photos: [
      {
        src: sinoboomImageOne,
        alt: 'SINOBOOM 0808(2732) elevada, vista completa',
        width: 409,
        height: 704,
      },
      {
        src: sinoboomImageTwo,
        alt: 'SINOBOOM 0808(2732) en configuración compacta',
        width: 1240,
        height: 1268,
      },
    ],
    drawing: {
      src: sinoboomDrawing,
      alt: 'Plano técnico de la SINOBOOM 0808(2732)',
      width: 1824,
      height: 862,
    },
  },
]

const equipmentBySlug = new Map(
  equipmentDetails.map((equipment) => [equipment.slug, equipment]),
)

export function getEquipmentBySlug(slug) {
  return equipmentBySlug.get(slug)
}
