import Image from 'next/image'
import LeftOverlay from './LeftOverlay'
import BookingForm from './BookingForm'
import AnimateIn from '../AnimateIn'

export default function Booking() {
  return (
    <section className="relative w-full   py-20 md:py-28 overflow-hidden">
      
      {/* Background Image Layer */}
      <div className="absolute inset-0  z-0">
        <img
          src="https://shazamcleanwindows.com/assets/threestory-BzAbYM1P.jpg"  alt="Cleaning background"
          
          
          className="object-cover"
          
        />
        {/* Dark overlay to ensure text readability */}
     
      </div>

      {/* Content Layer */}
      <div className="relative shadow-md ">
        
        {/* Left Container: Transparent with Glass Card */}
        <div className='border-15 rounded-4xl min-h-screen border-white relative z-10 max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center'>
        <LeftOverlay/>
        
        {/* Right Container: Booking Form */}
        <AnimateIn>
        <BookingForm />
        </AnimateIn>
</div>
      </div>
    </section>
  )
}