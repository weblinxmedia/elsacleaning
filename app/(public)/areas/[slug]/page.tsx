import { supabaseAdmin } from '@/lib/supabase'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import FAQItem from '@/components/FAQ/FAQItem'
import { faqData } from '@/components/FAQ/faqConfig'
import FAQ from '@/components/FAQ'
import ReviewsGrid from '@/components/Reviews/ReviewsGrid'
import GetInTouch from '@/components/GetInTouch'
import AnimateIn from '@/components/AnimateIn'
// import { ReviewSummary } from '@/components/Reviews'
export const dynamic = 'force-dynamic' // Ensures new areas show up immediately

// Fetch the area data from the database using the URL slug
async function getAreaData(slug: string) {
  const { data, error } = await supabaseAdmin
    .from('areas')
    .select('name, slug, address')
    .eq('slug', slug)
    .single()

  if (error || !data) return null
  return data
}


export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const area = await getAreaData(slug)

  // If someone goes to /areas/random-city that doesn't exist, show 404
  if (!area) return notFound()
  // {area.name}
  // {area.address ? `, ${area.address}` : ''}
  return (<>
    <section>
      {/* {Section 1 is here} */}

      <div className='w-full mt-17 '>
        <div className='w-full flex flex-col text-center items-center justify-between gap-3'>
          <AnimateIn delay={0.3}><span className="text-[14px] font-batch-size font-medium uppercase tracking-widest font-parkinsans">
            {area.name}
          </span></AnimateIn>
          <AnimateIn delay={0.4}><h2 className="text-3xl w-90vw md:w-[70vw] font-title-size text-black mx-auto md:text-5xl lg:text-[2.7rem] font-parkinsans leading-11 font-regular">
            Trusted {area.name} Cleaning Services For Home Offices And More
          </h2></AnimateIn>
          <AnimateIn delay={0.5}><Link
            href="/contact"

            className="font-parkinsans w-[fit-content] text-sm px-7.5 nav-font py-3.5 rounded-full cursor-pointer text-white bg-luxury-pink font-medium  tracking-normal transition-all duration-300 hover:shadow-lg transform hover:scale-[1.0]"

          >
            Book a Cleaning
          </Link></AnimateIn>
        </div>
      </div>

    </section>
    <section className="w-full py-16 md:py-24 bg-white">

      <div className="max-w-[1280px] mx-auto px-4">

        {/* Main Container: Image Left, Content Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* 🔹 Left Side: Image */}


          {/* 🔹 Right Side: Content */}
          <AnimateIn>
            <div>
              <AnimateIn delay={0.2}><span className="text-[12px] font-batch-size font-medium uppercase tracking-widest font-parkinsans mb-6">
                Our Core Strength
              </span></AnimateIn>
              {/* SEO Optimized Heading */}
              <AnimateIn delay={0.3}><h2 className="text-3xl font-title-size min-w-[40vw] text-black mx-auto lg:text-[2.5rem] font-parkinsans leading-11 font-regular mt-4 mb-5">
                Why Choose {area.address} In {area.name}?
              </h2></AnimateIn>
              {/* SEO Optimized Paragraph */}
              <AnimateIn delay={0.4}><p className="text-gray-600 w-full md:w-[99%] font-outfit md:text-[16px] leading-tight text-start font-light">
                From luxury yachts to busy offices, we provide expert, OSHA-compliant cleaning tailored to your schedule and budget.
              </p></AnimateIn>

              {/* 🔹 Three Key Cards (List) */}
              <div className="space-y-6 mb-8 mt-10">
                <AnimateIn delay={0.15}>
                  <div className="flex items-start gap-4">
                    {/* Shared Image/Icon for each list item */}
                    <div className="relative w-10 h-10 flex-shrink-0 rounded-lg overflow-hidden">
                      <img
                        src="/images/tick.svg" // Shared image placeholder
                        alt="Tick Icon"

                        className="object-cover p-1"
                      />
                    </div>

                    <div>
                      {/* Small Heading Tag */}
                      <h3 className="text-lg md:text-2xl font-parkinsans font-regular text-luxury-dark mb-1">
                        High-Quality Cleaning Standards
                      </h3>
                      {/* Paragraph */}
                      <p className="text-gray-500 font-outfit text-sm md:text-[16px] leading-tight font-light">
                        We leave every space refreshed by using professional cleaning protocols backed by OSHA guidelines. Our cleaning team goes beyond standard services and offers solutions that are healthier and safer.
                      </p>
                    </div>
                  </div></AnimateIn>
                <AnimateIn delay={0.25}><div className="flex items-start gap-4">
                  {/* Shared Image/Icon for each list item */}
                  <div className="relative w-10 h-10 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src="/images/tick.svg" // Shared image placeholder
                      alt="Tick Icon"

                      className="object-cover p-1"
                    />
                  </div>

                  <div>
                    {/* Small Heading Tag */}
                    <h3 className="text-lg md:text-2xl font-parkinsans font-regular text-luxury-dark mb-1">
                      Professional And Responsible Support
                    </h3>
                    {/* Paragraph */}
                    <p className="text-gray-500 font-outfit text-sm md:text-[16px] leading-tight font-light">
                      With us, you are not just getting one-time cleaning. Our customer service representatives are trained to answer questions in detail and customize your cleaning service plans according to your business needs.                        </p>
                  </div>
                </div></AnimateIn>
                <AnimateIn delay={0.30}><div className="flex items-start gap-4">
                  {/* Shared Image/Icon for each list item */}
                  <div className="relative w-10 h-10 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src="/images/tick.svg" // Shared image placeholder
                      alt="Tick Icon"

                      className="object-cover p-1"
                    />
                  </div>

                  <div>
                    {/* Small Heading Tag */}
                    <h3 className="text-lg md:text-2xl font-parkinsans font-regular text-luxury-dark mb-1">
                      Flexible Scheduling And Reliable Service
                    </h3>
                    {/* Paragraph */}
                    <p className="text-gray-500 font-outfit text-sm md:text-[16px] leading-tight font-light">
                      We offer specialized cleaning services to suit your property and budget. From one-time visits to biweekly and regular cleaning services, our service is made to provide ease to {area.name} clients.  </p>
                  </div>
                </div></AnimateIn>

              </div>

              {/* 🔹 Get a Quote Button */}
              <AnimateIn><Link
                href="/#get-quote"
                className="font-parkinsans w-[fit-content] text-sm px-7.5 nav-font py-3.5 rounded-full cursor-pointer text-luxury-lite bg-luxury-pink font-medium  tracking-normal transition-all duration-300 hover:shadow-lg transform hover:scale-[1.0]"
              >
                Get a Quote
              </Link></AnimateIn>

            </div>
          </AnimateIn>
          <AnimateIn delay={0.3}>
            <div className="relative w-full h:[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-lg">

              <img
                src='/images/sanjose.jpg'
                alt="Commercial cleaning"// SEO optimized alt tag

                className="object-cover w-full h-full"
              />
            </div></AnimateIn>
        </div>
      </div>
    </section>
    {/* 2-Column Grid */}
    <AnimateIn>
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
    </AnimateIn>


    <section className="w-full py-16 md:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4">

        {/* Main Container: Image Left, Content Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* 🔹 Left Side: Image */}


          {/* 🔹 Right Side: Content */}

          <div className=" md:order-last">
            <AnimateIn><span className="text-[12px] font-batch-size font-medium uppercase tracking-widest font-parkinsans mb-6">
              Specialized Services
            </span> </AnimateIn>
            {/* SEO Optimized Heading */}
            <AnimateIn> <h2 className="text-3xl font-title-size min-w-[40vw] text-black mx-auto lg:text-[2.5rem] font-parkinsans leading-11 font-regular mt-4 mb-5">
              Cleaning Services We Offer in {area.name}
            </h2> </AnimateIn>
            {/* SEO Optimized Paragraph */}
            <AnimateIn> <p className="text-gray-600 w-full md:w-[99%] font-outfit md:text-[16px] leading-tight text-start font-light">
              From residential homes to luxury vessels, we deliver premium cleaning solutions tailored to your specific needs.   </p>
            </AnimateIn>
            {/* 🔹 Three Key Cards (List) */}
            <div className="space-y-6 mb-8 mt-10">

              <AnimateIn delay={0.15}>
                <div className="flex items-start gap-4">
                  {/* Shared Image/Icon for each list item */}
                  <div className="relative w-10 h-10 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src="/images/tick.svg" // Shared image placeholder
                      alt="Tick Icon"

                      className="object-cover p-1"
                    />
                  </div>

                  <div>
                    {/* Small Heading Tag */}
                    <h3 className="text-lg md:text-2xl font-parkinsans font-regular text-luxury-dark mb-1">
                      Residential & Window Cleaning
                    </h3>
                    {/* Paragraph */}
                    <p className="text-gray-500 font-outfit text-sm md:text-[16px] leading-tight font-light">
                      Whether you need general upkeep or a monthly deep clean, our cleaning services in {area.name} are made to keep your spaces spotless.   </p>
                  </div>
                </div></AnimateIn>
              <AnimateIn delay={0.25}>
                <div className="flex items-start gap-4">
                  {/* Shared Image/Icon for each list item */}
                  <div className="relative w-10 h-10 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src="/images/tick.svg" // Shared image placeholder
                      alt="Tick Icon"

                      className="object-cover p-1"
                    />
                  </div>

                  <div>
                    {/* Small Heading Tag */}
                    <h3 className="text-lg md:text-2xl font-parkinsans font-regular text-luxury-dark mb-1">
                      Commercial Cleaning
                    </h3>
                    {/* Paragraph */}
                    <p className="text-gray-500 font-outfit text-sm md:text-[16px] leading-tight font-light">
                      Professional and office spaces are made tidy with our regular janitorial cleaning services designed for your busy schedules.                      </p>
                  </div>
                </div></AnimateIn>
              <AnimateIn delay={0.30}>
                <div className="flex items-start gap-4">
                  {/* Shared Image/Icon for each list item */}
                  <div className="relative w-10 h-10 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src="/images/tick.svg" // Shared image placeholder
                      alt="Tick Icon"

                      className="object-cover p-1"
                    />
                  </div>

                  <div>
                    {/* Small Heading Tag */}
                    <h3 className="text-lg md:text-2xl font-parkinsans font-regular text-luxury-dark mb-1">
                      Deep Sanitization & House Cleaning
                    </h3>
                    {/* Paragraph */}
                    <p className="text-gray-500 font-outfit text-sm md:text-[16px] leading-tight font-light">
                      Professional yacht cleaning of both interior and exterior areas to preserve the value. Special products are used for stainless steel railings.  </p>
                  </div>
                </div></AnimateIn>

            </div>

            {/* 🔹 Get a Quote Button */}
            <AnimateIn delay={0.2}>
              <Link
                href="/#get-quote"
                className="font-parkinsans w-[fit-content] text-sm px-7.5 nav-font py-3.5 rounded-full cursor-pointer text-luxury-lite bg-luxury-pink font-medium  tracking-normal transition-all duration-300 hover:shadow-lg transform hover:scale-[1.0]"
              >
                Get a Quote
              </Link></AnimateIn>
          </div>

          <AnimateIn delay={0.2}>
            <div className="relative order-first w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
              <img
                src='/images/bnner.jpeg'
                alt="Commercial cleaning"// SEO optimized alt tag

                className="object-cover w-full h-full"
              />
            </div></AnimateIn>
        </div>
      </div>
    </section>




    <FAQ />
    <GetInTouch />
  </>

  )
}