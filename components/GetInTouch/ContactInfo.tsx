import { Phone, Mail } from 'lucide-react'
import { LocationData } from './locationsConfig'
import { useSettings } from '@/app/context/SettingsContext'
import AnimateIn from '../AnimateIn'
interface ContactInfoProps {
  location: LocationData
}

export default function ContactInfo({ location }: ContactInfoProps) {
  const { phone, email, office_hours } = useSettings()

  return (
    <AnimateIn>
    <div className="flex flex-col justify-center h-full py-8">
      {/* Small Label */}
      <AnimateIn delay={0.3}><span className="text-[13px] font-batch-size font-medium uppercase tracking-widest font-parkinsans mb-3">
        Get In Touch
      </span></AnimateIn>

      {/* Large Heading */}
      <AnimateIn delay={0.4}><h2 className="text-3xl font-title-size max-w-[80%] md:text-4xl lg:text-4xl font-parkinsans font-regular mt-3 mb-5">
        Choose Elsa House Cleaning, Choose Quality
      </h2></AnimateIn>

      {/* Paragraph */}
      <AnimateIn delay={0.5}><p className="text-gray-500 font-para-size md:text-medium font-thin font-outfit mb-8">
Ready to experience the cleansing difference? Book our service today, and we will handle the rest!      </p>
</AnimateIn>
      {/* Office Hours */}
      <AnimateIn delay={0.4}><div className="mb-2 font-outfit">
  <h4 className="text-[16px] text-gray-500 font-para-size font-thin">Our office is open</h4>
  <p className="text-[16px] text-gray-500 font-para-size font-thin">{office_hours || 'Monday to Saturday, 9 AM to 4 PM'}</p>
</div></AnimateIn>

      {/* Dynamic Address */}
      <AnimateIn delay={0.5}><div className="mb-8">
        <p className="text-[16px] text-gray-500 font-para-size font-thin">{location.address}</p>
      </div></AnimateIn>

      {/* Phone & Email */}
      <AnimateIn delay={0.6}><div className="space-y-4 mb-8">
  <div className="flex items-center gap-4">
    <Phone size={18} className="text-gray-500" />
    <a href={`tel:${phone}`} className="text-[16px] text-gray-500 font-para-size font-thin">{phone || '(321) 456-7890'}</a>
  </div>
  <div className="flex items-center gap-4">
    <Mail size={18} className="text-gray-500" />
    <a href={`mailto:${email}`} className="text-[16px] text-gray-500 font-para-size font-thin">{email || 'info@pinkladies.com'}</a>
  </div>
</div></AnimateIn>
      {/* Contact Button */}
      <div>
        <a
          href="/contact"
          className="font-parkinsans w-[fit-content] text-sm px-7.5 py-3.5 bg-luxury-pink rounded-full cursor-pointer text-luxury-lite font-medium  tracking-normal transition-all duration-300 hover:shadow-lg transform hover:scale-[1.0]"
    
        >
          Contact Us
        </a>
      </div>
    </div></AnimateIn>
  )
}