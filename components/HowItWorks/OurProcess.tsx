'use client'
import { useScrollAnimation } from '@/lib/useScrollAnimation'
import AnimateIn from '../AnimateIn'
export default function OurProcess() {
  const animRef = useScrollAnimation()
  return (
    <div className="text-center mb-16">
      <AnimateIn delay={0.1}>
      <span className="text-[11px] font-batch-size font-medium uppercase tracking-widest font-parkinsans mb-6">
        Our process
      </span></AnimateIn>
      <AnimateIn delay={0.25}>
      <h2 className="text-3xl w-[40vw] font-title-size text-black mx-auto md:text-5xl lg:text-[2.4rem] font-parkinsans leading-11 font-regular mt-3 mb-5">
        Customized Commercial Cleaning Plans
      </h2></AnimateIn>
    </div>
  )
}