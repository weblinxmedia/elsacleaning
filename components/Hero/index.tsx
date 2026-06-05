'use client'
export const dynamic = 'force-dynamic'
import AnimateIn from '../AnimateIn'
import HeroBackground from './HeroBackground'
import HeroCard from './HeroCard'
import { useScrollAnimation } from '@/lib/useScrollAnimation'
export default function Hero() {
  const animRef = useScrollAnimation()
  return (
    <section className="relative nopadding w-full hero-position2 min-h-screen flex items-end justify-center">
      {/* Background Layer (95% height, 100% width) */}
      <HeroBackground />
      
      {/* Glass Card Layer (Centered) */}
      <div className="relative z-10 w-full hero-position flex items-center justify-center">
        <AnimateIn delay={0.4}>
          <HeroCard />
        </AnimateIn>
      </div>
    </section>
  )
}