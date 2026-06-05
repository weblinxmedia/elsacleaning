'use client'
import { useScrollAnimation } from '@/lib/useScrollAnimation'
import OurProcess from './OurProcess'
import PricingCards from './PricingCards'
import ZigzagTimeline from './ZigzagTimeline'
import AnimateIn from '../AnimateIn'

export default function HowItWorks() {
  const animRef = useScrollAnimation()
  return (
    <section className="w-fullmd:py-10 ">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">

        <OurProcess />

        {/* Top: Pricing Cards */}
        <div >
          <AnimateIn>
            <PricingCards />
          </AnimateIn>
        </div>
        {/* Bottom: Zigzag Timeline */}
        <div className='md:max-w-[65vw] mx-auto'>
        <ZigzagTimeline />
        
</div>
      </div>
    </section>
  )
}