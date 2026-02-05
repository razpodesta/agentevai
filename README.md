<div align="center">
<!-- Logo Placeholder - Substitua a URL abaixo pela imagem real após o upload -->
<img src=".github/assets/agentevai-banner.png" alt="A gente Vai Logo" width="600" />
🇧🇷 Agente Vai ("A Gente Vai")

O Ecossistema Soberano de Governança Cidadã notícias e activismo digital. de Próxima Geração.

![alt text](https://img.shields.io/badge/Autor-Raz%20Podest%C3%A1-blue?style=for-the-badge)

![alt text](https://img.shields.io/badge/Copyright-MetaShark%20Tech-black?style=for-the-badge)

![alt text](https://img.shields.io/badge/Licen%C3%A7a-Unlicensed-red?style=for-the-badge)
</div>

📖 1. Visão e Propósito
"A gente Vai" é uma plataforma de jornalismo, comunidade e denúncia pública projetada para a realidade geopolítica do Brasil. Diferente de portais tradicionais, este projeto utiliza uma arquitetura Lego-Matrix para garantir que cada componente (aparato) seja granular, internacionalizado e pronto para escalabilidade infinita.

O foco central é a Denúncia Pública Verificável, onde a Inteligência Artificial atua como filtro de credibilidade e a tecnologia Blockchain garante a inmutabilidade do apoio popular.

🏗 2. Arquitetura Lego-Matrix (Nx Monorepo)
O projeto é organizado em Workspaces especializados e independentes, permitindo que cada parte do sistema evolua sem comprometer o todo.

🌳 Árvore de Estrutura Granular

```text
agentevai/
├── 📂 apps/                         # Unidades de Entrega (Vercel/Render)
│   ├── 🌐 web-portal/               # Next.js 16: Portal Jornalístico de Performance Elite
│   └── ⚙️ api-core/                 # NestJS: Orquestrador Hexagonal de APIs
├── 📂 libs/                         # A Matriz de Legos (Workspaces)
│   ├── 📂 foundation/               # Alicerces Imutáveis
│   │   ├── 🎨 design-system/        # Aparatos Atômicos puros (Atoms/Molecules)
│   │   └── 🌍 i18n-engine/          # Compilador Soberano de Dicionários
│   ├── 📂 realms/                   # Domínios de Negócio (DDD)
│   │   ├── 📰 news/                 # Jornalismo e Feeds Granulares
│   │   ├── 📢 complaints/           # Coração: Sistema de Denúncia Pública
│   │   └── 🗳️ governance/           # Apoio Popular e Assinaturas Eletrônicas
│   ├── 📂 integrations/             # Adaptadores de Infraestrutura
│   │   ├── ☁️ supabase-bridge/      # Persistência e Auth (FB, Apple, MS)
│   │   ├── ⛓️ blockchain-ledger/    # Registro Inmutável de Firmas
│   │   └── 🤖 ai-oracle/            # Orquestração de LLMs e Vision AI
│   └── 📂 orchestration/            # Lógica Transversal e Saúde
│       ├── 🚀 viral-engine/         # Automação de Difusão em Redes Sociais
│       ├── 🕵️ security-auditor/     # Tracking de IP e LGPD Compliance
│       ├── 📜 sovereign-logger/     # Workspace de Log Verbo e Auditável
│       └── 🧬 ai-self-healing/      # Sistema de Auto-Regeneração e Otimização
└── 📂 tests/   
```                     # Ambiente de QA Espelhado
🧩 3. Explicação Granular dos Workspaces Lego

🧱 Foundation: Design System & i18n
Este é o nível mais baixo da cadeia. Aqui criamos os Aparatos Atômicos. Cada aparato possui seu próprio código .tsx e seus schemas de tradução independentes (.pt.schema.json, .es.schema.json, .en.schema.json). O script compilador une estas peças em dicionários otimizados por rota de idioma.

📰 Realms: O Domínio do Negócio
Baseado em Domain-Driven Design (DDD), cada Realm (Notícias, Denúncias, Governança) é um ecossistema independente. Isso permite que a lógica de "Como se faz uma denúncia" seja isolada da lógica de "Como se comenta em uma notícia", respeitando os princípios SOLID.

⛓ Integrations: Pontes Hexagonais
Aqui residem os adaptadores para tecnologias externas. O destaque é o Blockchain Ledger, que gera um Merkle Root das assinaturas diárias e o ancora em uma rede pública, tornando as petições do portal juridicamente incontestáveis.
🛡 4. Monitoramento e Auto-Perfeccionismo (Novos Workspaces)

📜 Sovereign Logger (O Observador Silencioso)
Um sistema de logging de alta performance e verbosidade extrema. Ele não apenas registra erros, mas mapeia todo o fluxo de vida de um "Aparato".
Tracking Granular: Registra a performance de renderização de cada componente atômico.
AuditTrail: Mantém o histórico de interações críticas (como votos e denúncias) com hash de integridade.

🧬 AI Self-Healing & Optimizer (O Sistema Imunológico)
Este é um workspace independente gerido por uma IA dedicada que analisa os logs do Sovereign Logger.
Auto-Saneamento: Se um padrão de erro é detectado em um componente, a IA sugere ou aplica refatorações na lógica de cache e estado.
Regeneração de Aparatos: Avalia quais componentes estão lentos ou pouco utilizados e propõe uma nova arquitetura para os mesmos.
Métricas de Saúde: Monitora a "temperatura" do monorepo, garantindo que o código permaneça DRY e SOLID.

🌍 5. Estratégia de Internacionalização Soberana
O Agentevai utiliza o sistema de Rotas de Idioma Independentes.
Ao rodar o compilador, o sistema gera:
public/locales/pt/dictionary.json
public/locales/es/dictionary.json
public/locales/en/dictionary.json
Cada idioma é um "Lego" que se encaixa no portal dinamicamente com base na geolocalização detectada.

🛠 6. Guia de Instalação e Execução

Pré-requisitos
Node.js 20+
pnpm 9+
Nx CLI (npm install -g nx)
Setup Inicial

```Bash
git clone https://github.com/agentevai/core.git
cd agentevai
pnpm install
```

Compilar Dicionários i18n

```Bash
nx run foundation-internationalization-engine:build-dictionaries
```
📝 7. Direitos Autorais e Licença
Copyright © 2024 MetaShark Tech

Autor  Raz Podestá

Este software é fornecido como Unlicensed. Todos os direitos são reservados aos detentores do copyright. É proibida a reprodução, distribuição ou modificação sem autorização expressa da MetaShark Tech.
