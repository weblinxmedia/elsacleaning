import Link from 'next/link'
import AnimateIn from '../AnimateIn'

interface Feature {
  text: string
}

interface ServiceFeaturesProps {
  heading: string
  description: string
  features: Feature[]
}
interface ServiceHeroProps {
  hero_image_2_url?: string
}
export default function ServiceFeatures({ heading, description, features, hero_image_2_url }: ServiceFeaturesProps & ServiceHeroProps) {
  return (
    <section className="w-full py-16  md:py-24 bg-white">
      <div className="w-[96%] mx-auto relative z-20 px-4 bg-[#f4f6f0] rounded-4xl">
        <div className=' px-2 md:px-5 py-2 md:py-12 grid gap-2 grid-cols-1 items-center md:grid-cols-2'>
          <div className='w-full md:w-[82%]'>
            {/* 🔹 SEO Optimized Heading */}
            <AnimateIn>
            <h2 className="text-3xl font-title-size min-w-[40vw] text-black mx-auto lg:text-[2.5rem] font-parkinsans leading-11 font-regular mt-4 mb-5">
       {heading || "Your Local Window Cleaning Experts "}
             </h2></AnimateIn>
            {/* 🔹 SEO Optimized Paragraph */}
            <AnimateIn delay={0.2}>
            <p className="text-gray-600 font-outfit md:text-[16px] leading-tight text-start font-light">
              {description}
            </p>
            </AnimateIn>

      <div className='w-full h-[1px] my-6 rounded-full bg-luxury-pink'></div>
            {/* 🔹 Dynamic Checklist */}
            <ul className="space-y-4 mb-5">
              {features.map((feature, index) => 
              (
              <AnimateIn delay={ index * 0.1}>
                <li key={index} className="flex mb-1 items-center gap-2">
                  {/* Clean Checkmark Icon (No background) */}
                  <span className='bg-luxury-pink rounded-full p-[3px]'><svg
                    className="w-3 h-3 text-luxury-lite flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg></span>
                  <span className="text-gray-700 font-parkinsans text-luxury-dark font-medium text-sm leading-relaxed">
                    {feature.text}
                  </span>
                </li>
              </AnimateIn>
              ))}
            </ul>

            {/* 🔹 Hardcoded "Learn More" Button */}
            <AnimateIn>
            <div className="text-center w-full flex items-start">
              
              <Link
                href="/contact"
 className="font-parkinsans w-[fit-content] text-sm px-7.5 nav-font py-3.5 rounded-full cursor-pointer text-white bg-luxury-pink font-medium  tracking-normal transition-all duration-300 hover:shadow-lg transform hover:scale-[1.0]"
   >
                Learn More
              </Link>
            </div></AnimateIn>
          </div>
          <div>
            
            
             <div>
              <AnimateIn>
            <img src={hero_image_2_url} alt="new commercial cleaning" className='rounded-4xl' />
       </AnimateIn>   </div>
          
          </div>
           </div>

      </div>
    </section>
  )
}