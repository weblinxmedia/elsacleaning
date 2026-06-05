'use client'

import { useState, useEffect } from 'react'
import { Save, Loader2, ImagePlus, Shield, Phone, Clock, MapPin, Tag, Share2, Layout } from 'lucide-react'

// The exact keys your database and frontend expect
const SETTINGS_KEYS = [
  'site_name', 'logo_url', 'phone', 'email', 'office_hours', 'address',
  'meta_title', 'meta_description', 'meta_keywords',
  'social_facebook', 'social_instagram', 'social_linkedin',
  'hero_heading', 'hero_image_url'
]

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isUploadingHero, setIsUploadingHero] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings')
        if (res.ok) {
          const data = await res.json()
          setSettings(data)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchSettings()
  }, [])

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setIsUploading(true)
    setFeedback(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload-logo', { method: 'POST', body: formData })
      const data = await res.json()
      if (res.ok && data.url) {
        setSettings((prev) => ({ ...prev, logo_url: data.url }))
        setFeedback({ type: 'success', message: '✅ Logo uploaded! Click "Save All Changes" to apply.' })
      } else {
        setFeedback({ type: 'error', message: data.error || '❌ Failed to upload logo.' })
      }
    } catch (err) {
      setFeedback({ type: 'error', message: '❌ Network error during upload.' })
    } finally {
      setIsUploading(false)
      setTimeout(() => setFeedback(null), 4000)
    }
  }

  const handleHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setIsUploadingHero(true)
    setFeedback(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload-hero-bg', { method: 'POST', body: formData })
      const data = await res.json()
      if (res.ok && data.url) {
        setSettings((prev) => ({ ...prev, hero_image_url: data.url }))
        setFeedback({ type: 'success', message: '✅ Hero background uploaded! Click "Save All Changes" to apply.' })
      } else {
        setFeedback({ type: 'error', message: data.error || '❌ Failed to upload.' })
      }
    } catch (err) {
      setFeedback({ type: 'error', message: '❌ Network error during upload.' })
    } finally {
      setIsUploadingHero(false)
      setTimeout(() => setFeedback(null), 4000)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setFeedback(null)

    try {
      // 1. Build a perfectly clean object with ONLY the allowed keys
      const cleanSettings: Record<string, string> = {}
      SETTINGS_KEYS.forEach(key => {
        if (settings[key] !== undefined) {
          cleanSettings[key] = settings[key]
        }
      })

      // 2. Save site settings
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanSettings),
      })

      if (!res.ok) throw new Error('Failed to save settings')

      // 3. Check if Account Security needs updating
      if (settings._currentPassword && (settings._newEmail || settings._newPassword)) {
        const accRes = await fetch('/api/auth/update-account', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            currentPassword: settings._currentPassword,
            newEmail: settings._newEmail || undefined,
            newPassword: settings._newPassword || undefined,
          }),
        })

        const accData = await accRes.json()
        if (!accRes.ok) {
          setFeedback({ type: 'error', message: accData.error || 'Settings saved, but account update failed.' })
          return
        }
      }

      // 4. 🔥 BUST THE FRONTEND CACHE 🔥
      // This forces the public site to fetch the fresh data immediately!
      if (typeof window !== 'undefined') {
        localStorage.removeItem('site_settings')
      }

      setFeedback({ type: 'success', message: '✅ All changes saved successfully! Refresh your public site to see updates.' })
    } catch (err) {
      setFeedback({ type: 'error', message: '❌ Network error. Please try again.' })
    } finally {
      setIsSaving(false)
      setTimeout(() => setFeedback(null), 5000)
    }
  }

  // Premium UI Classes
  const cardClass = "bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
  const inputClass = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxury-pink focus:border-transparent transition-all text-sm font-outfit text-gray-800"
  const textareaClass = `${inputClass} resize-none`
  const labelClass = "text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block font-outfit"

  const UploadZone = ({ currentUrl, onUpload, isUploading, label }: { currentUrl?: string, onUpload: (e: any) => void, isUploading: boolean, label: string }) => (
    <div className="mt-1 flex justify-center px-6 pt-6 pb-6 border-2 border-gray-200 border-dashed rounded-xl hover:border-luxury-pink transition-colors bg-gray-50 cursor-pointer">
      <div className="space-y-2 text-center">
        {currentUrl ? (
          <img src={currentUrl} alt={label} className="mx-auto h-24 w-auto object-contain rounded-lg shadow-sm mb-3" />
        ) : (
          <ImagePlus className="mx-auto h-10 w-10 text-gray-300" />
        )}
        <label className="relative cursor-pointer bg-white rounded-md font-medium text-luxury-pink hover:text-luxury-dark transition-colors">
          <span>{isUploading ? 'Uploading...' : currentUrl ? 'Replace Image' : 'Upload Image'}</span>
          <input type="file" accept="image/*" onChange={onUpload} className="sr-only" disabled={isUploading} />
        </label>
      </div>
    </div>
  )

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-luxury-pink animate-spin" />
      </div>
    )
  }

  return (
    <div className="w-full max-w-5xl mx-auto pb-20">
      
      {/* 🔹 Premium Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-parkinsans font-bold text-luxury-dark tracking-tight">Site Settings</h1>
          <p className="text-gray-500 mt-2 font-outfit text-base">Manage your website's global content, SEO, and security.</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className={`flex items-center gap-2 px-8 py-3.5 text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-sm ${isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-luxury-dark hover:bg-luxury-pink hover:shadow-md'}`}
        >
          <Save size={16} />
          {isSaving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div className={`mb-8 p-4 rounded-xl text-sm font-medium font-outfit transition-all ${feedback.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
          {feedback.message}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">

        {/* 🔹 Card 1: Branding & Logo */}
        <div className={cardClass}>
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
            <Layout size={20} className="text-luxury-pink" />
            <h2 className="text-2xl font-parkinsans font-bold text-luxury-dark">Branding & Logo</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className={labelClass}>Website Name</label>
              <input type="text" value={settings.site_name || ''} onChange={(e) => handleChange('site_name', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Logo Image</label>
              <UploadZone currentUrl={settings.logo_url} onUpload={handleLogoUpload} isUploading={isUploading} label="Logo" />
            </div>
          </div>
        </div>

        {/* 🔹 Card 2: Contact & Hours */}
        <div className={cardClass}>
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
            <Phone size={20} className="text-luxury-pink" />
            <h2 className="text-2xl font-parkinsans font-bold text-luxury-dark">Contact & Office Hours</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Phone Number</label>
              <input type="text" value={settings.phone || ''} onChange={(e) => handleChange('phone', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Email Address</label>
              <input type="email" value={settings.email || ''} onChange={(e) => handleChange('email', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}><Clock size={12} className="inline mr-1" />Office Hours</label>
              <input type="text" value={settings.office_hours || ''} onChange={(e) => handleChange('office_hours', e.target.value)} className={inputClass} placeholder="e.g. Monday to Friday, 9:00 AM to 5:00 PM" />
            </div>
            <div>
              <label className={labelClass}><MapPin size={12} className="inline mr-1" />Physical Address</label>
              <input type="text" value={settings.address || ''} onChange={(e) => handleChange('address', e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>

        {/* 🔹 Card 3: SEO Metadata */}
        <div className={cardClass}>
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
            <Tag size={20} className="text-luxury-pink" />
            <h2 className="text-2xl font-parkinsans font-bold text-luxury-dark">SEO & Meta Tags</h2>
          </div>
          <div className="space-y-6">
            <div>
              <label className={labelClass}>Meta Title</label>
              <input type="text" value={settings.meta_title || ''} onChange={(e) => handleChange('meta_title', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Meta Description</label>
              <textarea rows={3} value={settings.meta_description || ''} onChange={(e) => handleChange('meta_description', e.target.value)} className={textareaClass} />
            </div>
            <div>
              <label className={labelClass}>Meta Keywords</label>
              <input type="text" value={settings.meta_keywords || ''} onChange={(e) => handleChange('meta_keywords', e.target.value)} className={inputClass} placeholder="cleaning, commercial, office..." />
            </div>
          </div>
        </div>

        {/* 🔹 Card 4: Social Media Links */}
        <div className={cardClass}>
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
            <Share2 size={20} className="text-luxury-pink" />
            <h2 className="text-2xl font-parkinsans font-bold text-luxury-dark">Social Media Links</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelClass}>Facebook URL</label>
              <input type="url" value={settings.social_facebook || ''} onChange={(e) => handleChange('social_facebook', e.target.value)} className={inputClass} placeholder="https://facebook.com/..." />
            </div>
            <div>
              <label className={labelClass}>Instagram URL</label>
              <input type="url" value={settings.social_instagram || ''} onChange={(e) => handleChange('social_instagram', e.target.value)} className={inputClass} placeholder="https://instagram.com/..." />
            </div>
            <div>
              <label className={labelClass}>LinkedIn URL</label>
              <input type="url" value={settings.social_linkedin || ''} onChange={(e) => handleChange('social_linkedin', e.target.value)} className={inputClass} placeholder="https://linkedin.com/..." />
            </div>
          </div>
        </div>

        {/* 🔹 Card 5: Hero Section */}
        <div className={cardClass}>
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
            <Layout size={20} className="text-luxury-pink" />
            <h2 className="text-2xl font-parkinsans font-bold text-luxury-dark">Hero Section</h2>
          </div>
          <div className="space-y-6">
            <div>
              <label className={labelClass}>Main Heading (H1)</label>
              <input type="text" value={settings.hero_heading || ''} onChange={(e) => handleChange('hero_heading', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Background Image</label>
              <UploadZone currentUrl={settings.hero_image_url} onUpload={handleHeroUpload} isUploading={isUploadingHero} label="Hero Background" />
            </div>
          </div>
        </div>

        {/* 🔹 Card 6: Account Security (Untouched) */}
        <div className={`${cardClass} border-red-100`}>
          <div className="flex items-center gap-3 border-b border-red-50 pb-4 mb-6">
            <Shield size={20} className="text-red-400" />
            <h2 className="text-2xl font-parkinsans font-bold text-luxury-dark">Account Security</h2>
          </div>
          <div className="space-y-6">
            <div>
              <label className={labelClass}>Change Email Address</label>
              <input type="email" placeholder="Enter new email (leave blank to keep current)" onChange={(e) => setSettings((prev) => ({ ...prev, _newEmail: e.target.value }))} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Change Password</label>
              <input type="password" placeholder="New password (min 8 chars, leave blank to keep current)" onChange={(e) => setSettings((prev) => ({ ...prev, _newPassword: e.target.value }))} className={inputClass} />
            </div>
            <div className="pt-4 border-t border-gray-100">
              <label className={`${labelClass} text-red-400`}>Confirm Current Password to Save Changes</label>
              <input type="password" placeholder="Enter current password" onChange={(e) => setSettings((prev) => ({ ...prev, _currentPassword: e.target.value }))} className={`${inputClass} focus:ring-red-300 border-red-100`} required />
            </div>
          </div>
        </div>

      </form>
    </div>
  )
}