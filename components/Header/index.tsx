'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { Phone } from 'lucide-react'
import Logo from './Logo'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'
import MobileToggle from './MobileToggle'
import { useSettings } from '@/app/context/SettingsContext'
export default function Header() {
  const [isHidden, setIsHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const lastScrollY = useRef(0)
  const { phone } = useSettings()
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      if (currentY < 80) {
        setIsHidden(false)
      } else if (currentY > lastScrollY.current) {
        setIsHidden(true)
      } else {
        setIsHidden(false)
      }
      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className="fixed top-0 left-[50%] header-edit bg-white py-13 px-6 rounded-b-[30px] w-[94.8%] z-[999999999]"
        style={{
          height: '72px',
          fontFamily: 'var(--font-parkinsans)',

          transform: isHidden ? 'translate(-50%, -100%)' : 'translate(-50%, 0)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="flex items-center justify-between h-full mx-auto" style={{ maxWidth: '1280px' }}>

          {/* LEFT: Logo (Desktop & Mobile) */}
          <Logo />

          {/* CENTER: Desktop Nav */}
          <DesktopNav />

          {/* RIGHT: Desktop Actions */}
          <div className="hidden md:flex items-center gap-5">
            <button className="text-gray-500 nav-icon hover:text-luxury-pink transition-colors duration-300 text-xl" aria-label="Info">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="black" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                <path d="M17.5 3V10M21 6.5H14" stroke-linejoin="round"></path>
                <path d="M9.15825 5.71223L8.7556 4.80625C8.49232 4.21388 8.36068 3.91768 8.1638 3.69101C7.91707 3.40694 7.59547 3.19794 7.23567 3.08785C6.94858 3 6.62446 3 5.97621 3C5.02791 3 4.55375 3 4.15573 3.18229C3.68687 3.39702 3.26343 3.86328 3.09473 4.3506C2.95151 4.76429 2.99253 5.18943 3.07458 6.0397C3.94791 15.0902 8.90981 20.0521 17.9603 20.9254C18.8106 21.0075 19.2357 21.0485 19.6494 20.9053C20.1367 20.7366 20.603 20.3131 20.8177 19.8443C21 19.4462 21 18.9721 21 18.0238C21 17.3755 21 17.0514 20.9122 16.7643C20.8021 16.4045 20.5931 16.0829 20.309 15.8362C20.0823 15.6393 19.7861 15.5077 19.1937 15.2444L18.2878 14.8417C17.6462 14.5566 17.3255 14.4141 16.9995 14.3831C16.6876 14.3534 16.3731 14.3972 16.0811 14.5109C15.776 14.6297 15.5063 14.8544 14.967 15.3038C14.4301 15.7512 14.1617 15.9749 13.8337 16.0947C13.543 16.2009 13.1586 16.2403 12.8523 16.1951C12.5069 16.1442 12.2423 16.0029 11.7133 15.7201C10.0672 14.8405 9.15953 13.9328 8.27986 12.2867C7.99714 11.7577 7.85578 11.4931 7.80487 11.1477C7.75974 10.8414 7.79908 10.457 7.9053 10.1663C8.02512 9.83828 8.24881 9.56986 8.69619 9.033C9.14562 8.49368 9.37034 8.22402 9.48915 7.91891C9.60285 7.62694 9.64661 7.3124 9.61694 7.00048C9.58594 6.67452 9.44338 6.35376 9.15825 5.71223Z"></path>
              </svg>
            </button>
            <a href={`tel:${phone}`} className="text-[14px] nav-icon nav-font ml-[-14px] font-medium text-black hover:text-luxury-pink transition-colors duration-300 tracking-normal">
              {phone || '+ 1 (346) 565-3599'}
            </a>
            <Link
              href="/contact"

              className="font-parkinsans w-[fit-content] text-sm px-7.5 nav-font py-3.5 rounded-full cursor-pointer text-white bg-luxury-pink font-medium  tracking-normal transition-all duration-300 hover:shadow-lg transform hover:scale-[1.0]"

            >
              Book a Cleaning
            </Link>
          </div>

          {/* RIGHT: Mobile Actions (Phone Icon + Hamburger) */}
          <div className="flex items-center gap-4 md:hidden">
            <a href="tel:+13214567890" className="text-luxury-dark  hover:text-luxury-pink transition-colors">
              <Phone size={22} strokeWidth={1.5} />
            </a>
            <MobileToggle isOpen={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} />
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}