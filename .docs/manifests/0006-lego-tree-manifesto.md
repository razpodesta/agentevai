🏗️ Manifesto de Estrutura: The Lego-Matrix Strategy
A estrutura do Agentevai é regida pelo princípio da Volatilidade Desacoplada: as fundações são imutáveis e rígidas, enquanto as funcionalidades de negócio são fluidas e intercambiáveis como peças de Lego.
🌳 Árvore Hierárquica de Próxima Geração
code
Text
agentevai/
├── .docs/                          # Inteligência Central (ADRs, Manifestos, RFCs)
│   ├── manifests/                  # Regras de ouro e convenções
│   └── architecture/               # Diagramas C4 e fluxos de dados de IA
│
├── apps/                           # Pontas de Lança (Deployables em Vercel/Render)
│   ├── web-portal/                 # Next.js 15: O portal jornalístico de alta performance
│   ├── api-core/                   # NestJS: O orquestrador hexagonal (Gateway)
│   └── admin-cms/                  # Next.js: Gestão interna, auditoria e moderação de IA
│
├── libs/                           # A Matriz de Legos (Workspaces Altamente Especializados)
│   │
│   ├── foundation/                 # 🧱 O "Chão de Fábrica" (Imutável e Puro)
│   │   ├── design-system/          # Aparatos Atômicos puros (Atoms/Molecules)
│   │   ├── design-tokens/          # Tailwind Config, Themes (Dia/Noite), Typo Scales
│   │   ├── internationalization/   # O Motor/Script do compilador de dicionários
│   │   └── types-common/           # Interfaces TS globais (Zero Any Policy)
│   │
│   ├── realms/                     # 🏰 Domínios de Negócio (Bounded Contexts - DDD)
│   │   ├── news/                   # Lógica de Jornalismo, Feeds, Artigos
│   │   │   ├── domain/             # Regras de negócio puras (SOLID)
│   │   │   ├── feature-shell/      # Páginas e rotas inteligentes
│   │   │   ├── data-access/        # Repositórios e TanStack Query hooks
│   │   │   └── ui-components/      # Organismos e Templates de notícias
│   │   ├── community/              # Hilos de conversa, Perfil de Usuário, Social
│   │   ├── complaints/             # O Coração: Sistema de Denúncia Pública
│   │   └── governance/             # Cartas de Apoio Popular e Assinatura Eletrônica
│   │
│   ├── integrations/               # 🔌 Adaptadores Externos (Hexagonal Infrastructure)
│   │   ├── supabase-bridge/        # Auth, PostgreSQL, Storage
│   │   ├── blockchain-ledger/      # Registro inmutável de firmas (Polygon/Merkle)
│   │   ├── ai-orchestrator/        # Bridge para OpenAI/Anthropic/Vision
│   │   ├── search-engine/          # Configuração Meilisearch e Indexação
│   │   └── whatsapp-gateway/       # Webhooks e API de Mensageria
│   │
│   └── orchestration/              # 🧠 Lógica Transversal (Cross-cutting Concerns)
│       ├── viral-engine/           # Gerador de OG-Images, Metadatos e Social Share
│       ├── security-auditor/       # Tracking de IP, Geo-fencing, LGPD Compliance
│       └── analytics-pulse/        # Monitoramento de sentimento e tendências
│
├── tests/                          # 🛡️ O Espelho da Verdade (Mirrored Testing)
│   ├── unit/                       # Testes de lógica de domínio
│   ├── integration/                # Testes de pontes de infraestrutura
│   └── e2e/                        # Playwright: Fluxos críticos do usuário
│
├── tools/                          # 🛠️ Automação de Engenharia
│   ├── scripts/                    # Script de dicionários, DB Migrations
│   └── generators/                 # Nx Custom Generators para novos "Aparatos"
│
└── tests/                          # Pasta espelho conforme o manifesto anterior
💎 Princípios de Especialização dos Workspaces
1. Independência de Deploy
Cada biblioteca dentro de libs/realms é projetada para que, no futuro, possa se tornar um micro-serviço ou uma micro-frontend sem quebrar o ecossistema. O uso de Path Mappings no tsconfig.json garante que as importações sejam sempre limpas (ex: @agentevai/news-data-access).
2. Acoplamento Hierárquico (Nx Tags)
Atoms não conhecem Organisms.
Domain não conhece Infrastructure.
Apps são apenas "shells" que importam e configuram os Legos.
3. I18n-First Apparatus
Nenhum aparato entra em libs/foundation/design-system ou libs/realms/*/ui-components sem o seu respectivo [ApparatusName].schema.json. A internacionalização é uma dependência forçada pela arquitetura.
4. Performance de Elite
O uso de Barrel Files (index.ts) é obrigatório em cada nível para permitir o Tree Shaking agressivo do Webpack/Turbopack, garantindo que o bundle final do portal seja mínimo.

---


