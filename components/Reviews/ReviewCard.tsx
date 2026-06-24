import { Star } from 'lucide-react'
import { ReviewData } from './reviewsConfig'

interface ReviewCardProps {
  data: ReviewData
}

export default function ReviewCard({ data }: ReviewCardProps) {
  const firstLetter = data.name.charAt(0).toUpperCase()

  return (
    <div className="bg-white rounded-3xl p-3 flex flex-col h-full">

      {/* Stars (Dynamic Rating) */}
      <div className="flex items-center mt-5 mb-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={17}
            className={i <= data.rating ? "fill-luxury-pink text-luxury-pink" : "text-gray-200  "}
          />
        ))}
      </div>

      {/* Review Text (Max 4 lines with ellipsis) */}
      <p className="text-black font-parkinsans text-medium sm:text-sm leading-relaxed mb-6 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>
        "{data.text}"
      </p>

      {/* Customer Info Row */}
      <div className="flex items-center gap-3 mt-auto">
        {/* Pink Circle with First Letter */}
        <div className="w-9 h-9 rounded-full bg-luxury-pink-soft flex items-center justify-center flex-shrink-0">
          <span className="text-luxury-pink font-parkinsans font-bold text-xl">{firstLetter}</span>
        </div>

        <div>
          <p className="text-black uppercase font-parkinsans font-regular text-[12px] leading-tight">{data.name}</p>
          <p className="text-gray-400 font-outfit text-xs mt-0.5">Customer</p>
        </div>
      </div>
    </div>
  )
}