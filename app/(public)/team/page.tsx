import { supabaseAdmin } from '@/lib/supabase'
import AnimateIn from '@/components/AnimateIn'
import TeamGallery from '@/components/TeamGallery'
import TeamContent from './TeamContent'
import TeamImage from './TeamImage'

export const dynamic = 'force-dynamic'

async function getTeamMembers() {
  const { data, error } = await supabaseAdmin
    .from('team_members')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: true })

  if (error) console.error(error)
  return data || []
}

export default async function TeamPage() {
  const members = await getTeamMembers()

  return (
    <main className="mt-25 min-h-screen bg-white">
      
      {/* 🔹 SECTION 1: Hero Header */}
      <section className="w-full py-20 md:py-28">
        <div className="max-w-[1280px] mx-auto px-4 text-center">
          <AnimateIn>   
          
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-regular font-parkinsans text-luxury-dark leading-tight">
            Our Team
          </h1>
          <p className="text-gray-600 text-medium max-w-2xl font-thin mx-auto leading-relaxed">
Meet the people behind our success          </p>

          </AnimateIn>
        </div>
      </section>

        <section className="w-full pt-28 pb-5 bg-white">
              <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
                {/* Left Side: Content */}
                <TeamContent />
                
                {/* Right Side: Image + Leaves */}
                <AnimateIn>
                  <TeamImage />
                </AnimateIn>
              </div>
            </section>

      {/* 🔹 SECTION 2: Intro + Team Cards */}
      <section className="w-full py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-4 py-20">
        
            <div className="text-center mb-16">
                <AnimateIn delay={0.2}> <span className="text-[13px] font-batch-size font-medium uppercase tracking-widest font-parkinsans mb-3">
        Meet Us
      </span></AnimateIn>
             <AnimateIn delay={0.3}> <h1 className="text-4xl md:text-5xl lg:text-5xl w-[95%] md:w-[60%] mx-auto font-regular font-parkinsans text-luxury-dark leading-tight">
             Get to know the faces that make it all happen
          </h1></AnimateIn> 
        <AnimateIn delay={0.4}> <p className="text-gray-600 text-medium max-w-2xl font-thin mx-auto leading-relaxed">
 Meet our talented team members who work together to bring your vision to life.
                   </p>
           </AnimateIn>
            </div>
          

          {members.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {members.map((member: any, index: number) => (
                <AnimateIn key={member.id} delay={index * 0.2 }>
                  <div className="group relative bg-white border border-luxury-pink rounded-4xl py-8 text-center transition-all duration-500 hover:bg-luxury-pink hover:border-luxury-pink shadow-sm hover:shadow-xl cursor-pointer">
                    
                    {/* Profile Image */}
                    <div className="w-50 h-50 mx-auto rounded-full overflow-hidden mb-4  border-luxury-pink transition-all duration-500 shadow-sm">
                      {member.photo_url ? (
                        <img src={member.photo_url} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-3xl font-parkinsans">
                          {member.name?.charAt(0)}
                        </div>
                      )}
                    </div>

                    {/* Name & Role */}
                    <h3 className="text-3xl font-parkinsans font-regular text-luxury-dark group-hover:text-white transition-colors duration-500 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm font-parkinsans text-gray-500 group-hover:text-gray-300 transition-colors duration-500 tracking-wider mb-8">
                      {member.role}
                    </p>

                    {/* Contact Button */}
                    <div className='absolute -bottom-8 left-1/2 -translate-x-1/2 rounded-3xl -translate-y-0 w-[150px] h-[64px] flex items-center justify-center bg-white'>
                    <a 
                      href="/contact"
                      className="inline-block  px-6 py-2.5 border-2 border-luxury-pink text-luxury-lite rounded-full text-sm font-parkinsans font-regular tracking-normal bg-luxury-pink group-hover:text-white transition-all duration-500"
                    >
                      Contact Us
                    </a></div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 font-outfit py-16">Team members coming soon...</p>
          )}
        </div>
      </section>

      {/* 🔹 SECTION 3: Random Gallery with Parallax */}
      <TeamGallery />

    </main>
  )
}