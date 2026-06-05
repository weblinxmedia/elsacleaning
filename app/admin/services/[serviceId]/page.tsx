'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Save, Plus, Trash2, ImagePlus, Loader2, ChevronDown } from 'lucide-react'

// 🔥 FIX 1: SectionCard moved OUTSIDE the component so it doesn't get recreated on every keystroke
function SectionCard({ id, title, children, openSections, toggleSection }: { 
  id: string, 
  title: string, 
  children: React.ReactNode,
  openSections: string[],
  toggleSection: (id: string) => void
}) {
  const isOpen = openSections.includes(id)
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <button 
        type="button"
        onClick={() => toggleSection(id)}
        className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
      >
        <h2 className="text-xl md:text-2xl font-parkinsans font-bold text-luxury-dark">{title}</h2>
        <ChevronDown className={`w-6 h-6 text-gray-400 group-hover:text-luxury-pink transition-all duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
      </button>
      
      {/* 🔥 FIX 2: Use CSS to hide instead of destroying the DOM. Inputs stay alive! */}
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[10000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-6 md:px-8 pb-8 pt-2 border-t border-gray-100">
          {children}
        </div>
      </div>
    </div>
  )
}

export default function ServicePageEditor() {
  const { serviceId } = useParams()
  const router = useRouter()
  const [content, setContent] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  
  const [openSections, setOpenSections] = useState<string[]>([])

  const toggleSection = (id: string) => {
    setOpenSections(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(`/api/admin/service-content/${serviceId}`)
        if (res.ok) setContent(await res.json())
      } catch (err) { console.error(err) } 
      finally { setLoading(false) }
    }
    fetchContent()
  }, [serviceId])

  const handleChange = (key: string, value: any) => {
    setContent(prev => ({ ...prev, [key]: value }))
  }

  const handleArrayChange = (key: string, index: number, field: string, value: string) => {
    const updatedArray = [...(content[key] || [])]
    updatedArray[index][field] = value
    handleChange(key, updatedArray)
  }

  const addArrayItem = (key: string, template: object) => {
    const updatedArray = [...(content[key] || []), template]
    handleChange(key, updatedArray)
  }

  const removeArrayItem = (key: string, index: number) => {
    const updatedArray = (content[key] || []).filter((_: any, i: number) => i !== index)
    handleChange(key, updatedArray)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: string, index?: number, field?: string) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload-team-photo', { method: 'POST', body: formData })
      const data = await res.json()
      if (res.ok && data.url) {
        if (index !== undefined && field) {
          handleArrayChange(key, index, field, data.url)
        } else {
          handleChange(key, data.url)
        }
      }
    } catch (err) { console.error(err) }
  }

  const handleSave = async () => {
    setSaving(true)
    setFeedback(null)
    try {
      const res = await fetch(`/api/admin/service-content/${serviceId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      })
      const data = await res.json() // Read the response
      if (res.ok) {
        setFeedback({ type: 'success', message: '✅ All changes saved successfully!' })
      } else {
        // Show the ACTUAL error from the API
        setFeedback({ type: 'error', message: `❌ ${data.error || 'Failed to save changes.'}` })
      }
    } catch (err) { 
      setFeedback({ type: 'error', message: '❌ Network error.' }) 
    } finally { 
      setSaving(false) 
      setTimeout(() => setFeedback(null), 4000) 
    }
  }

  const inputClass = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxury-pink focus:border-transparent transition-all text-sm font-outfit text-gray-800"
  const textareaClass = `${inputClass} resize-none`
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
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
        <div>
          <button onClick={() => router.back()} className="text-sm text-gray-400 hover:text-luxury-pink mb-3 flex items-center gap-2 transition-colors group font-outfit">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Services
          </button>
          <h1 className="text-4xl font-parkinsans font-bold text-luxury-dark tracking-tight">Edit Service Page</h1>
        </div>
        <button 
          onClick={handleSave} 
          disabled={saving} 
          className={`flex items-center gap-2 px-8 py-3.5 text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-sm ${saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-luxury-dark hover:bg-luxury-pink hover:shadow-md'}`}
        >
          <Save size={16} />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {feedback && (
        <div className={`mb-8 p-4 rounded-xl text-sm font-medium font-outfit transition-all ${feedback.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
          {feedback.message}
        </div>
      )}

      <div className="space-y-6">
        
        {/* 🔹 HERO SECTION */}
        <SectionCard id="hero" title="Hero Section" openSections={openSections} toggleSection={toggleSection}>
          <div className="space-y-6">
            <div>
              <label className={labelClass}>Heading</label>
              <input type="text" value={content.hero_heading || ''} onChange={(e) => handleChange('hero_heading', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Paragraph</label>
              <textarea rows={4} value={content.hero_paragraph || ''} onChange={(e) => handleChange('hero_paragraph', e.target.value)} className={textareaClass} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((num) => (
                <div key={num}>
                  <label className={labelClass}>Image {num}</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-xl hover:border-luxury-pink transition-colors bg-gray-50">
                    <div className="space-y-2 text-center">
                      {content[`hero_image_${num}_url`] ? (
                        <img src={content[`hero_image_${num}_url`]} alt={`Hero ${num}`} className="mx-auto h-32 w-full object-cover rounded-lg shadow-sm mb-3" />
                      ) : (
                        <ImagePlus className="mx-auto h-10 w-10 text-gray-300" />
                      )}
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-luxury-pink hover:text-luxury-dark">
                        <span>Upload file</span>
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, `hero_image_${num}_url`)} className="sr-only" />
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        {/* 🔹 HOW IT WORKS SECTION */}
        <SectionCard id="howItWorks" title="How It Works" openSections={openSections} toggleSection={toggleSection}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className={labelClass}>Subtitle</label>
              <input type="text" value={content.how_it_works_subtitle || ''} onChange={(e) => handleChange('how_it_works_subtitle', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Heading</label>
              <input type="text" value={content.how_it_works_heading || ''} onChange={(e) => handleChange('how_it_works_heading', e.target.value)} className={inputClass} />
            </div>
          </div>
          <div className="space-y-4">
            {(content.how_it_works_steps || []).map((step: any, i: number) => (
              <div key={i} className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:border-luxury-pink/30 transition-colors duration-300 relative group">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold text-luxury-pink font-parkinsans">Step {i + 1}</span>
                  <button onClick={() => removeArrayItem('how_it_works_steps', i)} className="text-gray-300 hover:text-red-500 transition-colors p-1">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="space-y-4">
                  <input type="text" placeholder="Step Title" value={step.title || ''} onChange={(e) => handleArrayChange('how_it_works_steps', i, 'title', e.target.value)} className={inputClass} />
                  <textarea rows={2} placeholder="Step Description" value={step.description || ''} onChange={(e) => handleArrayChange('how_it_works_steps', i, 'description', e.target.value)} className={textareaClass} />
                  <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-500 hover:text-luxury-pink transition-colors font-outfit">
                    <ImagePlus size={16} /> Upload Icon
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'how_it_works_steps', i, 'image_url')} className="sr-only" />
                  </label>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => addArrayItem('how_it_works_steps', { image_url: '', title: '', description: '' })} className="mt-6 flex items-center gap-2 text-sm text-luxury-pink font-semibold hover:text-luxury-dark transition-colors font-outfit">
            <Plus size={16} /> Add Step
          </button>
        </SectionCard>

        {/* 🔹 FEATURES SECTION */}
        <SectionCard id="features" title="Features Checklist" openSections={openSections} toggleSection={toggleSection}>
          <div className="space-y-6 mb-6">
            <div>
              <label className={labelClass}>Heading</label>
              <input type="text" value={content.features_heading || ''} onChange={(e) => handleChange('features_heading', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Description</label>
              <textarea rows={3} value={content.features_description || ''} onChange={(e) => handleChange('features_description', e.target.value)} className={textareaClass} />
            </div>
          </div>
          <div className="space-y-3">
            {(content.features_list || []).map((feat: any, i: number) => (
              <div key={i} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100 group hover:border-luxury-pink/30 transition-colors">
                <input type="text" value={feat.text || ''} onChange={(e) => handleArrayChange('features_list', i, 'text', e.target.value)} className={`${inputClass} border-none bg-transparent focus:ring-0 p-0`} placeholder="Feature text..." />
                <button onClick={() => removeArrayItem('features_list', i)} className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
          <button onClick={() => addArrayItem('features_list', { text: '' })} className="mt-6 flex items-center gap-2 text-sm text-luxury-pink font-semibold hover:text-luxury-dark transition-colors font-outfit">
            <Plus size={16} /> Add Feature
          </button>
        </SectionCard>

        {/* 🔹 WHY CHOOSE US SECTION */}
        <SectionCard id="whyChooseUs" title="Why Choose Us (Stats & Cards)" openSections={openSections} toggleSection={toggleSection}>
          <div className="space-y-6">
            <div>
              <label className={labelClass}>Section Heading</label>
              <input type="text" value={content.why_choose_us_heading || ''} onChange={(e) => handleChange('why_choose_us_heading', e.target.value)} className={inputClass} />
            </div>
            
            <div className="pt-4 border-t border-gray-100 space-y-6">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Feature Cards (Up to 4)</label>
              {[0, 1, 2, 3].map((index) => {
                const card = (content.why_choose_us_cards && content.why_choose_us_cards[index]) || {}
                return (
                  <div key={index} className="p-5 bg-gray-50 rounded-xl border border-gray-200 space-y-4">
                    <p className="text-sm font-bold text-luxury-dark font-outfit">Card {index + 1}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-gray-500 mb-1 block">Title</label>
                        <input 
                          type="text" 
                          value={card.title || ''} 
                          onChange={(e) => {
                            const cards = [...(content.why_choose_us_cards || Array(4).fill({}))]
                            if (!cards[index]) cards[index] = { title: '', description: '', image_url: '' }
                            cards[index] = { ...cards[index], title: e.target.value }
                            handleChange('why_choose_us_cards', cards)
                          }}
                          className={inputClass}
                          placeholder={`Card ${index + 1} Title`}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 mb-1 block">Image</label>
                        <div className="flex items-center gap-3 mt-1">
                          {card.image_url && <img src={card.image_url} alt={`Card ${index+1}`} className="h-12 w-12 rounded-lg object-cover border" />}
                          <label className="px-4 py-2 text-xs font-semibold bg-luxury-dark text-white rounded-lg cursor-pointer hover:bg-luxury-pink transition-colors">
                            Upload
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={async (e) => {
                                const file = e.target.files?.[0]
                                if (!file) return
                                const formData = new FormData()
                                formData.append('file', file)
                                try {
                                  const res = await fetch('/api/upload-team-photo', { method: 'POST', body: formData })
                                  const data = await res.json()
                                  if (res.ok && data.url) {
                                    const cards = [...(content.why_choose_us_cards || Array(4).fill({}))]
                                    if (!cards[index]) cards[index] = { title: '', description: '', image_url: '' }
                                    cards[index] = { ...cards[index], image_url: data.url }
                                    handleChange('why_choose_us_cards', cards)
                                  }
                                } catch (err) { console.error(err) }
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1 block">Description</label>
                      <textarea 
                        rows={2}
                        value={card.description || ''} 
                        onChange={(e) => {
                          const cards = [...(content.why_choose_us_cards || Array(4).fill({}))]
                          if (!cards[index]) cards[index] = { title: '', description: '', image_url: '' }
                          cards[index] = { ...cards[index], description: e.target.value }
                          handleChange('why_choose_us_cards', cards)
                        }}
                        className={`${inputClass} resize-none`}
                        placeholder="Write a short paragraph..."
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </SectionCard>

        {/* 🔹 WHAT SETS US APART SECTION */}
        <SectionCard id="setsApart" title="What Sets Us Apart" openSections={openSections} toggleSection={toggleSection}>
          <div className="space-y-6 mb-6">
            <div>
              <label className={labelClass}>Heading</label>
              <input type="text" value={content.sets_apart_heading || ''} onChange={(e) => handleChange('sets_apart_heading', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Description</label>
              <textarea rows={3} value={content.sets_apart_description || ''} onChange={(e) => handleChange('sets_apart_description', e.target.value)} className={textareaClass} />
            </div>
            <div>
              <label className={labelClass}>Left Side Image</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-xl hover:border-luxury-pink transition-colors bg-gray-50">
                <div className="space-y-2 text-center">
                  {content.sets_apart_image_url ? (
                    <img src={content.sets_apart_image_url} alt="Apart" className="mx-auto h-32 w-full object-cover rounded-lg shadow-sm mb-3" />
                  ) : (
                    <ImagePlus className="mx-auto h-10 w-10 text-gray-300" />
                  )}
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-luxury-pink hover:text-luxury-dark">
                    <span>Upload file</span>
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'sets_apart_image_url')} className="sr-only" />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {(content.sets_apart_features || []).map((feat: any, i: number) => (
              <div key={i} className="bg-gray-50 p-5 rounded-xl border border-gray-100 hover:border-luxury-pink/30 transition-colors duration-300">
                <div className="flex justify-between mb-3">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Item {i+1}</span>
                  <button onClick={() => removeArrayItem('sets_apart_features', i)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                </div>
                <div className="space-y-3">
                  <input type="text" placeholder="Title" value={feat.title || ''} onChange={(e) => handleArrayChange('sets_apart_features', i, 'title', e.target.value)} className={inputClass} />
                  <input type="text" placeholder="Description" value={feat.description || ''} onChange={(e) => handleArrayChange('sets_apart_features', i, 'description', e.target.value)} className={inputClass} />
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => addArrayItem('sets_apart_features', { title: '', description: '' })} className="mt-6 flex items-center gap-2 text-sm text-luxury-pink font-semibold hover:text-luxury-dark transition-colors font-outfit">
            <Plus size={16} /> Add Item
          </button>
        </SectionCard>

        {/* 🔹 OUR SERVICES (CROSS-SELL) SECTION */}
        <SectionCard id="ourServices" title="Our Services (Cross-Sell Cards)" openSections={openSections} toggleSection={toggleSection}>
          <div className="mb-6">
            <label className={labelClass}>Heading</label>
            <input type="text" value={content.our_services_heading || ''} onChange={(e) => handleChange('our_services_heading', e.target.value)} className={inputClass} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(content.our_services_cards || []).map((card: any, i: number) => (
              <div key={i} className="bg-gray-50 p-5 rounded-xl border border-gray-100 hover:border-luxury-pink/30 transition-colors flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Card {i+1}</span>
                  <button onClick={() => removeArrayItem('our_services_cards', i)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                </div>
                <input type="text" placeholder="Card Title" value={card.title || ''} onChange={(e) => handleArrayChange('our_services_cards', i, 'title', e.target.value)} className={`${inputClass} mb-3`} />
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-500 hover:text-luxury-pink transition-colors font-outfit mt-auto">
                  <ImagePlus size={16} /> {card.image_url ? 'Replace Image' : 'Upload Image'}
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'our_services_cards', i, 'image_url')} className="sr-only" />
                </label>
              </div>
            ))}
          </div>
          <button onClick={() => addArrayItem('our_services_cards', { image_url: '', title: '' })} className="mt-6 flex items-center gap-2 text-sm text-luxury-pink font-semibold hover:text-luxury-dark transition-colors font-outfit">
            <Plus size={16} /> Add Service Card
          </button>
        </SectionCard>

        {/* 🔹 FAQ SECTION */}
        <SectionCard id="faqs" title="FAQs" openSections={openSections} toggleSection={toggleSection}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className={labelClass}>Subtitle</label>
              <input type="text" value={content.faq_subtitle || ''} onChange={(e) => handleChange('faq_subtitle', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Heading</label>
              <input type="text" value={content.faq_heading || ''} onChange={(e) => handleChange('faq_heading', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Description</label>
              <input type="text" value={content.faq_description || ''} onChange={(e) => handleChange('faq_description', e.target.value)} className={inputClass} />
            </div>
          </div>
          <div className="space-y-4">
            {(content.faq_items || []).map((faq: any, i: number) => (
              <div key={i} className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:border-luxury-pink/30 transition-colors">
                <div className="flex justify-between mb-4">
                  <span className="text-sm font-bold text-luxury-pink font-parkinsans">Q&A {i+1}</span>
                  <button onClick={() => removeArrayItem('faq_items', i)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                </div>
                <div className="space-y-3">
                  <input type="text" placeholder="Question" value={faq.question || ''} onChange={(e) => handleArrayChange('faq_items', i, 'question', e.target.value)} className={inputClass} />
                  <textarea rows={3} placeholder="Answer" value={faq.answer || ''} onChange={(e) => handleArrayChange('faq_items', i, 'answer', e.target.value)} className={textareaClass} />
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => addArrayItem('faq_items', { question: '', answer: '' })} className="mt-6 flex items-center gap-2 text-sm text-luxury-pink font-semibold hover:text-luxury-dark transition-colors font-outfit">
            <Plus size={16} /> Add FAQ
          </button>
        </SectionCard>

        {/* 🔹 FREE ESTIMATE & MAP SECTION */}
        <SectionCard id="estimate" title="Free Estimate & Map" openSections={openSections} toggleSection={toggleSection}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className={labelClass}>Subtitle</label>
              <input type="text" value={content.estimate_subtitle || ''} onChange={(e) => handleChange('estimate_subtitle', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Heading</label>
              <input type="text" value={content.estimate_heading || ''} onChange={(e) => handleChange('estimate_heading', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Bottom Heading</label>
              <input type="text" value={content.estimate_bottom_heading || ''} onChange={(e) => handleChange('estimate_bottom_heading', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Bottom Description</label>
              <input type="text" value={content.estimate_bottom_description || ''} onChange={(e) => handleChange('estimate_bottom_description', e.target.value)} className={inputClass} />
            </div>
          </div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 block font-outfit">Locations</label>
          <div className="space-y-3">
            {(content.estimate_locations || []).map((loc: any, i: number) => (
              <div key={i} className="flex flex-col md:flex-row items-stretch gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100 group hover:border-luxury-pink/30 transition-colors">
                <input type="text" placeholder="Label (e.g. Orlando HQ)" value={loc.label || ''} onChange={(e) => handleArrayChange('estimate_locations', i, 'label', e.target.value)} className={inputClass} />
                <input type="text" placeholder="Address (e.g. Orlando, FL 32801)" value={loc.address || ''} onChange={(e) => handleArrayChange('estimate_locations', i, 'address', e.target.value)} className={inputClass} />
                <button onClick={() => removeArrayItem('estimate_locations', i)} className="flex items-center justify-center text-gray-300 hover:text-red-500 transition-colors p-2 flex-shrink-0">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
          <button onClick={() => addArrayItem('estimate_locations', { label: '', address: '' })} className="mt-6 flex items-center gap-2 text-sm text-luxury-pink font-semibold hover:text-luxury-dark transition-colors font-outfit">
            <Plus size={16} /> Add Location
          </button>
        </SectionCard>

      </div>
    </div>
  )
}