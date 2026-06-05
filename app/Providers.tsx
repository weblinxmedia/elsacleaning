'use client'

import { SettingsProvider } from '@/app/context/SettingsContext'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SettingsProvider>
      {children}
    </SettingsProvider>
  )
}