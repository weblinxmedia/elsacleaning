'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function FooterServices() {
  const [services, setServices] = useState<{ label: string; href: string }[]>([])
  const [areas, setAreas] = useState<{ label: string; href: string }[]>([])

  // 🔹 Fetch dynamic services and areas
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, areasRes] = await Promise.all([
          fetch('/api/services'),
          fetch('/api/areas')
        ])

        if (servicesRes.ok) {
          const servicesData = await servicesRes.json()
          const mappedServices = servicesData.map((s: { label: string; value: string }) => ({
            label: s.label,
            href: `/services/${s.value}`
          }))
          setServices(mappedServices)
        }

        if (areasRes.ok) {
          const areasData = await areasRes.json()
          const mappedAreas = areasData.map((a: { name: string; slug: string }) => ({
            label: a.name,
            href: `/areas/${a.slug}`
          }))
          setAreas(mappedAreas)
        }
      } catch (err) {
        console.error('Failed to load footer data:', err)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="mb-10">
        <h4 className="text-[16px] font-regular text-dark font-parkinsans uppercase mb-3">Services</h4>
        <ul className="space-y-3">
          {services.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-gray-500 text-[15px] font-regular hover:text-luxury-pink transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h4 className="text-[16px] font-regular text-dark font-parkinsans uppercase mb-3">Service Areas</h4>
        <ul className="space-y-3">
          {areas.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-gray-500 text-[15px] font-regular hover:text-luxury-pink transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}