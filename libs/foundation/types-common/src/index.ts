/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus TypesCommonHub
 * @version 2.2.0
 * @protocol OEDP-V6.5 - Master Sovereignty SSOT
 * @description Ponto único de exposição (SSOT) para contratos nominais.
 * CURADO: Erradicado erro TS2305 via inclusão da Dimensão Geoespacial.
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

/* --- 🗺️ SEÇÃO 3: DIMENSÃO GEOESPACIAL (NEW ZENITH H3) --- */
/** 
 * @section CURA_TS2305 
 * Selagem da malha H3 necessária para o SovereignHeatmap e Proximity Queries.
 */
export {
  H3IndexSchema,
  GeographicCoordinatesSchema,
  type H3Index,
  type IGeographicCoordinates
} from './lib/schemas/SovereignGeospatial.schema.js';

/* --- 🔍 SEÇÃO 4: DIMENSÃO DE DESCOBERTA E BUSCA --- */
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

/* --- ⚡ SEÇÃO 5: UTILITÁRIOS DE FORMATAÇÃO --- */
export {
  TransmuteTextToSlug
} from './lib/formatters/TransmuteTextToSlug.js';