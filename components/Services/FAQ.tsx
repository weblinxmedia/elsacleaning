'use client'

import { useState } from 'react'
import AnimateIn from '../AnimateIn'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  subtitle: string
  heading: string
  description: string
  faqs: FAQItem[]
}

export default function FAQ({ subtitle, heading, description, faqs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 pb-20">
        
        {/* 🔹 SEO Optimized Header Block */}
        <div className="text-center mb-12">
          <AnimateIn delay={0.1}>
               <span className="text-[12px] font-batch-size font-medium uppercase tracking-widest font-parkinsans mb-6">
        {subtitle}
      </span></AnimateIn>
            {/* SEO Optimized Heading */}
            <AnimateIn delay={0.2}>
           <h2 className="text-3xl font-title-size min-w-[40vw] text-black mx-auto lg:text-[2.5rem] font-parkinsans leading-11 font-regular mt-4 mb-5">
       {heading}
             </h2></AnimateIn>
             <AnimateIn delay={0.3}>
            {/* SEO Optimized Paragraph */}
            <p className="text-gray-600 w-full md:w-[99%] font-outfit md:text-[16px] leading-tight text-center font-light">
              {description}
            </p>
          </AnimateIn>
        </div>

        {/* 🔹 2-Column Grid for FAQs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <AnimateIn delay={ index * 0.2}>
              <div 
                key={index} 
                className="border border-gray-200 bg-[#f3f5f0] rounded-[30px] py-10 px-5 cursor-pointer hover:border-luxury-pink/50 transition-colors duration-300"
                onClick={() => toggleFAQ(index)}
              >
                {/* Question Row */}
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-medium md:text-[16px] font-parkinsans font-regular text-luxury-dark">
                    {faq.question}
                  </h3>
                  
                  {/* Plus/Minus Icon */}
                  <div className="flex-shrink-0 w-4 h-4 relative">
                    {/* Horizontal Line (always visible) */}
                    <span className="absolute top-1/2 left-0 w-full h-[1px] bg-luxury-dark transform -translate-y-1/2 transition-colors duration-300"></span>
                    {/* Vertical Line (hides when open) */}
                    <span className={`absolute top-0 left-1/2 w-[1px] h-full bg-luxury-dark transform -translate-x-1/2 transition-all duration-300 ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}></span>
                  </div>
                </div>

                {/* 🔹 Expanding Answer */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-gray-600 font-outfit text-[13px] md:text-[15px] border-t-[1px] border-luxury-pink/60 leading-tight pt-5 font-light">
                      {faq.answer}
                    </p>
                  </div>
                </div>

              </div>
              </AnimateIn>
            )
          })}
        </div>

      </div>
    </section>
  )
}