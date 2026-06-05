'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    const data = await res.json()
    setMessage(data.message || 'Check your email for a reset link.')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-luxury-dark">Forgot Password?</h1>
          <p className="text-gray-400 mt-2 text-sm">Enter your email to get a reset link.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
          <div className="mb-6">
            <label className="text-sm font-semibold text-gray-600 mb-2 block">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-pink transition-all"
              placeholder="admin@pinkladies.com"
              required
            />
          </div>

          {message && (
            <div className="mb-4 text-center text-sm font-medium bg-blue-50 text-blue-700 py-2 rounded-md">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white font-semibold uppercase tracking-widest rounded-md transition-all ${loading ? 'bg-gray-400' : 'bg-luxury-dark hover:bg-luxury-pink'}`}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>

          <div className="mt-4 text-center">
            <Link href="/admin/login" className="text-sm text-luxury-pink hover:underline font-medium">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}