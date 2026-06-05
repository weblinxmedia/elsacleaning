import WhyChooseContent from './WhyChooseContent'
import WhyChooseImage from './WhyChooseImage'

export default function WhyChooseUs() {
  return (
    <section className="w-full py-20 md:py-28 bg-white">
      <div className="max-w-[1280px] mx-auto grid py-15 grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left Side: Content (50%) */}
        <WhyChooseContent />
        
        {/* Right Side: Image (50%) */}
        <WhyChooseImage />
      </div>
    </section>
  )
}