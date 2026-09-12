# SPEC.md — LEVEX

> Especificación funcional, visual y técnica del sitio.  
> Los IDs de sección coinciden con `CONTENT.md` para que cada fase pueda leer únicamente lo necesario.

---

# 1. Alcance general

## GLOBAL-01 — Tecnología y arquitectura

- Sitio web estático desarrollado con **React**.
- Debe incluir **ruteo**.
- Páginas principales:
  - Inicio
  - Sobre Nosotros
  - Contacto
- Debe incluir páginas individuales para los tres equipos.
- El despliegue se realizará en **AWS S3 + CloudFront** únicamente cuando el frontend esté terminado, revisado y aprobado.
- El formulario se construirá primero a nivel frontend; la integración real de envío por correo mediante AWS se implementará al final.
- No exponer credenciales, secretos ni información sensible en el frontend.
- Aplicar buenas prácticas de:
  - React
  - reutilización de componentes
  - mantenibilidad
  - separación de responsabilidades
  - rendimiento
  - accesibilidad
  - seguridad frontend
  - uso correcto de dependencias
- Refactorizar únicamente cuando exista una mejora clara de calidad, mantenibilidad o reutilización.

---

## GLOBAL-02 — Dirección visual

El sitio debe transmitir una imagen:

- profesional;
- moderna;
- elegante;
- confiable;
- limpia;
- corporativa;
- no genérica.

### Identidad visual

- Verde de referencia: `#1F5531`.
- Puede ajustarse a un verde cercano más elegante si mejora el resultado.
- Complementar con blancos, grises, neutros y acentos coherentes con la marca.
- Logo oficial: `img/logo.jpg`.
- Tipografía: moderna, atractiva, elegante y altamente legible.
- Mantener jerarquía visual clara y espaciado consistente.
- Evitar efectos excesivos, ruido visual y recursos que resten profesionalismo.

### Animación

- Animaciones suaves y elegantes al hacer scroll.
- Aparición progresiva de textos, imágenes y elementos.
- Se permiten animaciones 3D cuando aporten valor y no afecten rendimiento.
- Evitar animaciones agresivas o decorativas sin propósito.

### Microinteracciones de iconos, tarjetas y elementos interactivos

Las microinteracciones deberán formar parte del lenguaje visual general del sitio y ayudar a que la interfaz se sienta moderna, elegante y dinámica.

En tarjetas, servicios, aplicaciones, beneficios y otros elementos interactivos:

- Los elementos deberán responder suavemente al hover o interacción.
- Los iconos podrán cambiar el color de su contenedor al verde/acento principal.
- Cuando el fondo del icono cambie a un tono oscuro o intenso, el icono deberá cambiar a blanco o a un tono de alto contraste.
- El contenedor del icono podrá rotar ligeramente unos pocos grados.
- También podrá elevarse o aumentar ligeramente de escala.
- Las tarjetas podrán tener pequeños cambios de borde, sombra, posición o contraste.
- Los efectos deben regresar suavemente a su estado original al terminar la interacción.
- Evitar giros grandes, rebotes exagerados o movimientos que resten profesionalismo.

### Animaciones durante el scroll

Los contenidos deberán aparecer progresivamente al entrar al viewport.

Se podrán utilizar:

- fade suave;
- pequeño desplazamiento vertical;
- entrada progresiva de tarjetas;
- stagger sutil cuando exista un grupo de elementos;
- expansión de líneas o detalles visuales;
- pequeñas transformaciones de escala;
- microanimaciones de iconos.

Las animaciones deberán sentirse fluidas, rápidas y elegantes.

Preferir CSS y Framer Motion para estas interacciones.

Respetar `prefers-reduced-motion` y reducir o eliminar movimientos cuando corresponda.

## Las animaciones nunca deberán afectar negativamente el rendimiento, la legibilidad ni la experiencia en dispositivos móviles.

## GLOBAL-03 — Responsive

El sitio debe ser completamente responsivo en:

- desktop;
- laptop;
- tablet;
- móvil.

Requisitos:

- textos legibles en todos los tamaños;
- imágenes sin deformación;
- grids y tarjetas adaptables;
- botones adecuados para mouse y touch;
- navegación adaptada a móvil;
- sin overflow horizontal;
- sin elementos cortados o encimados;
- animaciones con buen rendimiento;
- misma calidad visual y profesional en móvil que en escritorio.

---

# 2. Componentes globales

## HEADER-01 — Header

### Estructura desktop

- Logo oficial a la izquierda, dentro de un bloque verde oscuro con tamaño cómodo y aire interior.
- Navegación visualmente equilibrada al centro.
- CTA principal a la derecha.

### Navegación

- INICIO
- SOBRE NOSOTROS
- EQUIPO
- CONTACTO

### CTA

- - El botón `COTIZAR` no navegará a la página de Contacto.
- Al hacer clic abrirá un modal/ventana emergente con el formulario de contacto.
- El formulario tendrá los mismos campos y validaciones definidos en `CONTACT-03`.
- El modal debe ser responsive, accesible y poder cerrarse claramente.
- Al enviar correctamente, reemplazar el formulario dentro del modal por el estado de éxito definido en `CONTACT-03`:

**Gracias por tu mensaje**

Hemos recibido tu información. Nos pondremos en contacto contigo lo antes posible.

- Reutilizar el mismo componente de formulario entre el modal y la página Contacto; no duplicar lógica.
- La integración real con AWS se realizará en la Fase 9.

### Comportamiento

- Hover sutil en elementos del menú.
- Estado activo claramente visible.
- Línea inferior animada debajo de la opción activa.
- Transición suave entre estados activos.
- La navegación usa tipografía de tamaño legible, peso medio/semibold, contraste alto y tracking equilibrado.
- EQUIPO enlaza a `/#equipos`: en Inicio desplaza suavemente a la sección y desde otras rutas navega primero a Inicio.
- CTA tipo pill en verde oscuro, con bordes muy redondeados y tamaño cómodo.
- El CTA integra una flecha blanca dentro de un círculo verde ligeramente más claro en el extremo derecho.
- Hover/click suave con desplazamiento sutil de la flecha, variación tonal y acabado premium corporativo.

### Responsive

- Adaptar estructura para tablet y móvil.
- Mantener navegación clara y accesible.
- El CTA no debe comprimirse ni romper el layout.
- En móvil puede utilizarse una navegación compacta apropiada, manteniendo el mismo lenguaje visual.

---

## FOOTER-01 — Footer

### Objetivo visual

Rediseñar el footer para que tenga mayor presencia y una apariencia premium.

### Fondo

- Verde oscuro elegante.
- Usar `img/home_maquina_1` como recurso visual de fondo, principalmente hacia el lado derecho.
- La imagen debe integrarse de forma tenue o fusionada con el fondo.
- Nunca debe reducir la legibilidad del contenido.

### Estructura

Bloques:

1. Identidad de marca.
2. Navegación.
3. Contacto.
4. Oficinas.
5. Redes sociales.
6. Línea legal inferior.

### Requisitos visuales

- Mejor contraste entre títulos y contenido.
- Encabezados de columnas con verde/acento claro, tracking cuidado y detalle visual propio.
- Distribución de columnas equilibrada.
- Instagram y Facebook deben mostrar iconos SVG locales desde `img` junto al nombre de la red.
- Los iconos sociales deben tener hover sutil y mantener buena legibilidad.
- Línea divisoria inferior elegante.
- Evitar apariencia plana o vacía.

### Interacción

- Enlaces de navegación funcionales.
- Correo clicable.
- Teléfonos clicables en dispositivos compatibles.
- Redes sociales preparadas como enlaces.

### Responsive

- Desktop: composición amplia en columnas.
- Tablet: reorganización sin pérdida de legibilidad.
- Móvil: columnas apiladas correctamente.
- La imagen de fondo no debe competir con el contenido.

### WhatsApp flotante

- Botón permanente en la esquina inferior derecha y visible durante el scroll.
- Usar un icono SVG local dentro de `img` y enlazar al WhatsApp principal de LEVEX.
- Mantener contraste claro respecto a los verdes del sitio y una apariencia moderna y elegante.
- Incluir animación sutil de flotación o pulso y hover con elevación suave.
- Respetar `prefers-reduced-motion`.
- Adaptar tamaño y separación a desktop, laptop, tablet y móvil, con área táctil suficiente.
- Evitar que el botón cubra información legal o contenido interactivo.

---

# 3. Página Inicio

## HOME-01 — Hero

### Objetivo

Generar impacto inmediato y comunicar la propuesta de valor de LEVEX.

### Layout desktop

- Texto principal a la izquierda.
- Imagen protagonista de plataforma a la derecha.
- Hero de gran presencia visual.

### Imagen

- `img/home_maquina_1`.
- Debe mostrarse grande e integrada con el fondo.
- Puede tener movimiento sutil para dar profundidad.
- No usar círculo blanco ni glow blanco intenso detrás.
- No usar el pequeño recuadro decorativo del diseño anterior.

### Fondo

- Verde oscuro elegante, similar al tono de referencia preferido.
- Mantener composición limpia y sofisticada.

### Tipografía

- Título con presencia, alta legibilidad y buena jerarquía.
- Texto secundario claramente legible.
- Evitar la tipografía visualmente pesada o difícil de leer del diseño anterior.

### CTA

- VER EQUIPOS.
- CONTÁCTANOS.
- Ambos deben verse claramente interactivos.

---

## HOME-02 — Nuestros equipos

### Objetivo

Presentar los tres equipos y facilitar que el usuario abra el detalle de cada uno.

### Contenido

- GENIE GS-3246
- JLG E400AJPN
- SINOBOOM 0808(2732)

### Tarjetas

Cada equipo debe mostrarse en una tarjeta moderna con:

- imagen protagonista;
- marca;
- modelo;
- resumen técnico;
- CTA visible.

### Interacción

Abrir detalle del equipo al hacer clic/tap en:

- imagen;
- área interactiva de la tarjeta;
- CTA VER EQUIPO.

### Diseño

- Mejorar fuertemente la legibilidad.
- Evitar que el CTA pase desapercibido.
- Se permiten:
  - hover;
  - elevación ligera;
  - movimiento sutil de imagen;
  - cambios suaves de borde;
  - microinteracciones elegantes.

### Responsive

- Grid adaptativo.
- En móvil, tarjetas apiladas y áreas táctiles cómodas.

---

## EQUIPMENT-01 / EQUIPMENT-02 / EQUIPMENT-03 — Páginas de detalle

### Navegación

- Cada equipo debe tener su propia ruta.
- El patrón exacto de URL puede definirse durante la implementación, pero cada ruta debe ser única y estable.

### Información mostrada

- Marca.
- Modelo.
- Información técnica.
- Características principales.
- Fotografías.
- CTA de cotización.

### Datos técnicos

- Obtener los datos de la carpeta de **fichas_tecnicas** correspondiente.
- No inventar especificaciones que no estén en esas fichas.

### Layout desktop

- Zona izquierda:
  - marca;
  - modelo;
  - tabla técnica;
  - CTA SOLICITAR COTIZACIÓN.
- Zona derecha:
  - dos fotografías del modelo.
- Zona inferior:
  - tercera imagen de mayor tamaño.

### Tabla técnica

Debe ser:

- moderna;
- limpia;
- fácil de leer;
- con tipografía cómoda;
- sin exceso de líneas o densidad visual.

Columnas:

- ESPECIFICACIÓN
- MÉTRICO
- US

### Imágenes por modelo

- GENIE: `GENIE_1`, `GENIE_2`, `GENIE_3`
- JLG: `JLG_1`, `JLG_2`, `JLG_3`
- SINOBOOM: `SINOBOOM_1`, `SINOBOOM_2`, `SINOBOOM_3`

### Responsive

- La tabla debe seguir siendo usable en móvil.
- Imágenes y contenido deben reorganizarse sin pérdida de jerarquía.

---

## HOME-03 — Asesoría personalizada

### Objetivo

Crear una llamada a la acción clara y de mayor presencia visual.

### Requisitos

- Aprovechar mejor el ancho disponible.
- Evitar el pequeño bloque centrado del diseño anterior.
- Usar mejor escala tipográfica y contraste.
- Distribuir texto y CTA de forma más moderna.
- Mantener una composición simple, elegante y contundente.

---

## HOME-04 — ¿Por qué trabajar con nosotros?

### Beneficios

Mostrar los ocho beneficios de forma fácil de escanear.

### Presentación

- Tipografía más legible.
- Puede usar números, iconos discretos, divisiones suaves o tarjetas.
- Evitar una cuadrícula pesada o visualmente rígida.

### Seguridad Garantizada

Debe tener tratamiento visual diferenciado para transmitir:

- confianza;
- seguridad;
- profesionalismo.

La lista de certificaciones y controles debe leerse con claridad y el mensaje “Tu seguridad es nuestra prioridad.” debe funcionar como remate visual destacado.

---

## HOME-05 — Servicios

### Presentación

Mostrar cuatro servicios mediante tarjetas modernas.

Cada tarjeta debe incluir:

- numeración;
- icono relacionado;
- título;
- espaciado amplio;
- bordes/detalles discretos;
- buena jerarquía tipográfica;
- interacción suave.

### 3D

- Incluir una animación 3D relacionada con construcción si aporta valor al diseño y mantiene buen rendimiento.

### Responsive

- Grid moderno en desktop.
- Reorganización automática en dispositivos pequeños.

---

## HOME-06 — Opiniones de nuestros clientes

### Componente

Carrusel elegante de testimonios.

### Controles

- flecha anterior;
- flecha siguiente;
- indicadores de posición.

### Comportamiento

- transiciones suaves;
- tipografía con tamaño y contraste cómodos;
- sin animaciones agresivas;
- controles claros en móvil.

### Nota de contenido

Los testimonios 3 y 4 de `CONTENT.md` son idénticos en la fuente original. No modificar el texto hasta que se confirme si el cuarto debe ser diferente.

---

# 4. Página Sobre Nosotros

## ABOUT-01 — Hero

### Dirección

Debe conservar la misma calidad visual y lenguaje del Hero de Inicio.

### Layout

- texto fuerte a la izquierda;
- imagen protagonista a la derecha;
- fondo verde elegante;
- CTA claro.

### Imagen

- Plataforma de elevación como protagonista.
- Sin glow blanco intenso.
- Integración limpia con el fondo.
- Puede incluir movimiento sutil.

### Tipografía

- Más elegante y legible que la versión anterior.

---

## ABOUT-02 — Precisión en altura

### Objetivo

Mostrar la información de forma editorial, moderna y clara.

### Layout

- Preferencia por composición de dos columnas en desktop.
- Mejor espaciado y alineación.
- Evitar un simple bloque de texto plano.

### Responsive

- Debe fluir correctamente a una columna en dispositivos pequeños.
- Prioridad absoluta a la legibilidad.

---

## ABOUT-03 — Aplicaciones

### Objetivo

Convertir una sección actualmente plana en una sección visualmente fuerte y atractiva.

### Presentación

Las siete aplicaciones deben mostrarse con:

- numeración visible;
- grid moderno;
- iconos discretos si ayudan;
- hover suave;
- fondos, bordes o acentos refinados;
- buena jerarquía;
- apariencia corporativa.

### 3D

- Incluir una animación 3D de construcción si aporta valor y mantiene rendimiento.

### Responsive

- Reorganizar correctamente las tarjetas en tablet y móvil.
- Mantener impacto visual y legibilidad.

---

# 5. Página Contacto

## CONTACT-01 — Encabezado

### Dirección

- Fondo verde oscuro.
- Gran presencia visual.
- Tipografía moderna, elegante y legible.
- Mejor aprovechamiento del espacio que el diseño anterior.

---

## CONTACT-02 — Datos de contacto

### Presentación

Mostrar correo, teléfonos, WhatsApp y dirección de forma más moderna que una lista simple.

Se permiten:

- iconos discretos;
- divisiones visuales;
- bloques;
- tarjetas.

### Interacción

- Email: enlace `mailto`.
- Teléfonos: enlaces `tel`.
- WhatsApp: enlace para iniciar conversación.
- Dirección: preparada para posible enlace a mapas.

---

## CONTACT-03 — Formulario

### Campos obligatorios

- Nombre
- Apellido
- Correo electrónico
- Teléfono
- Asunto
- Mensaje

### Validaciones frontend

- campos obligatorios;
- formato de email;
- validación básica de teléfono.

### Estados visuales

- normal;
- focus;
- completado;
- error;
- envío en proceso;
- envío correcto;
- error de envío.

### Confirmación de envío exitoso

Cuando el formulario se envíe correctamente, mostrar una confirmación visual integrada con el estilo general de LEVEX.

Debe incluir:

- un icono elegante de confirmación/check;
- título: **Gracias por tu mensaje**
- texto: **Hemos recibido tu información. Nos pondremos en contacto contigo lo antes posible.**
- transición de entrada suave;
- colores y tipografía coherentes con la identidad visual del sitio;
- diseño limpio, moderno y profesional;
- no utilizar alertas nativas del navegador.

La confirmación deberá verse correctamente en desktop, laptop, tablet y móvil.

El estado de éxito debe sustituir o integrarse elegantemente con el formulario, evitando cambios bruscos de layout.

### Diseño

- campos amplios;
- buen espaciado;
- bordes sutiles;
- esquinas modernas;
- tipografía clara;
- sombras discretas solo si aportan profundidad;
- botón principal claramente visible.

### Layout

Desktop:

- dos áreas equilibradas:
  - datos de contacto;
  - formulario.

Tablet/móvil:

- bloques apilados verticalmente;
- campos y botones cómodos para touch.

### Integración AWS

En esta etapa:

- interfaz;
- validaciones;
- estados frontend.

Al final del proyecto:

- integración real para procesar y enviar la información por correo mediante AWS.

### Seguridad

- No exponer secretos ni credenciales en el frontend.

---

# 6. Criterios generales de aceptación visual

Todas las páginas y componentes deben cumplir:

- coherencia visual entre Inicio, Sobre Nosotros y Contacto;
- tipografía elegante y legible;
- jerarquía clara;
- composición profesional;
- animaciones suaves;
- responsive completo;
- accesibilidad básica;
- botones e interacciones evidentes;
- sin overflow horizontal;
- sin texto difícil de leer;
- sin efectos excesivos;
- sin degradar rendimiento por animaciones o 3D.

---

# 7. Fuera de este archivo

Para evitar duplicación y consumo innecesario de contexto:

- **CONTENT.md**: textos, datos e imágenes.
- **PLAN.md**: fases, orden de implementación y validaciones por fase.
- **AGENTS.md**: reglas del agente, uso de skills, testing, refactorización y optimización de tokens.
- **PROGRESS.md**: estado actual y cambios relevantes.

`SPEC.md` no debe repetir las reglas operativas que pertenezcan a esos archivos.

# GLOBAL-ANIMATIONS — Sistema global de animaciones y scroll

El sitio deberá utilizar un sistema reutilizable de animaciones para mantener consistencia visual entre todas las páginas.

- Los elementos aparecerán progresivamente al entrar al viewport mediante opacity, desplazamiento vertical y transformaciones suaves.
- Los grupos de tarjetas utilizarán stagger sutil para aparecer secuencialmente.
- Hero, títulos, textos, CTAs, cards, iconos e imágenes podrán tener animaciones de entrada.
- Mantener el scroll natural; no implementar scroll hijacking.
- Las cards tendrán microinteracciones elegantes en hover.
- Los iconos podrán cambiar de color, rotar ligeramente, elevarse o escalar suavemente.
- Evitar rebotes, movimientos exagerados o animaciones sin propósito.
- Respetar prefers-reduced-motion.
- Todo deberá funcionar correctamente en desktop, laptop, tablet y móvil.
- Priorizar un sistema reutilizable de animaciones y evitar implementar la misma lógica independientemente en cada sección.
- Se pueden utilizar atributos como data-reveal, data-reveal-group y data-hero-reveal, o una solución equivalente.
