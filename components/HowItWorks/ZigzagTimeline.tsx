'use client'

import Link from 'next/link'
import TimelineStep from './TimelineStep'
import { timelineStepsData } from './howItWorksConfig'
import { useScrollAnimation } from '@/lib/useScrollAnimation'
import AnimateIn from '../AnimateIn'

export default function ZigzagTimeline() {
  const animRef = useScrollAnimation()
  return (
    <>
    <div className="relative mt-5">
      
      {/* Background SVG Image - Hidden on mobile */}
      <div 
        className="absolute min-h-[90vh] bg-image-zigzag inset-0 hidden md:block bg-no-repeat bg-center bg-contain z-0 pointer-events-none"
        style={{ backgroundImage: "url('/images/zigzag.svg')" }}
      />

      {/* STRICT 2 COLUMNS on Desktop, 1 Column on Mobile -> Creates 3 Rows */}
      <AnimateIn>
    <div className="">
  {timelineStepsData.map((step, index) => (
    <AnimateIn delay={index * 0.2} className='relative z-10 grid grid-timeline grid-cols-2  py-7 gap-y-5'>
    <TimelineStep key={step.id} data={step} />
  </AnimateIn>))}
</div>
      </AnimateIn>

      {/* Center Button */}

    </div>
          <div  className="flex justify-center mt-5 mb-5 md:mb-13 ">
            <AnimateIn delay={0.15}>
        <Link
          href="/quote"
       
          className="font-parkinsans w-[fit-content] bg-luxury-pink text-sm px-7.5 py-3.5 rounded-full cursor-pointer text-luxury-lite font-medium  tracking-normal transition-all duration-300 hover:shadow-lg transform hover:scale-[1.0]"
  
            >
          Book Your Service
        </Link></AnimateIn>
      </div>
    </>
  )
}