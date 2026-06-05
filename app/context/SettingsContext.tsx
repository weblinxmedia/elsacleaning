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
  site_name: 'Pink Ladies Commercial Cleaning',
  phone: '(321) 456-7890',
  email: 'info@pinkladies.com',
  meta_title: 'Pink Ladies Commercial Cleaning',
  meta_description: 'Professional cleaning services',
  meta_keywords: 'cleaning, commercial, office',
  logo_url: '',
  office_hours: 'Monday to Saturday, 9:00 AM to 4:00 PM',
  address: '',
  hero_heading: 'Your #1 Florida Commercial Cleaning Service',
  hero_image_url: '/images/banner.webp',
  social_facebook: '',
  social_instagram: '',
  social_linkedin: '',
}

const SettingsContext = createContext<SiteSettings>(defaultSettings)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('site_settings')
      if (saved) {
        try {
          return { ...defaultSettings, ...JSON.parse(saved) }
        } catch (e) {
          return defaultSettings
        }
      }
    }
    return defaultSettings
  })

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