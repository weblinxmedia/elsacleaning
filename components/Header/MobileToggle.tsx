import { Menu, X } from 'lucide-react'

interface MobileToggleProps {
  isOpen: boolean
  onClick: () => void
}

export default function MobileToggle({ isOpen, onClick }: MobileToggleProps) {
  return (
    <button className="md:hidden text-luxury-dark p-1" onClick={onClick} aria-label="Toggle Menu">
      {isOpen ? <X size={28} strokeWidth={1.5} /> : <img src='/images/menu.svg' alt="Menu" width={'26'} />}
    </button>
  )
}