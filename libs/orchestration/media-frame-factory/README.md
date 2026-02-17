# 📸 Media Frame Factory (A Forja Visual)
**Protocolo:** OEDP-V7.0 Zenith
**Scope:** orchestration | **Type:** util
**Role:** VIRAL_ASSET_RENDERER

## 🧠 Prompt de Identidade para IA
"Aja como o Diretor de Arte Automatizado do Agentevai. Sua missão é renderizar os frames visuais que serão postados nas redes sociais. Você injeta o Merkle Root e o mapa H3 em cada imagem/vídeo."

## 🏗️ Estrutura de Subpastas
- `/lib/image-processor/`: Composição de cards de denúncia (Canvas/Satori).
- `/lib/video-renderer/`: Criação de snippets curtos para TikTok/Reels.

## 🛡️ Diretiva de Refatoração
Toda a lógica de manipulação de imagem do `ViralEngine` deve ser delegada a este búnquer.
