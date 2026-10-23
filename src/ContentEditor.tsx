import { useEffect, useState } from 'react'
import { supabase, loadContent, DEFAULT_CONTENT, Content } from './lib'
export default function ContentEditor({ setMsg }: { setMsg: (m: string) => void }) {
  const [c, setC] = useState<Content>(DEFAULT_CONTENT)
  useEffect(() => { loadContent().then(setC) }, [])
  const setHab = (i: number, k: 't' | 's' | 'items', v: string) => setC({ ...c, hab: c.hab.map((h, j) => j === i ? { ...h, [k]: v } : h) })
  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.from('site_content').upsert({ key: 'site', value: c, updated_at: new Date().toISOString() })
    setMsg(error ? 'Erro: ' + error.message : 'Conteúdo do site salvo.')
  }
  return (<>
    <h3>Conteúdo do site</h3>
    <form className="form" onSubmit={save}>
      <label>Sobre mim (separe os parágrafos com uma linha em branco)<textarea rows={10} value={c.sobre} onChange={e => setC({ ...c, sobre: e.target.value })} /></label>
      <label>Como eu trabalho (um item por linha)<textarea rows={4} value={c.principios} onChange={e => setC({ ...c, principios: e.target.value })} /></label>
      {c.hab.map((h, i) => (<fieldset key={i}><legend>Habilidades, coluna {i + 1}</legend>
        <label>Título<input value={h.t} onChange={e => setHab(i, 't', e.target.value)} /></label>
        <label>Subtítulo<input value={h.s} onChange={e => setHab(i, 's', e.target.value)} /></label>
        <label>Itens (um por linha)<textarea rows={5} value={h.items} onChange={e => setHab(i, 'items', e.target.value)} /></label></fieldset>))}
      <label>Trajetória (uma por linha, no formato: Título | descrição)<textarea rows={8} value={c.trajetoria} onChange={e => setC({ ...c, trajetoria: e.target.value })} /></label>
      <label>Link do LinkedIn<input value={c.linkedin} onChange={e => setC({ ...c, linkedin: e.target.value })} /></label>
      <label>Link do GitHub<input value={c.github} onChange={e => setC({ ...c, github: e.target.value })} /></label>
      <label>E-mail<input value={c.email} onChange={e => setC({ ...c, email: e.target.value })} /></label>
      <div><button className="btn">Salvar conteúdo</button></div>
    </form></>)
}
