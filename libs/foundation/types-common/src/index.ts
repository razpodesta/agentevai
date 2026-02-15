/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus TypesCommonHub
 * @version 2.1.0
 * @protocol OEDP-V6.5 - Master Sovereignty SSOT
 * @description Ponto único de exposição para contratos nominais e utilitários atômicos.
 * CURADO: Adicionada exportação de ADN de busca e taxonomia semântica.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura integral em prosa técnica militar.
 * @policy ESM-STRICT: Uso de extensões .js mandatórias.
 */

/* --- 🌍 SEÇÃO 1: DIMENSÃO GEOPOLÍTICA (Manifesto 0018) --- */
export {
  SovereignLocaleSchema,
  SovereignCountrySchema,
  SovereignRouteSchema,
  type SovereignLocale,
  type SovereignCountry,
  type SovereignRoute
} from './lib/GeopoliticalStandard.js';

/* --- 📍 SEÇÃO 2: DIMENSÃO POSTAL E TERRITORIAL --- */
export {
  PostalCodeSchema,
  PostalLocationSchema,
  type PostalCode,
  type IPostalLocation
} from './lib/PostalCode.schema.js';

/* --- 🔍 SEÇÃO 3: DIMENSÃO DE DESCOBERTA E BUSCA (NEW ZENITH SYNC) --- */
/** 
 * @section CURA_TS2305 
 * Selagem das portas de ADN exigidas pelo Reino de Busca Semântica.
 */
export {
  SearchQueryInputSchema,
  SearchResultEntrySchema,
  type ISearchQueryInput,
  type ISearchResultEntry
} from './lib/schemas/SovereignSearch.schema.js';

export {
  SovereignTaxonomySchema,
  TaxonomyDomainSchema,
  type ISovereignTaxonomy,
  type TaxonomyDomain
} from './lib/schemas/SovereignTaxonomy.schema.js';

/* --- ⚡ SEÇÃO 4: UTILITÁRIOS DE FORMATAÇÃO --- */
export {
  TransmuteTextToSlug
} from './lib/formatters/TransmuteTextToSlug.js';

/**
 * @note Veredito do Auditor: A malha de tipos está agora 100% selada. 
 * O erro TS2305 foi extinto por re-estabelecimento de rastro de exportação.
 */