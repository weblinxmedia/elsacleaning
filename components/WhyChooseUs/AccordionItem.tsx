import { Plus, Minus } from 'lucide-react'

interface AccordionItemProps {
  title: string
  content: string
  isOpen: boolean
  onClick: () => void
}

export default function AccordionItem({ title, content, isOpen, onClick }: AccordionItemProps) {
  return (
    <div className="border-1 border-luxury-pink rounded-[30px] overflow-hidden transition-all duration-300">
      {/* Clickable Header */}
      <button
        onClick={onClick}
        className="w-full flex cursor-pointer  items-center justify-between p-7 text-left bg-white transition-colors duration-200"
      >
        <span className="font-parkinsans  font-expand-size md:text-lg font-regular text-luxury-dark">{title}</span>
        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-blacktransition-all duration-300">
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>

      {/* Smooth Expand Animation using CSS Grid trick */}
      <div 
        className="grid transition-all duration-400 ease-in-out"
        style={{ 
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5">
            {/* Pink Divider Line */}
            <div className="w-full h-[1px] bg-luxury-pink/50 mb-4" />
            {/* Content Paragraph */}
            <p className="text-gray-500 px-3 text-sm font-thin font-outfit">
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}