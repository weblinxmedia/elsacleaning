'use client' // <-- Add this

import Image from 'next/image'
import { useSettings } from '@/app/context/SettingsContext' // <-- Add this

export default function HeroBackground() {
  const { hero_image_url } = useSettings() // <-- Add this

  // Fallback to default local image if not set in dashboard
  const imageSrc = hero_image_url || '/images/banner.webp'

  return (
    <div className="absolute top-0 left-0 w-full h-[100%] z-0">
      <Image
        key={imageSrc} // Forces re-render when image changes
        src={imageSrc}
        alt="Luxury Commercial Cleaning"
        fill
        priority
        className="object-cover object-center sm:object-right"
        quality={100}
      />
      {/* Subtle overlay to ensure text readability over any image */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-white/80" /> */}
    </div>
  )
}