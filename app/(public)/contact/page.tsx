import { supabaseAdmin } from '@/lib/supabase'
import AnimateIn from '@/components/AnimateIn'
import ContactForm from '@/components/ContactForm'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import ReviewsGrid from '@/components/Reviews/ReviewsGrid'

export const dynamic = 'force-dynamic'

async function getServices() {
  const { data, error } = await supabaseAdmin
    .from('services')
    .select('label, value')
    .order('created_at', { ascending: true })
  
  if (error) console.error(error)
  return data || []
}

async function getSettings() {
  const { data, error } = await supabaseAdmin
    .from('settings')
    .select('key, value')
  
  if (error) console.error(error)
  
  const settings: Record<string, string> = {}
  data?.forEach((item: { key: string; value: string }) => {
    settings[item.key] = item.value
  })
  return settings
}

export default async function ContactPage() {
  const services = await getServices()
  const settings = await getSettings()

  const contactCards = [
      { 
      img: "/images/mail.svg", 
      title: 'Send us an email', 
      value: settings.email || 'info@example.com',
      href: `mailto:${settings.email || ''}`,
      isLink: true
    },
    { 
      img: "/images/call.svg", 
      title: 'Give us a call', 
      value: settings.phone || '(321) 456-7890',
      href: `tel:${settings.phone || ''}`,
      isLink: true
    },
  
    { 
      img: "/images/location.svg", 
      title: 'Visit Our Office', 
      value: settings.address || 'Orlando, FL',
      href: '#',
      isLink: false
    },
    { 
      img: "/images/process2.svg", 
      title: 'Office Hours', 
      value: settings.office_hours || 'Mon-Fri, 9:00 AM - 5:00 PM',
      href: '#',
      isLink: false
    },
  ]

  return (
    <main className="mt-25 min-h-screen bg-white">
      <div className="max-w-[1280px] mx-auto pt-10 px-4">
        
             {/* Header */}
        <AnimateIn className="text-center mb-16">
          <h1 className="text-5xl md:text-5xl font-parkinsans font-regular text-luxury-dark mb-3">Contact Us</h1>
          <p className="text-md text-gray-900 font-parkinsans">Contact us today</p>
        </AnimateIn>

        {/* Main Grid: 30% Left | 70% Right */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-12">
           {/* <AnimateIn>
              <div className=" rounded-2xl p-6 hover:shadow-md transition-shadow">
                <img src="/images/mail.svg" alt="Call Us" className="w-[100px] h-auto object-cover rounded-xl mb-4" />
                <h3 className="text-xl font-parkinsans font-regular text-luxury-dark mb-2">Send us an email</h3>
                <p className="text-sm text-gray-500 font-outfit leading-relaxed"></p>
              </div>
            </AnimateIn> */}
          {/* Left Side - 4 Cards (30%) */}
          <div className="lg:col-span-3 space-y-5">
            {contactCards.map((card, i) => (
              <AnimateIn key={i}>
                <div className="rounded-2xl p-6 shadow-md hover:border-luxury-pink/30 transition-all duration-300 h-full">
                  <div className="flex items-start flex-col gap-4">
                    <div className="flex-shrink-0">
                      <img src={card.img} alt={card.title} className="w-[60px] h-auto object-cover rounded-xl"  />
                    </div>
                    <div>
                      <h3 className="text-xl font-parkinsans font-regular text-luxury-dark mb-1">{card.title}</h3>
                      {card.isLink ? (
                        <a href={card.href} className="text-sm text-gray-500 font-parkinsans hover:text-luxury-pink transition-colors break-all">
                          {card.value}
                        </a>
                      ) : (
                        <p className="text-sm text-gray-500 font-outfit">{card.value}</p>
                      )}
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>

          {/* Right Side - Form (70%) */}
          <div className="lg:col-span-7 order-first md:order-last">
            <AnimateIn>
              <div className=" p-8 md:p-10 rounded-2xl shadow-md">
                <h2 className="text-2xl md:text-4xl font-parkinsans font-regular text-luxury-dark mb-8">Book Your Estimate Now</h2>
                <ContactForm services={services} />
              </div>
            </AnimateIn>
          </div>

        </div>
            
      </div>
       <div className="w-full mt-10 ">
            <div className='w-full mx-auto  pt-20 bg-[#f3f5f0]'>
                <div className='w-full text-center '>
                          <span className="text-[12px] font-batch-size font-medium uppercase tracking-widest font-parkinsans mb-6">
                    Testimonials
                  </span></div>
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