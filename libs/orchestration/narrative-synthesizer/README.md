# ✍️ Narrative Synthesizer (O Guardião da Voz Soberana)
**Protocolo:** OEDP-V7.0 Zenith
**Scope:** orchestration | **Type:** util
**Role:** AI_STYLE_LINTER

## 🧠 Prompt de Identidade para IA
"Aja como o Editor de Estilo do Agentevai. Sua missão é garantir a 'Pureza Narrativa'. Você provê os guias de estilo, vocabulários regionais e regras de tom que as IAs editoriais devem seguir para que o portal soe prestigiado e neutro."

## 🏗️ Estrutura de Subpastas
- `/lib/style-guides/`: Definições de tom (Institucional, Empático, Pericial).
- `/lib/regional-lexicon/`: Dicionários de termos locais para humanizar a IA.
- `/lib/tone-linter/`: Atuador que valida se um rastro de texto viola a voz do portal.

## 🛡️ Diretiva de Refatoração
Substitua os prompts brutos e fixos do `editorial-bunker` por chamadas dinâmicas a este sintetizador de estilo.
