'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { PlusCircle, Pencil, Trash2, Eye, EyeOff, Loader2, Package } from 'lucide-react'

interface Service {
  id: string
  label: string
  value: string
  is_active: boolean
}

export default function ServicesManager() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [newLabel, setNewLabel] = useState('')
  const [newValue, setNewValue] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/admin/services')
      if (res.ok) {
        const data = await res.json()
        setServices(data)
      }
    } catch (err) {
      console.error('Failed to fetch services:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newLabel || !newValue) return
    setIsAdding(true)
    setFeedback(null)

    try {
      const res = await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label: newLabel, value: newValue }),
      })

      if (res.ok) {
        setNewLabel('')
        setNewValue('')
        setFeedback({ type: 'success', message: '✅ Service added successfully!' })
        fetchServices()
      } else {
        const data = await res.json()
        setFeedback({ type: 'error', message: data.error || '❌ Failed to add service.' })
      }
    } catch (err) {
      setFeedback({ type: 'error', message: '❌ Network error.' })
    } finally {
      setIsAdding(false)
      setTimeout(() => setFeedback(null), 3000)
    }
  }

  const toggleActive = async (service: Service) => {
    try {
      const res = await fetch(`/api/admin/services/${service.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !service.is_active }),
      })
      if (res.ok) fetchServices()
    } catch (err) {
      console.error('Failed to toggle status:', err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service? This will also delete its page content.')) return
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: 'DELETE' })
      if (res.ok) fetchServices()
    } catch (err) {
      console.error('Failed to delete service:', err)
    }
  }

  // Premium UI Classes
  const inputClass = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxury-pink focus:border-transparent transition-all text-sm font-outfit text-gray-800"

  return (
    <div className="w-full max-w-5xl mx-auto">
      
      {/* 🔹 Premium Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-parkinsans font-bold text-luxury-dark tracking-tight">Services Manager</h1>
        <p className="text-gray-500 mt-2 font-outfit text-base">Add, edit, and manage your cleaning services catalog.</p>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div className={`mb-8 p-4 rounded-xl text-sm font-medium font-outfit transition-all ${feedback.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
          {feedback.message}
        </div>
      )}

      {/* 🔹 Add New Service Card */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 mb-10">
        <h2 className="text-2xl font-parkinsans font-bold text-luxury-dark border-b border-gray-100 pb-4 mb-6">Add New Service</h2>
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block font-outfit">Display Name</label>
            <input 
              type="text" 
              placeholder="e.g. Office Cleaning" 
              value={newLabel} 
              onChange={(e) => setNewLabel(e.target.value)} 
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block font-outfit">URL Slug</label>
            <input 
              type="text" 
              placeholder="e.g. office-cleaning" 
              value={newValue} 
              onChange={(e) => setNewValue(e.target.value)} 
              className={inputClass}
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={isAdding}
            className={`flex items-center justify-center gap-2 px-6 py-3.5 text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-sm ${isAdding ? 'bg-gray-400 cursor-not-allowed' : 'bg-luxury-dark hover:bg-luxury-pink hover:shadow-md'}`}
          >
            <PlusCircle size={18} />
            {isAdding ? 'Adding...' : 'Add Service'}
          </button>
        </form>
      </div>

      {/* 🔹 Services List Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="px-6 md:px-8 py-5 text-xs font-semibold text-gray-500 uppercase tracking-wider font-outfit">Service Name</th>
                <th className="px-6 md:px-8 py-5 text-xs font-semibold text-gray-500 uppercase tracking-wider font-outfit">URL Slug</th>
                <th className="px-6 md:px-8 py-5 text-xs font-semibold text-gray-500 uppercase tracking-wider font-outfit">Status</th>
                <th className="px-6 md:px-8 py-5 text-xs font-semibold text-gray-500 uppercase tracking-wider font-outfit text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-16">
                    <Loader2 className="w-8 h-8 text-luxury-pink mx-auto animate-spin" />
                  </td>
                </tr>
              ) : services.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-16 text-gray-400 font-outfit">
                    <div className="flex flex-col items-center gap-2">
                      <Package size={32} className="text-gray-200 mb-2" />
                      <p className="font-semibold text-gray-500">No services yet</p>
                      <p className="text-sm">Add your first service above.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                services.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50/50 transition-colors duration-150 group">
                    <td className="px-6 md:px-8 py-5">
                      <span className="font-semibold text-luxury-dark font-outfit text-sm">{service.label}</span>
                    </td>
                    <td className="px-6 md:px-8 py-5">
                      <span className="text-sm text-gray-500 font-outfit bg-gray-100 px-3 py-1 rounded-lg">
                        {service.value}
                      </span>
                    </td>
                    <td className="px-6 md:px-8 py-5">
                      <button 
                        onClick={() => toggleActive(service)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-colors duration-200 ${service.is_active ? 'bg-green-50 text-green-600 border-green-100 hover:bg-green-100' : 'bg-red-50 text-red-500 border-red-100 hover:bg-red-100'}`}
                      >
                        {service.is_active ? <Eye size={12} /> : <EyeOff size={12} />}
                        {service.is_active ? 'Active' : 'Hidden'}
                      </button>
                    </td>
                    <td className="px-6 md:px-8 py-5">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Link 
                          href={`/admin/services/${service.id}`} 
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-luxury-dark hover:text-luxury-pink bg-gray-100 hover:bg-pink-50 rounded-lg transition-colors duration-200"
                        >
                          <Pencil size={12} /> Edit Page
                        </Link>
                        <button 
                          onClick={() => handleDelete(service.id)} 
                          className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors duration-200"
                          title="Delete Service"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}