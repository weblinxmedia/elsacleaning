'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function ScrollToTop() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Instantly jump to the top on every route change
    window.scrollTo(0, 0)
  }, [pathname, searchParams])

  return null
}