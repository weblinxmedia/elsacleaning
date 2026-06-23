import { Metadata } from 'next'
import { supabaseAdmin } from '@/lib/supabase'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import ChatBot from '@/components/ChatBot'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { data } = await supabaseAdmin
      .from('settings')
      .select('value')
      .eq('key', 'global')
      .single()

    const settings = (data?.value || {}) as Record<string, string>

    return {
      title: settings.meta_title || "Shazam Windows Cleaning | The Best Windows Cleaner in the Town",
      description: settings.meta_description || 'Premium cleaning services',
      keywords: settings.meta_keywords ? settings.meta_keywords.split(',').map((k) => k.trim()) : [],
   
    }
  } catch (error) {
    return {
      title: 'Shazam Windows Cleaning | The Best Windows Cleaner in the Town',
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
      <ChatBot />
 </>
  )
}