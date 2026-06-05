import Link from 'next/link'
import { companyLinks } from './footerConfig'

export default function FooterCompany() {
  return (
    <div>
      <h4 className="text-[16px] font-regular text-dark font-parkinsans uppercase mb-3">Company</h4>
      <ul className="space-y-3">
        {companyLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-gray-500 text-[15px] font-regular hover:text-luxury-pink transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}