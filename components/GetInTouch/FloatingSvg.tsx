'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FloatingSvg() {
  const svgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(svgRef.current, {
        rotation: 20, // Rotate slightly
        ease: 'none',
        scrollTrigger: {
          trigger: svgRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true, // Tied directly to scroll
        },
      })
    }, svgRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={svgRef} className="absolute top-4 right-4 md:top-8 md:right-8 z-10 pointer-events-none opacity-20">
      {/* Replace this SVG path with your actual SVG code */}
      <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 5C50 5 15 25 15 55C15 75 30 90 50 90C70 90 85 75 85 55C85 25 50 5 50 5Z" fill="#E8A0B4" stroke="#d4788f" strokeWidth="2"/>
        <path d="M50 30V80" stroke="#d4788f" strokeWidth="2"/>
        <path d="M50 50L35 40" stroke="#d4788f" strokeWidth="2"/>
        <path d="M50 60L65 50" stroke="#d4788f" strokeWidth="2"/>
      </svg>
    </div>
  )
}