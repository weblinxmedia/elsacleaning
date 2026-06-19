'use client'
import Image from 'next/image'
import { useScrollAnimation } from '@/lib/useScrollAnimation'
export default function WhyChooseImage() {
  const animRef = useScrollAnimation()
  return (
    <div ref={animRef} className="relative w-full h-[300px] md:h-[450px] lg:h-[580px] rounded-2xl overflow-hidden shadow-2xl group">
      <img
      src="https://shazamcleanwindows.com/assets/building-feature-DZQm2Y8-.jpg"
    alt="Sparkling clean office space"
        
        
        className="object-cover transition-transform duration-700 ease-out"
        
      />
      {/* Luxury bottom gradient overlay */}
         </div>
  )
}