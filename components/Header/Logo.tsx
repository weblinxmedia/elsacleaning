'use client' // 1. Make it a client component to use the hook

import Link from 'next/link'
import { useSettings } from '@/app/context/SettingsContext'// 2. Import the hook

export default function Logo() {
  const { logo_url, site_name } = useSettings() // 3. Get the dynamic data

  // 4. Fallback to your default logo if no logo is uploaded in the dashboard yet
  const logoSrc = logo_url || '/images/mainlogo.webp'
  const altText = site_name || 'commercial cleaning'

  return (
    <Link href="/" className="flex-shrink-0 text-2xl font-bold tracking-wider">
      <img 
        src={logoSrc} 
        width="110" 
        alt={altText} 
        className="transition-all duration-300" 
      />
    </Link>
  )
}