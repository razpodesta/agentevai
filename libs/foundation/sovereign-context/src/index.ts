/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignContextHub
 * @version 2.3.0
 * @protocol OEDP-V5.5 - High Performance Hub
 * @description Ponto único de exposição (SSOT) para a Consciência Sistêmica.
 * Atua como ponte (Bridge) para os contratos de soberania geopolítica.
 */

/**
 * @section Camada de Ponte (Sovereignty Bridge)
 * Re-exportação dos esquemas centrais da types-common para simplificar a malha de tipos.
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
} from './lib/schemas/VisitorIdentity.schema.js';
