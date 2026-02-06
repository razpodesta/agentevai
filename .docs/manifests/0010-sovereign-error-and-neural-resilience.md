Manifesto: Erro Soberano e Resiliência Neural (OEDP V5.0)
// .docs/manifests/0010-sovereign-error-and-neural-resilience.md
I. Filosofia: O Erro como ADN de Evolução
No ecossistema Agentevai, um erro não é uma interrupção, mas uma sinalização de entropia. Todo colapso deve ser encapsulado em um objeto de "Erro Soberano" capaz de alimentar o aprendizado da IA de autocura.
II. Taxonomia e Identidade do Erro
Mantemos o padrão OS-[CAMADA]-[CÓDIGO], mas expandimos a estrutura para ser "IA-Readable":
OS-CORE: Falhas de infraestrutura pura (DB, Network).
OS-COG: Falhas de inferência ou alucinação detectadas.
OS-INT: Falhas de integração (ERP, Redes Sociais).
OS-APP: Violação de lógica de aparato ou contrato.
III. O Aparato de Diagnóstico Neural (The Diagnostic Packet)
Todo reporte ao Sentinel deve agora incluir obrigatoriamente:
apparatusContext: Nome e versão do Lego que falhou.
inputSanitizationSnapshot: O payload que causou o erro (anonimizado).
forensicTraceId: UUID para correlacionar logs de telemetría.
recoverySuggestionPrompt: Uma breve descrição técnica gerada pelo aparato para guiar a IA.
IV. Protocolo de Resiliência de 3 Camadas
Capa 1: Resiliência Atômica (Retentativa): Executada pelo Sentinel (executeWithResilience) para erros transitórios.
Capa 2: Degradação Graciosa (Fallback): Se a retentativa falha, o aparato deve retornar um "Estado de Segurança" (ex: modo offline ou cache).
Capa 3: Intervenção Neural (Self-Healing): O Sentinel notifica o ai-neural-auditor. A IA analisa o histórico de erros do aparato e sugere uma refatoração ou patch via admin-dashboard.

---

