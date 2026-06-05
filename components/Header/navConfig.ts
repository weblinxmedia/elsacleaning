export interface NavItem {
  label: string
  href?: string
  dropdown?: { label: string; href: string }[]
}

export const navConfig: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Services', href:'/services',
    dropdown: [
      { label: 'Office Cleaning', href: '/services/office-cleaning' },
      { label: 'House Cleaning', href: '/services/house-cleaning' },
      { label: 'Airbnb Cleaning', href: '/services/airbnb-cleaning' },
      { label: 'Yacht Cleaning', href: '/services/yacht-cleaning' },
    ],
  },
  {
    label: 'Areas',
    dropdown: [],
  },
  {
    label: 'About', href:'/about',
    dropdown: [
      { label: 'Our Team', href: '/team' },
      { label: 'Client Testimonials', href: '/client-testimonials' },
    ],
  },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Pricing', href: '/pricing' },
]