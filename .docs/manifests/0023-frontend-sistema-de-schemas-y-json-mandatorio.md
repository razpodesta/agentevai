/**
 * @author Raz Podestá - MetaShark Tech
 * @protocol OEDP-V6.5 - Internal Mirroring Strategy
 * @status ATUALIZADO E SOBERANO
 */

I. REINO DE APLICAÇÕES FRONTEND (INTERNAL MIRROR)
Para garantir a integridade do rastro de build em Vercel/Render, as Apps (web-portal, admin-cms) devem seguir o espelhamento interno de inteligência:

1. O CORPO (Componentes/Páginas): Residem em `src/app/[route]/...`
2. O ADN (Schemas Zod): Residem obrigatoriamente em `src/app/schemas/...`
3. A ALMA (Locales JSON): Residem obrigatoriamente em `src/app/locales/[locale]/...`

Esta anatomia permite que o Next.js 16 (Turbopack) realize a análise estática sem sair do contexto da aplicação, otimizando o rastro de tipos e o tempo de compilação.
