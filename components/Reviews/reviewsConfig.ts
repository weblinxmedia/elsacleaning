export interface ReviewData {
  id: string // Changed from number to string because Supabase uses UUIDs
  name: string
  rating: number
  text: string
}
export const companyLogos = [
  "SwiftLine",
  "Eagle",
  "Even Diet",
  "Fabric",
]

// We removed the hardcoded reviewsData array! Goodbye! 👋