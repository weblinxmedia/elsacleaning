'use client'

import { useSettings } from "@/app/context/SettingsContext"
import AnimateIn from "../AnimateIn"

export default function WhyChooseUs({ heading, cards }: { heading: string, cards?: { title: string, description: string, image_url: string }[] }) {
  const { phone } = useSettings()

  const stats = [
    { stat: '5+', label: 'Years of Experience' },
    { stat: '500+', label: 'Cleanings Completed' },
    { stat: '1000+', label: 'Hours Saved for Clients' },
    { stat: '99%', label: 'Client Satisfaction' },
  ]

  // Only render cards that actually have content
  const validCards = (cards || []).filter(card => card.title || card.image_url || card.description)

  return (
    <section className="w-full pt-16 md:pt-24 -mt-[6rem] mb-30">
      <div className="max-w-[1280px] relative mx-auto bg-luxury-pink rounded-4xl md:rounded-[3rem] px-4"
      style={
        {
          padding:'7.5rem 1rem 7.5rem 1rem'
        }
      }>
        
        {/* 🔹 SEO Optimized Heading */}<AnimateIn><h2 className="text-3xl font-title-size max-w-[80%] md:max-w-[45vw] text-center text-luxury-lite mx-auto md:text-5xl lg:text-[2.5rem] font-parkinsans leading-11 font-regular mt-14 mb-[4rem]">
       {heading}
             </h2></AnimateIn>
           

        {/* 🔹 Stats Cards Grid */}
       

        {/* 🔹 Dynamic Feature Cards */}
        {validCards.length > 0 && (
          <div className="grid grid-cols-1 w-full md:w-[99.5%] mx-auto sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {validCards.map((card, index) => (
              <AnimateIn delay={ index * 0.2}>
              <div key={index}
             className={`bg-[#f4f6f0] box-clip rounded-2xl overflow-hidden p-5 py-10 transition-all duration-300 group flex flex-col ${
          index === 0 || index === 1 ? 'box-clip' : 'box-clip2'
        }`}   >
                <div className="relative h-[60px] w-[60px] flex justify-center items-center overflow-hidden rounded-[18px] mb-6 bg-luxury-lite ">
                  {card.image_url ? (
                    <img 
                      src={card.image_url} 
                      alt={card.title || 'Feature'} 
                      className="w-fit h-9 object-cover transition-transform duration-500" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm font-outfit">No Image</div>
                  )}
                </div>
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl md:text-2xl font-parkinsans font-regular leading-tight text-luxury-dark mb-2">{card.title}</h3>
                  <p className="text-gray-500 font-thin font-outfit text-medium leading-tight flex-1">{card.description}</p>
                </div>
              </div>
            </AnimateIn>
            ))}
          </div>
        )}
 <div className="grid grid-cols-1 w-full md:w-[99.5%] sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((item, index) => (
              <AnimateIn delay={ index * 0.2}> <div 
              key={index} 
              className="border-l border-luxury-pink-soft py-2 pl-4 text-start  transition-shadow duration-300"
            >
              <p className="text-4xl md:text-5xl font-parkinsans font-regular text-luxury-lite mb-2">
                {item.stat}
              </p>
              <p className="text-luxury-lite font-parkinsans text-sm font-thin tracking-normal">
                {item.label}
              </p>
            </div>
        </AnimateIn>
             ))}
        </div>
        {/* 🔹 Contact Us Button with Phone Number */}
        <div className="text-center absolute  mx-auto flex items-end justify-center rounded-t-[30px] bg-white h-[50px] w-[200px]"
        style={{
          left:'50%',
          bottom:'0px',
          transform:'translate(-50%, 0)'
        }}
        >
           <p> <img src="/images/c2.svg"
 alt="" 
 className='absolute bottom-[0px] -left-[32px] -scale-y-100 -scale-x-100'
 /> </p>
<p> <img src="/images/c2.svg"

alt="" className='absolute bottom-[0px]  -right-[32px] -scale-y-100 scale-x-100'/> </p>
          <AnimateIn><a 
            href={`tel:${phone}`}
            className="font-parkinsans w-[fit-content] text-sm px-8 nav-font py-3.5 bg-luxury-pink-soft border-luxury-pink border-1 rounded-full cursor-pointer text-luxury-dark font-medium  tracking-normal transition-all duration-300 hover:shadow-lg transform hover:scale-[1.0]"
           >
           
            Contact Us Now
          </a></AnimateIn>
        </div>

      </div>
    </section>
  )
}