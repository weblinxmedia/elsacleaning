export const dynamic = 'force-dynamic'
import { supabaseAdmin } from '@/lib/supabase'
import AnimateIn from '@/components/AnimateIn'
import TeamGallery from '@/components/TeamGallery'
// import ReviewsGrid from '@/components/Reviews'
import ReviewsGrid from '@/components/Reviews/ReviewsGrid'

export default async function ClientTestimonials() {
  

  return (
    <main className="mt-25 min-h-screen bg-white">
      
      {/* 🔹 SECTION 1: Hero Header */}
      <div className="w-full ">
    <div className='w-full mx-auto  pt-20 bg-[#f3f5f0]'>
      <div className='w-full text-center '>
                  <span className="text-[12px] font-batch-size font-medium uppercase tracking-widest font-parkinsans mb-6">
            Testimonials
          </span>
          </div>
                {/* SEO Optimized Heading */}
               <h2 className="text-3xl font-title-size min-w-[40vw] md:max-w-[40vw] text-black mx-auto lg:text-[2.5rem] px-3 md:px-0 font-parkinsans text-center font-regular mt-4 -mb-6">
           Empowering Thousands of Users and Enterprises
                 </h2>
        <ReviewsGrid showFirstChild={false} />
          </div>
      </div>

      {/* 🔹 SECTION 3: Random Gallery with Parallax */}
      

    </main>
  )
}