/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus TypesCommonHub
 * @version 2.0.0
 * @protocol OEDP-V6.0 - Master Sovereignty SSOT
 * @description Ponto único de exposição para contratos nominais e utilitários atômicos.
 * Centraliza a inteligência de tipagem e motores de formatação inalteráveis.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura integral em prosa técnica militar.
 * @policy ESM-STRICT: Uso de exportações nomeadas com extensões .js explícitas.
 */

/**
 * @section Dimensão Geopolítica (Manifesto 0018)
 * Exporta a Trindade de Soberania: Locale, Country e Route.
 */
export {
  SovereignLocaleSchema,
  SovereignCountrySchema,
  SovereignRouteSchema,
  type SovereignLocale,
  type SovereignCountry,
  type SovereignRoute
} from './lib/GeopoliticalStandard.js';

/**
 * @section Dimensão de Soberania Postal
 * Contratos para validação de rastro territorial e postal brasileiro.
 */
export {
  PostalCodeSchema,
  PostalLocationSchema,
  type PostalCode,
  type IPostalLocation
} from './lib/PostalCode.schema.js';

/**
 * @section Dimensão de Formatação Atômica (Utility)
 * Motor mestre para transmutação de strings em rastro de ruteamento.
 * CONSUMIDO POR: GeographicContextManager.
 */
export {
  TransmuteTextToSlug
} from './lib/formatters/TransmuteTextToSlug.js';

/**
 * @note Este aparato é uma Leaf Library (Biblioteca Folha).
 * Ele NÃO possui dependências internas para garantir acoplamento zero.
 * Auditoria Neural: Selagem inquebrável concluída.
 */