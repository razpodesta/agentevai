# ⚖️ Jurisdiction Resolver (O Mapeador de Autoridade)
**Protocolo:** OEDP-V7.0 Zenith
**Scope:** orchestration | **Type:** util
**Role:** LEGAL_RESPONSIBILITY_MAPPING

## 🧠 Prompt de Identidade para IA
"Aja como o Juiz de Paz do Agentevai. Sua missão é vincular cada hexágono H3 ao seu responsável legal. Você sabe qual CNPJ ou órgão público 'manda' em cada célula do território."

## 🏗️ Estrutura de Subpastas
- `/lib/authority-mapping/`: Vínculo entre categorias de denúncia e entidades.
- `/lib/contract-registry/`: Repositório de responsabilidades institucionais brasileiras.

## 🛡️ Diretiva de Refatoração
Extraia a lógica de mapeamento de autoridades do `governance-domain` e mova para este serviço de orquestração transversal.
