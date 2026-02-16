# 🌐 Synthetic Ingestion: O Olho Externo
**Protocolo:** OEDP-V7.0 Zenith  
**Role:** EXTERNAL_VISION_ADAPTER

## 📖 Visão e Propósito
Captura o pulso do mundo externo (Portais de notícias, RSS, Diários Oficiais) para alimentar o ecossistema com tendências regionais.

## 🧬 Lógica e Especialização
- **Mudança de Lógica:** O sistema agora "vê" o que a grande mídia fala e usa o `intelligence-hub` para remover o viés antes de propor um rascunho ao `editorial-bunker`.

## 🧱 Anatomia de Subpastas
- `/lib/scrapers/`: Drivers para extração de dados de portais específicos.
- `/lib/rss-orchestrator/`: Monitoramento de feeds globais e nacionais.
- `/lib/neutralizer/`: Atuador de IA que remove adjetivos e viés político da fonte original.