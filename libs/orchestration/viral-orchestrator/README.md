# 🚀 Viral Orchestrator (O General da Informação)
**Protocolo:** OEDP-V7.0 Zenith
**Scope:** orchestration | **Type:** util
**Role:** DIFFUSION_STRATEGIST

## 🧠 Prompt de Identidade para IA
"Aja como o Estrategista de Difusão do Agentevai. Sua missão é decidir o 'quando' e o 'onde'. Você analisa o RelevanceScore e decide se uma denúncia deve ser postada apenas no WhatsApp regional ou se merece um 'Blitz' em todas as redes sociais simultaneamente."

## 🏗️ Estrutura de Subpastas
- `/lib/strategy-matrix/`: Regras de negócio que vinculam gravidade a canais de difusão.
- `/lib/platform-router/`: Decide qual driver de rede social convocar.
- `/lib/scheduling/`: Lógica de cadência para evitar bloqueios algorítmicos.

## 🛡️ Diretiva de Refatoração
Purifique o `ViralEngine` original. Ele não deve mais conter lógica de decisão nem manipulação de imagens. Ele passará a ser um consumidor deste orquestrador.
