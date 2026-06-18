// app/layout.tsx

import type { Metadata } from 'next'
import './globals.css'
import { Parkinsans, Outfit } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Providers from './Providers'
import { getSettings } from '@/lib/getSettings'
import ScrollToTop from '@/components/ScrollToTop'
import NextTopLoader from 'nextjs-toploader'; // 🔹 Import the loader

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const initialSettings = await getSettings()

  return (
    <html lang="en" className={`${parkinsans.variable} ${outfit.variable} scroll-smooth`}>
      <body className={`${parkinsans.className} ${outfit.className} antialiased bg-white text-gray-900`}>
          {/* 🔹 Horizontal Loading Bar Configuration */}
          <NextTopLoader 
            color="var(--color-luxury-pink)" // Your brand luxury-pink
            initialPosition={0.08}
            crawlSpeed={200}
            zIndex={99999999999}
            height={4}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px var(--color-luxury-pink),0 0 5px var(--color-luxury-pink)"
          />
          
          <ScrollToTop />
          <Providers initialSettings={initialSettings}>
            <main>{children}</main>
          </Providers>
      </body>
    </html>
  )
}