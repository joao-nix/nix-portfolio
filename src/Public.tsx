import { useEffect, useState } from 'react'
import { supabase, STATUS, Project, Post } from './lib'
const GITHUB = 'https://github.com/joao-nix'
const EMAIL = 'joaosantos1million@gmail.com'
const LINKEDIN = 'https://www.linkedin.com/in/joao-felipe-nix'
export default function Public() {
  const [projects, setProjects] = useState<Project[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  useEffect(() => {
    supabase.from('projects').select('*').order('sort').then(r => setProjects((r.data ?? []) as Project[]))
    supabase.from('posts').select('*').order('created_at', { ascending: false }).then(r => setPosts((r.data ?? []) as Post[]))
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
        <div><h2>Sobre mim</h2>
          <p>Sou João Felipe, conhecido online como Nix, estudante de Sistemas de Informação na FHO e Técnico em Administração pela ETEC. Minha trajetória combina tecnologia, pensamento de produto e vontade de empreender.</p>
          <p>Meu interesse está em desenvolvimento de software e inteligência artificial. Gosto de entender como os sistemas funcionam, experimentar e transformar conceitos em projetos próprios. A formação em Administração me ajuda a olhar para processos, público, custos e modelo de negócio.</p>
          <p>Quero conquistar experiência profissional, evoluir como engenheiro de IA e construir uma empresa de tecnologia, começando pelo Brasil.</p></div>
        <div><h2>Como eu trabalho</h2>
          <ul className="principles"><li>Criar para resolver problemas reais.</li><li>Aprender construindo, testando e melhorando.</li><li>Pensar além do código: o usuário, o produto e o impacto.</li></ul></div>
      </section>

      <section id="habilidades" className="wrap"><h2>Tecnologias e habilidades</h2>
        <p className="mute sub">Sem barras de porcentagem. As colunas separam o que já uso do que ainda estou aprendendo.</p>
        <div className="cols">
          <div className="col"><h3>Uso e estudo hoje</h3><p className="mute">Base de programação e prática.</p><ul><li>Python</li><li>C</li><li>Lógica de programação e algoritmos</li><li>VS Code e Obsidian</li><li>React e Supabase (neste site)</li></ul></div>
          <div className="col dashed"><h3>Experimentando</h3><p className="mute">Testes e protótipos em IA.</p><ul><li>Modelos de linguagem via OpenRouter</li><li>Modelos locais com Ollama</li><li>Memória conversacional</li><li>Conhecimento estruturado em JSON</li></ul></div>
          <div className="col thin"><h3>Próximas etapas</h3><p className="mute">Ainda em aprendizado, sem domínio declarado.</p><ul><li>TypeScript e FastAPI</li><li>SQL e PostgreSQL</li><li>RAG, LangChain, LangGraph, MCP e n8n</li><li>Linux, Docker e nuvem</li></ul></div>
        </div>
      </section>

      <section id="trajetoria" className="wrap"><h2>Trajetória</h2>
        <ol className="tl">
          <li><b>Técnico em Administração, ETEC</b><span>Terceiro lugar na feira de projetos, na categoria Sistemas de Informação, mesmo em um curso de Administração.</span></li>
          <li><b>Primeiros projetos de IA</b><span>Lene AI, experimentos com modelos locais e a base de conhecimento emocional.</span></li>
          <li><b>2026: Sistemas de Informação, FHO</b><span>Campus Santa Bárbara d’Oeste, com bolsa de 100%. Algoritmos, Lógica Computacional, Matemática Discreta, Práticas de Programação e Fundamentos de SI.</span></li>
          <li><b>Agora</b><span>Fortalecendo a base em Python e C e buscando oportunidade de estágio em desenvolvimento.</span></li>
        </ol>
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
        <a className="crow" href={LINKEDIN} target="_blank" rel="noopener"><span>LinkedIn</span><span className="mute">joao-felipe-nix</span></a>
        <a className="crow" href={GITHUB} target="_blank" rel="noopener"><span>GitHub</span><span className="mute">joao-nix</span></a>
        <a className="crow" href={'mailto:' + EMAIL}><span>E-mail</span><span className="mute">{EMAIL}</span></a>
      </section>
    </main>
    <footer className="wrap mute">João Felipe (Nix). Santa Bárbara d’Oeste, São Paulo. <a href="#/admin">Admin</a></footer>
  </>)
}
