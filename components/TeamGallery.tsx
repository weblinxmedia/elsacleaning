'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimateIn from './AnimateIn'

gsap.registerPlugin(ScrollTrigger)

// Demo images (replace these with your actual gallery images later)
const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80', alt: 'Cleaning 1' },
  { src: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=600&q=80', alt: 'Cleaning 2' },
  { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1pscxz9VCO-MhC9-obM0D7o8bBc81fMEzZA&s', alt: 'Office 1' },
  { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80', alt: 'Office 2' },
  { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQGD13370lBYSz0sOGInWx6bByY1X1_IlHIA&s', alt: 'Team 1' },
  { src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80', alt: 'Team 2' },
  { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR27ed3ZI4EzEfllkWrdCIborHHCMLSx_CtGg&s', alt: 'Team 2' },
   { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIMo92dOcLE0SgjpwUM6GmGaP6mmMV7Hr76g&s', alt: 'Team 5' },
   { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmY7Sc-NzVkTCVYv_dUZBKZs6JB0xdWjOd2Q&s', alt: 'Team 5' },
   { src: 'https://www.healthyhomesutah.com/wp-content/uploads/Professional-House-Cleaning-Services-in-North-Ogden-Utah.jpg', alt: 'Team 5' },
   { src: 'https://calgarytrustedcleaners.com/wp-content/uploads/2025/05/what-to-look-for-in-a-professional-cleaning-service-hero.jpg', alt: 'Team 5' },

  ]


export default function TeamGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const triggers: ReturnType<typeof gsap.to>[] = []

    imagesRef.current.forEach((img, i) => {
      if (!img) return
      
      // Alternate directions and speeds for the "random" parallax feel
      const direction = i % 2 === 0 ? -1 : 1
      const speed = (Math.random() * 100 + 60) * direction // Moves between 20px and 60px up or down

      const anim = gsap.to(img, {
        y: speed,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true, // Ties the animation to the scroll position (reverses automatically!)
        },
      })

      triggers.push(anim)
    })

    return () => {
      triggers.forEach(t => {
        t.scrollTrigger?.kill()
        t.kill()
      })
    }
  }, [])

  return (
    <section className="w-full py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4">
       <AnimateIn>
                  <div className="text-center mb-16">
                     <AnimateIn delay={0.2}><span className="text-[13px] font-batch-size font-medium uppercase tracking-widest font-parkinsans mb-3">
              Gallery
            </span></AnimateIn>
                     <AnimateIn delay={0.3}><h1 className="text-4xl md:text-5xl lg:text-5xl w-[95%] md:w-[60%] mx-auto font-regular font-parkinsans text-luxury-dark leading-tight">
                   Our Work In Action
                </h1></AnimateIn>
                <AnimateIn delay={0.4}><p className="text-gray-600 text-medium max-w-2xl font-thin mx-auto leading-relaxed">
A glimpse into the spaces we transform and the teams that make it happen.
                         </p></AnimateIn>
                 
                  </div>
                </AnimateIn>

        {/* Random Masonry-style Grid */}
        <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {galleryImages.map((img, i) => (
            <AnimateIn delay={i * 0.1}>
            <div
              key={i}
              ref={(el) => { if (el) imagesRef.current[i] = el }}
              className={`overflow-hidden rounded-2xl shadow-sm ${
                i === 1 ? 'mt-12' : i === 4 ? 'mb-8' : i === 0 ? 'ml-4' : ''
              } ${i === 2 ? 'row-span-2' : ''}`}
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-700"
              />
            </div>
        </AnimateIn>  ))}
        </div>
      </div>
    </section>
  )
}