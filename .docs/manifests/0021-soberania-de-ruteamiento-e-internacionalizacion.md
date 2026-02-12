MANIFESTO 0021: SOBERANIA DE RUTEAMENTO E INTERNACIONALIZAÇÃO (ZENITH EDITION)
Autor: Raz Podestá - MetaShark Tech
Versão: 6.0.0
Status: VITAL / MANDATÓRIO
Protocolo: OEDP-V6.0 - High Performance Geopolitical Logic
I. A TRINDADE DO RUTEAMENTO (THE HOLY TRINITY)
Toda URL no ecossistema Agentevai deve respeitar a hierarquia de consciência trinitária, garantindo que o rastro forense do cidadão esteja vinculado ao seu território e cultura.
Estrutura Canônica:
/[locale]/[country-slug]/[state-slug]/[city-slug]/[realm]/[resource-identifier]
[locale] (Identidade Cultural): Padrão IETF BCP 47 (pt-BR, es-ES, en-US). Define o dicionário semântico.
[country-slug] (Soberania Nacional): Padrão ISO 3166-1 alpha-2 em minúsculo (br, es, us). Define as leis e o SovereignDataVault.
[context-hierarchy] (Ancoragem Territorial): A segmentação granular do território ([state]/[city] ou nacional).
II. MATRIZ DE ROTAS DETERMINÍSTICAS
Abaixo, a definição das rotas mestre que governam o enxame de notícias e denúncias.
Realm (Reino)	Propósito	Rota de Elite (Exemplo Brasileiro)
Zenith	Portal Nacional	/pt-BR/br/nacional
News	Feed Regional	/pt-BR/br/sc/florianopolis/noticias
Complaints	Lista de Denúncias	/pt-BR/br/sp/sao-paulo/denuncias
Forensic	Detalhe do Fato	/pt-BR/br/rj/paraty/denuncia/[complaint-identifier]
Governance	Cartas de Apoio	/pt-BR/br/ce/quixada/apoio-popular
Identity	Perfil do Cidadão	/pt-BR/br/perfil/[citizen-identifier]
III. PILARES DE ENGENHARIA DE INTERNACIONALIZAÇÃO
1. Erradicação do Vácuo Semântico (Hreflang Sovereignty)
O sistema deve injetar automaticamente tags link rel="alternate" hreflang="..." em cada página, permitindo que os motores de busca (Google/Bing) indexem a verdade jornalística no idioma correto do cidadão.
2. Transmutação de Slugs (SEO DNA)
Título de notícias e nomes de cidades devem ser transmutados via TransmuteTextToSlug para garantir que caracteres especiais (acentos/cedilhas) não corrompam o rastro da URL.
❌ /pt-BR/br/sp/são-paulo/notícias/inundação
✅ /pt-BR/br/sp/sao-paulo/noticias/inundacao
3. Middleware de Borda (Edge Resolution)
A resolução da rota deve ocorrer no Edge Runtime (Vercel/Render) via SovereignMiddleware. O sistema deve detectar o IP, consultar o LookupTerritorialAnchor e redirecionar o cidadão para o seu Jornal Local automaticamente no primeiro acesso.
🛰️ IV. ARQUITETURA DE LOCALES (O2O SYNC)
Para suportar os 3 idiomas iniciais e expandir para o nível global, o diretório de locales nas Apps será estruturado como uma Célula de Espelhamento:
code
Text
apps/web-portal/public/locales/
├── pt-BR/
│   └── dictionary.json (Consolidado de todos os aparatos)
├── es-ES/
│   └── dictionary.json
└── en-US/
    └── dictionary.json