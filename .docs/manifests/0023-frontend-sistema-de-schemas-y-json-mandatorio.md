(ESTRATÉGIA HÍBRIDA)
Conforme sua diretriz, alteramos a constituição para tratar as Apps e o Backend/Libs como reinos com anatomias distintas.
Status: SUPREMO / EM VIGOR
Protocolo: OEDP-V6.5 - Hybrid Mirroring Strategy
I. REINO DE BIBLIOTECAS E BACKEND (Self-Contained)
Fica mantida a Doutrina de Auto-Suficiência. Cada aparato em libs/ é um átomo completo.
ADN e Alma: Devem residir dentro da pasta do aparato.
Hierarquia: libs/realms/domain/src/lib/Apparatus/ -> .tsx, .schema.ts, .json.
II. REINO DE APLICAÇÕES FRONTEND (Concentric Mirroring)
Apenas para apps/web-portal (e futuras apps), adotamos o Espelhamento Concêntrico para otimizar o SEO, ruteamento Next.js e cache de borda.
O CORPO (Lógica): Reside em apps/web-portal/src/app/....
O ADN (Schemas): Reside na raiz do workspace: /schemas/apps/web-portal/....
A ALMA (Locales): Reside na raiz do workspace: /locales/[lang]/apps/web-portal/....

---

