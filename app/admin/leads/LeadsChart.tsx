'use client'

import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface Submission {
  id: string
  created_at: string
  status: string
}

const timeRanges = [
  { label: '3D', value: '3d', days: 3 },
  { label: '7D', value: '7d', days: 7 },
  { label: '30D', value: '30d', days: 30 },
  { label: '6M', value: '6m', days: 180 },
  { label: '1Y', value: '1y', days: 365 },
]

export default function LeadsChart({ submissions }: { submissions: Submission[] }) {
  const [activeRange, setActiveRange] = useState('7d')

  const processChartData = () => {
    const selectedRange = timeRanges.find(r => r.value === activeRange) || timeRanges[1]
    const data = []
    const now = new Date()

    // If 6M or 1Y, group by Month
    if (selectedRange.value === '6m' || selectedRange.value === '1y') {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const monthCount = selectedRange.value === '6m' ? 6 : 12

      for (let i = monthCount - 1; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
        const monthName = months[date.getMonth()]

        const leadsCount = submissions.filter((sub) => {
          const subDate = new Date(sub.created_at)
          return subDate.getMonth() === date.getMonth() && subDate.getFullYear() === date.getFullYear()
        }).length

        data.push({ name: monthName, leads: leadsCount })
      }
    } else {
      // Group by Days
      for (let i = selectedRange.days - 1; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)

        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const dayName = selectedRange.days <= 7 ? days[date.getDay()] : `${date.getMonth() + 1}/${date.getDate()}`
        const dateString = date.toDateString()

        const leadsCount = submissions.filter((sub) =>
          new Date(sub.created_at).toDateString() === dateString
        ).length

        data.push({ name: dayName, leads: leadsCount })
      }
    }

    return data
  }

  const chartData = processChartData()

  // Derived display values (presentation only — no logic change)
  const totalInRange = chartData.reduce((sum, d) => sum + d.leads, 0)
  const peak = chartData.reduce((max, d) => (d.leads > max ? d.leads : max), 0)

  return (
    <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-luxury-pink/15 to-luxury-pink/5 ring-1 ring-luxury-pink/10">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-luxury-pink" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18" />
              <path d="m19 9-5 5-4-4-3 3" />
            </svg>
          </div>
          <div>
            <h3 className="text-base md:text-lg font-parkinsans font-bold text-luxury-dark">Lead Activity</h3>
            <div className="flex items-center gap-4 mt-1.5">
              <span className="text-xs text-gray-500 font-outfit">
                <span className="font-semibold text-luxury-dark tabular-nums">{totalInRange}</span> total
              </span>
              <span className="h-3 w-px bg-gray-200" />
              <span className="text-xs text-gray-500 font-outfit">
                Peak <span className="font-semibold text-luxury-dark tabular-nums">{peak}</span>/period
              </span>
            </div>
          </div>
        </div>

        {/* Premium Filter Toggles */}
        <div className="flex items-center bg-gray-100/80 rounded-xl p-1 gap-0.5 self-start lg:self-auto">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setActiveRange(range.value)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${activeRange === range.value
                  ? 'bg-white text-luxury-dark shadow-sm ring-1 ring-gray-200/60'
                  : 'text-gray-500 hover:text-luxury-dark'
                }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[300px] w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 12, left: -12, bottom: 0 }}>
            <defs>
              <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E10788" stopOpacity={0.28} />
                <stop offset="95%" stopColor="#E10788" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f3f5" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              allowDecimals={false}
              width={36}
            />
            <Tooltip
              cursor={{ stroke: '#E10788', strokeWidth: 1, strokeDasharray: '4 4', strokeOpacity: 0.5 }}
              contentStyle={{
                background: '#1a1a1a',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '13px',
                boxShadow: '0 12px 30px rgba(0,0,0,0.22)',
                padding: '10px 14px'
              }}
              itemStyle={{ color: '#E10788', fontWeight: 600 }}
              labelStyle={{ color: '#9ca3af', marginBottom: '4px', fontWeight: 'bold' }}
            />
            <Area
              type="monotone"
              dataKey="leads"
              stroke="#E10788"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorLeads)"
              isAnimationActive={true}
              animationDuration={800}
              animationEasing="ease-in-out"
              // 🔥 The smooth premium dot that follows your mouse
              activeDot={{
                r: 6,
                fill: '#E10788',
                stroke: '#ffffff',
                strokeWidth: 3,
                className: 'drop-shadow-lg'
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}