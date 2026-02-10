/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignContextHub
 * @version 3.0.0
 * @protocol OEDP-V6.0 - High Performance & ESM Sovereignty
 * @description Ponto único de exposição (SSOT) para a Consciência Sistêmica.
 * Atua como ponte (Bridge) para os contratos de soberania geopolítica.
 * @policy ESM-STRICT: Uso de extensões explícitas (.js).
 */

/**
 * @section Camada de Ponte (Sovereignty Bridge)
 * Re-exportação dos esquemas centrais da types-common para simplificar a malha.
 */
export {
  SovereignLocaleSchema,
  SovereignCountrySchema,
  SovereignRouteSchema,
  type SovereignLocale,
  type SovereignCountry,
  type SovereignRoute
} from '@agentevai/types-common';

/**
 * @section Camada de Gestão (Context Engine)
 */
export {
  CreateSovereignContext,
  type ISovereignConsciousnessPacket,
} from './lib/SovereignContextManager.js';

/**
 * @section Camada de Detecção (Identity Handlers)
 */
export {
  ResolveVisitorIdentity
} from './lib/handlers/ResolveVisitorIdentity.js';

/**
 * @section Camada de Definição (ADN & Schemas)
 * Sincronizado: Caminhos apontando para a raiz de schemas da lib.
 */
export {
  SovereignContextSchema,
  type ISovereignContext,
  RegionSlugSchema,
  type RegionSlug,
  HealthScoreSchema,
  type HealthScore,
} from './lib/schemas/SovereignContext.schema.js';

export {
  VisitorIdentitySchema,
  type IVisitorIdentity,
  VisitorDeviceTypeSchema,
  BrowserEngineSchema, // Adicionado para completude de rastro
} from './lib/schemas/VisitorIdentity.schema.js';

/**
 * @note Auditoria Neural: O arquivo 'lib/handlers/schemas/VisitorIdentity.schema.ts'
 * deve ser removido fisicamente após a migração para 'lib/schemas/'.
 * Rastro Forense: Porta de exportação selada contra TS2307 e TS2835.
 */
