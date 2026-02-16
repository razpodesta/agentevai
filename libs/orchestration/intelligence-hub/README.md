# 🤖 Intelligence Hub: O Maestro Neural
**Protocolo:** OEDP-V7.0 Zenith  
**Role:** COGNITIVE_NEGOTIATOR

## 📖 Visão e Propósito
Centraliza o diálogo com Modelos de Linguagem (LLMs). Ele é o responsável pela **Soberania Financeira**, garantindo o menor custo por token através do "Handshake de Economia".

## 🧬 Lógica e Especialização
- **Mudança de Lógica:** O código não chama mais "Gemini" ou "Claude" diretamente. Ele pede uma "Tarefa Cognitiva" ao Hub.
- **Ruteamento:** Decide se usa Llama 3 (Groq/Free) para tarefas triviais ou Claude 3.5 para perícia de código.

## 🧱 Anatomia de Subpastas
- `/lib/negotiator/`: Lógica de decisão de modelo (Custo vs Precisão).
- `/lib/prompt-factories/`: Silos de "instrução mestre" para cada persona de IA.
- `/lib/drivers/`: Adaptadores leves para OpenAI, Anthropic, Google e Groq.