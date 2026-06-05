'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

    if (res.ok) {
  window.location.href = '/admin/leads' // <-- Forces hard refresh with cookie
}else {
        setError(data.error || 'Login failed.')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-luxury-dark">Admin Access</h1>
          <p className="text-gray-400 mt-2 text-sm">Sign in to your dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
          <div className="mb-4">
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

          <div className="mb-6">
            <label className="text-sm font-semibold text-gray-600 mb-2 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-pink transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="mb-4 text-center text-red-500 text-sm font-medium bg-red-50 py-2 rounded-md">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 text-white font-semibold uppercase tracking-widest rounded-md transition-all duration-300 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-luxury-dark hover:bg-luxury-pink'}`}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>

          <div className="mt-4 text-center">
            <Link href="/admin/forgot-password" className="text-sm text-luxury-pink hover:underline font-medium">
              Forgot Password?
            </Link>
          </div>
        </form>

        <p className="text-center text-xs text-gray-300 mt-8">Protected area. Authorized personnel only.</p>
      </div>
    </div>
  )
}