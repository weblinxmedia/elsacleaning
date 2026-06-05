'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, MapPin, Loader2 } from 'lucide-react'

interface Area {
  id: string
  name: string
  slug: string
  address: string
}

export default function AreasPage() {
  const [areas, setAreas] = useState<Area[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [newName, setNewName] = useState('')
  const [newSlug, setNewSlug] = useState('')
  const [newAddress, setNewAddress] = useState('')
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  useEffect(() => { fetchAreas() }, [])

  const fetchAreas = async () => {
    try {
      const res = await fetch('/api/admin/areas')
      if (res.ok) setAreas(await res.json())
    } catch (err) { console.error(err) } 
    finally { setLoading(false) }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName || !newSlug) return
    setIsAdding(true)
    setFeedback(null)

    try {
      const res = await fetch('/api/admin/areas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, slug: newSlug, address: newAddress })
      })
      const data = await res.json()
      
      if (res.ok) {
        setFeedback({ type: 'success', message: `✅ "${newName}" added successfully!` })
        setNewName(''); setNewSlug(''); setNewAddress('')
        fetchAreas()
      } else {
        setFeedback({ type: 'error', message: `❌ ${data.error || 'Failed to add area.'}` })
      }
    } catch (err) {
      setFeedback({ type: 'error', message: '❌ Network error.' })
    } finally {
      setIsAdding(false)
      setTimeout(() => setFeedback(null), 3000)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return
    try {
      const res = await fetch(`/api/admin/areas/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setAreas(areas.filter(a => a.id !== id))
        setFeedback({ type: 'success', message: `✅ "${name}" deleted.` })
        setTimeout(() => setFeedback(null), 3000)
      }
    } catch (err) { console.error(err) }
  }

  // Auto-generate slug from name
  const handleNameChange = (value: string) => {
    setNewName(value)
    setNewSlug(value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
  }

  const inputClass = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxury-pink focus:border-transparent transition-all text-sm font-outfit text-gray-800"
  const labelClass = "text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block font-outfit"

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-luxury-pink animate-spin" />
      </div>
    )
  }

  return (
    <div className="w-full max-w-5xl mx-auto pb-20">
      <div className="mb-10">
        <h1 className="text-4xl font-parkinsans font-bold text-luxury-dark tracking-tight">Manage Areas</h1>
        <p className="text-gray-500 mt-2 font-outfit text-base">Add service areas. They will automatically appear in your website header.</p>
      </div>

      {feedback && (
        <div className={`mb-8 p-4 rounded-xl text-sm font-medium font-outfit ${feedback.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
          {feedback.message}
        </div>
      )}

      {/* Add New Area Form */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm mb-8">
        <h2 className="text-xl font-parkinsans font-bold text-luxury-dark mb-6 flex items-center gap-2">
          <Plus size={20} className="text-luxury-pink" /> Add New Area
        </h2>
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className={labelClass}>Area Name</label>
            <input type="text" value={newName} onChange={(e) => handleNameChange(e.target.value)} className={inputClass} placeholder="e.g. Orlando" required />
          </div>
          <div>
            <label className={labelClass}>URL Slug</label>
            <input type="text" value={newSlug} onChange={(e) => setNewSlug(e.target.value)} className={inputClass} placeholder="e.g. orlando" required />
          </div>
          <div>
            <label className={labelClass}>Address / Subtitle</label>
            <div className="flex gap-3">
              <input type="text" value={newAddress} onChange={(e) => setNewAddress(e.target.value)} className={inputClass} placeholder="e.g. Orlando, FL" />
              <button type="submit" disabled={isAdding} className={`px-6 py-3 text-white text-sm font-semibold rounded-xl flex-shrink-0 transition-colors ${isAdding ? 'bg-gray-400' : 'bg-luxury-dark hover:bg-luxury-pink'}`}>
                {isAdding ? '...' : 'Add'}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Existing Areas List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-8 py-5 border-b border-gray-100 bg-gray-50/50">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider font-outfit">Current Areas ({areas.length})</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {areas.length === 0 ? (
            <div className="text-center py-16 text-gray-400 font-outfit">No areas added yet.</div>
          ) : (
            areas.map((area) => (
              <div key={area.id} className="flex items-center justify-between px-8 py-5 hover:bg-gray-50/50 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-pink-50 rounded-lg text-luxury-pink"><MapPin size={18} /></div>
                  <div>
                    <p className="font-semibold text-luxury-dark font-outfit text-sm">{area.name}</p>
                    <p className="text-xs text-gray-400 font-outfit">/areas/{area.slug} {area.address ? `• ${area.address}` : ''}</p>
                  </div>
                </div>
                <button onClick={() => handleDelete(area.id, area.name)} className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}