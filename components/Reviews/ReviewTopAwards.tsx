'use client'
import { Star } from 'lucide-react'
import Link from 'next/link'
import { useScrollAnimation } from '@/lib/useScrollAnimation'
export default function ReviewsGrid() {
    const animRef = useScrollAnimation()
    return (
        <>    <div ref={animRef} className='w-full z-222 my-15'>
            <div className=' flex flex-row flex-wrap items-center justify-center gap-3 w-full h-auto'>
                <div className='max-w-[253px] items-center flex flex-col p-1 min-h-[150px] bg-[#223445]'>
                    <div className='w-full bg-green-500  h-[75px]'>
                        <img src="/images/reviewleftimage.png" className='object-contain w-65' alt="" />
                    </div>
                    <div className='w-full text-center items-center'>
                        <p className='leading-tight font-playfair m-0 p-0 text-white text-[20px] mt-3'>Cornerstone Floor Care LLC</p>
                    </div>
                </div>


            </div>
        </div>
        </>

    )
}