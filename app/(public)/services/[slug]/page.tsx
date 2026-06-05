export const dynamic = 'force-dynamic'
import { supabaseAdmin } from '@/lib/supabase'
import ServiceHeader from '@/components/Services/ServiceHeader'
import ServiceHero from '@/components/Services/ServiceHero'
import HowItWorks from '@/components/Services/HowItWorks'
import ServiceFeatures from '@/components/Services/ServiceFeatures'
import WhyChooseUs from '@/components/Services/WhyChooseUs'
import WhatSetsUsApart from '@/components/Services/WhatSetsUsApart'
import OurServices from '@/components/Services/OurServices'
import FAQ from '@/components/Services/FAQ'
import FreeEstimate from '@/components/Services/FreeEstimate'
import { notFound } from 'next/navigation'
import Reviews from '@/components/Reviews'
import ReviewsGrid from '@/components/Reviews/ReviewsGrid'
import ReviewSummary from '@/components/Reviews/ReviewSummary'
import AnimateIn from '@/components/AnimateIn'

// Fetch data on the server
async function getServiceData(slug: string) {
  try {
    // 1. Get the service by slug (value)
    const { data: service, error: serviceError } = await supabaseAdmin
      .from('services')
      .select('id, label, value')
      .eq('value', slug)
      .single()

    if (serviceError || !service) return null

    // 2. Get the page content for this service
    const { data: content, error: contentError } = await supabaseAdmin
      .from('service_page_contents')
      .select('*')
      .eq('service_id', service.id)
      .single()

    // If no content exists yet, return just the service with empty content
    if (contentError || !content) {
      return { service, content: {} }
    }

    return { service, content }
  } catch (error) {
    console.error(error)
    return null
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = await getServiceData(slug)

  if (!data) return notFound() // Show 404 if service doesn't exist

  const { content } = data

  return (
    <main className="mt-25">
      {/* Section 1: Header */}
      {/* <ServiceHeader title={slug} /> */}
      
      {/* Section 2: Blended Hero Section */}
      <ServiceHero 
        title={slug}
        hero_heading={content.hero_heading}
        hero_paragraph={content.hero_paragraph}
        hero_image_1_url={content.hero_image_1_url}
     
      />

      {/* Section 3: How It Works */}
      <HowItWorks 
        subtitle={content.how_it_works_subtitle || "How It Works"} 
        heading={content.how_it_works_heading || "Simple, Fast, and Spotless"} 
        steps={content.how_it_works_steps || []} 
      />

      {/* Section 4: Features / Checklist */}
      <ServiceFeatures 
        heading={content.features_heading || "Why Choose Our Specialized Cleaning?"}
        description={content.features_description || "We go above and beyond to ensure your space is truly healthy."}
        features={content.features_list || []}
           hero_image_2_url={content.hero_image_2_url}
      />

      {/* Section 5: Why Choose Us (Stats) */}
     <WhyChooseUs 
  heading={content.why_choose_us_heading || 'Why Choose Us'} 
  cards={content.why_choose_us_cards} 
/>

      {/* Section 6: What Sets Us Apart */}
      <WhatSetsUsApart 
        image_url={content.sets_apart_image_url || "/images/standards-image.webp"}
        heading={content.sets_apart_heading || "Our A and B Cleaning Standards"}
        description={content.sets_apart_description || "We don't just clean; we elevate your environment."}
        features={content.sets_apart_features || []}
      />

      {/* Section 7: Our Services (Cross-Sell Cards) */}
      <OurServices 
        heading={content.our_services_heading || "Here is What We Can Do For You"}
        services={content.our_services_cards || []}
      />
  <div className='w-full mx-auto text-center pt-20 bg-[#f3f5f0]'>
    <AnimateIn>
              <span className="text-[12px] font-batch-size font-medium uppercase tracking-widest font-parkinsans mb-6">
        Testimonials
      </span></AnimateIn>
           <AnimateIn delay={0.2}> {/* SEO Optimized Heading */}
           <h2 className="text-3xl font-title-size min-w-[40vw] md:max-w-[40vw] text-black mx-auto lg:text-[2.5rem] font-parkinsans leading-11 font-regular mt-4 -mb-6">
       Empowering Thousands of Users and Enterprises
             </h2></AnimateIn>
    <ReviewsGrid showFirstChild={false} />
      </div>{/* Section 8: FAQs */}
      <FAQ 
        subtitle={content.faq_subtitle || "FAQ"}
        heading={content.faq_heading || "Frequently Asked Questions"}
        description={content.faq_description || "Looking for the best cleaning services? Contact us now."}
        faqs={content.faq_items || []}
      />

      {/* Section 9: Free Estimate & Map */}
      <FreeEstimate 
        subtitle={content.estimate_subtitle || "Free Estimate"}
        heading={content.estimate_heading || "Trusted Team is Ready to Serve"}
        locations={content.estimate_locations || []}
        bottomHeading={content.estimate_bottom_heading || "Try Out Easy Online Appointment Scheduling"}
        bottomDescription={content.estimate_bottom_description || "Your satisfaction is our top priority. We proudly offer a 100% happiness guarantee."}
      />
    </main>
  )
}