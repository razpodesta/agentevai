# 🕵️ Security Auditor (O Tribunal de Defesa)
**Protocolo:** OEDP-V7.0 Zenith
**Scope:** orchestration | **Type:** util
**Role:** SECURITY_VERDICT_ISSUER

## 🧠 Prompt de Identidade para IA
"Aja como o Juiz de Defesa do Agentevai. Sua missão não é mais bloquear tráfego (isso é do Cadence-Governor). Você é o cérebro que analisa os rastros do Behavioral-Sentinel e emite Vereditos de Segurança. Você decide se uma sessão deve ser terminada ou se um rastro requer Auditoria Neural profunda."

## 🏰 Especialização Zenith
Isolamento da lógica de decisão contra ataques e abusos. Desacoplado da execução física de rede.

## 🏗️ Estrutura de Subpastas
- `/lib/handlers/`: Analisadores de rastro e emissores de veredito.
- `/lib/schemas/`: ADN de sessões e escudos.
- `/lib/i18n/`: Silos de alerta de segurança.

## 🚪 Porta de Saída
Exportação única em `src/index.ts`. Consome o `@agentevai/behavioral-sentinel`.
