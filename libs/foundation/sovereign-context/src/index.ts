/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignContextHub
 * @version 6.0.0
 * @protocol OEDP-V6.0 - High Performance & Master Sovereignty
 * @description Ponto único de exposição (SSOT) para a Consciência Sistêmica.
 * Orquestra a saída de ADN, Atuadores e Handlers de Identidade Técnica.
 * @policy ESM-STRICT: Uso de extensões explícitas (.js) para compatibilidade nativa.
 * @policy ZERO-ANY: Saneamento total de tipos nominais.
 */

/* --- 🌍 SEÇÃO 1: CAMADA DE PONTE (SOVEREIGNTY BRIDGE) --- */

/** 
 * Re-exportação dos esquemas centrais para reduzir a profundidade de importação.
 */
export {
  SovereignLocaleSchema,
  SovereignCountrySchema,
  SovereignRouteSchema,
  type SovereignLocale,
  type SovereignCountry,
  type SovereignRoute
} from '@agentevai/types-common';


/* --- ⚙️ SEÇÃO 2: CAMADA DE GESTÃO (CONTEXT ENGINE) --- */

export {
  CreateSovereignContext,
  type ISovereignConsciousnessPacket,
} from './lib/SovereignContextManager.js';

export {
  ExecuteGracefulDegradation
} from './lib/actuators/DegradationActuator.js';


/* --- 👤 SEÇÃO 3: CAMADA DE DETECÇÃO (IDENTITY HANDLERS) --- */

export {
  ResolveVisitorIdentity
} from './lib/handlers/ResolveVisitorIdentity.js';


/* --- 🧬 SEÇÃO 4: CAMADA DE ADN (SCHEMAS & BRANDED TYPES) --- */

/**
 * CURA TS2305: Membros agora exportados formalmente após a transmutação do ADN Base.
 */
export {
  // ADN de Realidade Operativa
  SovereignContextSchema,
  SovereignContextBaseSchema,
  type ISovereignContext,
  
  // Tipos Nominais (Branded)
  RegionSlugSchema,
  type RegionSlug,
  HealthScoreSchema,
  type HealthScore,
} from './lib/schemas/SovereignContext.schema.js';

export {
  // ADN de Identidade Técnica
  VisitorIdentitySchema,
  VisitorIdentityBaseSchema,
  type IVisitorIdentity,
  
  // Taxonomia de Hardware
  VisitorDeviceTypeSchema,
  BrowserEngineSchema,
  
  // Aduanas de Entrada
  ResolveVisitorIdentityInputSchema,
  type IResolveVisitorIdentityInput
} from './lib/schemas/VisitorIdentity.schema.js';

/**
 * @note Auditoria Neural: Sincronização de Handshake concluída.
 * Rastro Forense: Este Hub está agora em estado PERFECT, servindo de alicerce
 * inquebrável para os Reinos de News, Complaints e Community.
 */