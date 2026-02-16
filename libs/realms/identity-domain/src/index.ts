/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus IdentityDomainHub
 * @version 6.5.2
 * @protocol OEDP-V6.5 - Master Sovereignty SSOT
 * @description Ponto único de exposição para o Reino de Identidade.
 * CURADO: Sincronia total com a malha concêntrica de aparatos atômicos.
 * @policy ZERO-ANY: Erradicação absoluta via Branded DNA.
 * @policy ESM-STRICT: Uso de extensões .js mandatórias para NodeNext.
 */

/* --- 🌍 SEÇÃO 1: DIMENSÃO GEOPOLÍTICA (SOVEREIGN BRIDGE) --- */

/** 
 * Re-exportação dos contratos de soberania nacional e cultural.
 * Permite que outros Reinos e Apps validem rastro geográfico sem acoplamento circular.
 */
export {
  SovereignLocaleSchema,
  SovereignCountrySchema,
  SovereignRouteSchema,
  BrazilianStateCodeSchema,
  type SovereignLocale,
  type SovereignCountry,
  type SovereignRoute,
  type BrazilianStateCode
} from '@agentevai/types-common';


/* --- 🧬 SEÇÃO 2: DIMENSÃO DE ADN (SCHEMAS & NOMINAL TYPES) --- */

/**
 * @apparatus UserIdentity (ADN Mestre)
 * @description Rastro selado em: src/lib/user-identity/schemas/
 */
export {
  // Aduanas de ADN de Identidade
  UserIdentitySchema,
  IdentityRoleSchema,
  ReputationScoreSchema,
  IdentityAttributesSchema,
  CitizenIdentifierSchema,
  IdentityAssuranceLevelSchema,

  // Interfaces Nominais (Contratos Selados)
  type IUserIdentity,
  type IIdentityRole,
  type IIdentityAttributes,
  type ReputationScore,
  type CitizenIdentifier,
  type IIdentityAssuranceLevel
} from './lib/user-identity/schemas/UserIdentity.schema.js';


/* --- 🗣️ SEÇÃO 3: DIMENSÃO SEMÂNTICA (HANDLERS) --- */

/** 
 * @apparatus TranslateIdentityRole 
 * @description Motor de humanização trilingue para papéis de autoridade.
 */
export { TranslateIdentityRole } from './lib/handlers/TranslateIdentityRole.js';
export { 
  TranslateIdentityRoleInputSchema,
  type ITranslateIdentityRoleInput 
} from './lib/handlers/schemas/TranslateIdentityRole.schema.js';


/* --- 📊 SEÇÃO 4: DIMENSÃO DE MÉRITO (CALCULADORES) --- */

/** 
 * @apparatus CalculateCitizenStanding 
 * @description Algoritmo de progressão social e evolução de reputação.
 */
export { CalculateCitizenStanding } from './lib/calculators/CalculateCitizenStanding.js';
export {
  CalculateCitizenStandingInputSchema,
  type ICalculateCitizenStandingInput,
  type ImpactType 
} from './lib/calculators/schemas/CalculateCitizenStanding.schema.js';


/* --- 🧠 SEÇÃO 5: DIMENSÃO DE AUTORIDADE (RESOLVERS) --- */

/** 
 * @apparatus ResolveIdentityPrivileges 
 * @description Orquestrador que resolve a matriz de privilégios via Factories.
 */
export { ResolveIdentityPrivileges } from './lib/resolvers/ResolveIdentityPrivileges.js';
export {
  ResolveIdentityPrivilegesInputSchema,
  type IResolveIdentityPrivilegesInput
} from './lib/resolvers/schemas/ResolveIdentityPrivileges.schema.js';

/**
 * @note Veredito do Auditor: A porta de entrada do Reino está agora inquebrável.
 * Rastro Forense: Sincronizado com o Cartório Técnico para auditoria V6.5.
 */