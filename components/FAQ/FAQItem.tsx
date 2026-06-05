'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { FAQData } from './faqConfig'

interface FAQItemProps {
  data: FAQData
}

export default function FAQItem({ data }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-luxury-pink rounded-[30px] overflow-hidden transition-all duration-300">
      {/* Clickable Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex cursor-pointer items-center justify-between p-7 text-left bg-white transition-colors duration-200"
      >
        <span className="font-parkinsans md:text-lg font-regular text-luxury-dark">
          {data.question}
        </span>
        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-blacktransition-all duration-300">
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </span>
      </button>

      {/* Smooth Expand Animation */}
      <div 
        className="grid transition-all duration-400 ease-in-out"
        style={{ 
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5">
            {/* Pink Divider Line */}
            <div className="w-full h-[1px] bg-luxury-pink/40 mb-4" />
            {/* Answer Paragraph */}
            <p className="text-gray-500 px-3 text-sm font-thin font-outfit">
              {data.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}