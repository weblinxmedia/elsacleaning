'use client';
import Link from 'next/link'
import { Phone, Mail } from 'lucide-react'
import { useSettings } from '@/app/context/SettingsContext'
export default function FooterBrand() {
  const { phone, email } = useSettings()
  return (
    <div className="flex flex-col h-full">
      {/* Logo Image Placeholder */}
      <div className="mb-6 flex items-start justify-start">
        <img src="/images/footersvg.svg" alt="Logo" className="w-13" onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
      </div>

     <h2 className="text-3xl max-w-[80%] md:text-4xl lg:text-4xl font-parkinsans font-regular mb-3">
        Trusted Housekeepers Ready to Clean
      </h2>
      <p className="text-gray-500 md:text-medium font-thin font-outfit mb-5">
        Easy, no-fuss cleaning services for busy people.
      </p>
<div className="space-y-4 mb-8">
  <div className="flex items-center gap-4">
    <Phone size={18} className="text-gray-900" />
    <a href={`tel:${phone}`} className="text-[16px] text-gray-900 font-thin">{phone || '(321) 456-7890'}</a>
  </div>
  <div className="flex items-center gap-4">
    <Mail size={18} className="text-gray-900" />
    <a href={`mailto:${email}`} className="text-[16px] text-gray-900 font-thin">{email || 'info@pinkladies.com'}</a>
  </div>
</div>

      <Link
        href="/contact"
       className="font-parkinsans w-[fit-content] bg-luxury-pink text-sm px-7.5 py-3.5 rounded-full cursor-pointer text-luxury-lite font-medium  tracking-normal transition-all duration-300 hover:shadow-lg transform hover:scale-[1.0]"

        >
        Book Cleaning
      </Link>
    </div>
  )
}