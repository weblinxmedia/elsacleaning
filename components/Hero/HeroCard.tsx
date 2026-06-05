'use client' // <-- Add this

import { Star } from 'lucide-react'
import HeroForm from './HeroForm'
import { useSettings } from '@/app/context/SettingsContext' // <-- Add this

export default function HeroCard() {
  const { hero_heading } = useSettings() // <-- Add this
const { phone } = useSettings() 
  return (
    <div className="w-full hero-card md:max-w-[63vw] mx-auto px-0 md:px-4">
      <div 
        className="bg-luxury-lite/70 backdrop-blur-xl box-clip  border border-luxury-lite/30 rounded-[3rem] py-12 px-4 md:p-12 transition-transform duration-700 hover:rotate-0"
        style={{ transform: 'rotate(0deg)' }}
      >
        <div className='w-full md:w-[98%] mx-auto'>
        {/* Top Badge */}
        <div className="flex items-center justify-center gap-2 mb-4 w-fit mx-auto px-5 py-2 rounded-3xl bg-luxury-pink">
          <span className="text-sm font-outfit font-regular text-white tracking-normal">Vetted Cleaners 5</span>
          <div className="flex items-center">
              <Star size={12} className="fill-yellow-300 mx-[-4px] text-gray-800" />
          </div>
          <span className="text-sm font-outfit font-regular text-white tracking-normal">Service</span>
        </div>

        {/* H1 Heading - NOW DYNAMIC */}
        <h1 className="font-parkinsans text-3xl w-full md:w-[100%] mx-auto md:text-4xl lg:text-[40px] font-normal text-center text-luxury-dark leading-tight mb-4">
          {hero_heading || 'Your #1 Florida Commercial Cleaning Service'}
        </h1>

        {/* Paragraph */}
        <p className="text-center text-gray-800 text-base md:text-sm mb-8 font-light">
          Get free quote from Trusted Cleaning Services
        </p>

        {/* Form Component */}
        <HeroForm />
      </div>
    </div>
    </div>
  )
}