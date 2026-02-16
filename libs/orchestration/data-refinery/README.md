# ⚗️ Data Refinery: A Aduana de Pureza
**Protocolo:** OEDP-V7.0 Zenith  
**Role:** DATA_PURIFICATION

## 📖 Visão e Propósito
O dado bruto do cidadão é "petróleo sujo" (emocional, ruidoso). Este workspace limpa, normaliza e classifica o dado antes que ele toque qualquer banco de dados ou lógica de domínio.

## 🧬 Lógica e Especialização
- **Mudança de Lógica:** A denúncia não entra mais "como o usuário escreveu". Ela passa pelo `FactSanitizer.ts`.
- **NLP Local:** Usa bibliotecas locais para remover ruído antes de gastar tokens na nuvem.

## 🧱 Anatomia de Subpastas
- `/lib/sanitizers/`: Remoção de insultos e dados sensíveis desnecessários.
- `/lib/classifier/`: Enquadramento automático na `sovereign-taxonomy`.
- `/lib/entity-extractor/`: Identifica nomes, locais e datas no texto bruto.