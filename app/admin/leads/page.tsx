'use client'

import { useState, useEffect } from 'react'
import LeadsChart from './LeadsChart'
import { Download, Search, Trash2, Mail, Users, TrendingUp, Clock, Award, Filter, ChevronDown } from 'lucide-react'

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
  const inputClass = "w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-luxury-pink/10 focus:border-luxury-pink/40 transition-all text-sm font-outfit text-luxury-dark placeholder:text-gray-400"

  const getStatusBadge = (status: string, id: string) => {
    const styles: Record<string, string> = {
      new: 'bg-blue-50 text-blue-600 ring-blue-100 hover:bg-blue-100/70',
      contacted: 'bg-amber-50 text-amber-600 ring-amber-100 hover:bg-amber-100/70',
      won: 'bg-emerald-50 text-emerald-600 ring-emerald-100 hover:bg-emerald-100/70',
      lost: 'bg-rose-50 text-rose-500 ring-rose-100 hover:bg-rose-100/70',
    }
    const dot: Record<string, string> = {
      new: 'bg-blue-500',
      contacted: 'bg-amber-500',
      won: 'bg-emerald-500',
      lost: 'bg-rose-400',
    }

    return (
      <div className="relative inline-flex items-center">
        <span className={`pointer-events-none absolute left-3 h-1.5 w-1.5 rounded-full ${dot[status] || dot.new}`} />
        <select
          value={status}
          onChange={(e) => handleStatusChange(id, e.target.value)}
          className={`pl-6 pr-7 py-1.5 rounded-lg text-xs font-semibold capitalize tracking-wide ring-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-luxury-pink/40 appearance-none transition-colors ${styles[status] || styles.new}`}
          style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
        >
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
        </select>
        <ChevronDown size={12} className="pointer-events-none absolute right-2.5 opacity-60" />
      </div>
    )
  }

  if (loading) {
    return (
      <div className="w-full min-h-[80vh] flex flex-col items-center justify-center gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-2 border-gray-100"></div>
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-luxury-pink animate-spin"></div>
        </div>
        <p className="text-sm text-gray-400 font-outfit">Loading your pipeline…</p>
      </div>
    )
  }

  // Stat card config (data + rendering unchanged in meaning)
  const stats = [
    { label: 'Total Leads', value: totalLeads, icon: Users, accent: 'text-blue-600', tint: 'bg-blue-50', ring: 'ring-blue-100' },
    { label: 'Today', value: todayLeads, icon: Clock, accent: 'text-luxury-pink', tint: 'bg-pink-50', ring: 'ring-pink-100' },
    { label: 'Won', value: wonLeads, icon: Award, accent: 'text-emerald-600', tint: 'bg-emerald-50', ring: 'ring-emerald-100' },
    { label: 'Conversion', value: conversionRate, icon: TrendingUp, accent: 'text-luxury-dark', tint: 'bg-gray-50', ring: 'ring-gray-100' },
  ]

  return (
    <div className="w-full max-w-7xl mx-auto px-1 pb-12">

      {/* 🔹 Premium Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-pink-50 ring-1 ring-pink-100">
            <span className="h-1.5 w-1.5 rounded-full bg-luxury-pink animate-pulse" />
            <span className="text-xs font-semibold text-luxury-pink font-outfit tracking-wide">Live Pipeline</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-parkinsans font-bold text-luxury-dark tracking-tight">Lead Management</h1>
          <p className="text-gray-500 mt-2 font-outfit text-[15px]">Track your pipeline, manage inquiries, and close more deals.</p>
        </div>
        <button
          onClick={exportToCSV}
          className="group inline-flex items-center justify-center gap-2 px-5 py-3 bg-luxury-dark text-white text-sm font-semibold rounded-xl hover:bg-black transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98] self-start md:self-auto"
        >
          <Download size={16} className="transition-transform group-hover:translate-y-0.5" />
          Export CSV
        </button>
      </div>

      {/* 🔹 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-6">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <div
              key={s.label}
              className="group relative bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-gray-200 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-[13px] font-medium text-gray-500 font-outfit tracking-wide">{s.label}</p>
                  <p className={`text-[28px] leading-tight font-parkinsans font-bold mt-2 ${s.accent} tabular-nums`}>{s.value}</p>
                </div>
                <div className={`p-2.5 rounded-xl ring-1 ${s.tint} ${s.ring} ${s.accent}`}>
                  <Icon size={20} strokeWidth={2} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* 🔹 Analytics Chart */}
      <LeadsChart submissions={leads} />

      {/* 🔹 Filters & Search Bar */}
      <div className="bg-white p-3 md:p-4 rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] mb-5 flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name, email, or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`${inputClass} pl-10`}
          />
        </div>
        <div className="relative md:w-60">
          <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`${inputClass} pl-9 pr-9 cursor-pointer appearance-none`}
            style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* 🔹 Premium Data Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="flex items-center justify-between px-6 md:px-7 py-4 border-b border-gray-100">
          <h3 className="text-base font-parkinsans font-bold text-luxury-dark">All Leads</h3>
          <span className="text-xs font-semibold text-gray-500 font-outfit bg-gray-50 ring-1 ring-gray-100 px-2.5 py-1 rounded-full tabular-nums">
            {filteredLeads.length} {filteredLeads.length === 1 ? 'result' : 'results'}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/60">
                <th className="px-6 md:px-7 py-3.5 text-[11px] font-semibold text-gray-400 uppercase tracking-[0.08em] font-outfit">Lead Info</th>
                <th className="px-6 md:px-7 py-3.5 text-[11px] font-semibold text-gray-400 uppercase tracking-[0.08em] font-outfit">Service</th>
                <th className="px-6 md:px-7 py-3.5 text-[11px] font-semibold text-gray-400 uppercase tracking-[0.08em] font-outfit">Status</th>
                <th className="px-6 md:px-7 py-3.5 text-[11px] font-semibold text-gray-400 uppercase tracking-[0.08em] font-outfit">Date</th>
                <th className="px-6 md:px-7 py-3.5 text-[11px] font-semibold text-gray-400 uppercase tracking-[0.08em] font-outfit text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-20 text-gray-400 font-outfit">
                    <div className="flex flex-col items-center gap-3">
                      <div className="h-14 w-14 rounded-2xl bg-gray-50 ring-1 ring-gray-100 flex items-center justify-center">
                        <Search size={24} className="text-gray-300" />
                      </div>
                      <p className="font-semibold text-luxury-dark">No leads found</p>
                      <p className="text-sm text-gray-400">Try adjusting your search or filter.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50/60 transition-colors duration-150 group">
                    <td className="px-6 md:px-7 py-4 align-top">
                      <div className="flex items-start gap-3">
                        <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-luxury-pink/10 to-luxury-pink/5 ring-1 ring-luxury-pink/10 text-luxury-pink font-parkinsans font-bold text-sm uppercase">
                          {lead.name?.charAt(0) || '?'}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-luxury-dark font-outfit text-sm truncate">{lead.name}</p>
                          <p className="text-xs text-gray-500 font-outfit mt-0.5 truncate">{lead.email}</p>
                          <p className="text-xs text-gray-400 font-outfit mt-0.5">{lead.phone}</p>
                          <p className="text-xs text-gray-400 font-outfit mt-0.5 truncate">{lead.address}</p>
                          {lead.message && <p className="text-xs text-gray-400 font-outfit mt-1.5 italic max-w-xs truncate">“{lead.message.substring(0, 60)}{lead.message.length > 60 ? '…' : ''}”</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 md:px-7 py-4 align-top">
                      <span className="inline-block text-xs text-gray-700 font-outfit font-medium bg-gray-50 ring-1 ring-gray-100 px-2.5 py-1 rounded-lg whitespace-nowrap">
                        {lead.service}
                      </span>
                    </td>
                    <td className="px-6 md:px-7 py-4 align-top">
                      {getStatusBadge(lead.status, lead.id)}
                    </td>
                    <td className="px-6 md:px-7 py-4 align-top">
                      <span className="text-sm text-gray-500 font-outfit whitespace-nowrap tabular-nums">
                        {new Date(lead.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </td>
                    <td className="px-6 md:px-7 py-4 align-top">
                      <div className="flex items-center justify-end gap-1.5 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                        <a href={`mailto:${lead.email}`} className="p-2 text-gray-400 hover:text-luxury-pink rounded-lg hover:bg-pink-50 transition-colors" title="Send Email" aria-label="Send email">
                          <Mail size={16} />
                        </a>
                        <button
                          onClick={() => handleDelete(lead.id)}
                          className="p-2 text-gray-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors"
                          title="Delete Lead"
                          aria-label="Delete lead"
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