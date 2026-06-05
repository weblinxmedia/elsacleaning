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
        const dayName = selectedRange.days <= 7 ? days[date.getDay()] : `${date.getMonth()+1}/${date.getDate()}`
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

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h3 className="text-lg font-bold text-luxury-dark">Lead Activity</h3>
        
        {/* Premium Filter Toggles */}
        <div className="flex items-center bg-gray-100 rounded-lg p-1 gap-1">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setActiveRange(range.value)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 ${
                activeRange === range.value 
                  ? 'bg-white text-luxury-dark shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[300px] w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E10788" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#E10788" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 12 }} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 12 }} 
              allowDecimals={false} 
            />
            <Tooltip 
              contentStyle={{ 
                background: '#1a1a1a', 
                border: 'none', 
                borderRadius: '8px', 
                color: '#fff', 
                fontSize: '13px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                padding: '8px 12px'
              }} 
              itemStyle={{ color: '#E10788' }}
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