import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Set initial state (invisible and pushed down a bit)
    gsap.set(el, { opacity: 0, y: 40 })

    // Create the animation
    const animation = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 67%', // When the top of the element hits 85% of the screen height (roughly when it's coming into view)
        toggleActions: 'play none none none', // Only play once
      },
    })

    // Clean up on unmount
    return () => {
      animation.scrollTrigger?.kill()
      animation.kill()
    }
  }, [])

  return ref
}