import { useEffect, useState } from 'react'
import { supabase, STATUS, Project, Post, Content, DEFAULT_CONTENT, loadContent, lines, paras } from './lib'
const short = (u: string) => u.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
export default function Public() {
  const [projects, setProjects] = useState<Project[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [c, setC] = useState<Content>(DEFAULT_CONTENT)
  useEffect(() => {
    supabase.from('projects').select('*').order('sort').then(r => setProjects((r.data ?? []) as Project[]))
    supabase.from('posts').select('*').order('created_at', { ascending: false }).then(r => setPosts((r.data ?? []) as Post[]))
    loadContent().then(setC)
  }, [])
  return (<>
    <header className="top"><div className="wrap"><a className="brand" href="#">Nix</a>
      <nav aria-label="Principal"><a href="#projetos">Projetos</a><a href="#sobre">Sobre</a><a href="#habilidades">Habilidades</a><a href="#trajetoria">Trajetória</a><a href="#laboratorio">Laboratório</a><a href="#contato">Contato</a></nav></div></header>
    <main>
      <section className="hero wrap">
        <p className="mute">João Felipe, também conhecido como Nix. Desenvolvedor de software em formação.</p>
        <h1>Não quero apenas escrever código. Quero construir o que ainda não existe.</h1>
        <p className="lead">Estudante de Sistemas de Informação, explorando desenvolvimento de software e inteligência artificial para transformar ideias em produtos reais.</p>
        <div className="btns"><a className="btn" href="#projetos">Explorar projetos</a><a className="btn ghost" href="#contato">Entrar em contato</a></div>
      </section>
      <section id="projetos" className="wrap"><h2>Projetos</h2>
        <p className="mute sub">O marcador ao lado de cada projeto mostra o estágio real: em desenvolvimento, planejamento, ideia ou experimento.</p>
        {projects.map(p => (<article className="item" key={p.id}>
          <div className="row"><h3>{p.title}</h3><span className="mute">{STATUS[p.status] ?? p.status}</span></div>
          <p className="mute">{p.category}</p>
          {p.image_url && <img src={p.image_url} alt={p.title} loading="lazy" />}
          <p>{p.summary}</p>
          <ul className="tech">{p.tech.map(t => <li key={t}>{t}</li>)}</ul>
        </article>))}
      </section>
      <section id="sobre" className="wrap two">
        <div><h2>Sobre mim</h2>{paras(c.sobre).map((t, i) => <p key={i}>{t}</p>)}</div>
        <div><h2>Como eu trabalho</h2><ul className="principles">{lines(c.principios).map((t, i) => <li key={i}>{t}</li>)}</ul></div>
      </section>
      <section id="habilidades" className="wrap"><h2>Tecnologias e habilidades</h2>
        <p className="mute sub">Sem barras de porcentagem. As colunas separam o que já uso do que ainda estou aprendendo.</p>
        <div className="cols">{c.hab.map((h, i) => (
          <div className={'col ' + ['', 'dashed', 'thin'][i]} key={i}><h3>{h.t}</h3><p className="mute">{h.s}</p><ul>{lines(h.items).map((t, j) => <li key={j}>{t}</li>)}</ul></div>))}</div>
      </section>
      <section id="trajetoria" className="wrap"><h2>Trajetória</h2>
        <ol className="tl">{lines(c.trajetoria).map((l, i) => { const [t, ...d] = l.split('|'); return <li key={i}><b>{t.trim()}</b><span>{d.join('|').trim()}</span></li> })}</ol>
      </section>
      <section id="laboratorio" className="wrap"><h2>Laboratório</h2>
        <p className="mute sub">Diário de construção: o que estudo, o que construo e o que dá errado.</p>
        {posts.length === 0 && <p className="mute">Nenhuma publicação ainda.</p>}
        {posts.map(p => (<article className="item" key={p.id}>
          <div className="row"><h3>{p.title}</h3><span className="mute">{new Date(p.created_at!).toLocaleDateString('pt-BR')}</span></div>
          {p.image_url && <img src={p.image_url} alt="" loading="lazy" />}
          <p className="pre">{p.body}</p></article>))}
      </section>
      <section id="contato" className="wrap contact"><h2>Contato</h2>
        <p className="mute sub">Aberto a estágio, conversas sobre projetos e parcerias.</p>
        <a className="crow" href={c.linkedin} target="_blank" rel="noopener"><span>LinkedIn</span><span className="mute">{short(c.linkedin)}</span></a>
        <a className="crow" href={c.github} target="_blank" rel="noopener"><span>GitHub</span><span className="mute">{short(c.github)}</span></a>
        <a className="crow" href={'mailto:' + c.email}><span>E-mail</span><span className="mute">{c.email}</span></a>
      </section>
    </main>
    <footer className="wrap mute">João Felipe (Nix). Santa Bárbara d’Oeste, São Paulo. <a href="#/admin">Admin</a></footer>
  </>)
}
