# Portfólio Nix — passo a passo

1. Instale o Node.js (nodejs.org, versão LTS).
2. Crie uma conta grátis em supabase.com e um projeto novo.
3. Supabase > SQL Editor: abra supabase/schema.sql, troque SEU_EMAIL pelo seu e-mail e rode.
4. Supabase > Authentication > Users > Add user: crie seu e-mail e senha (marque auto-confirm).
   Depois, em Authentication > Sign In / Providers, desative "Allow new users to sign up".
5. Supabase > Project Settings > API: copie a Project URL e a chave anon public.
6. Copie .env.example para .env e cole os dois valores.
7. No terminal, nesta pasta: npm install, depois npm run dev. Abra o endereço mostrado.
8. O painel fica em /#/admin (também há o link "Admin" no rodapé).
9. Publicar: suba a pasta no GitHub, entre na vercel.com com o GitHub, importe o repositório
   e cadastre as duas variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY. Deploy.
