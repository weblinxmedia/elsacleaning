import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import AnimateIn from '../AnimateIn'

interface ServiceCard {
  image_url: string
  title: string
}

interface OurServicesProps {
  heading: string
  services: ServiceCard[]
}

export default function OurServices({ heading, services }: OurServicesProps) {
  return (
    <section className="w-full py-16 md:py-24"
        style={
    {
      background:'linear-gradient(to bottom, #f3f5f0 10%, #fff 100%)'
    }
    }>
      <div className="max-w-[1280px] mx-auto px-4 pt-20 pb-10"
   >
        <div className='w-full text-center'>
        {/* 🔹 SEO Optimized Main Heading */}
        <AnimateIn delay={0.1}>
             <span className="text-[12px] font-batch-size font-medium uppercase tracking-widest font-parkinsans mb-6">
        our services
      </span></AnimateIn>
            {/* SEO Optimized Heading */}<AnimateIn delay={0.2}>
           <h2 className="text-3xl font-title-size min-w-[40vw] text-black mx-auto lg:text-[2.5rem] font-parkinsans leading-11 font-regular mt-4 mb-8">
       {heading || "Here Is What We Can Do For Your Workspace"}
             </h2></AnimateIn>
</div>
        {/* 🔹 4-Card Grid */}
        <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
              <AnimateIn delay={ index * 0.2}>
            <article 
              key={index} 
              className="rounded-4xl overflow-hidden p-3 transition-shadow duration-300 flex flex-col group"
             style={{ 
        background: 'linear-gradient(to bottom right, var(--color-luxury-pink), rgba(255,255,255,0))' 
      }}
            >
              {/* Card Image */}
              <div className="relative w-full h-65 overflow-hidden"
              style={{
                clipPath: 'polygon(32.2492676px 0px, calc(100% - 29.883191px) 0.16707739px, calc(100% - 29.883191px) 0.16707739px, calc(100% - 24.96109729px) 0.87537044px, calc(100% - 20.31945472px) 2.29591631px, calc(100% - 16.01424199px) 4.36886114px, calc(100% - 12.1014378px) 7.03435112px, calc(100% - 8.63702087px) 10.23253242px, calc(100% - 5.67696992px) 13.90355119px, calc(100% - 3.27726365px) 17.98755362px, calc(100% - 1.49388076px) 22.42468587px, calc(100% - 0.38279998px) 27.1550941px, calc(100% - 5.68434189E-14px) 32.1189245px, calc(100% - 0px) calc(100% - 32.02092px), calc(100% - 0px) calc(100% - 32.02092px), calc(100% - 0.41860061px) calc(100% - 26.8269604px), calc(100% - 1.63050344px) calc(100% - 21.89983258px), calc(100% - 3.56985995px) calc(100% - 17.30546357px), calc(100% - 6.1708216px) calc(100% - 13.10978045px), calc(100% - 9.36753988px) calc(100% - 9.37871025px), calc(100% - 13.09416624px) calc(100% - 6.17818003px), calc(100% - 17.28485217px) calc(100% - 3.57411685px), calc(100% - 21.87374912px) calc(100% - 1.63244774px), calc(100% - 26.79500858px) calc(100% - 0.41909978px), calc(100% - 31.982782px) calc(100% - 5.68434189E-14px), 31.9827822px calc(100% - 14px), 31.9827822px calc(100% - 14px), 26.79500879px calc(100% - 14.41909978px), 21.87374934px calc(100% - 15.63244774px), 17.28485237px calc(100% - 17.57411685px), 13.09416641px calc(100% - 20.17818003px), 9.36754001px calc(100% - 23.37871025px), 6.1708217px calc(100% - 27.10978045px), 3.56986001px calc(100% - 31.30546357px), 1.63050347px calc(100% - 35.89983258px), 0.41860062px calc(100% - 40.8269604px), 5.29492535E-31px calc(100% - 46.02092px), 0px 32.0209204px, 0px 32.0209204px, 0.41860062px 26.82696079px, 1.63050347px 21.89983293px, 3.56986001px 17.30546389px, 6.1708217px 13.10978071px, 9.36754001px 9.37871045px, 13.09416641px 6.17818017px, 17.28485237px 3.57411693px, 21.87374934px 1.63244779px, 26.79500879px 0.41909979px, 31.9827822px 5.30123935E-31px, 31.9827822px 0px, 32.11152455px 0px, 32.2175794px 0px, 32.30094672px 0px, 32.36162654px 0px, 32.39961884px 0px, 32.41492362px 0px, 32.40754089px 0px, 32.37747064px 0px, 32.32471288px 0px, 32.2492676px 0px)', // 🆕 Arrow pointing down
              }}>
                <Image 
                  src={service.image_url} 
                  alt={service.title} // SEO: Dynamic alt tag
                  fill
                  className="object-cover transition-transform duration-500"
                />
              </div>

              {/* Card Content */}
              <div className="pt-3 pl-3 flex flex-col flex-1">
                {/* SEO Optimized Card Title */}
                <h3 className="text-lg md:text-2xl font-parkinsans font-regular text-luxury-dark mb-4">
                  {service.title}
                </h3>

                {/* Get Service Button */}
                <div className="mt-5 pb-2">
                  <Link
       href={'/contact'}
        className="font-parkinsans flex items-center justify-between w-full text-sm px-5 py-2.5 rounded-full cursor-pointer text-luxury-lite bg-luxury-lite font-semibold tracking-normal transition-all duration-300 hover:shadow-lg transform hover:scale-[1.0]"
     >
        <span className="text-sm text-luxury-dark font-normal">Get Service</span>
        <div className="w-8 h-8 bg-luxury-pink-soft rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
          <ArrowRight size={16} className="text-luxury-pink" />
        </div>
      </Link>
                </div>
              </div>
            </article>
        </AnimateIn>  ))}
        </div>

      </div>
    </section>
  )
}