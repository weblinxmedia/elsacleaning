'use client'

import { useState, useEffect } from 'react'
import { Users, Plus, Trash2, Eye, EyeOff, Loader2, ImagePlus, UserCircle } from 'lucide-react'

interface Member {
  id: string
  name: string
  role: string
  photo_url: string
  is_active: boolean
}

export default function TeamManager() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [newName, setNewName] = useState('')
  const [newRole, setNewRole] = useState('')
  const [newPhoto, setNewPhoto] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  useEffect(() => { fetchMembers() }, [])

  const fetchMembers = async () => {
    try {
      const res = await fetch('/api/team')
      if (res.ok) setMembers(await res.json())
    } catch (err) { console.error(err) } 
    finally { setLoading(false) }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await fetch('/api/upload-team-photo', { method: 'POST', body: formData })
      const data = await res.json()
      if (res.ok && data.url) setNewPhoto(data.url)
    } catch (err) { console.error(err) } 
    finally { setIsUploading(false) }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName || !newRole) return
    setIsAdding(true)
    setFeedback(null)
    try {
      const res = await fetch('/api/admin/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, role: newRole, photo_url: newPhoto }),
      })
      if (res.ok) {
        setNewName(''); setNewRole(''); setNewPhoto('')
        setFeedback({ type: 'success', message: '✅ Team member added!' })
        fetchMembers()
      } else {
        setFeedback({ type: 'error', message: '❌ Failed to add member.' })
      }
    } catch { setFeedback({ type: 'error', message: '❌ Network error.' }) } 
    finally { setIsAdding(false); setTimeout(() => setFeedback(null), 3000) }
  }

  const toggleActive = async (member: Member) => {
    try {
      const res = await fetch(`/api/admin/team/${member.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !member.is_active }),
      })
      if (res.ok) fetchMembers()
    } catch (err) { console.error(err) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this team member?')) return
    try {
      const res = await fetch(`/api/admin/team/${id}`, { method: 'DELETE' })
      if (res.ok) fetchMembers()
    } catch (err) { console.error(err) }
  }

  const inputClass = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxury-pink focus:border-transparent transition-all text-sm font-outfit text-gray-800"

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-parkinsans font-bold text-luxury-dark tracking-tight">Team Manager</h1>
        <p className="text-gray-500 mt-2 font-outfit text-base">Manage your cleaning professionals and staff.</p>
      </div>

      {feedback && (
        <div className={`mb-8 p-4 rounded-xl text-sm font-medium font-outfit ${feedback.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
          {feedback.message}
        </div>
      )}

      {/* 🔹 Add Member Card */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 mb-10">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
          <Users size={20} className="text-luxury-pink" />
          <h2 className="text-2xl font-parkinsans font-bold text-luxury-dark">Add New Member</h2>
        </div>
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block font-outfit">Full Name</label>
            <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} className={inputClass} required />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block font-outfit">Role / Title</label>
            <input type="text" value={newRole} onChange={(e) => setNewRole(e.target.value)} className={inputClass} required />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block font-outfit">Profile Photo</label>
            <div className="mt-1 flex justify-center px-4 pt-4 pb-4 border-2 border-gray-200 border-dashed rounded-xl hover:border-luxury-pink transition-colors bg-gray-50">
              <div className="flex items-center gap-3 text-center">
                {newPhoto ? <img src={newPhoto} alt="Photo" className="h-10 w-10 rounded-full object-cover shadow-sm" /> : <ImagePlus className="h-6 w-6 text-gray-300" />}
                <label className="cursor-pointer font-medium text-luxury-pink hover:text-luxury-dark text-xs transition-colors">
                  <span>{isUploading ? 'Uploading...' : 'Choose'}</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="sr-only" disabled={isUploading} />
                </label>
              </div>
            </div>
          </div>
          <button type="submit" disabled={isAdding} className={`flex items-center justify-center gap-2 px-6 py-3.5 text-white text-sm font-semibold rounded-xl transition-all duration-300 h-[46px] ${isAdding ? 'bg-gray-400' : 'bg-luxury-dark hover:bg-luxury-pink'}`}>
            <Plus size={18} /> {isAdding ? 'Adding...' : 'Add Member'}
          </button>
        </form>
      </div>

      {/* 🔹 Team Grid */}
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-luxury-pink animate-spin" /></div>
      ) : members.length === 0 ? (
        <div className="text-center py-20 text-gray-400 font-outfit"><Users size={40} className="mx-auto mb-3 text-gray-200" /><p className="font-semibold text-gray-500">No team members yet</p></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <div key={member.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden mb-4 border-4 border-gray-50 shadow-sm">
                {member.photo_url ? <img src={member.photo_url} alt={member.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><UserCircle size={40} className="text-gray-300" /></div>}
              </div>
              <h3 className="font-semibold text-luxury-dark font-outfit text-lg">{member.name}</h3>
              <p className="text-gray-500 font-outfit text-sm mt-1 mb-5">{member.role}</p>
              
              <div className="mt-auto flex items-center gap-3 w-full pt-4 border-t border-gray-50">
                <button onClick={() => toggleActive(member)} className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border transition-colors ${member.is_active ? 'bg-green-50 text-green-600 border-green-100 hover:bg-green-100' : 'bg-red-50 text-red-500 border-red-100 hover:bg-red-100'}`}>
                  {member.is_active ? <Eye size={12} /> : <EyeOff size={12} />}
                  {member.is_active ? 'Active' : 'Hidden'}
                </button>
                <button onClick={() => handleDelete(member.id)} className="p-2 text-gray-300 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}