import { supabaseAdmin } from '@/lib/supabase'

export async function getSettings() {
  const { data } = await supabaseAdmin
    .from('settings')
    .select('*')
    .eq('key', 'global')
    .single()

  if (!data) return {}

  // Unlock the JSONB box and flatten everything to the top level
  return {
    ...(data.value || {}),
    id: data.id,
  }
}