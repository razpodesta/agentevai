# 🧠 Neural Vault: O Búnquer de Memória Vetorial
**Protocolo:** OEDP-V7.0 Zenith  
**Role:** SEMANTIC_MEMORY_PROVIDER

## 📖 Visão e Propósito
Implementa a memória de longo prazo do sistema via **Busca Vetorial (RAG)**. Ele permite que o Agentevai "lembre" de soluções passadas para economizar processamento e tokens.

## 🧬 Lógica e Especialização
- **Mudança de Lógica:** Saímos da busca por "palavra-chave" para a busca por "significado".
- **Economia:** Antes de processar uma nova denúncia, consulta-se este búnquer: "Já resolvemos algo similar no hexágono vizinho?".

## 🧱 Anatomia de Subpastas
- `/lib/vector-drivers/`: Integração com Upstash Vector ou Supabase pgvector.
- `/lib/embeddings/`: Transmuta texto em rastro matemático (vetores).
- `/lib/similarity-orchestrator/`: Calcula o score de aderência semântica.