import type { Metadata } from 'next'
import './globals.css'
import { Parkinsans, Outfit } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Providers from './Providers'
import { getSettings } from '@/lib/getSettings' // 🔹 Import your helper
import ScrollToTop from '@/components/ScrollToTop'
export const dynamic = 'force-dynamic' 
const parkinsans = Parkinsans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-parkinsans',
  display: 'swap',
})
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
})

// Note: You can also make Metadata dynamic here if you want!
export const metadata: Metadata = {
  title: "Elsa's House Cleaning | Luxury Commercial Cleaning",
  description: 'Premium cleaning services',
   icons: {
    icon: '/images/else2.png',
    shortcut: '/images/shortcut-icon.png',
    apple: '/apple-icon.png',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // 🔥 1. Fetch settings on the SERVER
  const initialSettings = await getSettings()

  return (
    <html lang="en" className={`${parkinsans.variable} ${outfit.variable} scroll-smooth`}>
      <body className={`${parkinsans.className} ${outfit.className} antialiased bg-white text-gray-900`}>
          <ScrollToTop />
          {/* 🔥 2. Pass those settings into Providers */}
          <Providers initialSettings={initialSettings}>
            <main>{children}</main>
          </Providers>
      </body>
    </html>
  )
}