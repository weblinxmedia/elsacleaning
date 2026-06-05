import { supabaseAdmin } from '@/lib/supabase'
import AnimateIn from '@/components/AnimateIn'
import { Check, ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

async function getPricing() {
  const [packagesRes, addonsRes] = await Promise.all([
    supabaseAdmin.from('pricing_packages').select('*').order('created_at', { ascending: true }),
    supabaseAdmin.from('pricing_addons').select('*').order('created_at', { ascending: true })
  ])
  return { packages: packagesRes.data || [], addons: addonsRes.data || [] }
}

export default async function PricingPage() {
  const { packages, addons } = await getPricing()

  return (
    <main className="mt-25 min-h-screen bg-white">
      
      {/* 🔹 SECTION 1: Header */}
      <section className="w-full py-20 md:py-28">
        <div className="max-w-[1280px] mx-auto px-4 text-center">
          <AnimateIn delay={0.3}>
            <h1 className="text-5xl md:text-6xl font-parkinsans font-regular text-luxury-dark mb-4">Pricing</h1>
            <p className="text-lg text-gray-900 font-parkinsans">Transparent Pricing</p>
          </AnimateIn>
        </div>
      </section>

      {/* 🔹 SECTION 2: Packages */}
      <section className="w-full rounded-t-[5rem] bg-luxury-pink">
        <div className="max-w-[1280px] mx-auto py-12 px-4">
          <AnimateIn className="text-center mb-16" delay={0.4}>
            <h2 className="text-3xl md:text-4xl font-parkinsans font-regular text-luxury-lite mb-4">
              Get the cleanliness you deserve at a price you will love
            </h2>
            <p className="text-sm text-gray-100 font-parkinsans">
              Check out our packages below or contact us for a personalized quote.
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg: any, index) => (

              <AnimateIn key={pkg.id} delay={index * 0.25}>
                <div className="bg-white rounded-[3rem] p-8 py-12 flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
                  
                  {/* Icon + Title */}
                  <div className="flex items-center gap-4 mb-6">
                    {pkg.icon_url ? (
                      <img src={pkg.icon_url} alt={pkg.title} className="w-10 h-10 object-contain" />
                    ) : (
                      <div className="w-8 h-8 bg-pink-50 rounded-full flex items-center justify-center text-luxury-pink">✨</div>
                    )}
                    <h3 className="text-3xl font-parkinsans font-regular text-luxury-dark">{pkg.title}</h3>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-4xl md:text-5xl text-luxury-pink font-parkinsans font-[500] text-luxury-dark">${pkg.price}</span>
                     {pkg.old_price && (
                      <span className="ml-1 text-lg text-red-700 line-through font-outfit">${pkg.old_price}</span>
                    )}
                    <span className="text-sm md:text-[16px] text-gray-700 font-parkinsans ml-1">/ service</span>
                  
                  </div>

                  {/* Description */}
                  <p className="text-sm md:text-[15px] text-gray-700 font-outfit mb-5">{pkg.description}</p>

                  {/* Divider */}
                  <div className="border-t-2 border-luxury-pink mb-5"></div>

                  {/* Features */}
                  <ul className="space-y-3 mb-5 flex-1">
                    {(pkg.features || []).map((feat: string, i: number) => (
                    
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-luxury-pink flex items-center justify-center flex-shrink-0">
                          <Check size={13} className="text-luxury-lite" />
                        </div>
                        <span className="text-sm md:text-[15px] text-gray-800 font-outfit">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <a href="/contact" className="block w-full text-center py-4 border-2 border-luxury-pink text-luxury-pink font-parkinsans font-semibold text-sm rounded-4xl hover:bg-luxury-pink hover:text-white transition-all duration-200">
                    Get Started
                  </a>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 SECTION 3: Add-On Services */}
      <section className="w-full ">
        <div className="max-w-[1280px] pt-16 md:pt-20 mx-auto px-4">
          <AnimateIn className="text-center mb-16">
            {/* <p className="text-sm font-semibold text-luxury-pink uppercase tracking-widest mb-3 font-outfit"></p>
            <h2 className="text-3xl md:text-4xl font-parkinsans font-bold text-luxury-dark mb-4"></h2>
            <p className="text-base text-gray-500 font-outfit max-w-2xl mx-auto">
   </p> */}
              <span className="text-[12px] font-batch-size font-medium uppercase tracking-widest font-parkinsans mb-6">
        Add On Service
      </span>
            {/* SEO Optimized Heading */}
           <h2 className="text-3xl font-title-size min-w-[40vw] text-black mx-auto lg:text-[2.5rem] font-parkinsans leading-11 font-regular mt-4 mb-5">
       Add On Service For A Deeper Clean
             </h2>
            {/* SEO Optimized Paragraph */}
            <p className="text-gray-600 w-full md:w-[99%] font-outfit md:text-[16px] leading-tight text-center font-light">
                            Our services go beyond a basic cleaning. Before each visit, you can choose the add on that will make your life simpler.
           </p>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {addons.map((addon: any, index) => (
              <AnimateIn key={addon.id} delay={index * 0.2}>
                <div className="rounded-3xl relative p-7 pt-8 overflow-hidden shadow-md transition-shadow duration-300 h-full flex flex-col">
                  {addon.image_url ? (
                    <img src={addon.image_url} alt={addon.title} className="w-12 h-12 object-contain" />
                  ) : (
                    <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-400 text-3xl">No Image</div>
                  )}
                  <div className=" flex flex-col flex-1 mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-parkinsans w-full  md:w-[81%] font-regular text-luxury-dark">{addon.title}</h3>
                      <span className=" absolute top-10 right-10 text-sm md:text-[16px] font-semibold text-luxury-pink">{addon.price}</span>
                    </div>
                    <p className="text-sm text-gray-800 font-parkinsans flex-1">{addon.description}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn className="text-center mt-12" delay={0.3}>
            <a href="/contact" className="inline-flex items-center gap-2 bg-luxury-pink text-white px-12 py-4.5 rounded-full font-parkinsans font-regular tracking-wider text-sm hover:bg-luxury-pink transition-colors duration-300 shadow-md">
              Get a Quote <ArrowRight size={16} />
            </a>
          </AnimateIn>
        </div>
      </section>

    </main>
  )
}