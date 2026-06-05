'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, X } from 'lucide-react'
import { navConfig } from './navConfig'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)
  const [dynamicNavConfig, setDynamicNavConfig] = useState(navConfig)
  const [isClosing, setIsClosing] = useState(false)

  // 🔹 Fetch dynamic services and areas
  useEffect(() => {
    const fetchDynamicData = async () => {
      try {
        const [servicesRes, areasRes] = await Promise.all([
          fetch('/api/services'),
          fetch('/api/areas')
        ])

        let serviceDropdown = []
        if (servicesRes.ok) {
          const servicesData = await servicesRes.json()
          serviceDropdown = servicesData.map((s: { label: string; value: string }) => ({
            label: s.label,
            href: `/services/${s.value}`
          }))
        }

        let areasDropdown = []
        if (areasRes.ok) {
          const areasData = await areasRes.json()
          areasDropdown = areasData.map((a: { name: string; slug: string }) => ({
            label: a.name,
            href: `/areas/${a.slug}`
          }))
        }

        setDynamicNavConfig(prevConfig => 
          prevConfig.map(item => {
            if (item.label === 'Services') return { ...item, dropdown: serviceDropdown }
            if (item.label === 'Areas') return { ...item, dropdown: areasDropdown }
            return item
          })
        )
      } catch (err) {
        console.error('Failed to load mobile nav data:', err)
      }
    }

    fetchDynamicData()
  }, [])

  // Reset accordion when menu closes
  useEffect(() => {
    if (!isOpen) {
      setOpenAccordion(null)
      setIsClosing(false)
    }
  }, [isOpen])

  // 🔹 Smooth close: slides back to right, THEN closes after animation
  const handleSmoothClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
    }, 500) // Match the slide-out animation duration
  }

  // Whether panel should be visible (open or currently closing)
  const isVisible = isOpen || isClosing
  // Whether panel should slide in or out
  const isSlideIn = isOpen && !isClosing

  return (
    <div className={`fixed inset-0 z-[999] md:hidden transition-opacity duration-500 ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
      
      {/* Backdrop */}
      <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${isSlideIn ? 'opacity-100' : 'opacity-0'}`} onClick={handleSmoothClose} />

      {/* Luxury Panel - Slides from right */}
      <div className={`absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-500 ease-in-out ${isSlideIn ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Close Button */}
        <div className="flex justify-end p-6 pb-0">
          <button onClick={handleSmoothClose} className="p-2 text-gray-400 hover:text-luxury-dark hover:bg-gray-50 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-8 px-8">
          {dynamicNavConfig.map((item) => (
            <div key={item.label} className="mb-5">
              {item.dropdown && item.dropdown.length > 0 ? (
                <div>
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    {/* 🔹 Clickable Link for the main page (e.g., /services) */}
                    <Link
                      href={item.href || '#'}
                      onClick={handleSmoothClose}
                      className="text-xl font-parkinsans font-regular text-luxury-dark hover:text-luxury-pink transition-colors duration-200"
                    >
                      {item.label}
                    </Link>

                    {/* 🔹 Chevron toggles the dropdown only */}
                    <button
                      onClick={() => setOpenAccordion(openAccordion === item.label ? null : item.label)}
                      className="p-1 hover:bg-gray-50 rounded-full transition-colors"
                    >
                      <ChevronDown className={`w-5 h-5 text-luxury-pink transition-transform duration-300 ${openAccordion === item.label ? 'rotate-180' : 'rotate-0'}`} />
                    </button>
                  </div>
                  
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openAccordion === item.label ? 'max-h-[500px] opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                    <div className="pl-4 space-y-3 border-l-2 border-luxury-pink">
                      {item.dropdown.map((drop) => (
                        <Link
                          key={drop.label}
                          href={drop.href}
                          onClick={handleSmoothClose}
                          className="block text-base font-parkinsans font-regular text-gray-600 hover:text-luxury-pink hover:translate-x-1 transition-all duration-200"
                        >
                          {drop.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href || '#'}
                  onClick={handleSmoothClose}
                  className="block text-lg font-parkinsans font-regular text-luxury-dark border-b border-gray-100 pb-4 hover:text-luxury-pink transition-colors duration-200"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="p-8 border-t border-gray-100 bg-gray-50/50">
          <Link
            href="/contact"
            onClick={handleSmoothClose}
            className="block w-full py-4 text-center bg-luxury-pink text-white font-parkinsans font-regular tracking-widest text-sm rounded-full hover:bg-luxury-pink transition-colors duration-300 shadow-md"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </div>
  )
}