'use client'

import { useState, useEffect } from 'react'
import LeadsChart from './LeadsChart'
import { Download, Search, Trash2, Eye, Users, TrendingUp, Clock, Award } from 'lucide-react'

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  address: string
  service: string
  message: string
  status: string
  created_at: string
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/leads')
      if (res.ok) {
        const data = await res.json()
        setLeads(data)
      }
    } catch (error) {
      console.error('Failed to fetch leads:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        setLeads(leads.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead))
      }
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return
    try {
      const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setLeads(leads.filter(lead => lead.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete lead:', error)
    }
  }

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Address', 'Service', 'Status', 'Date']
    const rows = filteredLeads.map(lead => [
      lead.name, lead.email, lead.phone, lead.address, lead.service, lead.status, new Date(lead.created_at).toLocaleDateString()
    ])
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', 'leads_export.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const filteredLeads = leads.filter(lead => {
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lead.service.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const totalLeads = leads.length
  const todayLeads = leads.filter(l => new Date(l.created_at).toDateString() === new Date().toDateString()).length
  const wonLeads = leads.filter(l => l.status === 'won').length
  const conversionRate = totalLeads > 0 ? `${Math.round((wonLeads / totalLeads) * 100)}%` : '0%'

  // Premium UI Classes
  const cardClass = "bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
  const inputClass = "w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxury-pink focus:border-transparent transition-all text-sm font-outfit"

  const getStatusBadge = (status: string, id: string) => {
    const styles: Record<string, string> = {
      new: 'bg-blue-50 text-blue-600 border-blue-100',
      contacted: 'bg-yellow-50 text-yellow-600 border-yellow-100',
      won: 'bg-green-50 text-green-600 border-green-100',
      lost: 'bg-red-50 text-red-500 border-red-100',
    }
    
    return (
      <select 
        value={status} 
        onChange={(e) => handleStatusChange(id, e.target.value)}
        className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border cursor-pointer focus:outline-none focus:ring-2 focus:ring-luxury-pink appearance-none text-center ${styles[status] || styles.new}`}
        style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
      >
        <option value="new">New</option>
        <option value="contacted">Contacted</option>
        <option value="won">Won</option>
        <option value="lost">Lost</option>
      </select>
    )
  }

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-luxury-pink"></div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      
      {/* 🔹 Premium Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-parkinsans font-bold text-luxury-dark tracking-tight">Lead Management</h1>
          <p className="text-gray-500 mt-2 font-outfit text-base">Track your pipeline and manage inquiries.</p>
        </div>
        <button 
          onClick={exportToCSV} 
          className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-luxury-dark text-sm font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {/* 🔹 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className={`${cardClass} flex items-center gap-5`}>
          <div className="p-3 bg-blue-50 rounded-xl text-blue-500"><Users size={24} /></div>
          <div>
            <p className="text-sm font-medium text-gray-500 font-outfit uppercase tracking-wider">Total Leads</p>
            <p className="text-3xl font-parkinsans font-bold text-luxury-dark mt-1">{totalLeads}</p>
          </div>
        </div>
        <div className={`${cardClass} flex items-center gap-5`}>
          <div className="p-3 bg-purple-50 rounded-xl text-purple-500"><Clock size={24} /></div>
          <div>
            <p className="text-sm font-medium text-gray-500 font-outfit uppercase tracking-wider">Today</p>
            <p className="text-3xl font-parkinsans font-bold text-luxury-pink mt-1">{todayLeads}</p>
          </div>
        </div>
        <div className={`${cardClass} flex items-center gap-5`}>
          <div className="p-3 bg-green-50 rounded-xl text-green-500"><Award size={24} /></div>
          <div>
            <p className="text-sm font-medium text-gray-500 font-outfit uppercase tracking-wider">Won</p>
            <p className="text-3xl font-parkinsans font-bold text-green-600 mt-1">{wonLeads}</p>
          </div>
        </div>
        <div className={`${cardClass} flex items-center gap-5`}>
          <div className="p-3 bg-yellow-50 rounded-xl text-yellow-500"><TrendingUp size={24} /></div>
          <div>
            <p className="text-sm font-medium text-gray-500 font-outfit uppercase tracking-wider">Conversion</p>
            <p className="text-3xl font-parkinsans font-bold text-luxury-dark mt-1">{conversionRate}</p>
          </div>
        </div>
      </div>

      {/* 🔹 Analytics Chart */}
      <LeadsChart submissions={leads} />

      {/* 🔹 Filters & Search Bar */}
      <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm mb-8 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, email, or service..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`${inputClass} pl-11`}
          />
        </div>
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          className={`${inputClass} md:w-64 cursor-pointer`}
        >
          <option value="all">All Statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
        </select>
      </div>

      {/* 🔹 Premium Data Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="px-6 md:px-8 py-5 text-xs font-semibold text-gray-500 uppercase tracking-wider font-outfit">Lead Info</th>
                <th className="px-6 md:px-8 py-5 text-xs font-semibold text-gray-500 uppercase tracking-wider font-outfit">Service</th>
                <th className="px-6 md:px-8 py-5 text-xs font-semibold text-gray-500 uppercase tracking-wider font-outfit">Status</th>
                <th className="px-6 md:px-8 py-5 text-xs font-semibold text-gray-500 uppercase tracking-wider font-outfit">Date</th>
                <th className="px-6 md:px-8 py-5 text-xs font-semibold text-gray-500 uppercase tracking-wider font-outfit text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-16 text-gray-400 font-outfit">
                    <div className="flex flex-col items-center gap-2">
                      <Search size={32} className="text-gray-200 mb-2" />
                      <p className="font-semibold text-gray-500">No leads found</p>
                      <p className="text-sm">Try adjusting your search or filter.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors duration-150 group">
                    <td className="px-6 md:px-8 py-5">
                      <div>
                        <p className="font-semibold text-luxury-dark font-outfit text-sm">{lead.name}</p>
                        <p className="text-xs text-gray-500 font-outfit mt-0.5">{lead.email}</p>
                        <p className="text-xs text-gray-400 font-outfit mt-0.5">{lead.phone}</p>
                        <p className="text-xs text-gray-400 font-outfit mt-0.5">{lead.address}</p>
                         {lead.message && <p className="text-xs text-gray-400 font-outfit mt-1 italic">💬 {lead.message.substring(0, 60)}{lead.message.length > 60 ? '...' : ''}</p>}
                      </div>
                    </td>
                    <td className="px-6 md:px-8 py-5">
                      <span className="text-sm text-gray-700 font-outfit font-medium bg-gray-100 px-3 py-1 rounded-lg">
                        {lead.service}
                      </span>
                    </td>
                    <td className="px-6 md:px-8 py-5">
                      {getStatusBadge(lead.status, lead.id)}
                    </td>
                    <td className="px-6 md:px-8 py-5">
                      <span className="text-sm text-gray-500 font-outfit">
                        {new Date(lead.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </td>
                    <td className="px-6 md:px-8 py-5">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <a href={`mailto:${lead.email}`} className="p-2 text-gray-400 hover:text-luxury-pink rounded-lg hover:bg-pink-50 transition-colors" title="Send Email">
                          <Eye size={16} />
                        </a>
                        <button 
                          onClick={() => handleDelete(lead.id)} 
                          className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                          title="Delete Lead"
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