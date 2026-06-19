import {  Copyright } from 'lucide-react'

const socialIcons = [
  { icon: Copyright, href: '#' },
  { icon: Copyright, href: '#' },
  { icon: Copyright, href: '#' },
  { icon: Copyright, href: '#' },
]

export default function CopyrightBar() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="mt-16">
      {/* Social Icons */}
      <div className="flex items-center justify-end gap-3 mb-8">
        {socialIcons.map((social, index) => (
          <a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-luxury-pink/10 flex items-center justify-center text-luxury-pink hover:bg-luxury-pink hover:text-white transition-all duration-300"
          >
            <social.icon size={18} />
          </a>
        ))}
      </div>

      {/* Pink Divider */}
      <div className="w-full h-[1px] bg-luxury-pink mb-6" />

      {/* Copyright Text */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-1 text-center md:text-left">
        <div className="flex items-center gap-2 text-gray-500 text-[16px]">
          <Copyright size={16} />
          <span>Copyright {currentYear} - Shazam Windows Cleaning</span>
        </div>
        <div className="text-gray-500 text-[16px]">
          | Developed & Marketing by{' '}
          <a 
            href="https://weblinxmedia.online" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-luxury-pink font-semibold hover:underline"
          >
            Weblinx Media
          </a>
        </div>
      </div>
    </div>
  )
}