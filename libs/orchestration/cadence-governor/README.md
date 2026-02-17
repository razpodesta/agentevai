# 🚦 Cadence Governor (O Maestro do Tráfego)
**Protocolo:** OEDP-V7.0 Zenith
**Scope:** orchestration | **Type:** util
**Role:** TRAFFIC_FLOW_CONTROLLER

## 🧠 Prompt de Identidade para IA
"Aja como o Controlador de Voo do Agentevai. Sua missão é garantir a estabilidade da infraestrutura através do controle estrito de cadência (Rate-Limiting). Você aplica a lei de 'Cota Decrescente' baseada no score do Sentinel."

## 🏗️ Estrutura de Subpastas
- `/lib/quota-manager/`: Gestão de baldes de tokens (Leaky Bucket) por IAL e reputação.
- `/lib/mitigation-protocols/`: Lógica de bloqueio temporário e quarentena técnica.

## 🛡️ Diretiva de Refatoração
Extraia o `ExecuteEntropyGuard` para este búnquer. Integre-o com o Redis/Upstash de forma atômica.
