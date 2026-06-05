'use client'

import { useState } from 'react'
import Link from 'next/link'
import AnimateIn from '../AnimateIn'

interface Location {
  label: string
  address: string
}

interface FreeEstimateProps {
  subtitle: string
  heading: string
  locations: Location[]
  bottomHeading: string
  bottomDescription: string
}

export default function FreeEstimate({ subtitle, heading, locations, bottomHeading, bottomDescription }: FreeEstimateProps) {
  const [activeLocation, setActiveLocation] = useState(0)

  // Encodes the address for the Google Maps embed URL
  const mapSrc = locations.length > 0 
    ? `https://maps.google.com/maps?q=${encodeURIComponent(locations[activeLocation].address)}&output=embed`
    : ''

  return (
    <section className="w-full relative pt-30 rounded-t-[4rem] mb-20"
    style={{
      background:"url('/images/mapbanner.webp')",
      minHeight:'70vh',
      backgroundPosition:'top center'
    }}
    >
      <div className='w-full h-full absolute top-0 left-0 rounded-t-[4rem] bg-black/60'></div>
      <div className="max-w-[1280px] mx-auto px-4  mb-15 md:mb-0">
        
        {/* 🔹 SEO Optimized Header Block */}
        <div className="text-center mb-12 z-[200] mt-15 relative ">
          <AnimateIn>
         <span className="text-[12px] md:text-[17px] font-batch-size font-medium  text-luxury-lite uppercase tracking-widest font-parkinsans mb-6">
        {subtitle}
      </span></AnimateIn>

           <AnimateIn delay={0.2}>
             <h2 className="text-3xl font-title-size font-medium min-w-[40vw] text-luxury-lite mx-auto md:text-5xl lg:text-[2.6rem] font-parkinsans leading-normal font-regular mt-4 mb-5">
       {heading}
             </h2></AnimateIn>
        </div>

        {/* 🔹 Map & Buttons Container */}
        <div className=" max-w-4xl h-auto z-[205] relative min-h-auto shadow-lg rounded-4xl bg-white grid grid-cols-1 md:grid-cols-2 -mb-[13rem] mx-auto">
          <div>
          {/* Location Buttons (Overlapping the top of the map) */}
          {locations.length > 0 && (
            <div className="absolute top-0 right-[10%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-wrap justify-center gap-3">
              {locations.map((loc, index) => (
                <AnimateIn delay={0.1 * index}>
                <button
                  key={index}
                  onClick={() => setActiveLocation(index)}
                  className={`px-6 py-2.5 rounded-full font-parkinsans font-regular text-sm  tracking-wider shadow-md transition-all duration-300 ${
                    activeLocation === index 
                      ? 'bg-luxury-pink text-white' 
                      : 'bg-white text-luxury-dark border border-gray-200 hover:border-luxury-pink'
                  }`}
                >
                  {loc.label}
                </button>
           </AnimateIn>    ))}
            </div>
          )}

          {/* Map Container */}
          <div className="w-full rounded-2xl h-[100%]  overflow-hidden shadow-lg">
            {mapSrc ? (
              <iframe 
                src={mapSrc}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title={locations[activeLocation]?.label || 'Map'}
              ></iframe>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                No location added yet.
              </div>
            )}
          </div>

          </div>
            <div className="text-start w-[80%] mx-auto flex justify-center gap-4 flex-col h-auto min-h-[300px] md:min-h-[290px]">
                  <AnimateIn> <h3 className="text-2xl font-title-size text-luxury-dark w-full md:w-[90%] font-parkinsans leading-tight font-regular">
    {bottomHeading}
             </h3></AnimateIn>
           <AnimateIn delay={0.2}>
            <p className="text-gray-500 w-full md:w-[80%] font-outfit md:text-[16px] leading-tight text-start font-thin">
             {bottomDescription}
            </p></AnimateIn>
            <AnimateIn delay={0.3}>
              <div className='bg-luxury-pink/60 w-full h-[1px] '></div>
            </AnimateIn>
            <AnimateIn delay={0.4} className='mt-4'>
          <Link 
            href="/contact" 
          className="font-parkinsans w-[fit-content] text-sm px-7.5 nav-font py-3.5 rounded-full cursor-pointer text-luxury-lite bg-luxury-pink font-medium  tracking-normal transition-all duration-300 hover:shadow-lg transform hover:scale-[1.0]"
      >
            Book Cleaning
          </Link></AnimateIn>
        </div>
        </div>

        {/* 🔹 Bottom Content & CTA */}
      

      </div>
    </section>
  )
}