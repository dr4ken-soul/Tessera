import { useEffect } from 'react'
import { useMotionValue, useSpring, useTransform } from 'motion/react'

/** Return a spring-smoothed vertical offset driven by the window scroll position. */
export function useParallax(distance = 24) {
  const scrollY = useMotionValue(0)
  const smoothScrollY = useSpring(scrollY, { stiffness: 90, damping: 24 })
  const offset = useTransform(smoothScrollY, [0, 1000], [0, -distance])
  useEffect(() => {
    const updateScroll = () => scrollY.set(window.scrollY)
    window.addEventListener('scroll', updateScroll, { passive: true })
    updateScroll()
    return () => window.removeEventListener('scroll', updateScroll)
  }, [scrollY])
  return offset
}
