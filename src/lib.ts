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
export type Content = { sobre: string; principios: string; linkedin: string; github: string; email: string; hab: { t: string; s: string; items: string }[]; trajetoria: string }
export const DEFAULT_CONTENT: Content = {
  sobre: 'Sou João Felipe, conhecido online como Nix, estudante de Sistemas de Informação na FHO e Técnico em Administração pela ETEC. Minha trajetória combina tecnologia, pensamento de produto e vontade de empreender.\n\nMeu interesse está em desenvolvimento de software e inteligência artificial. Gosto de entender como os sistemas funcionam, experimentar e transformar conceitos em projetos próprios. A formação em Administração me ajuda a olhar para processos, público, custos e modelo de negócio.\n\nQuero conquistar experiência profissional, evoluir como engenheiro de IA e construir uma empresa de tecnologia, começando pelo Brasil.',
  principios: 'Criar para resolver problemas reais.\nAprender construindo, testando e melhorando.\nPensar além do código: o usuário, o produto e o impacto.',
  linkedin: 'https://www.linkedin.com/in/joao-felipe-nix', github: 'https://github.com/joao-nix', email: 'joaosantos1million@gmail.com',
  hab: [
    { t: 'Uso e estudo hoje', s: 'Base de programação e prática.', items: 'Python\nC\nLógica de programação e algoritmos\nVS Code e Obsidian\nReact e Supabase (neste site)' },
    { t: 'Experimentando', s: 'Testes e protótipos em IA.', items: 'Modelos de linguagem via OpenRouter\nModelos locais com Ollama\nMemória conversacional\nConhecimento estruturado em JSON' },
    { t: 'Próximas etapas', s: 'Ainda em aprendizado, sem domínio declarado.', items: 'TypeScript e FastAPI\nSQL e PostgreSQL\nRAG, LangChain, LangGraph, MCP e n8n\nLinux, Docker e nuvem' }],
  trajetoria: 'Técnico em Administração, ETEC | Terceiro lugar na feira de projetos, na categoria Sistemas de Informação, mesmo em um curso de Administração.\nPrimeiros projetos de IA | Lene AI, experimentos com modelos locais e a base de conhecimento emocional.\n2026: Sistemas de Informação, FHO | Campus Santa Bárbara d’Oeste, com bolsa de 100%.\nAgora | Fortalecendo a base em Python e C e buscando oportunidade de estágio em desenvolvimento.'
}
export async function loadContent(): Promise<Content> {
  const { data } = await supabase.from('site_content').select('value').eq('key', 'site').maybeSingle()
  return { ...DEFAULT_CONTENT, ...((data?.value as Partial<Content>) ?? {}) }
}
export const lines = (s: string) => s.split('\n').map(x => x.trim()).filter(Boolean)
export const paras = (s: string) => s.split(/\n\s*\n/).map(x => x.trim()).filter(Boolean)
