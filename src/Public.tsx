import { useEffect, useState } from 'react'
import { supabase, STATUS, Project, Post } from './lib'
export default function Public() {
  const [projects, setProjects] = useState<Project[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  useEffect(() => {
    supabase.from('projects').select('*').order('sort').then(r => setProjects((r.data ?? []) as Project[]))
    supabase.from('posts').select('*').order('created_at', { ascending: false }).then(r => setPosts((r.data ?? []) as Post[]))
  }, [])
  return (<>
    <header className="top"><div className="wrap"><a className="brand" href="#">Nix</a>
      <nav><a href="#projetos">Projetos</a><a href="#feed">Feed</a><a href="#contato">Contato</a></nav></div></header>
    <main>
      <section className="hero wrap">
        <p className="mute">João Felipe, também conhecido como Nix. Desenvolvedor de software em formação.</p>
        <h1>Não quero apenas escrever código. Quero construir o que ainda não existe.</h1>
        <p className="lead">Estudante de Sistemas de Informação, explorando desenvolvimento de software e inteligência artificial para transformar ideias em produtos reais.</p>
        <a className="btn" href="#projetos">Explorar projetos</a>
      </section>
      <section id="projetos" className="wrap"><h2>Projetos</h2>
        {projects.map(p => (<article className="item" key={p.id}>
          <div className="row"><h3>{p.title}</h3><span className="mute">{STATUS[p.status] ?? p.status}</span></div>
          <p className="mute">{p.category}</p>
          {p.image_url && <img src={p.image_url} alt={p.title} loading="lazy" />}
          <p>{p.summary}</p>
          <ul className="tech">{p.tech.map(t => <li key={t}>{t}</li>)}</ul>
        </article>))}
      </section>
      <section id="feed" className="wrap"><h2>Feed</h2>
        {posts.length === 0 && <p className="mute">Nenhuma publicação ainda.</p>}
        {posts.map(p => (<article className="item" key={p.id}>
          <div className="row"><h3>{p.title}</h3><span className="mute">{new Date(p.created_at!).toLocaleDateString('pt-BR')}</span></div>
          {p.image_url && <img src={p.image_url} alt="" loading="lazy" />}
          <p className="pre">{p.body}</p></article>))}
      </section>
      <section id="contato" className="wrap"><h2>Contato</h2>
        <p><a href="https://www.linkedin.com/in/joao-felipe-nix" target="_blank" rel="noopener">LinkedIn: joao-felipe-nix</a></p>
        <p className="mute">Adicione aqui seu GitHub e e-mail profissional.</p></section>
    </main>
    <footer className="wrap mute">João Felipe (Nix). Santa Bárbara d’Oeste, São Paulo. <a href="#/admin">Admin</a></footer>
  </>)
}
