
import { PricingCardData } from './howItWorksConfig'
import { Check } from 'lucide-react'
interface PricingCardProps {
  data: PricingCardData
}

export default function PricingCard({ data }: PricingCardProps) {
  return (
    <>
 
    <div className="absolute top-0 left-1/2 z-[300] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center border-2 border-white z-10">
        <Check size={24} className="text-luxury-pink" strokeWidth={2.5} />
      </div>
    <div 
      className={`relative p-8 pt-12 font-parkinsans text-center shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col items-center justify-start ${data.isWide ? 'flex-[1.6]' : 'flex-1.55'}`}
      style={{ 
        background: `linear-gradient(${data.gradient}, var(--color-luxury-pink), var(--color-luxury-pink-soft) )`,
        clipPath: data.clipPath,
        height: data.height, // 🆕 Applies the exact height from config
        minHeight: data.height, // Ensures it doesn't shrink
      }}
    >
      {/* Tick Icon - Half inside, half outside */}
      

      {/* Small Text */}
      <p className="text-lg sm:text-sm font-mediummb-2 tracking-wide">
        {data.smallText}
      </p>

      {/* Large Text */}
      <h3 className=" large-text text-2xl  text-luxury-dark">
        {data.largeText}
      </h3>
    </div>
    
    </>
  )
}