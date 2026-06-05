'use client'

import { useState } from 'react'

interface Service {
  label: string
  value: string
}

export default function ContactForm({ services }: { services: Service[] }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', address: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'contact_page' }),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setIsSubmitted(true)
      } else {
        setError(data.error || 'Something went wrong.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
     <div className="bg-white p-8 md:p-12 rounded-4xl flex flex-col items-center justify-center text-center">
        <div className="text-5xl mb-4 w-full flex items-center justify-center"><img src="/images/tick.svg" width={'90'} alt="" /></div>
        <h3 className="text-2xl font-parkinsans font-bold text-luxury-dark mb-2">Thank You!</h3>
        <p className="text-gray-600 font-parkinsans w-full md:w-[80%]">Your booking request has been received. We’ll reach out to you shortly.</p>
        <p className="text-sm text-gray-500 font-parkinsans mt-3">Typical response time: Under 24 hours</p>
      </div>
    )
  }

  const inputClass = "w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxury-pink focus:border-transparent transition-all text-sm font-outfit text-gray-800"

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Row 1: Name, Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block font-outfit">Your Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass} placeholder="John Doe" required />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block font-outfit">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="john@example.com" required />
        </div>
      </div>

      {/* Row 2: Phone, Service */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block font-outfit">Phone Number</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="(123) 456-7890" required />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block font-outfit">Select Service</label>
          <select name="service" value={formData.service} onChange={handleChange} className={inputClass} required>
            <option value="">Choose a service...</option>
            {services.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 3: Address (Full Width) */}
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block font-outfit">Your Address</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} className={inputClass} placeholder="123 Main St, Orlando, FL" required />
      </div>

      {/* Row 4: Additional Info (Full Width) */}
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block font-outfit">Additional Information</label>
        <textarea 
          name="message" 
          rows={4} 
          value={formData.message} 
          onChange={handleChange} 
          className={`${inputClass} resize-none`} 
          placeholder="Tell us more about your needs..."
        ></textarea>
      </div>

      {error && <p className="text-red-500 text-sm font-outfit">{error}</p>}

      {/* Submit Button */}
      <button 
        type="submit" 
        disabled={isSubmitting}
         className="font-parkinsans w-full px-7 py-4.5 rounded-full bg-luxury-pink cursor-pointer text-luxury-lite font-semibold capitalize tracking-normal transition-all duration-300 hover:shadow-lg transform hover:scale-[1.0]"
 >
        {isSubmitting ? 'Sending...' : 'Submit Request'}
      </button>
    </form>
  )
}