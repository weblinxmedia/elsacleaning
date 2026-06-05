'use client'
import PricingCard from './PricingCard'
import { pricingCardsData } from './howItWorksConfig'
import { Check } from 'lucide-react'
import { useScrollAnimation } from '@/lib/useScrollAnimation'
import AnimateIn from '../AnimateIn'
export default function PricingCards() {
  const animRef = useScrollAnimation()
  return (<>   
    <div className="flex flex-col items-center md:flex-row relative gap-8 mb-20 max-w-4xl mx-auto md:items-center justify-center">
    
      {pricingCardsData.map((card, index) => (
        <AnimateIn delay={index *0.2} className=''>
        
        <div className='w-full'>
       
    <div className="absolute top-0 left-1/2 z-[300] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center border-2 border-white z-10">
        <Check size={24} className="text-luxury-pink" strokeWidth={2.5} />
      </div>
        <PricingCard key={card.id} data={card} />
        </div>
    </AnimateIn>  ))}
      
    </div>
    <div  className='w-full text-center mx-auto font-parkinsans font-thin'>
      <AnimateIn delay={0.2}>
      <span className='text-black text-2xl font-normal'>How Does it Work?</span>
    </AnimateIn>
    </div>
    </>
  )
}