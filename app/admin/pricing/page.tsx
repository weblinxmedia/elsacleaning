'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Loader2, ImagePlus } from 'lucide-react'

export default function PricingManager() {
  const [packages, setPackages] = useState<any[]>([])
  const [addons, setAddons] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    try {
      const res = await fetch('/api/pricing')
      if (res.ok) {
        const data = await res.json()
        setPackages(data.packages)
        setAddons(data.addons)
      }
    } catch (e) { console.error(e) } 
    finally { setLoading(false) }
  }

  const handleDelete = async (type: string, id: string) => {
    if (!confirm('Delete this item?')) return
    await fetch(`/api/admin/${type}/${id}`, { method: 'DELETE' })
    fetchData()
  }

  const addPackage = async () => {
    await fetch('/api/admin/pricing-packages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'New Package', price: '0', old_price: '', description: '', features: [], icon_url: '' })
    })
    fetchData()
  }

  const updatePackage = async (pkg: any) => {
    await fetch(`/api/admin/pricing-packages/${pkg.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pkg)
    })
  }

  const addAddon = async () => {
    await fetch('/api/admin/pricing-addons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'New Add-on', price: '$0', description: '', image_url: '' })
    })
    fetchData()
  }

  const updateAddon = async (addon: any) => {
    await fetch(`/api/admin/pricing-addons/${addon.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addon)
    })
  }

  const uploadImage = async (e: any, type: string, item: any, field: string) => {
    const file = e.target.files?.[0]
    if (!file) return
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch('/api/upload-team-photo', { method: 'POST', body: formData })
    const data = await res.json()
    if (data.url) {
      const updated = { ...item, [field]: data.url }
      if (type === 'packages') updatePackage(updated)
      else updateAddon(updated)
      fetchData()
    }
  }

  const inputClass = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxury-pink text-sm font-outfit"

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-luxury-pink animate-spin" /></div>

  return (
    <div className="w-full max-w-6xl mx-auto pb-20">
      <div className="mb-10">
        <h1 className="text-4xl font-parkinsans font-bold text-luxury-dark">Pricing Manager</h1>
        <p className="text-gray-500 mt-2 font-outfit">Manage your packages and add-on services.</p>
      </div>

      {/* PACKAGES SECTION */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-parkinsans font-bold text-luxury-dark">Packages</h2>
          <button onClick={addPackage} className="flex items-center gap-2 px-4 py-2 bg-luxury-dark text-white text-sm font-semibold rounded-xl hover:bg-luxury-pink transition-colors"><Plus size={16}/> Add Package</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <div key={pkg.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <input type="text" value={pkg.title} onChange={(e) => { const u = [...packages]; u[i] = {...u[i], title: e.target.value}; setPackages(u); updatePackage(u[i]) }} className={`${inputClass} border-none bg-transparent font-bold text-lg p-0`} />
                <button onClick={() => handleDelete('pricing-packages', pkg.id)} className="text-gray-300 hover:text-red-500"><Trash2 size={16}/></button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400 font-outfit uppercase">Price ($)</label>
                  <input type="text" value={pkg.price} onChange={(e) => { const u = [...packages]; u[i] = {...u[i], price: e.target.value}; setPackages(u); updatePackage(u[i]) }} className={inputClass} />
                </div>
                <div>
                  <label className="text-xs text-gray-400 font-outfit uppercase">Old Price (Sale)</label>
                  <input type="text" value={pkg.old_price || ''} onChange={(e) => { const u = [...packages]; u[i] = {...u[i], old_price: e.target.value}; setPackages(u); updatePackage(u[i]) }} className={inputClass} />
                </div>
              </div>
              <textarea rows={2} value={pkg.description} onChange={(e) => { const u = [...packages]; u[i] = {...u[i], description: e.target.value}; setPackages(u); updatePackage(u[i]) }} className={`${inputClass} resize-none`} placeholder="Description" />
              <div>
                <label className="text-xs text-gray-400 font-outfit uppercase mb-1 block">Icon</label>
                <label className="cursor-pointer text-xs text-luxury-pink font-semibold hover:text-luxury-dark">
                  {pkg.icon_url ? '✅ Change Icon' : 'Upload Icon'}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => uploadImage(e, 'packages', pkg, 'icon_url')} />
                </label>
              </div>
              <div>
                <label className="text-xs text-gray-400 font-outfit uppercase mb-1 block">Features (one per line)</label>
                <textarea rows={4} value={(pkg.features || []).join('\n')} onChange={(e) => { const u = [...packages]; u[i] = {...u[i], features: e.target.value.split('\n')}; setPackages(u); updatePackage(u[i]) }} className={`${inputClass} resize-none`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADD-ONS SECTION */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-parkinsans font-bold text-luxury-dark">Add-On Services</h2>
          <button onClick={addAddon} className="flex items-center gap-2 px-4 py-2 bg-luxury-dark text-white text-sm font-semibold rounded-xl hover:bg-luxury-pink transition-colors"><Plus size={16}/> Add Add-on</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {addons.map((addon, i) => (
            <div key={addon.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <input type="text" value={addon.title} onChange={(e) => { const u = [...addons]; u[i] = {...u[i], title: e.target.value}; setAddons(u); updateAddon(u[i]) }} className={`${inputClass} border-none bg-transparent font-bold p-0`} />
                <button onClick={() => handleDelete('pricing-addons', addon.id)} className="text-gray-300 hover:text-red-500"><Trash2 size={16}/></button>
              </div>
              <input type="text" value={addon.price} onChange={(e) => { const u = [...addons]; u[i] = {...u[i], price: e.target.value}; setAddons(u); updateAddon(u[i]) }} className={inputClass} placeholder="Price (e.g. $50)" />
              <textarea rows={2} value={addon.description} onChange={(e) => { const u = [...addons]; u[i] = {...u[i], description: e.target.value}; setAddons(u); updateAddon(u[i]) }} className={`${inputClass} resize-none`} placeholder="Description" />
              <label className="cursor-pointer text-xs text-luxury-pink font-semibold hover:text-luxury-dark flex items-center gap-1">
                <ImagePlus size={14} /> {addon.image_url ? 'Change Image' : 'Upload Image'}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => uploadImage(e, 'addons', addon, 'image_url')} />
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}