import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToSection } from '../../utils/scrollToSection.js'

export default function RouteScrollManager() {
  const { hash, key, pathname } = useLocation()

  useLayoutEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'

    return () => {
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [])

  useLayoutEffect(() => {
    if (hash) {
      const frame = window.requestAnimationFrame(() => {
        const sectionId = decodeURIComponent(hash.slice(1))
        if (!scrollToSection(sectionId)) window.scrollTo(0, 0)
      })

      return () => window.cancelAnimationFrame(frame)
    }

    window.scrollTo(0, 0)
    const frame = window.requestAnimationFrame(() => window.scrollTo(0, 0))

    return () => window.cancelAnimationFrame(frame)
  }, [hash, key, pathname])

  return null
}
