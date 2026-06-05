'use client'

import { useState } from 'react'
import Link from 'next/link'
import AccordionItem from './AccordionItem'
import { accordionData } from './whyChooseConfig'
import { useScrollAnimation } from '@/lib/useScrollAnimation'
import AnimateIn from '../AnimateIn'
export default function WhyChooseContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
const animRef = useScrollAnimation()
  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div  className="flex flex-col overflow-hidden justify-center h-full py-8">
      {/* Small Label */}
      <AnimateIn>
      <span className="text-[13px] font-batch-size font-medium uppercase tracking-widest font-parkinsans mb-3">
        Why choose us
      </span></AnimateIn>

      {/* Large Heading */}
      <AnimateIn delay={0.23}>
      <h2 className="text-2xl font-title-size md:text-4xl lg:text-4xl font-parkinsans font-regular mb-5 mt-3">
        Sparkling Commercial Cleaning Services in San Francisco
      </h2></AnimateIn>

      {/* Paragraph */}<AnimateIn delay={0.3}>
      <p className="text-gray-500 font-para-size md:text-medium font-thin font-outfit mb-8">
        Do you want to step into an office that keeps your mood fresh all day? At Elsa's House Cleaning, we create a comfortable environment in your commercial spaces by providing high grade cleaning services.
      </p></AnimateIn>

      {/* Accordions */}
      <div className="space-y-4 mb-10">
        {accordionData.map((item, index) => (
          <AnimateIn delay={index*0.2}>
          <AccordionItem
            key={index}
            title={item.title}
            content={item.content}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
          />
      </AnimateIn>  ))}
      </div>

      {/* CTA Button */}
      <div>
        <AnimateIn delay={0.2}>
        <Link
          href="/quote"
         
        className="font-parkinsans w-[fit-content] button-font-size text-sm px-7 py-3.5 rounded-full cursor-pointer text-luxury-lite bg-luxury-pink font-semibold capitalize tracking-normal transition-all duration-300 hover:shadow-lg transform hover:scale-[1.0]"
    
        >
          Get a Free Quote Now
        </Link></AnimateIn>
      </div>
    </div>
  )
}