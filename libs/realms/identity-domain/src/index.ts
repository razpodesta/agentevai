/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus IdentityDomainHub
 * @version 1.5.0
 * @protocol OEDP-V5.5.2 - Flat Export Sovereignty & Bridge Pattern
 * @description Ponto único de exposição (SSOT) para o domínio de Identidade Soberana.
 * Centraliza a validação de ADN, motores de mérito social e tradução de papéis.
 * Atua como ponte para os contratos geopolíticos da fundação.
 * @policy ZERO-ANY: Erradicação absoluta de tipagem anárquica.
 * @policy ZERO-ABBREVIATIONS: Exportações nomeadas baseadas em prosa técnica.
 * @policy ESM-STRICT: Uso de extensões .js para compatibilidade total com NodeNext.
 */

/* --- 🌍 DIMENSÃO GEOPOLÍTICA (SOVEREIGN BRIDGE) --- */

/** 
 * @section Cura_Erro_TS2305 
 * Re-exportação dos contratos de soberania nacional e cultural.
 * Permite que reinos de UI validem Locales sem acoplamento direto com a fundação.
 */
export {
  SovereignLocaleSchema,
  SovereignCountrySchema,
  SovereignRouteSchema,
  type SovereignLocale,
  type SovereignCountry,
  type SovereignRoute
} from '@agentevai/types-common';


/* --- 🧬 DIMENSÃO DE ADN (SCHEMAS E TIPAGEM NOMINAL) --- */

export {
  // Aduanas de ADN de Identidade
  UserIdentitySchema,
  IdentityRoleSchema,
  ReputationScoreSchema,
  IdentityAttributesSchema,
  CitizenIdentifierSchema,
  IdentityAssuranceLevelSchema,
  DigitalPresenceFingerprintSchema,

  // Interfaces de Dados (Contratos Selados)
  type IUserIdentity,
  type IIdentityRole,
  type IIdentityAttributes,
  type ReputationScore,
  type CitizenIdentifier,
  type IIdentityAssuranceLevel,
  type DigitalPresenceFingerprint
} from './lib/schemas/UserIdentity.schema.js';


/* --- 🗣️ DIMENSÃO SEMÂNTICA (HANDLERS LINGUÍSTICOS) --- */

/** 
 * @apparatus TranslateIdentityRole 
 * @description Motor de humanização trilingue para papéis de autoridade.
 */
export { TranslateIdentityRole } from './lib/handlers/TranslateIdentityRole.js';
export { 
  TranslateIdentityRoleInputSchema,
  type ITranslateIdentityRoleInput 
} from './lib/handlers/schemas/TranslateIdentityRole.schema.js';


/* --- 📊 DIMENSÃO DE MÉRITO (CALCULADORES ATÔMICOS) --- */

/** 
 * @apparatus CalculateCitizenStanding 
 * @description Algoritmo de progressão e evolução de reputação cidadã.
 */
export { CalculateCitizenStanding } from './lib/calculators/CalculateCitizenStanding.js';
export {
  CalculateCitizenStandingInputSchema,
  type ICalculateCitizenStandingInput,
  type ImpactTypeSchema 
} from './lib/calculators/schemas/CalculateCitizenStanding.schema.js';


/* --- 🧠 DIMENSÃO DE AUTORIDADE (RESOLVERS) --- */

/** 
 * @apparatus ResolveIdentityPrivileges 
 * @description Cérebro de autoridade que resolve a tríade (Papel, Standing, Garantia).
 */
export { ResolveIdentityPrivileges } from './lib/resolvers/ResolveIdentityPrivileges.js';
export {
  ResolveIdentityPrivilegesInputSchema,
  type IResolveIdentityPrivilegesInput
} from './lib/resolvers/schemas/ResolveIdentityPrivileges.schema.js';

/**
 * @note Auditoria Neural: Este Hub agora provê o rastro geopolítico completo.
 * Rastro Forense: Monitoramento ativo via SovereignLogger.
 */