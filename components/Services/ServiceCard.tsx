'use client';
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import { ServiceCardData } from './servicesConfig'

interface ServiceCardProps {
  data: ServiceCardData
}

export default function ServiceCard({ data }: ServiceCardProps) {
  return (
    <div className="bg-white border-1 border-luxury-pink cursor-pointer px-6 py-7.5 rounded-4xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col h-full">
      
      {/* Top: Icon & Title */}
      <div className="flex items-start pb-4 flex-col gap-4">
        <div 
          className="w-21 h-21 bg-luxury-pink-soft rounded-[25px] flex items-center justify-center flex-shrink-0"
          // Light violet background
        >
          {data.icon}
        </div>
        <h3 className="font-regular font-parkinsans text-black mt-2 text-2xl">{data.title}</h3>
      </div>

      {/* Middle: Feature List */}
      <ul className="space-y-4 mb-1 flex-grow">
        {data.features.map((feature, index) => (
          
          <li key={index} className="flex items-center mb-2.5 gap-2">
            <div className="w-[fit-content] flex items-center justify-start flex-shrink-0">
              <Check size={13} className="text-luxury-pink" strokeWidth={3} />
            </div>
            <span className="text-gray-600 font-thin font-outfit">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Bottom: Learn More Button */}
      <Link
        href={data.link}
        className="font-parkinsans flex items-center justify-between w-full text-sm px-5 py-2.5 rounded-full cursor-pointer text-luxury-lite bg-luxury-pink font-semibold tracking-normal transition-all duration-300 hover:shadow-lg transform hover:scale-[1.0]"
     >
        <span className="text-sm font-regular">Learn more</span>
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
          <ArrowRight size={16} className="text-luxury-pink" />
        </div>
      </Link>
    </div>
  )
}