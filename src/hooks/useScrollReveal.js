import { useEffect } from 'react'

const DEFAULT_SELECTOR = '.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-stagger, .reveal-scale, .reveal-blur, .reveal-rotate, .reveal-wipe'

export function useScrollReveal(selector = DEFAULT_SELECTOR) {
  useEffect(() => {
    const nodes = document.querySelectorAll(selector)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach((node) => node.classList.add('active'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
          observer.unobserve(entry.target)
        }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -45px 0px' }
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [selector])
}
