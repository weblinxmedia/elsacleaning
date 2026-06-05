'use client'

import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'

interface Review {
  id: string
  name: string
  rating: number
  text: string
  is_active: boolean
}

export default function ReviewsManager() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [newName, setNewName] = useState('')
  const [newRating, setNewRating] = useState(5)
  const [newText, setNewText] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  const fetchReviews = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/testimonials')
      if (res.ok) setReviews(await res.json())
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchReviews() }, [])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName || !newText) return
    setIsAdding(true)

    try {
      const res = await fetch('/api/admin/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, rating: newRating, text: newText }),
      })
      if (res.ok) {
        setNewName(''); setNewRating(5); setNewText('')
        fetchReviews()
      }
    } catch (err) { console.error(err) } 
    finally { setIsAdding(false) }
  }

  const toggleActive = async (review: Review) => {
    try {
      const res = await fetch(`/api/admin/testimonials/${review.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !review.is_active }),
      })
      if (res.ok) fetchReviews()
    } catch (err) { console.error(err) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this review permanently?')) return
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' })
      if (res.ok) fetchReviews()
    } catch (err) { console.error(err) }
  }

  return (
    <div className="w-full max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-luxury-dark">Reviews Manager</h1>
        <p className="text-gray-500 mt-1">Add, hide, or manage customer testimonials.</p>
      </div>

      {/* Add New Review */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-luxury-dark mb-4">Add New Review</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Customer Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-pink"
              required
            />
            <select
              value={newRating}
              onChange={(e) => setNewRating(Number(e.target.value))}
              className="px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-pink cursor-pointer"
            >
              {[5, 4, 3, 2, 1].map((num) => (
                <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
          <textarea
            rows={3}
            placeholder="Write the review text here..."
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-pink resize-none"
            required
          />
          <button
            type="submit"
            disabled={isAdding}
            className={`px-6 py-3 text-white text-sm font-semibold rounded-md transition-colors ${isAdding ? 'bg-gray-400' : 'bg-luxury-dark hover:bg-luxury-pink'}`}
          >
            {isAdding ? 'Adding...' : 'Add Review'}
          </button>
        </form>
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Review</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Rating</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="text-center py-12 text-gray-400">Loading reviews...</td></tr>
              ) : reviews.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-12 text-gray-400">No reviews yet.</td></tr>
              ) : (
                reviews.map((review) => (
                  <tr key={review.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-luxury-dark">{review.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-sm truncate">{review.text}</td>
                    <td className="px-6 py-4 flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} size={14} className={i <= review.rating ? "fill-luxury-pink text-luxury-pink" : "text-gray-200"} />
                      ))}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${review.is_active ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                        {review.is_active ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex items-center gap-3">
                      <button onClick={() => toggleActive(review)} className="text-sm font-medium text-luxury-dark hover:text-luxury-pink transition-colors">
                        {review.is_active ? 'Hide' : 'Show'}
                      </button>
                      <button onClick={() => handleDelete(review.id)} className="text-sm font-medium text-red-400 hover:text-red-600 transition-colors">
                        Delete
                      </button>
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