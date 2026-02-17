/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus TypesCommonHub
 * @version 2.3.2
 * @protocol OEDP-V7.0 - Master Sovereignty SSOT
 * @description Ponto único de exposição (SSOT) para contratos nominais.
 * CURADO: Erradicados vácuos de exportação de Identificadores (Citizen e Tax).
 */

/* --- 🌍 SEÇÃO 1: DIMENSÃO GEOPOLÍTICA (Manifesto 0018) --- */
export {
  SovereignLocaleSchema,
  SovereignCountrySchema,
  SovereignRouteSchema
} from './lib/GeopoliticalStandard.js';

export type {
  SovereignLocale,
  SovereignCountry,
  SovereignRoute
} from './lib/GeopoliticalStandard.js';

/* --- 🇧🇷 SEÇÃO 2: DIMENSÃO TERRITORIAL --- */
export {
  IbgeCodeSchema,
  BrazilianStateCodeSchema,
  RegionSlugSchema,
  HealthScoreSchema,
  BRAZILIAN_STATES_REGISTRY,
  ValidatedBrazilianStateSchema
} from './lib/schemas/BrazilianTerritory.schema.js';

export type {
  IbgeCode,
  BrazilianStateCode,
  RegionSlug,
  HealthScore
} from './lib/schemas/BrazilianTerritory.schema.js';

/* --- 👤 SEÇÃO 3: DIMENSÃO DE IDENTIDADE (PROMOÇÃO) --- */
/** @section CURA_TS2305_TOTAL */
export {
  CitizenIdentifierSchema,
  TaxIdentifierSchema,
  ReputationScoreSchema,
  IdentityAssuranceLevelSchema,
  IdentityRoleSchema
} from './lib/schemas/IdentityContracts.schema.js';

export type {
  CitizenIdentifier,
  TaxIdentifier,
  ReputationScore,
  IdentityAssuranceLevel,
  IdentityRole
} from './lib/schemas/IdentityContracts.schema.js';

/* --- 📍 SEÇÃO 4: DIMENSÃO POSTAL --- */
export {
  PostalCodeSchema,
  PostalLocationSchema
} from './lib/PostalCode.schema.js';

export type {
  PostalCode,
  IPostalLocation
} from './lib/PostalCode.schema.js';

/* --- 🗺️ SEÇÃO 5: DIMENSÃO GEOESPACIAL (H3) --- */
export * from './lib/schemas/SovereignGeospatial.schema.js';

/* --- 🔍 SEÇÃO 6: DESCOBERTA E BUSCA --- */
export * from './lib/schemas/SovereignSearch.schema.js';
export * from './lib/schemas/SovereignTaxonomy.schema.js';

/* --- ⚡ SEÇÃO 7: FORMATAÇÃO --- */
export { TransmuteTextToSlug } from './lib/formatters/TransmuteTextToSlug.js';
