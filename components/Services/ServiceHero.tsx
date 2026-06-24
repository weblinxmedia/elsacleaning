import Image from 'next/image'
import Link from 'next/link'
import AnimateIn from '../AnimateIn'

interface ServiceHeroProps {
  title: string
  hero_heading?: string
  hero_paragraph?: string
  hero_image_1_url?: string

}

export default function ServiceHero({ title, hero_heading, hero_paragraph, hero_image_1_url }: ServiceHeroProps) {
  const formattedTitle = title.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  return (<>
    <section className="relative min-h-[80vh] w-[96%] rounded-4xl mx-auto flex items-center overflow-hidden py-16 md:py-24">

      {/* 🔹 Blurred Background Image */}

      <div className="absolute w-full inset-0 z-0">
        <AnimateIn className="w-full h-full" delay={0.4}>
          <img
            src={hero_image_1_url || "/images/bannerservice.jpg"}
            alt={`${formattedTitle} showcase 1`}

            className="object-cover object-top-right rounded-4xl w-full h-full opacity-100"
          /></AnimateIn>
        {/* <div className="absolute inset-0 bg-white/50"></div> */}
      </div>

      {/* 🔹 Content Container */}
      <div className="relative z-10  max-w-[1280px] mx-auto px-4 w-full grid grid-cols-1 md:grid-cols-2 gap-1 padding-hero items-center">
        <AnimateIn delay={0.8}>
          {/* Left Side: Text & CTA */}
          <div className="space-y-6 md:min-w-[40rem] bg-gray-50  box-clip border border-white/40 rounded-[3rem] px-8 py-13">
            <h2 className="text-3xl md:text-4xl m-0 mb-3 font-parkinsans font-regular text-luxury-dark leading-tight">
              {hero_heading || `The Best ${formattedTitle} in Town`}
            </h2>
            <p className="text-gray-700 font-outfit m-0 mb-7 md:w-[70%] text-base md:text-lg leading-tight font-light">
              {hero_paragraph || `Experience top-tier cleanliness with our premium ${formattedTitle} services. We use eco-friendly products, employ vetted professionals, and guarantee a spotless finish every single time.`}
            </p>
            <div className="flex center-btns">
              <Link
                href="/#get-quote"
                className="font-parkinsans w-[fit-content] bg-luxury-pink text-sm px-8 nav-font py-3.5 rounded-full cursor-pointer text-luxury-lite font-medium  tracking-normal transition-all duration-300 hover:shadow-lg transform hover:scale-[1.0]"

              >
                Free Quote
              </Link>
              &nbsp;&nbsp;&nbsp;
              <Link
                href="/services"
                className="font-parkinsans w-[fit-content] text-sm px-8 nav-font py-3.5 bg-luxury-pink-soft border-luxury-pink border-1 rounded-full cursor-pointer text-luxury-dark font-medium  tracking-normal transition-all duration-300 hover:shadow-lg transform hover:scale-[1.0]"

              >
                Our Services
              </Link>
            </div>


            <div className='flex justify-start mt-9 gap-6 max-w-[70%] items-center wrapping'>
              <span className='flex gap-2 justify-center items-center'><strong>  <svg
                className="w-4 h-4 text-white rounded-full bg-luxury-pink flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg></strong>Professional</span>
              <span className='flex gap-2 justify-center items-center'><strong>  <svg
                className="w-4 h-4 text-white rounded-full bg-luxury-pink flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg></strong>Friendly</span>
              <span className='flex gap-2 justify-center items-center'><strong>  <svg
                className="w-4 h-4 text-white rounded-full bg-luxury-pink flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg></strong>Convenient</span>
            </div>


          </div>
        </AnimateIn>
        {/* Right Side: Blended Images */}

      </div>
    </section></>
  )
}