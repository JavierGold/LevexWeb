# PLAN.md — LEVEX

> Plan de ejecución por fases.  
> Objetivo: desarrollar LEVEX con el menor contexto necesario por fase, evitar testing redundante y mantener una secuencia clara de implementación.

---

# Reglas de uso del plan

En cada fase, el agente deberá:

1. Leer `AGENTS.md`.
2. Leer únicamente la fase activa de `PLAN.md`.
3. Leer únicamente los IDs indicados de `SPEC.md`.
4. Leer únicamente los IDs indicados de `CONTENT.md`.
5. Cargar solo las skills necesarias para esa fase.
6. Probar únicamente lo implementado o afectado por los cambios actuales.
7. Actualizar `PROGRESS.md` al cerrar la fase o cuando exista un cambio relevante.

No releer archivos completos si la fase ya indica los IDs necesarios.

### Regla de validación

Los puntos de "Validar" de cada fase se comprobarán juntos en una sola revisión al final de la fase, no como pruebas independientes durante el desarrollo.

No repetir inspecciones visuales después de cada cambio. Si se realiza una corrección posterior, validar únicamente lo corregido.

Las revisiones completas de responsive y regresión se reservan para las fases 7 y 8.

---

# Fase 0 — Setup y base del proyecto

## Objetivo

Crear la base técnica y visual del proyecto antes de construir páginas completas.

## Leer

### SPEC.md

- GLOBAL-01
- GLOBAL-02
- GLOBAL-03

### CONTENT.md

- GLOBAL-01

## Implementar

- Crear proyecto React.
- Configurar ruteo.
- Crear estructura de carpetas.
- Preparar sistema base de estilos.
- Configurar tipografía.
- Definir variables/tokens visuales básicos.
- Preparar rutas principales:
  - Inicio
  - Sobre Nosotros
  - Contacto
- Preparar estructura para páginas de detalle de equipos.
- Integrar logo oficial.
- Preparar sistema responsive base.
- Verificar que no existan errores iniciales de build.

## Skills sugeridas

- `vercel-react-best-practices`
- `frontend-design`

## Validar

- Proyecto compila.
- Rutas base existen.
- Estructura limpia.
- Responsive base sin overflow.

## No repetir

No hacer QA visual completo todavía.

---

# Fase 1 — Header, Footer y layout global

## Objetivo

Construir los componentes compartidos del sitio.

## Leer

### SPEC.md

- HEADER-01
- FOOTER-01
- GLOBAL-02
- GLOBAL-03

### CONTENT.md

- HEADER-01
- FOOTER-01

## Implementar

- Header desktop.
- Header tablet/móvil.
- Navegación activa con línea inferior animada.
- CTA “SOLICITAR INFORMACIÓN”.
- Footer completo.
- Imagen decorativa de fondo del footer.
- Enlaces interactivos de correo, teléfono y navegación.
- Layout global reutilizable.

## Skills sugeridas

- `frontend-design`
- `design-to-code`
- `vercel-react-best-practices`

## Validar

- Header responsive.
- Footer responsive.
- Navegación funcional.
- Estado activo correcto.
- Links básicos correctos.
- Build.

## No repetir

No probar páginas que todavía no existen.

---

# Fase 2 — Home: Hero y Nuestros Equipos

## Objetivo

Construir la parte principal de la Home y el acceso a equipos.

## Leer

### SPEC.md

- HOME-01
- HOME-02
- GLOBAL-02
- GLOBAL-03

### CONTENT.md

- HOME-01
- HOME-02

## Implementar

- Hero principal.
- Imagen `home_maquina_1`.
- Dos CTAs.
- Fondo verde elegante.
- Animación sutil del equipo.
- Sección “Nuestros equipos”.
- Tarjetas GENIE, JLG y SINOBOOM.
- Interacción de tarjeta completa.
- CTA “VER EQUIPO →”.

## Skills sugeridas

- `frontend-design`
- `design-to-code`
- `vercel-react-best-practices`

## Validar

- Hero legible.
- Cards claras e interactivas.
- Navegación hacia páginas de detalle.
- Responsive desktop/tablet/móvil.
- Animaciones sin afectar rendimiento.
- Build.

## No repetir

No volver a probar Header/Footer salvo que hayan sido modificados.

---

# Fase 3 — Páginas de detalle de equipos

## Objetivo

Crear las páginas completas de los tres modelos.

## Leer

### SPEC.md

- EQUIPMENT-01
- EQUIPMENT-02
- EQUIPMENT-03
- GLOBAL-03

### CONTENT.md

- EQUIPMENT-01
- EQUIPMENT-02
- EQUIPMENT-03

## Implementar

- Ruta individual por equipo.
- Marca y modelo.
- Galería de imágenes por modelo.
- Tabla técnica.
- CTA “SOLICITAR COTIZACIÓN”.
- Cargar datos desde fichas técnicas disponibles.
- Reutilizar una misma estructura/componente para los tres equipos.

## Skills sugeridas

- `vercel-react-best-practices`
- `frontend-design`

## Validar

- Cada ruta carga el equipo correcto.
- Imágenes correctas por modelo.
- Datos técnicos no inventados.
- Tabla usable en móvil.
- CTA visible.
- Build.

## No repetir

No volver a probar Home completa.
Solo verificar que los enlaces desde HOME-02 sigan funcionando.

---

# Fase 4 — Home: resto de secciones

## Objetivo

Completar la página Inicio.

## Leer

### SPEC.md

- HOME-03
- HOME-04
- HOME-05
- HOME-06
- GLOBAL-02
- GLOBAL-03

### CONTENT.md

- HOME-03
- HOME-04
- HOME-05
- HOME-06

## Implementar

- Asesoría personalizada.
- ¿Por qué trabajar con nosotros?
- Seguridad Garantizada.
- Servicios.
- Animación 3D relacionada con construcción si aporta valor.
- Carrusel de opiniones.
- Controles e indicadores del carrusel.

## Skills sugeridas

- `frontend-design`
- `design-to-code`
- `vercel-react-best-practices`

## Validar

- Secciones legibles.
- Carrusel funcional.
- Responsive.
- Animaciones suaves.
- Sin problemas de rendimiento evidentes.
- Build.

## No repetir

No volver a probar páginas de equipos completas.

---

# Fase 5 — Página Sobre Nosotros

## Objetivo

Construir la página completa Sobre Nosotros.

## Leer

### SPEC.md

- ABOUT-01
- ABOUT-02
- ABOUT-03
- GLOBAL-02
- GLOBAL-03

### CONTENT.md

- ABOUT-01
- ABOUT-02
- ABOUT-03

## Implementar

- Hero.
- Sección “Precisión en altura”.
- Sección “Aplicaciones”.
- Tarjetas/bloques modernos.
- Animación 3D de construcción si aporta valor.

## Skills sugeridas

- `frontend-design`
- `design-to-code`
- `vercel-react-best-practices`

## Validar

- Coherencia visual con Home.
- Responsive.
- Legibilidad.
- Animaciones suaves.
- Build.

## No repetir

No ejecutar QA completo de Home o Equipos.

---

# Fase 6 — Página Contacto y formulario frontend

## Objetivo

Construir la interfaz completa de Contacto sin integrar todavía AWS.

## Leer

### SPEC.md

- CONTACT-01
- CONTACT-02
- CONTACT-03
- GLOBAL-03

### CONTENT.md

- CONTACT-01
- CONTACT-02
- CONTACT-03

## Implementar

- Encabezado.
- Datos de contacto.
- Enlaces email/teléfono/WhatsApp.
- Formulario.
- Validaciones frontend.
- Estados:
  - normal
  - focus
  - error
  - envío
  - éxito visual
  - error visual
- Diseño responsive.
- Implementar modal de cotización del Header reutilizando el formulario de Contacto.

## Skills sugeridas

- `frontend-design`
- `frontend-security`
- `vercel-react-best-practices`

## Validar

- Campos obligatorios.
- Email.
- Teléfono.
- Estados visuales.
- Responsive.
- Links de contacto.
- Build.

## No repetir

No integrar AWS todavía.
No probar páginas no modificadas.

---

# Fase 7 — Responsive, accesibilidad y pulido visual global

## Objetivo

Revisar el sitio completo una sola vez antes del QA final.

## Leer

### SPEC.md

- GLOBAL-02
- GLOBAL-03
- Criterios generales de aceptación visual

### CONTENT.md

Solo consultar secciones específicas si se detecta un problema de contenido.

## Implementar

- Ajustes responsive globales.
- Corrección de overflow.
- Jerarquía tipográfica.
- Consistencia de espaciados.
- Estados hover/focus.
- Accesibilidad básica.
- Optimización de imágenes y animaciones.
- Ajustes de rendimiento.
- Refactorizaciones justificadas.

## Skills sugeridas

- `frontend-design`
- `vercel-react-best-practices`
- `frontend-security`

## Validar

- Desktop.
- Laptop.
- Tablet.
- Móvil.
- Navegación global.
- Formularios.
- Carrusel.
- Páginas de detalle.
- Animaciones.
- Build.

## Testing

Aquí sí corresponde una revisión global visual/funcional.

## No repetir

No hacer múltiples ciclos completos si no hubo cambios globales posteriores.

---

# Fase 8 — Code review y QA final frontend

## Objetivo

Cerrar el frontend antes de integrar AWS.

## Leer

- `AGENTS.md`
- Esta fase de `PLAN.md`
- `PROGRESS.md`
- Secciones específicas de SPEC/CONTENT solo cuando se detecte una incidencia.

## Skills sugeridas

- `code-review`
- `frontend-security`
- `vercel-react-best-practices`

## Playwright MCP

Usarlo para:

- navegación principal;
- rutas de equipos;
- formulario;
- responsive visual en tamaños clave;
- errores evidentes de interacción.

## Validar

- Build final.
- Errores de consola relevantes.
- Rutas.
- Responsive.
- Accesibilidad básica.
- Interacciones.
- Seguridad frontend.
- Regresiones.

## No repetir

Si un flujo ya pasó y no fue afectado por una corrección posterior, no volver a ejecutarlo.

---

# Fase 9 — Integración AWS del formulario

## Objetivo

Conectar el formulario con AWS para recibir la información por correo.

## Leer

### SPEC.md

- GLOBAL-01
- CONTACT-03

### CONTENT.md

- CONTACT-03

## Implementar

- Backend/serverless necesario.
- Integración segura con AWS.
- Envío de información del formulario por correo.
- Manejo de éxito/error real.
- No exponer credenciales en frontend.

## Skills sugeridas

- `frontend-security`
- `vercel-react-best-practices` cuando afecte código React

## Validar

- Envío real.
- Manejo de errores.
- No exposición de secretos.
- Flujo completo formulario → correo.

## No repetir

No volver a hacer QA visual completo salvo que la integración cambie la interfaz.

---

# Fase 10 — Despliegue AWS

## Objetivo

Publicar el proyecto terminado.

## Implementar

- Build de producción.
- S3.
- CloudFront.
- Configuración SPA/rutas si aplica.
- HTTPS.
- Invalidación de caché cuando corresponda.

## Validar

- Sitio público.
- Rutas directas.
- Assets.
- Formulario real.
- Responsive rápido de humo.
- Sin errores críticos.

## Testing final

Solo smoke test de producción.

---

# Estrategia de testing global

## Durante una fase

Probar únicamente:

- lo recién implementado;
- lo directamente afectado;
- navegación relacionada;
- responsive de esa funcionalidad.

## Al cerrar una fase

- Build.
- Validación de la funcionalidad de esa fase.
- Playwright solo si el cambio lo justifica.

## Antes de AWS

- Una revisión global.

## Después del despliegue

- Un smoke test final.

No repetir pruebas completas sobre áreas aprobadas que no hayan cambiado.

---

# Estrategia de contexto y tokens

Para cada fase:

- No leer `CONTENT.md` completo.
- No leer `SPEC.md` completo.
- No cargar todas las skills.
- No revisar componentes no afectados.
- No repetir explicaciones ya documentadas.
- Usar los IDs de sección indicados en este plan.
- Mantener `PROGRESS.md` breve.
- Preferir referencias a IDs antes que copiar contenido entre archivos.
