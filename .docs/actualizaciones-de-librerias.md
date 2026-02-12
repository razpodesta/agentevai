MANIFESTO DE ATUALIZAÇÃO E VIGILÂNCIA DE DEPENDÊNCIAS
PROTOCOLO: OEDP-V6.0 - ZENITH EDITION
OPERADOR: AUDITOR NEURAL (META-SHARK TECH - NÍVEL DIOS)
ASSUNTO: ERRADICAÇÃO DE RADIAÇÃO TÉCNICA E OBSOLESCÊNCIA (SOCKET.IO & NOVU)
ESTADO DA INFRAESTRUTURA: DEGRADADO (INTERVENÇÃO MANDATÓRIA)
🔍 DIAGNÓSTICO DE ENTROPIA (ANALYSIS REPORT)
A execução do comando pnpm add revelou três focos de contaminação e obsolescência que violam o Pilar I (SRP Elite) e o Pilar VIII (Infraestrutura ESM Soberana). Manter estas bibliotecas é aceitar dívida técnica em um runtime de 2026.
1. Foco Alfa: @types/socket.io (Radiação Redundante)
Falha: O pacote @types/socket.io é um stub (casca vazia).
Veredito: A biblioteca socket.io versão 4+ já porta seus próprios esquemas de ADN (tipos nativos). A instalação de @types externos introduz redundância e potenciais conflitos de declaração de ambiente.
2. Foco Beta: @novu/notification-center (Fim de Ciclo Vital)
Falha: Suporte encerrado em 03 de Abril de 2025.
Risco: Incompatibilidade com o motor de renderização do React 19+ e vulnerabilidades de segurança não corrigidas.
Substituto Soberano: @novu/react (Componente <Inbox />) ou @novu/js.
3. Foco Gama: @novu/node (Depreciação de SDK)
Falha: Suporte encerrado em 20 de Março de 2025.
Risco: Perda de eficiência na orquestração de notificações via NotificationNexus.
Substituto Soberano: @novu/api (Nova SDK unificada para runtimes JS modernos).
🛡️ MANIFESTO DE ATUALIZAÇÃO (UPGRADE DIRECTIVES)
Para alinhar o ecossistema Agentevai ao padrão de elite, as seguintes transmutações devem ser executadas nos respectivos Workspaces:
I. SANEAMENTO DE REDE (SOCKET.IO)
Ação: Remoção imediata de @types/socket.io.
Workspace: apps/api-core e libs/foundation/sovereign-logger.
Comando Nuclear: pnpm remove @types/socket.io
II. TRANSMUTAÇÃO DE MENSAGERIA (NOVU ECOSYSTEM)
Camada de Integração (Server-Side):
Substituir @novu/node por @novu/api.
Aparato: libs/orchestration/notification-nexus.
Justificativa: A nova SDK @novu/api é otimizada para ESM e possui menor pegada de memória.
Camada de Aplicação (Front-End):
Substituir @novu/notification-center por @novu/react.
App: apps/web-portal.
Ação: Migrar do padrão "Notification Center" legado para a nova arquitetura "Sovereign Inbox".

---

