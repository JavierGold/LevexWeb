export function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (!section) return false

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  section.scrollIntoView({
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
    block: 'start',
  })

  return true
}
