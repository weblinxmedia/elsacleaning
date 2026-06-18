'use client'

import { SettingsProvider } from '@/app/context/SettingsContext'

export default function Providers({ 
  children, 
  initialSettings // 🔹 Receive settings from layout
}: { 
  children: React.ReactNode, 
  initialSettings: any 
}) {
  return (
    <SettingsProvider initialData={initialSettings}>
      {children}
    </SettingsProvider>
  )
}