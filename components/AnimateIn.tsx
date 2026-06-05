'use client'

import { useRef, useEffect, ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface AnimateInProps {
  children: ReactNode
  className?: string
  delay?: number // 🔹 NEW: Delay in seconds (e.g., 0.1, 0.2, 0.3)
}

export default function AnimateIn({ children, className = '', delay = 0 }: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Set initial state
    gsap.set(el, { opacity: 0, y: 40 })

    // Create animation with the delay
    const anim = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: delay, // 🔹 Applies your delay here
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [delay]) // 🔹 Re-run if delay changes

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}