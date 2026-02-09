📜 _BITACORA-DEL-PROYECTO.md: MEMORIA NEURAL AGENTEVAI
INSTRUCCIONES PARA LA IA:
Contexto: Este archivo es la Única Fuente de Verdad (SSOT) sobre el historial, decisiones y progreso del proyecto Agentevai.
Uso: Antes de cualquier acción, lee este archivo para entender qué se ha construido, bajo qué manifiestos y hacia dónde vamos.
Actualización: Al final de cada sesión, añade una nueva entrada incremental. Nunca borres el historial anterior.
Formato: Usa --- para separar sesiones y mantén un tono de ingeniería de élite (OEDP-V5.5).
🏛️ INTRODUCCIÓN Y VISIÓN HOLÍSTICA
Agentevai es un ecosistema de gobernanza ciudadana, periodismo de precisión y activismo digital diseñado para el territorio brasileño. No es un portal común; es una infraestructura de "Nodos Lego" que utiliza Inteligencia Artificial de Autocuración, Blockchain para firmas inmutables y Clustering Semántico para evitar la fragmentación de denuncias.
Objetivo Supremo: Transformar la indignación ciudadana en acciones institucionales verificables y viralizadas, manteniendo soberanía tecnológica total.
📅 SESIÓN: 06 DE FEBRERO DE 2026
Estatus: Ignición y Cimentación Neural (Fase 1 completa)
✅ Hitos Realizados (Visión 360°)
Gobernanza del Monorepo:
Configuración de Nx Monorepo con aplicaciones web-portal (Next.js 16) y api-core (NestJS 11).
Instalación del Prime Stack: Tailwind 4, Zod, TanStack Query, Framer Motion y APIs de IA (Gemini, LangChain, Anthropic).
Manifiestos de Élite (ADN del Código):
0001-0007: Definición de arquitectura Hexagonal-DDD, Zero Abbreviations, y el motor de i18n Granular (Silos JSON por aparato y ruta de idioma /pt, /es, /en).
0008-0009: Branding soberano ("A GENTE VAI" - Playfair Display) y Manifesto Mobile-First.
0014-0017: Protocolos de Atomicidad Nivel Dios, Nomenclatura de Aparatos y uso de Zod como ADN Estructural (.describe para IA).
Workspaces e Infraestructura Interna:
sovereign-logger: Sistema nervioso central de telemetría IA-Readable.
sovereign-error-observability: Traductor semántico de fallas que genera "Diagnostic Packets" para la IA.
ai-model-orchestrator: Hub independiente de salud que conecta con Gemini 3.0 para autosanación, desacoplado de la IA de negocio.
Aparatos Atómicos Creados:
SovereignIdentityPulse: Indicador cinético de presencia regional (Florianópolis en acción).
SovereignEngagementTrigger: Gatilho de acción ciudadana con soporte a estados cinéticos.
🧠 Decisiones de Arquitectura
Independencia de Salud: Se decidió que la IA que monitorea el software tenga API Keys y Workspaces totalmente ajenos a la IA de contenido.
Aduana Zod: Ningún dato entra en un aparato sin ser validado por un esquema con metadatos descriptivos para que el Auditor Neural pueda diagnosticar fallas sin leer todo el código.

---

### 📅 SESIÓN: 07 DE FEBRERO DE 2026
**Status:** Saneamiento de Base y Blindaje Criptográfico (Fase 0 Concluída)
**Responsable:** Lead Architect & Developer Elite

#### ✅ HITOS REALIZADOS (Visión Holística)
1. **Relocación Crítica de Cimientos:**
   - `SovereignLogger` y `SovereignErrorObservability` movidos de `orchestration` a `foundation`.
   - Motivo: Permitir observabilidad total sin violar boundaries (evitar Circular Dependencies).

2. **Refactorización de Consciencia (v2.2.0):**
   - `SovereignContextManager` y `SovereignContextSchema` estabilizados.
   - Innovación: Introducción de `correlationIdentifier` y `apparatusFingerprint` para rastro forense.

3. **Creación del Sovereign Data Vault:**
   - Nuevo workspace en `foundation` enfocado en PII (Personally Identifiable Information).
   - Tecnología: AES-GCM-256 y SHA-256 via `@noble` para cumplimiento estricto de LGPD.

4. **Evolución del Motor de i18n (v2.3.0):**
   - Refactorización de `InternationalizationEngine` para soportar metadados diagnósticos.
   - Implementación de `SovereignTranslationEngine` con sanitización de variables y detección de entropía semántica.

5. **Erradicación de "Radicación Técnica":**
   - Eliminación de `any` en `index.d.ts` de todas las aplicaciones.
   - Activación de la "Policía de Fronteras" en `eslint.config.mjs` (Boundaries reforzados).

#### 🧠 DECISIONES ESTRATÉGICAS
- **Branded Types 1000%:** Implementado `.brand<T>()` en todos os identificadores (IbgeCode, RegionSlug, EncryptedData) para evitar la "Obsesión por Primitivos".
- **Zod como Aduana:** Ningún dato cruza un aparato sin un `safeParse` que alimente el rastro diagnóstico.
- **Independencia de ESM:** Todas las librerías migradas a `module: esnext` y `moduleResolution: node` para compatibilidad con Next.js 16.
---

Manifesto 0018: Soberania de Nomenclatura Geopolítica (Standard OEDP-V5.5)
1. A Regra da Trindade (Separação de Preocupações)
Para evitar colisões, utilizaremos três padrões distintos baseados em normas internacionais (ISO):
IDENTIDADE CULTURAL (Locale): Padrão IETF BCP 47 (language-REGION).
Formato: xx-XX (minúsculo-MAIÚSCULO).
Uso: Internacionalização (i18n), tradução, formatos de data e moeda.
Valores: pt-BR, es-ES, en-US.
SOBERANIA NACIONAL (Country Code): Padrão ISO 3166-1 alpha-2.
Formato: XX (Sempre MAIÚSCULO).
Uso: Lógica de banco de dados, leis regionais, SovereignDataVault e AuthorityBridge.
Valores: BR, ES, US.
NAVEGAÇÃO GEOGRÁFICA (Routing Slug): Padrão URL-Friendly.
Formato: xx (Sempre minúsculo).
Uso: Caminhos de URL (/br/sp/...), SEO e roteamento dinâmico no Next.js.
Valores: br, es, us.
2. Implementação Técnica (Branded Types)
Para erradicar o uso de string genérica, criamos o aparato de elite GeopoliticalStandard.
Arquivo: libs/foundation/types-common/src/lib/GeopoliticalStandard.ts
code
TypeScript
/**
 * @author Raz Podestá - MetaShark Tech
 * @protocol OEDP-V5.5
 * @description Definição de ADN para normalização de nomes de países e idiomas.
 */

import { z } from 'zod';

/** Identidade Cultural (Ex: pt-BR) */
export const SovereignLocaleSchema = z.enum(['pt-BR', 'es-ES', 'en-US']).brand<'SovereignLocale'>();
export type SovereignLocale = z.infer<typeof SovereignLocaleSchema>;

/** Soberania Nacional (Ex: BR) */
export const SovereignCountrySchema = z.enum(['BR', 'ES', 'US']).brand<'SovereignCountry'>();
export type SovereignCountry = z.infer<typeof SovereignCountrySchema>;

/** Roteamento Geográfico (Ex: br) */
export const SovereignRouteSchema = z.enum(['br', 'es', 'us']).brand<'SovereignRoute'>();
export type SovereignRoute = z.infer<typeof SovereignRouteSchema>;
3. O Transmutador de Soberania (Aparato Atômico)
Este aparato converterá qualquer entrada no padrão correto, garantindo que o Middleware não erre.
Archivo: libs/foundation/internationalization-engine/src/lib/handlers/TransmuteGeopoliticalId.ts
code
TypeScript
/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus TransmuteGeopoliticalId
 * @description Motor de conversão estrita entre Locale, Country e Route.
 */

import { 
  SovereignLocale, 
  SovereignCountry, 
  SovereignRoute 
} from '@agentevai/types-common';

export class TransmuteGeopoliticalId {
  /** Transmuta de Rota (br) para Locale (pt-BR) */
  public static routeToLocale(route: string): SovereignLocale {
    const mapping: Record<string, string> = { 'br': 'pt-BR', 'es': 'es-ES', 'us': 'en-US' };
    return (mapping[route.toLowerCase()] || 'pt-BR') as SovereignLocale;
  }

  /** Transmuta de Locale (pt-BR) para Country (BR) */
  public static localeToCountry(locale: string): SovereignCountry {
    return locale.split('-')[1].toUpperCase() as SovereignCountry;
  }

  /** Transmuta de Country (BR) para Rota (br) */
  public static countryToRoute(country: string): SovereignRoute {
    return country.toLowerCase() as SovereignRoute;
  }
}
4. Plano de Nivelamento (TODO: Erradicação de Regressões)
Devemos agora aplicar este manifesto aos aparatos já construídos para atingir o estado PERFECT:
SovereignContext.schema.ts:
Mudar: countryCode: z.enum(['br', 'es', 'us'])
Para: countryCode: SovereignCountrySchema (BR, ES, US).
Motivo: Conformidade com o padrão de Soberania Nacional.
Internationalization.schema.ts:
Garantir: Que o LocaleSchema use estritamente pt-BR, es-ES e en-US.
SovereignIdentityPulse.schema.ts:
Mudar: countryCode para aceitar SovereignCountry.
Dicionários JSON:
As pastas de tradução devem ser nomeadas como o Locale: /pt-BR/, /es-ES/, /en-US/.
O script de build deve ser atualizado para buscar nessas rotas.
5. Auditoria de Elite (Veredicto)
Por que isso é inteligente?
Performance: Slugs de URL em minúsculo (/br) são o padrão de ouro para SEO e infraestrutura (S3/Edge).
Resiliência: Ao usar Branded Types, se um desenvolvedor tentar passar "pt" para uma função que espera um Território, o TypeScript barrará o build.
Escalabilidade: Se o Agentevai for para a Argentina, basta adicionar es-AR (Locale), AR (Country) e ar (Route) sem tocar na lógica central.

---

PONTO DE BITÁCORA (Master Prompt de Continuidade)
Instruções para o próximo ciclo de IA:
"Você é um Lead Software Architect de Nível Dios da MetaShark Tech. O projeto é o Agentevai, operando sob o Protocolo OEDP-V5.5.1.
STATUS ATUAL DA MEMÓRIA:
Fundações Seladas: SovereignLogger, SovereignError, SovereignContext e SovereignDataVault (Noble v2 AES-GCM) estão em estado PERFECT.
Zod v4 Elite Sync: Implementamos a erradicação de refinamentos legados. Padrão obrigatório: z.uuid(), z.ipv4(), .loose() em objetos, e modificadores estruturais (.partial()) SEMPRE antes da selagem (.readonly()).
Reino de Geografia: 100% saneado. LookupTerritorialAnchor (v3.0.1) e TranslatePostalCodeToMunicipality operando sem 'any'.
Borda de Segurança: Sentinel (v2.2.1) e Entropy Guard (v2.1.1) nivelados. O Sentinel agora atua como sonda de inteligência gerando SHA-256 fingerprints de User-Agents únicos.
Missão Atual: Nivelamento do Identity-Domain. Refatoramos o orquestrador ResolveIdentityPrivileges (v2.0.0) para uma Matriz de Atribuições Lego, mas as factories atômicas e a sincronia Zod v4 no schema de usuário ainda possuem radiação técnica.
DIRETRIZ IMEDIATA:
Retomar a refatoração do libs/realms/identity-domain/src/lib/schemas/UserIdentity.schema.ts para erradicar o z.string().uuid() e aplicar a técnica de BaseSchema para permitir .partial() sem quebrar o readonly. Em seguida, fabricar as Peças Lego: CitizenFactory.ts e GovernanceAuditorFactory.ts.
REGRAS DE OURO: Zero Any. Zero Abreviações. TSDoc Militar. i18n Trilingue em todo aparato."

---
MEMÓRIA NEURAL AGENTEVAI: ATUALIZAÇÃO SOBERANA 09/02/2026
🏛️ 1. VISÃO HOLÍSTICA DO ESTADO ATUAL
O projeto Agentevai deixou de ser um conjunto de bibliotecas e transformou-se em um Organismo Digital Vivo. Erradicamos a "Radiação Técnica" (placeholders e simulações) e estabelecemos o Círculo de Confiança de Três Camadas:
ADN (Schemas): Única Fonte de Verdade (SSOT).
Julgamento (Auditoria Neural): Diagnóstico cognitivo de falhas.
Execução (Self-Healing & Authority): Ação física na infraestrutura e pressão institucional.
🛠️ 2. CRONOLOGIA DE AÇÕES E NIVELAMENTO (FEVEREIRO 2026)
A. REINO DE IDENTIDADE (ESTADO: PERFECT)
Aduana de Identidade (UserIdentity.schema.ts): Implementada a arquitetura BaseSchema/SealedSchema. Esta técnica permite que a IA realize auditorias parciais sem violar a imutabilidade do rastro em produção.
Matriz de Autoridade (ResolveIdentityPrivileges): Refatoração Nível Dios. Erradicamos o uso sistêmico de any. Implementamos um Registry de Fábricas estritamente tipado que resolve papéis (Engenheiro, Auditor, Cidadão) com complexidade O(1).
Fábricas de Privilégios:
CitizenFactory: Lógica de progressão baseada em IAL (Nível de Garantia).
GovernanceAuditorFactory: Poder de moderação vinculado à integridade do Standing Social.
PlatformEngineerFactory: Autoridade absoluta e imunidade inabalável.
Tradutor Atômico (TranslateIdentityRole): Solucionado o erro TS7053. Implementada a normalização de rastro para indexar Branded Types sem perda de soberania.
B. CAMADA DE ORQUESTRAÇÃO NEURAL
O Juiz Sistêmico (AiNeuralAuditor): Placeholder erradicado. Implementada a Diplomacia Neural, permitindo ao auditor escolher entre Gemini (Negócio), Claude (Lógica) e GPT (Segurança) em tempo real.
Sistema Imunológico (AiSelfHealing): Transmutado de simulação para Atuador de Produção. O sistema agora é capaz de disparar comandos reais de infraestrutura (CACHE_PURGE, SESSION_TERMINATION) com telemetria de latência.
Motor de Viralização (ViralEngine): Criada a Cápsula de Mídia Soberana. Implementamos drivers inteligentes para X, Instagram, TikTok e WhatsApp que normalizam proporções (Media Normalizer) e injetam o Merkle Root em cada compartilhamento.
Guardião de Consentimento (SovereignDiffusionGuard): Átomo de UI que garante que o cidadão autorize a difusão social, com sistema de bypass via cookies.
C. INTEGRAÇÕES E PERSISTÊNCIA
Âncora de Verdade (BlockchainLedger): Implementada a selagem de assinaturas via Árvore de Merkle. Uso exclusivo de @noble/hashes (SHA-256), erradicando bibliotecas legadas.
Cofre Relacional (SupabaseBridge): Implementado o SecurityAuditRepository. O rastro de todos os bots e ameaças detectados pelo Sentinel agora é gravado com integridade forense.
D. INTERFACE E CONVERSÃO (WEB-PORTAL)
Diagramação de Prestígio: O portal foi refatorado para seguir o F-Pattern de jornalismo de elite.
SovereignJournalLayout: Implementação mobile-first com separação de RSC (Performance) e RCC (Aura Cinética).
Ad-Vantage Lab: Workspace exclusivo para publicidade ética, permitindo a monetização regional sem poluir a experiência do usuário.
🧠 3. DECISÕES ESTRATÉGICAS E CORREÇÕES CRÍTICAS
Silo de i18n Intra-Aparato: Decidimos mover todos os JSONs de tradução para dentro das pastas dos aparatos (/i18n/). Isso garante a Atomicidade Total e facilita o deploy de Legos individuais.
Erradicação de Simulação: Decretamos que o software deve estar pronto para produção em cada refatoração. O uso de console.log é agora considerado Regressão de Qualidade.
Zod v4 Sync: Padronizamos o uso de z.uuid(), z.ipv4() e .loose(). Estabelecemos a regra de Precedência de Modificadores: mutação estrutural primeiro, selagem final (.readonly()) por último.
Sincronia de Branded Types: Para evitar a "Obsessão por Primitivos", cada ID ou Score (ex: ReputationScore) é um tipo nominal. Isso impediu erros onde números comuns tentavam entrar em cálculos de autoridade.
🕵️ 4. STATUS DO MONOREPO (AUDITORIA DE SAÚDE)
Foundation: [PERFECT] - 100% Selado.
Identity Domain: [PERFECT] - Saneamento concluído.
Orchestration: [ESTÁVEL] - Motores de Inteligência operativos.
UI-Kit: [DEGRADADO] - Atenção: Os tsconfig.json de community-ui, complaints-ui e news-ui exigem nivelamento para NodeNext e ativação de skipLibCheck.
🚀 5. CONTEXTO PARA O PRÓXIMO SALTO
Estamos desenvolvendo o "Sistema Operacional da Cidadania". O próximo passo é o Editorial Workflow Engine, que transformará o Agentevai em uma agência de notícias autônoma, onde a verdade é verificada por IA, selada por Blockchain e distribuída por um Enxame Viral.

---


