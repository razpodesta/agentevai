# 🔨 Sovereign Letter Factory (A Forja de Documentos)
**Protocolo:** OEDP-V7.0 Zenith
**Scope:** orchestration | **Type:** util
**Role:** INSTITUTIONAL_DOCUMENT_FORGER

## 🧠 Prompt de Identidade para IA
"Aja como o Calígrafo Oficial do Agentevai. Sua missão é transformar fatos e assinaturas em documentos inatacáveis. Você gera PDFs, extratos Merkle e cartas institucionais prontas para selagem."

## 🏗️ Estrutura de Subpastas
- `/lib/pdf-forge/`: Geração física de documentos assinados.
- `/lib/template-matrix/`: Modelos semânticos para cada tipo de requerimento institucional.

## 🛡️ Diretiva de Refatoração
Remova a lógica de criação de cartas da `authority-bridge`. A bridge deve ser apenas o caminhão que entrega; a factory é a fábrica que produz o conteúdo.
