import Image from 'next/image'
import Link from 'next/link'
import AnimateIn from '../AnimateIn'

interface Feature {
  title: string
  description: string
}

interface WhatSetsUsApartProps {
  image_url: string
  heading: string
  description: string
  features: Feature[]
}

export default function WhatSetsUsApart({ image_url, heading, description, features }: WhatSetsUsApartProps) {
  return (
    <section className="w-full min-h-screen py-16 md:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4">
        
        {/* Main Container: Image Left, Content Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* 🔹 Left Side: Image */}
        

          {/* 🔹 Right Side: Content */}
          <div>
            <AnimateIn>
               <span className="text-[12px] font-batch-size font-medium uppercase tracking-widest font-parkinsans mb-6">
        What Sets Us Apart
      </span></AnimateIn>
            {/* SEO Optimized Heading */}
            <AnimateIn delay={0.2}>
           <h2 className="text-3xl font-title-size min-w-[40vw] text-black mx-auto lg:text-[2.5rem] font-parkinsans leading-11 font-regular mt-4 mb-5">
       {heading}
             </h2></AnimateIn>
            {/* SEO Optimized Paragraph */} <AnimateIn delay={0.3}>
            <p className="text-gray-600 w-full md:w-[99%] font-outfit md:text-[16px] leading-tight text-start font-light">
              {description}
            </p></AnimateIn>

            {/* 🔹 Three Key Cards (List) */}
            <div className="space-y-6 mb-8 mt-10">
              {features.map((feature, index) => (
                 <AnimateIn delay={0.2 +index * 0.2}>
                <div key={index} className="flex items-start gap-4">
                  {/* Shared Image/Icon for each list item */}
                  <div className="relative w-10 h-10 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image 
                      src="/images/tick.svg" // Shared image placeholder
                      alt={feature.title}
                      fill
                      className="object-cover p-1"
                    />
                  </div>
                  
                  <div>
                    {/* Small Heading Tag */}
                    <h3 className="text-lg md:text-2xl font-parkinsans font-regular text-luxury-dark mb-1">
                      {feature.title}
                    </h3>
                    {/* Paragraph */}
                    <p className="text-gray-500 font-outfit text-sm md:text-[16px] leading-tight font-light">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </AnimateIn>
              ))}
            </div>

            {/* 🔹 Get a Quote Button */}
            <AnimateIn delay={0.3}>
            <Link 
              href="/#get-quote" 
              className="font-parkinsans w-[fit-content] text-sm px-7.5 nav-font py-3.5 rounded-full cursor-pointer text-luxury-lite bg-luxury-pink font-medium  tracking-normal transition-all duration-300 hover:shadow-lg transform hover:scale-[1.0]"
     >
              Get a Quote
            </Link></AnimateIn>
          </div> <AnimateIn delay={0.16}>
  <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
   
            <img 
              src={image_url}
              alt={heading} // SEO optimized alt tag
              
              className="object-cover rounded-3xl"
            />
          </div></AnimateIn>
        </div>
      </div>
    </section>
  )
}