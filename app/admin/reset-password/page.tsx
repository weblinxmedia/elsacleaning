'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

// 1. The actual content wrapped in Suspense
function ResetPasswordContent() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    })

    const data = await res.json()

    if (res.ok) {
      setSuccess(true)
      setTimeout(() => router.push('/admin/login'), 3000)
    } else {
      setError(data.error || 'Failed to reset password.')
    }
    setLoading(false)
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-luxury-dark mb-4">Invalid Link</h1>
          <Link href="/admin/forgot-password" className="text-luxury-pink hover:underline">Request a new one</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-luxury-dark">Reset Password</h1>
          <p className="text-gray-400 mt-2 text-sm">Enter your new password below.</p>
        </div>

        {success ? (
          <div className="bg-green-50 p-6 rounded-xl text-center border border-green-100">
            <p className="text-green-700 font-semibold">Password updated successfully!</p>
            <p className="text-green-500 text-sm mt-2">Redirecting to login...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
            <div className="mb-4">
              <label className="text-sm font-semibold text-gray-600 mb-2 block">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-pink transition-all"
                required
                minLength={8}
              />
            </div>

            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-600 mb-2 block">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-pink transition-all"
                required
                minLength={8}
              />
            </div>

            {error && (
              <div className="mb-4 text-center text-red-500 text-sm font-medium bg-red-50 py-2 rounded-md">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-white font-semibold uppercase tracking-widest rounded-md transition-all ${loading ? 'bg-gray-400' : 'bg-luxury-dark hover:bg-luxury-pink'}`}
            >
              {loading ? 'Saving...' : 'Set New Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

// 2. Default export wraps the content in a Suspense boundary
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-luxury-pink"></div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  )
}