# AGENTS.md — LEVEX

> Reglas permanentes para cualquier agente que trabaje en este proyecto.

---

# 1. Objetivo de trabajo

Desarrollar LEVEX con:

- React.
- Código limpio, mantenible y reutilizable.
- Buenas prácticas de frontend.
- Interfaz moderna, elegante y profesional.
- Responsive completo.
- Buen rendimiento.
- Seguridad frontend.
- Testing suficiente, pero no redundante.
- Uso eficiente de contexto y tokens.

---

# 2. Orden de lectura por fase

Antes de trabajar en una fase:

1. Consultar `AGENTS.md` solo cuando sea necesario verificar una regla operativa.
2. Leer únicamente la fase activa de `PLAN.md`.
3. Leer solo los IDs de `SPEC.md` indicados por esa fase.
4. Leer solo los IDs de `CONTENT.md` indicados por esa fase.
5. Consultar `PROGRESS.md` para conocer el estado actual.
6. Cargar únicamente las skills necesarias para la tarea.

No releer `SPEC.md`, `CONTENT.md` o `PLAN.md` completos salvo que exista una razón concreta.

---

# 3. Uso de skills

## `frontend-design`

Usar cuando:

- se cree o modifique UI;
- se trabaje tipografía;
- jerarquía visual;
- composición;
- espaciado;
- responsive;
- tarjetas;
- botones;
- secciones;
- acabados visuales.

No cargarla para tareas puramente técnicas que no afectan interfaz.

---

## `design-to-code`

Usar cuando:

- exista una referencia visual;
- haya capturas de diseño;
- se solicite reproducir una composición;
- se quiera trasladar una referencia al sitio.

No usarla cuando no exista una referencia visual relevante.

---

## `vercel-react-best-practices`

Usar cuando:

- se creen componentes React;
- se modifique arquitectura frontend;
- se optimice rendimiento;
- se refactorice React;
- se revisen patrones de componentes;
- se trabaje carga de recursos o estado.

---

## `frontend-security`

Usar cuando:

- se trabaje el formulario;
- haya inputs;
- enlaces externos;
- validaciones;
- almacenamiento del navegador;
- contenido dinámico;
- dependencias con implicaciones de seguridad;
- integración frontend con servicios externos.

---

## `code-review`

Usar únicamente:

- en la Fase 8;
- excepcionalmente ante un cambio estructural importante.

No usar después de cada cambio pequeño.

---

## `grill-me`

No usar en este proyecto salvo instrucción explícita posterior.

Los requisitos se están definiendo y validando directamente antes del desarrollo.

---

# 4. Playwright MCP

Playwright MCP se utilizará para validación visual y funcional cuando realmente aporte valor.

Usarlo para:

- navegación;
- rutas;
- formularios;
- responsive;
- interacciones;
- carruseles;
- estados activos;
- regresiones relacionadas con cambios;
- QA final.

No usar Playwright después de cada modificación pequeña.

No repetir pruebas completas sobre áreas ya aprobadas que no hayan cambiado.

---

# 5. Estrategia de testing

## Durante una fase

Probar únicamente:

- lo recién implementado;
- lo directamente afectado;
- navegación relacionada;
- responsive de esa funcionalidad;
- build si corresponde.

## Fases completadas

Una fase marcada como completada en PROGRESS.md no deberá ejecutarse nuevamente.

Solo podrá reabrirse si:

- un cambio posterior afecta directamente esa fase;
- aparece una regresión relacionada;
- el usuario solicita explícitamente modificarla.

Si se reabre, revisar y probar únicamente el área afectada, no repetir la fase completa.

## Regla de regresión

Después de un cambio, identificar primero qué componentes, rutas o funcionalidades fueron afectados.

Probar:

1. el cambio realizado;
2. sus dependencias directas;
3. el flujo relacionado.

No volver a ejecutar pruebas de áreas sin relación con el cambio.

## Regla de ahorro de tokens

Durante cada fase:

- Implementar primero la fase completa.
- Hacer una sola revisión visual al final de la fase.
- No revisar cada breakpoint después de cada cambio.
- Si se corrige algo, validar únicamente lo afectado.
- Ejecutar build y lint una vez al cierre de la fase.
- Reservar las pruebas globales y responsive completas para las fases de QA final.

## Al cerrar una fase

Ejecutar:

- validación funcional de esa fase;
- build;
- lint si existe;
- Playwright solo si la fase lo justifica.

## QA global

Hacer una revisión completa una sola vez cuando el frontend esté terminado.

## Después de corregir un problema

Volver a probar:

- el problema corregido;
- lo directamente relacionado.

No repetir todo el sitio si no fue afectado.

---

# 6. Responsive

Todo cambio visual debe considerar:

- desktop;
- laptop;
- tablet;
- móvil.

No aprobar una sección si:

- genera overflow horizontal;
- corta contenido;
- deforma imágenes;
- rompe grids;
- comprime botones;
- pierde legibilidad;
- afecta interacción táctil.

---

# 7. Calidad del código

Priorizar:

- componentes reutilizables;
- nombres claros;
- responsabilidades separadas;
- evitar duplicación;
- estructura simple;
- dependencias justificadas;
- accesibilidad;
- rendimiento;
- código fácil de mantener.

No sobrearquitecturar.

No crear abstracciones innecesarias para problemas simples.

---

# 8. Refactorización

Refactorizar cuando:

- exista duplicación clara;
- haya código difícil de mantener;
- una abstracción mejore varias partes;
- exista deuda evidente;
- la implementación actual bloquee el siguiente paso.

No hacer refactors globales no solicitados durante una fase.

No modificar código estable únicamente por “mejorarlo” si no existe beneficio claro.

---

# 9. Animaciones

Usar animaciones:

- suaves;
- elegantes;
- con propósito;
- sin afectar rendimiento.

Para animaciones normales y sensación 3D:

- preferir CSS y Framer Motion.

Para un elemento 3D real:

- considerar Spline únicamente si aporta valor claro.

No introducir Three.js o librerías 3D pesadas sin necesidad.

No usar animaciones que perjudiquen la experiencia móvil.

## Sistema reutilizable de animaciones

No crear animaciones independientes y duplicadas para cada sección si pueden resolverse mediante un sistema común.

Preferir hooks, componentes o utilidades reutilizables para:

- reveal al entrar al viewport;
- grupos con stagger;
- animaciones del Hero;
- microinteracciones de cards e iconos.

Antes de crear una nueva animación, comprobar si puede reutilizarse el sistema existente.

Mantener las animaciones separadas de la lógica principal de los componentes cuando sea razonable.

---

# 10. Seguridad frontend

Nunca:

- exponer credenciales;
- exponer secretos;
- incluir claves privadas;
- confiar únicamente en validación visual;
- usar datos sensibles directamente en frontend.

Validar correctamente formularios e inputs.

Evitar patrones inseguros como renderizado de HTML no confiable.

---

# 11. PROGRESS.md

Actualizar `PROGRESS.md`:

- al cerrar una fase;
- al completar un bloque importante;
- cuando aparezca un problema relevante;
- cuando quede un pendiente importante.

Mantenerlo breve.

Debe registrar:

- qué se implementó;
- qué se validó;
- qué queda pendiente;
- problemas relevantes.

No registrar:

- cambios línea por línea;
- explicaciones largas;
- detalles irrelevantes;
- razonamientos extensos.

---

# 12. Optimización de contexto y tokens

Siempre buscar eficiencia.

Evitar:

- releer archivos completos;
- cargar skills innecesarias;
- repetir contenido entre documentos;
- volver a analizar componentes sin cambios;
- ejecutar testing redundante;
- generar explicaciones largas en archivos internos.

Preferir:

- IDs de secciones;
- referencias cruzadas;
- cambios focalizados;
- contexto mínimo necesario;
- resúmenes breves en `PROGRESS.md`.

---

# 13. Regla de ejecución por fase

Antes de empezar:

- confirmar fase activa;
- revisar `PROGRESS.md`;
- cargar solo contexto y skills necesarios.

Durante la fase:

- implementar;
- validar lo afectado;
- evitar tocar áreas no relacionadas.

Al cerrar:

- ejecutar validaciones de esa fase;
- actualizar `PROGRESS.md`;
- marcar pendientes;
- detenerse antes de iniciar otra fase sin instrucción.

---

# 14. Prioridades del proyecto

En caso de conflicto, priorizar:

1. Correctitud funcional.
2. Responsive.
3. Legibilidad.
4. Seguridad.
5. Rendimiento.
6. Calidad visual.
7. Mantenibilidad.
8. Animaciones.

Las animaciones nunca deben comprometer funcionalidad, claridad o rendimiento.
