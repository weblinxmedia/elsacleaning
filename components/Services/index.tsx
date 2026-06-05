'use client'
import ServicesHeader from './ServicesHeader'
import ServiceCard from './ServiceCard'
import { servicesData } from './servicesConfig'
import { useScrollAnimation } from '@/lib/useScrollAnimation'
import AnimateIn from '../AnimateIn'
export default function Services() {
  const animRef = useScrollAnimation()
  return (
    <section className="w-full py-20 md:py-28 ">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Header */}
        <div>
        <ServicesHeader />
</div>
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {servicesData.map((service, index) => (
            <AnimateIn delay={index * 0.2}>
            <ServiceCard key={service.id} data={service} />
            </AnimateIn>
          ))}
        </div>

      </div>
    </section>
  )
}