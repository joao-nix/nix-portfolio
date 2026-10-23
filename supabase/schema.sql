-- Rode no Supabase: SQL Editor > New query. Troque SEU_EMAIL pelo e-mail do admin.
create table projects(id uuid primary key default gen_random_uuid(),title text not null,category text default '',
 status text not null default 'idea',summary text default '',tech text[] default '{}',image_url text,sort int default 0,created_at timestamptz default now());
create table posts(id uuid primary key default gen_random_uuid(),title text not null,body text default '',image_url text,created_at timestamptz default now());
alter table projects enable row level security; alter table posts enable row level security;
create policy "leitura publica" on projects for select using (true);
create policy "leitura publica" on posts for select using (true);
create policy "admin escreve" on projects for all using (auth.jwt()->>'email'='SEU_EMAIL') with check (auth.jwt()->>'email'='joaosantos1million@gmail.com');
create policy "admin escreve" on posts for all using (auth.jwt()->>'email'='SEU_EMAIL') with check (auth.jwt()->>'email'='joaosantos1million@gmail.comL');
insert into storage.buckets(id,name,public) values('media','media',true);
create policy "midia publica" on storage.objects for select using (bucket_id='media');
create policy "admin envia midia" on storage.objects for all using (bucket_id='media' and auth.jwt()->>'email'='joaosantos1million@gmail.com') with check (bucket_id='media' and auth.jwt()->>'email'='joaosantos1million@gmail.com');
insert into projects(title,category,status,summary,tech,sort) values
('Lene AI (Psycho AI)','IA, companhia digital e acolhimento emocional','dev','Uma IA de companhia para oferecer escuta acessível e personalizada, com memória contextual. Frase do projeto: “Será possível salvar os gritos mais silenciosos?”','{Python,React,Firebase,OpenRouter}',1),
('Achou?','SaaS B2B para achados e perdidos','plan','Plataforma para instituições centralizarem cadastro, busca e devolução de objetos perdidos.','{React,TypeScript,Python,FastAPI,PostgreSQL}',2),
('Plataforma de criadores e investidores','Rede de colaboração','idea','Criadores publicam projetos, documentam a evolução e encontram colaboradores e investidores.','{}',3),
('Nix-Brain','Laboratório de IA local','exp','Experimentos com modelos locais usando Ollama, Qwen 2.5, Phi-3 Mini e Obsidian.','{Ollama,Qwen,Phi-3,Obsidian}',4);
