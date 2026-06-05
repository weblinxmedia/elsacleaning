'use client'
import { Check } from 'lucide-react'
import { teamFeatures } from './teamConfig'
import { useScrollAnimation } from '@/lib/useScrollAnimation'
import AnimateIn from '@/components/AnimateIn'
export default function TeamContent() {
  const animRef = useScrollAnimation()
  return (
<div ref={animRef} className="flex flex-col overflow-hidden justify-center h-full py-8">
      {/* Small Label */}<AnimateIn delay={0.2}>
        <span className="text-[13px] font-batch-size font-medium uppercase tracking-widest font-parkinsans mb-3">
        Team Highlights
      </span></AnimateIn>

      {/* Large Heading */}<AnimateIn delay={0.3}>
      <h2 className="text-3xl font-title-size md:text-4xl lg:text-4xl font-parkinsans font-regular mb-5">
        Our Team's Commitment to Excellence and Sustainability
      </h2></AnimateIn>

      {/* Paragraph */}<AnimateIn delay={0.4}>
      <p className="text-gray-500 font-para-size size-adjust w-[82%] md:text-medium font-thin font-outfit mb-4">
        We're dedicated team of professionals passionate about delivery exceptional results. Each member brings unique expertise and creativity to ensure your experience is nothing short of outstanding.
    </p></AnimateIn>
      {/* Feature List */}
      <ul className="space-y-0">
        {teamFeatures.map((feature, index) => (
          <AnimateIn delay={index * 0.15}>
          <li 
            key={index} 
            className={`flex items-center gap-3 py-4 ${index < teamFeatures.length - 1 ? 'border-b border-gray-300' : ''}`}
          >
            <div className="w-6 h-6 rounded-full font-parkinsans bg-luxury-pink flex items-center justify-center flex-shrink-0">
              <Check size={14} className="text-white" strokeWidth={2} />
            </div>
            <span className="text-black md:text-[20px] font-para-size font-regular">{feature}</span>
          </li>
    </AnimateIn>    ))}
      </ul>
    </div>
  )
}