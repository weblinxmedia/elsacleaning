import ReviewsIntro from './ReviewsIntro'
import ReviewSummary from './ReviewSummary'
import ReviewsGrid from './ReviewsGrid'

export default function Reviews() {
  return (
    <section className="w-full py-20 overflow-hidden"
    style={{background:'linear-gradient(to bottom,var(--color-luxury-pink) 0%, var(--color-luxury-pink) 46%, #FFF 46%, #FFF 100%)'}}>
      <div className="max-w-[1280px] mx-auto">
        
        {/* Top: 50/50 Image & Text */}
     
        <ReviewsIntro />

        {/* Floating Summary Badge */}
    
    
        {/* Bottom: 3x3 Grid & Button Container */}
        <ReviewsGrid />

      </div>
    </section>
  )
}