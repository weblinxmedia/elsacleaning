'use client'

import { useState } from 'react'
import LocationTabs from './LocationTabs'
import ContactInfo from './ContactInfo'
import MapSection from './MapSection'
import { locationsData } from './locationsConfig'
import AnimateIn from '../AnimateIn'

export default function GetInTouch() {
  const [activeLocationId, setActiveLocationId] = useState(locationsData[0].id)

  const activeLocation = locationsData.find((loc) => loc.id === activeLocationId) || locationsData[0]

  return (
    <section className="w-full pt-20 pb-5 overflow-visible">
      <div className="max-w-[1280px] mx-auto relative">
        
        {/* Floating Tabs (Positioned 50% above container) */}
        <AnimateIn delay={0.2}>
        <LocationTabs 
          locations={locationsData} 
          activeId={activeLocationId} 
          onSelect={setActiveLocationId} 
        /></AnimateIn>

        {/* Main Container */}
        <div className=" rounded-4xl p-8 md:p-12 pt-16 md:pt-20 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
        style={{background:'linear-gradient(to bottom, #f5f7f2 20%, #fff 100%)'}}>
          
          {/* Left Side: Content */}
          <ContactInfo location={activeLocation} />
          
          {/* Right Side: Map & SVG */}
          <AnimateIn>
          <MapSection location={activeLocation} />
</AnimateIn>
        </div>
      </div>
    </section>
  )
}