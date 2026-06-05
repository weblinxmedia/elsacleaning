'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import FormInput from './FormInput'
import FormSelect from './FormSelect'


// Schema matches the API exactly
const heroSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(1, 'Phone number is required'),
  service: z.string().min(1, 'Please select a service'),
  address: z.string().min(1, 'Address is required'),
})

type HeroFormData = z.infer<typeof heroSchema>

export default function HeroForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [serviceOptions, setServiceOptions] = useState<{ label: string; value: string }[]>([]) 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HeroFormData>({
    resolver: zodResolver(heroSchema),
  })

   useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services')
        if (res.ok) {
          const data = await res.json()
          setServiceOptions(data)
        }
      } catch (err) {
        console.error('Failed to load services:', err)
      }
    }
    fetchServices()
  }, [])
  const onSubmit = async (data: HeroFormData) => {
    setIsSubmitting(true)
    setApiError(null)

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: 'hero' }), // Hardcoding source for this form
      })

      const result = await res.json()

      if (res.ok && result.success) {
        setIsSubmitted(true)
      } else {
        setApiError(result.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setApiError('Network error. Please check your connection.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // 🎉 SUCCESS STATE
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

  // 📝 FORM STATE
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[80%] mx-auto md:w-full mt-8">
      <fieldset disabled={isSubmitting} className="space-y-0">
        {/* Row 1: Name, Email, Phone */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <FormInput placeholder="Full Name" {...register('name')} error={errors.name?.message} />
          <FormInput type="email" placeholder="Email Address" {...register('email')} error={errors.email?.message} />
          <FormInput type="tel" placeholder="Phone Number" {...register('phone')} error={errors.phone?.message} />
        </div>

        {/* Row 2: Service, Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <FormSelect options={serviceOptions} {...register('service')} error={errors.service?.message} />
          <FormInput placeholder="Enter Address" {...register('address')} error={errors.address?.message} />
        </div>
      </fieldset>

      {/* Show API Errors cleanly */}
      {apiError && (
        <div className="mb-4 text-center text-red-600 text-sm font-medium bg-red-50 py-2 rounded-md">
          {apiError}
        </div>
      )}
  {/* className=" w-[fit-content]      text-white bg-luxury-pink    transition-all duration-300 hover:shadow-lg transform hover:scale-[1.0]" */}

      {/* Submit Button */}
      <div className='flex w-full items-center justify-center'>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-fit font-parkinsans nav-font px-7.5 mx-auto bg-luxury-pink py-3.5 text-sm text-luxury-lite font-medium tracking-normal rounded-full cursor-pointer transition-all duration-300 transform hover:scale-[1] ${
          isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-luxury-dark hover:bg-luxury-pink hover:shadow-lg'
        }`}
      >
        {isSubmitting ? 'Sending...' : 'I Would Like A Quote'}
      </button></div>
    </form>
  )
}