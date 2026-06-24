'use client'
import Image from 'next/image'
import { companyLogos } from './reviewsConfig'
import { useScrollAnimation } from '@/lib/useScrollAnimation'
export default function ReviewsIntro() {
  const animRef = useScrollAnimation()
  return (
    <div ref={animRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-10 items-center mb-16">
      {/* Left Side: Image */}
      <div className="relative w-full overflow-hidden shadow-xl group">
        <img
          src="https://media.istockphoto.com/id/2172691489/photo/young-woman-cleaning-the-kitchen.jpg?s=612x612&w=0&k=20&c=2u8Z9qcV6829MNOqYjrIPtsP-jrzBmyCG8JYS6US-OM=" alt="Happy customer service team"


          className="object-contain transition-transform rounded-3xl duration-700 ease-out "

        />
      </div>

      {/* Right Side: Text & Logos */}
      <div className="flex flex-col items-end">
        <div className='w-full md:w-[90%] size-adjust margin-set' style={{ marginRight: '3rem' }}>
          <span className="text-[13px] font-batch-size font-medium text-luxury-lite uppercase tracking-widest font-parkinsans mb-5">
            Reviews
          </span>

          {/* Large Heading */}
          <h2 className="text-3xl font-title-size md:text-4xl lg:text-4xl text-luxury-lite font-parkinsans font-regular mb-5">
            Trusted by Thousands of People and Companies
          </h2>

          {/* Paragraph */}
          <p className="text-luxury-lite font-para-size md:text-medium font-thin font-outfit mb-8">
            Our dedicated customer service team is always here to provide prompt and helpful assistance with any question or concerns you might love.
          </p>
          {/* Logos */}
          <div className="flex flex-wrap items-center logo-size justify-between opacity-50 gap-8">
            <p><img src="/images/logo1.svg" width={'120'} alt="" /></p>
            <p><img src="/images/logo2.svg" width={'120'} alt="" /></p>
            <p><img src="/images/logo3.svg" width={'120'} alt="" /></p>
          </div>
        </div>
      </div>
    </div>
  )
}