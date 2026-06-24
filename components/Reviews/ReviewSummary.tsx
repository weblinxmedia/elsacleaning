'use client'
import { Star } from 'lucide-react'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

export default function ReviewSummary() {
  const animRef = useScrollAnimation()
  return (

    <div className="relative clippath-shape w-[250px] md:w-[400px] bg-luxury-pink rounded-b-3xl pb-5 mx-auto z-10 flex justify-center items-start mb-0 md:mb-8"
      style={{

        top: '-2px',
      }} >

      {/* <p> <img src="/images/c.svg"
 alt="" 
 className='absolute top-[1.3px] -left-8 -scale-x-100'
 /> </p>
<p> <img src="/images/c.svg"

alt="" className='absolute top-[1.3px] -right-8 scale-x-100'/> </p> */}

      <div ref={animRef} className=" rounded-2xl text-center mt-[-1.9rem] px-10 py-2 ">
        {/* 5 Pink Stars */}
        <div className=" flex items-center justify-center bg-white px-11 py-2.5 rounded-full gap-3 mb-1">
          <img src='/images/barktransparentlogo.png' width="45" alt="Star" />
          <div className=' flex items-center gap-1 justify-center text-center'>
            {[1, 2, 3, 4, 5].map((i) => (
              <div className='bg-luxury-pink-soft w-5 flex items-center justify-center h-5'><Star key={i} size={12} className="fill-luxury-pink  text-luxury-pink" /></div>
            ))}</div>
        </div>

        {/* Exceptional Text */}
        <h3 className="text-lg text-center font-regular text-luxury-lite font-parkinsans ">Exceptional 5 Rating</h3>

        {/* Rating Score */}
        <p className="text-luxury-lite text-sm font-regular font-parkinsans">
          Rating Score 5.0 of 5
        </p>

      </div>
    </div>
  )
}