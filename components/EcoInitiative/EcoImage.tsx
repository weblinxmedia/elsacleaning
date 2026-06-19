'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Leaf1, Leaf2, Leaf3 } from './LeafIcons'

gsap.registerPlugin(ScrollTrigger)

export default function EcoImage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const leaf1Ref = useRef<HTMLDivElement>(null)
  const leaf2Ref = useRef<HTMLDivElement>(null)
  const leaf3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Leaf 1: Goes UP
      gsap.to(leaf1Ref.current, {
        y: -120,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true, // Tied to scroll
        },
      })

      // Leaf 2: ROTATES and shifts slightly
      gsap.to(leaf2Ref.current, {
        rotation: -45,
        y: 20,
        x: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Leaf 3: Goes DOWN
      gsap.to(leaf3Ref.current, {
        y: 90,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, containerRef)

    return () => ctx.revert() // Clean up on unmount
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-[400px] md:h-[450px] lg:h-[500px]  group">
      <img
       src="https://shazamcleanwindows.com/assets/exterior-BmWT-u_U.jpg"    alt="Green eco cleaning"
        
        
        className="object-cover rounded-4xl w-full h-full rounded-3xl transition-transform duration-700 ease-out"
      />
  
      {/* Floating Leaves - Top Left Corner */}
      <div className="absolute top-4 left-45 md:top-8 md:left-8 z-10 pointer-events-none">
        {/* Leaf 1 */}
        <div ref={leaf1Ref} className="absolute w-[max-content] -top-15 -left-10">
          <img src="/images/firstleaf.webp" width={'38px'}  alt="Commercial Cleaning" />
        </div>

        {/* Leaf 2 */}
        <div ref={leaf2Ref} className="absolute w-[max-content] -top-10 -left-20"
        style={{transform:"rotate(30deg)"}}>
         <img src="/images/midleaf.webp" width={'100px'} alt="Eco-Friendly Cleaning" />
        </div>

        {/* Leaf 3 */}
        <div ref={leaf3Ref} className="absolute w-[max-content] top-5 -left-6">
         <img src="/images/lastleaf.webp" width={'70px'} alt="Sustainable Cleaning" />
        </div>
      </div>
    </div>
  )
}