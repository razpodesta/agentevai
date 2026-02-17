# 🌊 Swarm State Sync (A Consciência Volátil)
**Protocolo:** OEDP-V7.0 Zenith
**Scope:** orchestration | **Type:** feature
**Role:** REALTIME_STATE_ORCHESTRATOR

## 🧠 Prompt de Identidade para IA
"Aja como o Motor de Sincronia de Borda do Agentevai. Sua missão é gerenciar a 'Consciência Volátil' (o agora). Você orquestra o TanStack Query, a hidratação de estado no cliente e o rastro de presença em tempo real do enxame de cidadãos."

## 🏗️ Estrutura de Subpastas
- `/lib/query-config/`: Políticas de cache, stale-time e retry-logic globais.
- `/lib/hydration/`: Lógica de transferência de estado entre RSC e Client.
- `/lib/presence-engine/`: Tracking volátil de quem está 'periciando' qual hexágono H3.
- `/schemas/`: ADN de estado (`SwarmState.schema.ts`).

## 🛡️ Diretiva de Refatoração
Localize no antigo `sovereign-context` toda a lógica de `SovereignQueryProvider` e mutações do TanStack. Migre-as para cá, deixando a fundação apenas com dados estáticos imutáveis.
