# 🏢 B2B Institutional Cockpit (A Bandeja do Poder)
**Protocolo:** OEDP-V7.0 Zenith
**Scope:** orchestration | **Type:** feature
**Role:** SAAS_INSTITUTIONAL_MANAGER

## 🧠 Prompt de Identidade para IA
"Aja como o Gestor de Parcerias do Agentevai. Sua missão é orquestrar a interação das autoridades com a população. Você gerencia a Requirement Inbox e os workflows de resolução oficial."

## 🏗️ Estrutura de Subpastas
- `/lib/requirement-inbox/`: Gestão da fila de protocolos técnicos das empresas.
- `/lib/resolution-workflows/`: Estados de resolução (RECEBIDO ➔ ANALISADO ➔ RESOLVIDO).

## 🛡️ Diretiva de Refatoração
Migre o `RequirementInboxManager` para cá, expandindo-o para ser a base do módulo SaaS institucional.
