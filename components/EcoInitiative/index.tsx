'use client'
import EcoContent from './EcoContent'
import EcoImage from './EcoImage'
import { useScrollAnimation } from '@/lib/useScrollAnimation'
export default function EcoInitiative() {
  const animRef = useScrollAnimation()
  return (
    <section className="w-full pt-28 pb-5 bg-white">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left Side: Content */}
        <EcoContent />
        
        {/* Right Side: Image + Leaves */}
        <div ref={animRef}>
          <EcoImage />
        </div>
      </div>
    </section>
  )
}