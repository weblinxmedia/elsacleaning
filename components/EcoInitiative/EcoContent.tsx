'use client'
import { Check } from 'lucide-react'
import { ecoFeatures } from './ecoConfig'
import { useScrollAnimation } from '@/lib/useScrollAnimation'
export default function EcoContent() {
  const animRef = useScrollAnimation()
  return (
    <div ref={animRef} className="flex flex-col overflow-hidden justify-center h-full py-8">
      {/* Small Label */}
      <span className="text-[13px] font-batch-size font-medium uppercase tracking-widest font-parkinsans mb-3">
        Why us
      </span>

      {/* Large Heading */}
      <h2 className="text-3xl font-title-size md:text-4xl lg:text-4xl font-parkinsans font-regular mb-5">
        Green Commercial Cleaning Initiative by Conerstone Floor Care Cleaning LLC
      </h2>

      {/* Paragraph */}
      <p className="text-gray-500 font-para-size size-adjust w-[82%] md:text-medium font-thin font-outfit mb-4">
        At Conerstone Floor Care Cleaning, we are committed to providing safe and non-toxic cleaning services. Clearing should not harm the environment but benefit it. All of the products and processes are chosen carefully to support a green clean in San Francisco.</p>


      {/* Feature List */}
      <ul className="space-y-0">
        {ecoFeatures.map((feature, index) => (
          <li
            key={index}
            className={`flex items-center gap-3 py-4 ${index < ecoFeatures.length - 1 ? 'border-b border-gray-300' : ''}`}
          >
            <div className="w-6 h-6 rounded-full font-parkinsans bg-luxury-pink flex items-center justify-center flex-shrink-0">
              <Check size={14} className="text-white" strokeWidth={2} />
            </div>
            <span className="text-black md:text-[20px] font-para-size font-regular">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}