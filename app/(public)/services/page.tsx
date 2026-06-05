import HowItWorks from '@/components/HowItWorks'
import Reviews from '@/components/Reviews'
import Services from '@/components/Services'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Services | Pink Ladies Commercial Cleaning',
  description: 'Explore our premium commercial cleaning services including office, house, Airbnb, and yacht cleaning.',
}

export default function ServicesPage() {
  return (
    <div className="w-full mt-7 md:mt-3 bg-white">
      <div className="max-w-[1280px]  pt-20 md:pt-28 mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-5">
          
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-regular font-parkinsans text-luxury-dark leading-tight">
            Services
          </h1>
          <p className="text-gray-600 text-medium max-w-2xl font-thin mx-auto leading-relaxed">
Services We Provide          </p>
        </div>
        
        {/* Placeholder Container - You can replace this later */}
    <Services />
          <HowItWorks />

<Reviews />
          
      </div>
    </div>
  )
}