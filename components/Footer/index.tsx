import NewsletterBar from './NewsletterBar'
import FooterBrand from './FooterBrand'
import FooterServices from './FooterServices'
import FooterCompany from './FooterCompany'
import FooterGiftCard from './FooterGiftCard'
import CopyrightBar from './CopyrightBar'
import AnimateIn from '../AnimateIn'

export default function Footer() {
  return (
    <footer className="w-full bg-white  pb-8" style={{ background: 'linear-gradient(to bottom, #f5f7f2 20%, #fff 100%)' }}>
      <div className="max-w-[1280px] rounded-t-4xl mx-auto px-12"
      >

        {/* Top: Newsletter */}
        <NewsletterBar />

        {/* Middle: 4 Cards Grid (35% | 15% | 15% | 35%) */}
        <div className="grid grid-cols-1 grid-fix md:grid-cols-12 gap-8 md:gap-6 mb-0">
          {/* Card 1: 35% (4/12 cols) */}
          <div className="md:col-span-4">

            <FooterBrand />

          </div>

          {/* Card 2: ~15% (2/12 cols) */}
          <div className="md:col-span-2">

            <FooterServices />

          </div>

          {/* Card 3: ~15% (2/12 cols) */}
          <div className="md:col-span-2">

            <FooterCompany />

          </div>

          {/* Card 4: 35% (4/12 cols) */}
          <div className="md:col-span-4">

            <FooterGiftCard />

          </div>
        </div>

        {/* Bottom: Social Icons & Copyright */}

        <CopyrightBar />


      </div>
    </footer>
  )
}