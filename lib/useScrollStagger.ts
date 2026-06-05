import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollStagger(childSelector: string = '> *') {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Find all the children (cards)
    const children = el.querySelectorAll(childSelector)
    if (children.length === 0) return

    // Set initial state (all cards invisible and down)
    gsap.set(children, { opacity: 0, y: 40 })

    // Animate them in one by one
    const animation = gsap.to(children, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15, // ⏱️ 0.15s delay between each card
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    })

    return () => {
      animation.scrollTrigger?.kill()
      animation.kill()
    }
  }, [childSelector])

  return ref
}