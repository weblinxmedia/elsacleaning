'use client'
import { useScrollAnimation } from '@/lib/useScrollAnimation'
export default function ServicesHeader() {
  const animRef = useScrollAnimation()
  return (
    <div ref={animRef} className="text-center pt-15 mb-16">
      <span className="text-[11px] font-batch-size font-medium uppercase tracking-widest font-parkinsans mb-6">
        Services
      </span>
      <h2 className="sm:text-[1.5rem] font-title-size w-full md:w-[40vw] text-black mx-auto md:text-5xl lg:text-[2.4rem] font-parkinsans leading-11 font-regular mt-3 mb-5">
        Our Complete Commercial Cleaning Services
      </h2>
    </div>
  )
}