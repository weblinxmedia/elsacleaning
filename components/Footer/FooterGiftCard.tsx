'use client';
import Link from 'next/link'

export default function FooterGiftCard() {
  return (
    <div 
      className="relative rounded-4xl p-6 pt-10 border-10 border-luxury-pink  rounded-[2rem] overflow-hidden h-fit flex flex-col"
      style={{ 
        background: 'linear-gradient(to bottom right, var(--color-luxury-pink), rgba(255,255,255,0))' 
      }}
    >
      {/* Content (70-80% width) */}
      <div className="relative z-10 w-3/4">
        <h4 className="text-2xl font-parkinsans font-regular text-black mb-1">Gift Card</h4>
        <p className="text-gray-600 font-regular mb-0 text-[14px] leading-normal">
          The best gift for who doesn't want to clean the house!
        </p>
        <Link
          href="/gift-card"
          className="inline-block text-black font-regular underline text-sm"
        >
          Learn More
        </Link>
      </div>

      {/* Absolute Positioned Image (Right side, top 10) */}
      <div className="absolute right-0 top-4 w-1/3 h-auto pointer-events-none">
        <img 
          src="/images/hand.svg" 
          alt="Gift Card" 
          className="w-full h-auto object-contain"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
      </div>
    </div>
  )
}