import Image from 'next/image'
import AnimateIn from '../AnimateIn'

interface Step {
  image_url: string
  title: string
  description: string
}

interface HowItWorksProps {
  subtitle: string
  heading: string
  
  steps: Step[]
}

export default function HowItWorks({ subtitle, heading, steps }: HowItWorksProps) {
  return (
    <section className="w-full"
   >
      <div className="max-w-[1280px] mx-auto pt-20 px-4">
        
        {/* 🔹 SEO Optimized Header Block */}
        <div className="text-center mb-5">
          <AnimateIn>
           <span className="text-[12px] font-batch-size font-medium uppercase tracking-widest font-parkinsans mb-6">
        {subtitle}
      </span></AnimateIn>
       <AnimateIn delay={0.3}>    <h2 className="text-3xl font-title-size min-w-[40vw] text-black mx-auto md:text-5xl lg:text-[2.6rem] font-parkinsans leading-11 font-regular mt-4 mb-5">
       {heading}
             </h2>
</AnimateIn>            
             </div>

        {/* 🔹 Cards & Arrows Container */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
          {steps.map((step, index) => (
          <AnimateIn delay={ index * 0.2}>
            <div key={index} className="flex flex-col md:flex-row items-center">
              
              {/* The Card */}
              <div className="bg-white rounded-2xl py-8 px-0 borderw-full text-center flex flex-col items-center transition-shadow duration-300">
                {/* Image */}
                <div className="relative w-36 h-36 mb-5 rounded-full bg-luxury-pink-soft flex items-center justify-center overflow-hidden border-2 border-luxury-pink">
                  <img 
                    src={step.image_url} 
                    alt={step.title}
                    width={'54'} // SEO: Dynamic alt tag based on title
                   
                    className="object-contain"
                  />
                </div>
                
                {/* SEO Optimized Title */}
                <h3 className="text-xl md:text-3xl font-parkinsans font-regular text-luxury-dark mb-3">
                  {step.title}
                </h3>
                
                {/* SEO Optimized Paragraph */}
                <p className="text-gray-500 font-parkinsans text-sm leading-relaxed font-regular w-[85%]">
                  {step.description}
                </p>
              </div>

              {/* 🔹 The Arrows (Only shown between cards) */}
              {index < steps.length - 1 && (
                <>
                  {/* Desktop Arrow (Pointing Right) */}
                  <div className="hidden md:flex items-center text-luxury-pink">
                   <img src="/images/arrow.svg" width={'170'} alt="" />
                  </div>
                  
                  {/* Mobile Arrow (Pointing Down) */}
                  <div className="flex md:hidden items-center my-2 text-luxury-pink">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </>
              )}
            </div>
            </AnimateIn>
          ))}
        </div>

      </div>
    </section>
  )
}