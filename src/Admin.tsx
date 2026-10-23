import { useEffect, useState } from 'react'
import { supabase, upload, STATUS, Project, Post } from './lib'
import ContentEditor from './ContentEditor'
const emptyP: Project = { title: '', category: '', status: 'idea', summary: '', tech: [], image_url: null, sort: 0 }
const emptyPost: Post = { title: '', body: '', image_url: null }
export default function Admin() {
  const [ok, setOk] = useState<boolean | null>(null)
  const [email, setEmail] = useState(''); const [pass, setPass] = useState(''); const [msg, setMsg] = useState('')
  const [projects, setProjects] = useState<Project[]>([]); const [posts, setPosts] = useState<Post[]>([])
  const [p, setP] = useState<Project>(emptyP); const [post, setPost] = useState<Post>(emptyPost)
  const load = async () => {
    setProjects(((await supabase.from('projects').select('*').order('sort')).data ?? []) as Project[])
    setPosts(((await supabase.from('posts').select('*').order('created_at', { ascending: false })).data ?? []) as Post[])
  }
  useEffect(() => {
    supabase.auth.getSession().then(r => setOk(!!r.data.session))
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setOk(!!s))
    return () => data.subscription.unsubscribe()
  }, [])
  useEffect(() => { if (ok) load() }, [ok])
  const run = async (fn: () => PromiseLike<{ error: { message: string } | null }>, after?: () => void) => {
    const { error } = await fn(); setMsg(error ? 'Erro: ' + error.message : 'Salvo.'); if (!error) { after?.(); load() }
  }
  const pic = async (f: File | undefined, set: (u: string) => void) => { if (!f) return; try { set(await upload(f)) } catch (e) { setMsg('Erro no envio da foto: ' + (e as Error).message) } }
  if (ok === null) return <p className="wrap">Carregando…</p>
  if (!ok) return (<main className="wrap"><h2>Entrar</h2>
    <form className="form" onSubmit={async e => { e.preventDefault(); const { error } = await supabase.auth.signInWithPassword({ email, password: pass }); if (error) setMsg('E-mail ou senha incorretos.') }}>
      <label>E-mail<input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></label>
      <label>Senha<input type="password" value={pass} onChange={e => setPass(e.target.value)} required /></label>
      <button className="btn">Entrar</button><p className="mute">{msg}</p></form></main>)
  return (<main className="wrap"><div className="row"><h2>Painel</h2><span><a href="#">Ver site</a> · <button className="link" onClick={() => supabase.auth.signOut()}>Sair</button></span></div>
    <p className="mute" role="status">{msg}</p>
    <h3>{p.id ? 'Editar projeto' : 'Novo projeto'}</h3>
    <form className="form" onSubmit={e => { e.preventDefault(); const { id, ...d } = p; run(() => id ? supabase.from('projects').update(d).eq('id', id) : supabase.from('projects').insert(d), () => setP(emptyP)) }}>
      <label>Título<input value={p.title} onChange={e => setP({ ...p, title: e.target.value })} required /></label>
      <label>Categoria<input value={p.category} onChange={e => setP({ ...p, category: e.target.value })} /></label>
      <label>Estágio<select value={p.status} onChange={e => setP({ ...p, status: e.target.value })}>{Object.entries(STATUS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></label>
      <label>Descrição<textarea rows={4} value={p.summary} onChange={e => setP({ ...p, summary: e.target.value })} /></label>
      <label>Tecnologias (separe por vírgula)<input value={p.tech.join(', ')} onChange={e => setP({ ...p, tech: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} /></label>
      <label>Ordem<input type="number" value={p.sort} onChange={e => setP({ ...p, sort: +e.target.value })} /></label>
      <label>Foto<input type="file" accept="image/*" onChange={e => pic(e.target.files?.[0], u => setP({ ...p, image_url: u }))} /></label>
      {p.image_url && <img src={p.image_url} alt="Prévia" width={160} />}
      <div><button className="btn">Salvar projeto</button> {p.id && <button type="button" className="link" onClick={() => setP(emptyP)}>Cancelar edição</button>}</div></form>
    <ul className="list">{projects.map(x => <li key={x.id}><span>{x.title}</span><span>
      <button className="link" onClick={() => { setP(x); scrollTo(0, 0) }}>Editar</button> <button className="link" onClick={() => confirm('Apagar "' + x.title + '"?') && run(() => supabase.from('projects').delete().eq('id', x.id!))}>Apagar</button></span></li>)}</ul>
    <h3>Nova publicação no feed</h3>
    <form className="form" onSubmit={e => { e.preventDefault(); run(() => supabase.from('posts').insert(post), () => setPost(emptyPost)) }}>
      <label>Título<input value={post.title} onChange={e => setPost({ ...post, title: e.target.value })} required /></label>
      <label>Texto<textarea rows={5} value={post.body} onChange={e => setPost({ ...post, body: e.target.value })} /></label>
      <label>Foto<input type="file" accept="image/*" onChange={e => pic(e.target.files?.[0], u => setPost({ ...post, image_url: u }))} /></label>
      <div><button className="btn">Publicar</button></div></form>
    <ul className="list">{posts.map(x => <li key={x.id}><span>{x.title}</span>
      <button className="link" onClick={() => confirm('Apagar "' + x.title + '"?') && run(() => supabase.from('posts').delete().eq('id', x.id!))}>Apagar</button></li>)}</ul>
  <ContentEditor setMsg={setMsg} />
  </main>)
}
