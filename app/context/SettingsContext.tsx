'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export interface SiteSettings {
  site_name: string
  phone: string
  email: string
  meta_title: string
  meta_description: string
  meta_keywords: string
  logo_url: string
  office_hours: string
  address: string
  hero_heading: string
  hero_image_url: string
  social_facebook: string
  social_instagram: string
  social_linkedin: string
}

const defaultSettings: SiteSettings = {
  site_name: "",
  phone: '+1 (301) 785-6581',
  email: '',
  meta_title: "",
  meta_description: 'Professional cleaning services',
  meta_keywords: 'cleaning, commercial, office',
  logo_url: '/images/demo/logomain.webp',
  office_hours: 'Monday to Saturday, 9:00 AM to 4:00 PM',
  address: '',
  hero_heading: 'A Spotless Space, Without the Stress. Claim Your Free Quote!',
  hero_image_url: '/images/david.jpeg',
  social_facebook: '',
  social_instagram: '',
  social_linkedin: '',
}

const SettingsContext = createContext<SiteSettings>(defaultSettings)

export function SettingsProvider({
  children,
  initialData // 🔹 Receive initial data from server
}: {
  children: ReactNode,
  initialData: any
}) {
  // 🔥 INITIALIZE STATE WITH SERVER DATA
  // This removes the flicker because the first render matches the server HTML exactly.
  const [settings, setSettings] = useState<SiteSettings>(() => ({
    ...defaultSettings,
    ...initialData
  }))

  // Keep the background fetch to keep things synced if you update in dashboard
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings')
        if (res.ok) {
          const data = await res.json()
          const mergedSettings = { ...defaultSettings, ...data }
          setSettings(mergedSettings)
          localStorage.setItem('site_settings', JSON.stringify(mergedSettings))
        }
      } catch (error) {
        console.error('Failed to load site settings:', error)
      }
    }
    fetchSettings()
  }, [])

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => useContext(SettingsContext)