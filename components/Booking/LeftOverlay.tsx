import { Star } from 'lucide-react'

export default function LeftOverlay() {
  return (
    <div className=" rounded-[30px] h-[100%] flex justify-end items-end">
      
      {/* Glassmorphism Box at the Bottom */}
      <div className="bg-white/20 h-[7rem] backdrop-blur-md gap-8  rounded-t-4xl flex items-center justify-center w-full">
        
        {/* Left Part: Image, 100+, 5 Stars */}
        <div className="flex flex-col items-center -mt-14 text-center">
          {/* Branded/Chip Image Placeholder */}
          <div className="flex h-[80px] items-center justify-center">
            <img 
              src="/images/award1.webp" 
              alt="Badge" 
              className="w-14"

            />
          </div>
          <span className="text-3xl font-parkinsans font-regular text-white">100%</span>
        <span className='text-sm font-parkinsans text-white'>Happy Customers</span>
        </div>

        {/* Right Part: Happy Customers, Bark Reviews */}
        <div className="flex flex-col items-center -mt-14 text-center">
          {/* Branded/Chip Image Placeholder */}
          <div className="flex h-[80px] items-center justify-center">
            <img 
              src="/images/award2.webp" 
              alt="Badge" 
              className="w-14"

            />
          </div>
           <span className="text-3xl font-parkinsans font-regular text-white">5 Star</span>
        <span className='text-sm font-parkinsans text-white'>Bark Reviews</span>
        </div>

      </div>
    </div>
  )
}