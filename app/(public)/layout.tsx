import { Metadata } from 'next'
import { supabaseAdmin } from '@/lib/supabase'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { data } = await supabaseAdmin
      .from('settings')
      .select('value')
      .eq('key', 'global')
      .single()

    const settings = (data?.value || {}) as Record<string, string>

    return {
      title: settings.meta_title || "Shazam Windows Cleaning | Luxury Commercial Cleaning",
      description: settings.meta_description || 'Premium cleaning services',
      keywords: settings.meta_keywords ? settings.meta_keywords.split(',').map((k) => k.trim()) : [],
   
    }
  } catch (error) {
    return {
      title: 'Pink Ladies | Luxury Commercial Cleaning',
      description: 'Premium cleaning services',
    }
  }
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
 <>

      <Header />
      <main>{children}</main>
      <Footer />
 </>
  )
}