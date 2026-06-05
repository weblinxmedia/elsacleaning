// app/page.tsx
import Hero from '@/components/Hero'
import WhyChooseUs from '@/components/WhyChooseUs'
import Services from '@/components/Services'
import HowItWorks from '@/components/HowItWorks'
import EcoInitiative from '@/components/EcoInitiative'
import Reviews from '@/components/Reviews'
import Booking from '@/components/Booking'
import FAQ from '@/components/FAQ'
import GetInTouch from '@/components/GetInTouch'


export default function Home() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <div style={{background:'linear-gradient(to bottom, #f3f5f0 60%, #fff 100%)'}}>
      <Services />
      <HowItWorks />
      </div>
      <EcoInitiative />
      <Reviews />
      <Booking />
      <FAQ />
      <GetInTouch />
     
    </>
  )
}