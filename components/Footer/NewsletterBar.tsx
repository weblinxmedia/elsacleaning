'use client'

import AnimateIn from "../AnimateIn"

export default function NewsletterBar() {
  return (
    <AnimateIn>
    <div className="flex flex-change relative w-fit mx-auto rounded-b-4xl px-6 pb-3 bg-white flex-col md:flex-row items-center justify-between gap-2 mb-16">
      <p> <img src="/images/c2.svg"
 alt="" 
 className='absolute top-[0px] -left-8 -scale-x-100'
 /> </p>
<p> <img src="/images/c2.svg"

alt="" className='absolute top-[0px]  -right-8 scale-x-100'/> </p>
      <h3 className="text-[15px] -ml-3 font-regular text-black whitespace-nowrap">
        Subscribe to our Newsletter
      </h3>
      <div className="flex w-full flex-change items-center md:items-center gap-2 md:w-auto">
        <input
          type="email"
          placeholder="Enter your email address"
          className="flex-1 md:w-[260px] px-6 py-3.5 rounded-full border border-r-0 border-luxury-pink text-sm focus:outline-none focus:border-luxury-pink transition-colors"
        />
        <button
           className="font-parkinsans w-[fit-content] bg-luxury-pink text-sm px-13.5 py-3.5 rounded-full cursor-pointer text-luxury-lite font-medium  tracking-normal transition-all duration-300 hover:shadow-lg transform hover:scale-[1.0]"
     >
          Subscribe
        </button>
      </div>
    </div></AnimateIn>
  )
}