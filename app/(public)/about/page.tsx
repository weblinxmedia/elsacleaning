import AnimateIn from '@/components/AnimateIn'
import ReviewsGrid from '@/components/Reviews/ReviewsGrid'
import Link from 'next/link'
export default function AboutPage() {
  return (
    <main className="mt-25 min-h-screen bg-white">
      
      {/* 🔹 SECTION 1: The 3-Column Layout */}
      <section className="w-full relative py-16 md:py-24">
        <div className="max-w-[1280px]  mx-auto px-4">
          <div className="grid  grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-center">
            
            {/* Left Column (30%) - About Us Text */}
            <AnimateIn className="flex flex-col justify-center">
              <div className=''>
              <h1 className="text-6xl md:text-7xl font-parkinsans font-regular text-luxury-dark leading-none">
                Explore About Us
              </h1>
            </div>
              <p className="mt-8 text-base text-gray-800 font-outfit font-medium leading-relaxed">
                Dedicated to excellence in every space we touch, delivering pristine environments that inspire.
              </p>
              <p className="mt-4 text-sm text-gray-500 font-parkinsans leading-relaxed">
                We are a team of passionate professionals committed to redefining the commercial cleaning industry through reliability, innovation, and uncompromising quality.
              </p>
              <Link href="/contact" className='w-fit'>
                <button className="mt-6 bg-luxury-pink cursor-pointer text-white font-regular py-3 px-6 rounded-full transition duration-300">
                  Book a Cleaning
                </button>
              </Link>
            </AnimateIn>

            {/* Center Column (40%) - Static Image */}
            <AnimateIn className="flex justify-center">
              <div className="w-full max-w-md">
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80" 
                  alt="Our Team Working" 
                  className="w-full h-[450px] object-cover rounded-2xl shadow-xl"
                />
              </div>
            </AnimateIn>

            {/* Right Column (30%) - Image, Title, Paragraph */}
            <AnimateIn className="flex flex-col justify-center space-y-2 text-center">
              <img 
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80" 
                alt="Our Mission" 
                className="w-full h-48 object-cover rounded-2xl shadow-md"
              />
              <h3 className="text-3xl font-parkinsans font-regular text-luxury-dark mt-2">
                Our Mission
              </h3>
              <p className="text-sm md:text-[15px] text-gray-500 font-parkinsans leading-normal">
                To create healthier, safer, and more inspiring work environments for businesses across the state, ensuring every detail is handled with care.
              </p>
            </AnimateIn>

          </div>
        </div>
      </section>

      {/* 🔹 SECTION 2: Our Promise */}
      <section className="w-full py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto py-20 px-4">
          
          {/* Centered Header */}
           <AnimateIn>   
                   <div className='w-full text-center'>
                      <span className="text-[11px] font-batch-size font-medium uppercase tracking-widest font-parkinsans mb-6">
        OUR PROMISE
      </span>
                   <h1 className="text-4xl md:text-5xl lg:text-5xl font-regular font-parkinsans text-luxury-dark mt-2 leading-tight">
                    Our Cleaning Promise to Florida  
                   </h1>
                
         </div>
                   </AnimateIn>

          {/* Content Grid: Left Image (40%) | Right Text (60%) */}
          <div className="grid grid-cols-1 lg:grid-cols-5 mt-10 gap-12 items-center">
            
            {/* Left Side - Image */}
            <AnimateIn className="lg:col-span-2">
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80" 
                alt="Cleaning Promise" 
                className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl shadow-lg"
              />
            </AnimateIn>

            {/* Right Side - 4 Points + Button */}
            <AnimateIn className="lg:col-span-3 space-y-8">
              
              {/* Point 1 */}
              <div className='flex'> 
                <div className='flex flex-col items-start'>
                    <h4 className="text-2xl border-l-2 pl-6 border-luxury-pink font-parkinsans font-medium text-luxury-dark mb-2">Local Expertise</h4>
              <p className="text-sm md:text-[13px] text-gray-500 font-parkinsans leading-normal">
                  We understand Florida's business needs and implement best cleaning practices accordingly—from weather challenges to regulatory expectations. Our service includes all essential components to offer you optimal safety and personalized cleaning.
                </p>  </div>
              </div>

              {/* Point 2 */}
           <div className='flex'>
             
                <div className='flex flex-col items-start'>
                    <h4 className="text-2xl border-l-2 pl-6 border-luxury-pink font-parkinsans font-medium text-luxury-dark mb-2">Trusted Professionals</h4>
              <p className="text-sm md:text-[13px] text-gray-500 font-parkinsans leading-normal">
Every member of our team is fully vetted, trained, and insured. We don't just send workers; we send trusted experts who respect your space and uphold the highest standards of professionalism.  </p>  </div>
              </div>
              {/* Point 3 */}
           <div className='flex'>    <div className='flex flex-col items-start'>
                    <h4 className="text-2xl border-l-2 pl-6 border-luxury-pink font-parkinsans font-medium text-luxury-dark mb-2">Eco-Friendly Solutions</h4>
              <p className="text-sm md:text-[13px] text-gray-500 font-parkinsans leading-normal">
                  We use sustainable, hospital-grade products that are tough on dirt but safe for your employees, clients, and the environment. A clean space shouldn't come at a cost to health.    </p>  </div>
              </div>

              {/* Point 4 */}
             <div className='flex'>                 <div className='flex flex-col items-start'>
                    <h4 className="text-2xl border-l-2 pl-6 border-luxury-pink font-parkinsans font-medium text-luxury-dark mb-2">Unmatched Reliability</h4>
              <p className="text-sm md:text-[13px] text-gray-500 font-parkinsans leading-normal">
                  We show up on time, every time. Our rigorous quality checks and dedicated account managers ensure consistent, flawless results with every single visit.
                </p>  </div>
              </div>

              {/* Contact Button */}
              <div className="">
                <a 
                  href="/contact" 
                  className="inline-flex items-center bg-luxury-pink text-white px-8 py-3.5 rounded-full font-parkinsans font-regular tracking-wider text-sm hover:bg-luxury-pink transition-colors duration-300 shadow-md"
                >
                  Contact Us
                </a>
              </div>

            </AnimateIn>
          </div>

        </div>
      </section>

      {/* 🔹 SECTION 3: Growth & Impact (Bonus Section) */}
      <section className="w-full py-16 md:py-24 bg-luxury-dark">
        <div className="max-w-[1280px] mx-auto px-4 py-15 ">
             <AnimateIn>   
                   <div className='w-full text-center space-y-4'>
                      <span className="text-[11px] font-batch-size text-white font-medium uppercase tracking-widest font-parkinsans mb-6">
       Our Growth
      </span>
                   <h1 className="text-4xl md:text-5xl lg:text-5xl font-regular font-parkinsans text-luxury-lite mt-2 leading-tight">
                    Built on Trust, Driven by Results  
                   </h1>
                <p className="text-sm md:text-[15px] w-full md:w-[75%] mx-auto text-gray-100 font-parkinsans leading-normal">
                Over the years, we've grown from a small local team to a trusted partner for businesses across the state. Our growth is a testament to the trust our clients place in us and the relentless dedication of our team.
           </p>
         </div>
                   </AnimateIn>

          <AnimateIn>
            <div className=" rounded-3xl w-full md:w-[70%] mx-auto text-center">
            
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-6 space-y-2 mb-3 md:mb-0 md:space-y-10 ">
                {[
                  { stat: '500+', label: 'Spaces Cleaned' },
                  { stat: '99%', label: 'Client Retention' },
                  { stat: '5+', label: 'Years of Growth' },
                ].map((item, i) => (
                  <div key={i}>
                    <p className="text-4xl md:text-5xl font-parkinsans font-regular text-luxury-pink mb-2">{item.stat}</p>
                    <p className="text-sm text-gray-300 font-parkinsans  tracking-normal">{item.label}</p>
                  </div>
                ))}
              </div>

              <a 
                href="/contact" 
                className="inline-flex items-center bg-luxury-pink text-luxury-lite px-8 py-3.5 rounded-full font-parkinsans font-medium tracking-wider text-sm hover:bg-luxury-pink hover:text-white transition-colors duration-300 shadow-md"
              >
                Join Our Growing List of Clients
              </a>
            </div>
          </AnimateIn>
        </div>
         
        
      </section>
 <div className="w-full ">
            <div className='w-full mx-auto text-center pt-20 bg-[#f3f5f0]'>
                          <span className="text-[12px] font-batch-size font-medium uppercase tracking-widest font-parkinsans mb-6">
                    Testimonials
                  </span>
                        {/* SEO Optimized Heading */}
                       <h2 className="text-3xl font-title-size min-w-[40vw] md:max-w-[40vw] text-black mx-auto lg:text-[2.5rem] font-parkinsans leading-11 font-regular mt-4 -mb-6">
                   Empowering Thousands of Users and Enterprises
                         </h2>
                <ReviewsGrid showFirstChild={false} />
                  </div>
              </div>
    </main>
  )
}