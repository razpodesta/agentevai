Manifesto 0013: Stack Tecnológico de Próxima Geração (OEDP-V5.5)
Projeto: Agentevai (A gente Vai)
Arquitetura: Lego-Matrix Hybrid (Clean-Hexagonal-DDD)
Engenharia: MetaShark Tech
Autor: Raz Podestá
1. Visão de Soberania Tecnológica
O Agentevai não utiliza bibliotecas por conveniência, mas por Determinismo de Performance e Poder. Nosso objetivo é criar uma infraestrutura que se auto-regenera, valida a identidade cidadã via Blockchain e orquestra a viralização de denúncias públicas com latência zero.
Este stack foi selecionado para erradicar a dívida técnica e garantir que o software seja um organismo vivo capaz de evoluir conforme o pulso social do Brasil.
2. Justificativa Granular do Ecossistema (Parte 1: Inteligência e Dados)
🧠 2.1. Orquestração de Inteligência Artificial (The AI Oracle)
Biblioteca	Função no Agentevai	Justificativa de Elite
@google/generative-ai	Motor de Inferência Primário	O Gemini 1.5/2.0 oferece a maior janela de contexto (2M tokens), vital para analisar milhares de denúncias agrupadas.
langchain	Orquestrador de Cadeias de Pensamento	Permite criar fluxos complexos (Chains) que conectam a IA com nossas APIs de Redes Sociais e Banco de Dados sem acoplamento.
anthropic & openai	Motores de Auditoria Cruzada	Usamos o Claude 3.5 Sonnet para refatoração de código (Auditor Neural) e o GPT-4o para triagem de segurança.
🗄️ 2.2. Persistência e Memória (The Sovereign Data Layer)
Biblioteca	Função no Agentevai	Justificativa de Elite
@prisma/client	Sincronizador de ADN Relacional	O Prisma 7 garante tipagem estrita de ponta a ponta, eliminando erros de runtime em transações complexas de usuários.
@upstash/redis	Cache Volátil e Memória de Sessão	Baseado em HTTP/REST, é o único capaz de manter o estado do usuário entre o Edge (Vercel) e o Core (Render) com latência <10ms.
meilisearch	Motor de Busca Geo-Semântica	Superior ao Algolia em custo e controle; permite buscas instantâneas por rua e cidade no Brasil com tolerância a erros.
@upstash/workflow	Orquestração de Longa Duração	Gerencia o ciclo de vida de uma denúncia (ex: esperar 24h por assinaturas antes de disparar o Authority Bridge).
3. O Prompt de Auditoria para IA Externa (Master Template)
Este é o comando que você deve fornecer para que outra IA analise o snapshot do nosso projeto:
"Aja como um Lead Software Architect de Nível Dios da MetaShark Tech. Analise o snapshot do projeto 'Agentevai'. Este projeto utiliza o protocolo OEDP-V5.5 baseado em um Monorepo Nx com Next.js 16 (React 19) e NestJS 11.
Missão da Auditoria:
Integridade de Lego: Verifique se as fronteiras de módulos (libs/realms, libs/foundation, libs/integrations) respeitam DDD e SOLID.
Sincronia de ADN: Analise o package.json e verifique se as bibliotecas de Blockchain (merkletreejs) e Viralização (twitter-api-v2) estão devidamente integradas na lógica de orquestração.
Detecção de Regressões: Identifique se há qualquer uso de 'any' ou abreviações que violem os Manifestos 0002 e 0005.
Brainstorming Proativo: Sugira melhorias no sistema de agrupamento semântico de denúncias e na lógica de auto-saneamento (Self-healing) baseada nos logs do Sovereign Logger.
O foco absoluto é a Credibilidade, Soberania e Respeito Institucional do portal."

2. Justificativa Granular do Ecossistema (Parte 2: Interface e Soberania)
🎨 2.3. Interface e Experiência Cinética (The Visual Skin)
Biblioteca	Função no Agentevai	Justificativa de Elite
framer-motion	Micro-interações e Transições	Essencial para a "Experiência Cinética". No Agentevai, o movimento comunica estado (ex: pulso de geolocalização), não é apenas decorativo.
next-themes	Gestão de Identidade Visual (Dia/Noite)	Garante que o switch entre os modos Obsidian (#000) e Milk (#FFF) seja persistente e livre de flashes de luz (FOUC) em SSR.
sonner	Notificações de Feedback Operativo	Sistema de toasts de alta performance para confirmar assinaturas e logs de erro em tempo real sem bloquear a UI.
lucide-react	Iconografia Técnica e Minimalista	Fornece uma linguagem visual limpa e consistente, vital para a estética editorial de elite do portal.
🔒 2.4. Soberanía Criptográfica e Integridade (The Final Seal)
Biblioteca	Função no Agentevai	Justificativa de Elite
merkletreejs & keccak256	Registro Inmutável de Assinaturas	Criamos uma Árvore de Merkle para cada carta de apoio popular. Milhares de assinaturas são resumidas em um único Hash, economizando gás na Blockchain e garantindo integridade.
@noble/hashes	Criptografia de Baixo Nível	Bibliotecas de hashing auditadas e seguras para gerar as "Digitais Criptográficas" dos usuários logados, cumprindo a LGPD de forma soberana.
3. Funcionalidades e Casos de Uso: A Missão Agentevai
O projeto é estruturado para resolver o abismo entre a indignação cidadã e a ação governamental.
📢 3.1. Caso de Uso: Denúncia Pública Verificável (Action Guard)
O Problema: Denúncias soltas na internet não geram impacto legal e são fáceis de ignorar.
A Solução Agentevai:
O usuário (logado via FB/Apple/MS) envia uma denúncia.
O security-auditor captura metadatos (IP, Geo) e os criptografa.
A denúncia fica em estado de "Coleta de Apoio".
Ao atingir o quórum regional, o authority-bridge gera uma carta formal, sela o Hash na Blockchain e despacha via e-mail e rede social para a autoridade responsável.
🧩 3.2. Caso de Uso: Agrupamento Semântico (Semantic Clustering)
O Problema: 100 pessoas denunciando o mesmo buraco na rua criam 100 notícias fragmentadas.
A Solução Agentevai:
O semantic-clustering (via RAG) analisa o texto e a geolocalização.
A IA identifica a duplicidade e sugere ao usuário: "Este problema já está sendo cobrado por 50 vizinhos. Deseja unir sua voz?".
Isso consolida a relevância e evita o spam de notícias inúteis.
4. A Lógica dos Workspaces Lego: Por que a Granularidade?
A existência de dezenas de Workspaces não é complexidade, é Segurança de Mudança.
libs/foundation (Os Alicerces): Contém os átomos (botões, inputs) que nunca mudam a lógica, apenas a aparência. Se mudarmos o branding, mudamos apenas aqui.
libs/realms (Os Reinos): Cada domínio (News, Complaints, Geography) é autônomo. Podemos refatorar todo o sistema de notícias sem o risco de quebrar o sistema de denúncias.
libs/integrations (As Mãos): Onde o código se torna impuro (depende de terceiros como WhatsApp ou Supabase). Se decidirmos trocar o WhatsApp pelo Telegram, alteramos apenas o whatsapp-gateway.
libs/orchestration (O Sistema Nervoso): Aqui vive a inteligência. O sovereign-logger e o ai-self-healing observam os outros workspaces e garantem que o organismo continue vivo.
🧠 O Prompt de Auditoria para a Próxima IA (Enriquecido)
"Analise o snapshot do projeto Agentevai. Foco na Fase de Hidratação 5.5.
Questão Estratégica: Dado que o projeto usa merkletreejs para assinaturas e pino para logs verbosos, como podemos integrar o ai-neural-auditor para que ele não apenas detecte erros, mas gere automaticamente um 'Post de Transparência' no feed de notícias quando o sistema detectar uma tentativa de manipulação de assinaturas?
Objetivo: O sistema deve ser 'Auto-Auditável' e usar a IA para traduzir logs técnicos em confiança pública."**

2. Justificativa Granular do Ecossistema (Parte 3: Detalhamento Técnico)
🧠 2.5. Motores de Cognição e IA (The Neural Hub)
@google/generative-ai
Como usaremos: Será o motor primário do ai-oracle. Responsável por ler grandes volumes de denúncias regionais e criar resumos executivos.
Justificativa: Escolhemos o Gemini 1.5/2.0 pela sua Janela de Contexto de 2 Milhões de Tokens. Para agrupar denúncias de uma cidade inteira (ex: Florianópolis), precisamos que a IA "leia" centenas de documentos simultaneamente para encontrar padrões sem perder o fio condutor.
langchain
Como usaremos: No ai-model-orchestrator para gerenciar as "Tools" (ferramentas). Permitirá que a IA decida, por exemplo, quando deve consultar o banco de dados vectorial ou quando deve disparar uma notificação via authority-bridge.
Justificativa: É a biblioteca padrão para Cadeias de Pensamento (Chain of Thought). Ela abstrai a complexidade de alternar entre diferentes modelos de IA, garantindo que o Agentevai seja agnóstico a fornecedores.
anthropic (Claude 3.5 Sonnet)
Como usaremos: Exclusivamente no ai-neural-auditor para Refatoração de Código e Auditoria de Lógica.
Justificativa: O Claude 3.5 Sonnet é atualmente superior ao GPT-4 em tarefas de codificação e seguimento de instruções complexas (como os nossos Manifestos OEDP). Ele será o "médico" que opera o nosso código.
📊 2.6. Observabilidade e Logs (The Nervous System)
pino & pino-pretty
Como usaremos: No sovereign-logger para gerar logs em formato JSON estruturado.
Justificativa: O Pino é o logger mais rápido para Node.js. Logs estruturados em JSON são essenciais porque são nativamente legíveis por IA. O pino-pretty será usado apenas em desenvolvimento para leitura humana.
⚡ 2.7. Persistência e Workflows (The Backbone)
@upstash/workflow
Como usaremos: Para gerenciar o ciclo de vida das denúncias. Exemplo: "Se uma denúncia de esgoto atingir 100 assinaturas, aguarde 2 horas por validação de imagem da IA e então dispare a viralização".
Justificativa: Permite criar Workflows Duráveis. Se o servidor cair no meio de um processo de 24 horas, o Upstash Workflow retoma exatamente de onde parou, garantindo que nenhuma denúncia cidadã se perca no limbo.
meilisearch
Como usaremos: No search-engine para busca instantânea de notícias e denúncias por rua, bairro ou autoridade.
Justificativa: Oferece Typo-tolerance (tolerância a erros) extrema. No Brasil, nomes de ruas e autoridades são complexos; o Meilisearch garante que o usuário encontre o que procura mesmo digitando com erros, com latência menor que 50ms.
🔗 2.8. Soberania e Blockchain (The Legal Shield)
merkletreejs & keccak256
Como usaremos: No blockchain-ledger para agrupar as assinaturas eletrônicas dos usuários em uma estrutura de árvore.
Justificativa: É a tecnologia por trás do Bitcoin e Ethereum. Permite provar que a assinatura de um cidadão faz parte de um documento público sem precisar expor os dados privados do cidadão, garantindo privacidade e inmutabilidade.
@noble/hashes
Como usaremos: Para gerar identificadores únicos de dispositivos e hashes de segurança para o security-auditor.
Justificativa: É uma biblioteca de criptografia moderna, sem dependências e auditada. Ao contrário do crypto nativo que pode variar entre versões de Node, o Noble garante o mesmo hash em qualquer ambiente (Edge ou Server).
📱 2.9. Real-time e Social (The Interaction Layer)
socket.io & @nestjs/websockets
Como usaremos: Para os Hilos de Conversação e o Live Feed de notícias. Quando uma nova denúncia crítica surge em Florianópolis, todos os usuários logados na região recebem um pulso visual instantâneo.
Justificativa: É a solução mais robusta para comunicação bidirecional. O NestJS fornece um módulo oficial que respeita nossos princípios de injeção de dependência e SOLID.
twitter-api-v2 & facebook-nodejs-business-sdk
Como usaremos: No viral-social-bridge para automatizar a publicação de resultados de denúncias.
Justificativa: Usar os SDKs oficiais garante que o Agentevai não seja banido por comportamento de bot, permitindo o uso de tokens de acesso oficiais de "Instituição de Notícias".
5. Conclusão do Stack de Elite
Este conjunto de ferramentas foi escolhido para criar um Fosso Defensivo Tecnológico. O Agentevai não é apenas um site; é uma máquina de governança que usa:
IA para entender o povo.
Blockchain para validar o apoio.
Real-time para mobilizar a massa.
Workflows para garantir a execução legal.

---

ADENDO AO MANIFESTO 0013 (POST-AUDIT UPDATE - 2026.02.06)
Título: Refino de Soberania Digital e Erradicação de Entropia
Status: IMPLEMENTADO
Responsável: Lead Software Architect (MetaShark Tech)
6. Atualizações de Engenharia (Ciclo de Estabilização 5.5.1)
Após auditoria forense no snapshot inicial, foram decretadas as seguintes alterações no núcleo do Agentevai, visando a redução da superfície de ataque e o aumento do determinismo técnico:
Ação Técnica	Justificativa de Elite	Impacto na Soberania
Depreciação de axios e form-data	O motor nativo fetch (Next.js 16/Node 22+) agora gerencia caches e interceptores de forma superior, eliminando 25kb de bundle size e reduzindo latência em RSC.	Independência: Menos dependência de terceiros para comunicações HTTP críticas.
Erradicação de crypto-js e uuid	Substituição pelo uso de @noble/hashes e crypto.randomUUID() nativo. O crypto-js é uma biblioteca legada que não respeita o padrão de performance OEDP-V5.5.	Segurança: Utilização de primitivos criptográficos auditados e resistentes a ataques de tempo (timing attacks).
Introdução de snarkjs e ZKP	Implementação de Provas de Conhecimento Zero para denúncias.	Privacidade: Permite validar que um usuário é real e local sem expor seu IP ou identidade civil no banco de dados, blindando o projeto contra intimações judiciais de dados.
Migração para @anthropic-ai/sdk	Correção de placeholder inválido no package.json para garantir que o AI-Neural-Auditor utilize o Claude 3.5 Sonnet com tipagem estrita.	Inteligência: Garante que a auditoria de código seja feita pelo modelo com maior raciocínio lógico disponível em 2026.
OpenTelemetry (OTel) no Sovereign Logger	O logger deixa de ser uma biblioteca passiva para se tornar um stream de telemetria desacoplado.	Resiliência: Resolve o acoplamento circular entre Auditoria e Logging, permitindo observabilidade em tempo real sem gargalos.
7. Determinação de "Zero-Any" e Tipagem de Ativos
Fica estabelecido que arquivos de definição de tipos (como index.d.ts) que utilizem any para ativos (SVG, Imagens) devem ser refatorados para interfaces explícitas. A presença de any é considerada um "vazamento de radiação técnica" que impede a autocura da IA (AI-Self-Healing) de compreender o fluxo de dados.
"A arquitetura perfeita não é aquela onde nada mais pode ser adicionado, mas aquela onde nada mais pode ser removido sem comprometer a verdade."
— Raz Podestá, MetaShark Tech.

---


