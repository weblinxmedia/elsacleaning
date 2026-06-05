'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { navConfig } from './navConfig'

export default function DesktopNav() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [dynamicNavConfig, setDynamicNavConfig] = useState(navConfig)

  // Fetch dynamic services AND areas, then inject into dropdowns
  useEffect(() => {
    const fetchDynamicData = async () => {
      try {
        // 1. Fetch Services
        const servicesRes = await fetch('/api/services')
        let serviceDropdown = []
        if (servicesRes.ok) {
          const servicesData = await servicesRes.json()
          serviceDropdown = servicesData.map((service: { label: string; value: string }) => ({
            label: service.label,
            href: `/services/${service.value}`
          }))
        }

        // 2. Fetch Areas
        const areasRes = await fetch('/api/areas')
        let areasDropdown = []
        if (areasRes.ok) {
          const areasData = await areasRes.json()
          areasDropdown = areasData.map((area: { name: string; slug: string }) => ({
            label: area.name,
            href: `/areas/${area.slug}`
          }))
        }

        // 3. Update the navConfig by replacing both 'Services' and 'Areas' dropdowns
        setDynamicNavConfig(prevConfig => 
          prevConfig.map(item => {
            if (item.label === 'Services') {
              return { ...item, dropdown: serviceDropdown }
            }
            if (item.label === 'Areas') {
              return { ...item, dropdown: areasDropdown }
            }
            return item
          })
        )

      } catch (err) {
        console.error('Failed to load navigation data:', err)
      }
    }

    fetchDynamicData()
  }, [])

  return (
    <nav className="hidden md:flex items-center gap-6"
    style={{
      width: 'fit-content',
      margin: '0px 0px 0px 6%'
    }}> 
      {dynamicNavConfig.map((item) => (
        <div
          key={item.label}
          className="relative"
          onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          {item.dropdown && item.dropdown.length > 0 ? (
            <Link href={item.href || '#'} className="flex nav-font items-center gap-1 text-[15px] font-medium text-gray-800 hover:text-luxury-pink transition-colors duration-300">
              {item.label}
              <ChevronDown className={`w-4 h-4 nav-font transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
            </Link>
          ) : (
            <Link href={item.href || '#'} className="nav-link nav-font text-[15px] font-medium text-gray-800 hover:text-luxury-pink transition-colors duration-300">
              {item.label}
            </Link>
          )}

          {item.dropdown && item.dropdown.length > 0 && activeDropdown === item.label && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 dropdown-animate z-50">
              <div className="bg-white rounded-md py-2 min-w-[220px]" style={{ border: '2px solid var(--color-luxury-pink)', boxShadow: '0 10px 30px rgba(232, 160, 180, 0.2)' }}>
                {item.dropdown.map((drop) => (
                  <Link
                    key={drop.label}
                    href={drop.href}
                    className="block px-5 py-3 text-[14px] nav-font font-medium text-gray-700 hover:text-luxury-pink border-transparent hover:border-luxury-pink hover:bg-luxury-pink-soft transition-all duration-200"
                  >
                    {drop.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}