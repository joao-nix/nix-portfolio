import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)
export type Project = { id?: string; title: string; category: string; status: string; summary: string; tech: string[]; image_url: string | null; sort: number }
export type Post = { id?: string; title: string; body: string; image_url: string | null; created_at?: string }
export const STATUS: Record<string, string> = { dev: 'Em desenvolvimento', plan: 'Planejamento', idea: 'Ideia em validação', exp: 'Experimento pessoal', live: 'No ar' }
export async function upload(file: File) {
  const path = `${crypto.randomUUID()}-${file.name.replace(/[^\w.-]/g, '_')}`
  const { error } = await supabase.storage.from('media').upload(path, file)
  if (error) throw error
  return supabase.storage.from('media').getPublicUrl(path).data.publicUrl
}
