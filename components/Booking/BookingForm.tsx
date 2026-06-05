'use client'

import { useState, useEffect } from 'react'
import { Phone } from 'lucide-react'
import { useSettings } from '@/app/context/SettingsContext'
import AnimateIn from '../AnimateIn'

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    address: '',
    info: '',
  })
  
  // 🔹 Dynamic States
  const [services, setServices] = useState<{ label: string; value: string }[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const { phone } = useSettings()

  // 🔹 Fetch services dynamically from dashboard
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services')
        if (res.ok) {
          const data = await res.json()
          setServices(data)
        }
      } catch (err) {
        console.error('Failed to load services:', err)
      }
    }
    fetchServices()
  }, [])

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [field]: e.target.value })
  }

  // 🔹 Submit logic (same as Contact Page)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          message: formData.info, // Map 'info' to 'message' for the leads dashboard
          source: 'booking_form' 
        }),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setIsSubmitted(true)
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please check your connection.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClasses = "w-full px-4 py-3.5 bg-white border border-gray-200 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-luxury-pink focus:ring-1 focus:ring-luxury-pink transition-all duration-300"

  // 🎉 Success State
  if (isSubmitted) {
    return (
      <div className="bg-white rounded-4xl p-8 md:p-12 flex flex-col items-center justify-center text-center">
        <div className="text-5xl mb-4 w-full flex items-center justify-center"><img src="/images/tick.svg" width={'90'} alt="" /></div>
        <h3 className="text-2xl font-parkinsans font-bold text-luxury-dark mb-2">Thank You!</h3>
        <p className="text-gray-600 font-parkinsans w-full md:w-[80%]">Your booking request has been received. We’ll reach out to you shortly.</p>
        <p className="text-sm text-gray-500 font-parkinsans mt-3">Typical response time: Under 24 hours</p>
      </div>
    )
  }

  return (
    <div className="bg-white  min-h-screen p-8 md:p-12">
      <AnimateIn>
        <div className='w-full items-center justify-center  flex flex-col text-center'>
          {/* Top Label */}
          <span className="text-[13px] font-batch-size font-medium uppercase tracking-widest font-parkinsans mb-3">
            Booking
          </span>

          {/* Large Heading */}
          <h2 className="text-3xl font-title-size md:max-w-[90%] md:text-[2.55rem] font-parkinsans font-regular mb-5">
            Get Your Estimate & Book Now
          </h2>
        </div>
      </AnimateIn>

      {/* Form */}
      <AnimateIn>
        <form onSubmit={handleSubmit} className="space-y-5 font-outfit">
          
          {/* Row 1: Name & Email */}
          <div className="grid grid-cols-1 grid-change md:grid-cols-2 gap-5 ">
            <div>
              <label className="block text-[14px] font-regular text-gray-500 font-outfit mb-2">Your Name<span className='text-red-400 ml-1'>*</span></label>
              <input type="text" placeholder="John Doe" value={formData.name} onChange={handleChange('name')} className={inputClasses} required />
            </div>
            <div>
              <label className="block text-[14px] font-regular text-gray-500 font-outfit mb-2">Email<span className='text-red-400 ml-1'>*</span></label>
              <input type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange('email')} className={inputClasses} required />
            </div>
          </div>

          {/* Row 2: Phone & Select Services */}
          <div className="grid grid-cols-1 grid-change md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[14px] font-regular text-gray-500 font-outfit mb-2">Phone<span className='text-red-400 ml-1'>*</span></label>
              <input type="tel" placeholder="(321) 456-7890" value={formData.phone} onChange={handleChange('phone')} className={inputClasses} required />
            </div>
            <div>
              <label className="block text-[14px] font-regular text-gray-500 font-outfit mb-2">Select the Services<span className='text-red-400 ml-1'>*</span></label>
              <select value={formData.service} onChange={handleChange('service')} className={`${inputClasses} appearance-none cursor-pointer`} style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }} required>
                <option value="" disabled>Choose a service</option>
                {services.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3: Address */}
          <div>
            <label className="block text-[14px] font-regular text-gray-500 font-outfit mb-2">Your Address<span className='text-red-400 ml-1'>*</span></label>
            <input type="text" placeholder="123 Main St, Orlando, FL" value={formData.address} onChange={handleChange('address')} className={inputClasses} required />
          </div>

          {/* Row 4: Additional Information */}
          <div>
            <label className="block text-[14px] font-regular text-gray-500 font-outfit mb-2">Additional Information</label>
            <textarea rows={4} placeholder="Tell us more about your needs..." value={formData.info} onChange={handleChange('info')} className={`${inputClasses} resize-none`}></textarea>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm font-outfit text-center">{error}</p>}

          {/* Submit Button */}
          <div className='w-full flex items-center justify-center'>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`font-parkinsans w-[fit-content] px-7 py-2.5 rounded-full cursor-pointer text-luxury-lite font-semibold capitalize tracking-normal transition-all duration-300 hover:shadow-lg transform hover:scale-[1.0] ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-luxury-pink'}`}
            >
              {isSubmitting ? 'Sending...' : "I'd like a quote"}
            </button>
          </div>
        </form>
      </AnimateIn>

      {/* Bottom Text & Phone */}
      <AnimateIn>
        <div className="text-center font-parkinsans mt-6">
          <p className="text-gray-900 font-parkinsans text-sm mb-3">If you have any questions, contact our office at</p>
          <a href={`tel:${phone}`} className="inline-flex items-center gap-2 text-luxury-dark font-regular transition-colors">
            <div className='bg-luxury-pink  w-10 h-10 rounded-full flex items-center justify-center'><Phone size={18} /></div>
            <span>{phone || '+ 1 (346) 565-3599'}</span>
          </a>
        </div>
      </AnimateIn>
    </div>
  )
}