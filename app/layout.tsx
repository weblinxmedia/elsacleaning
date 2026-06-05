import type { Metadata } from 'next'
import './globals.css'
import { Parkinsans, Outfit } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Providers from './Providers'

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

export const metadata: Metadata = {
  title: "Elsa's House Cleaning | Luxury Commercial Cleaning",
  description: 'Premium cleaning services',
   icons: {
    icon: '/images/else2.png', // Points to /public/custom-icon.png
    shortcut: '/images/shortcut-icon.png',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${parkinsans.variable} ${outfit.variable} scroll-smooth`}>
      <body className={`${parkinsans.className} ${outfit.className} antialiased bg-white text-gray-900`}>
          <Providers>
   
          <main>{children}</main>
     
        </Providers>
      </body>
    </html>
  )
}