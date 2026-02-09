/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus TypesCommonHub
 * @version 1.3.1
 * @protocol OEDP-V5.5 - Standard MetaShark
 * @description Ponto único de exposição (SSOT) para contratos de tipagem nominal e utilitários atômicos.
 * Centraliza os Branded Types geopolíticos, postais e motores de formatação de ruteamento.
 * @policy ZERO-ANY: Erradicação absoluta de tipagem anárquica.
 * @policy ZERO-ABBREVIATIONS: Prosa técnica militar em todas as exportações.
 * @policy ESM-STRICT: Uso de exportações nomeadas com extensões explícitas.
 */

/**
 * @section Dimensão Geopolítica (Manifesto 0018)
 * Exporta a Trindade: Locale (Cultura), Country (Nação) e Route (Navegação).
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
 * Contratos para validação de CEP e localização territorial brasileira.
 * Nivelado: ibgeCode agora é processado como Branded number.
 */
export {
  PostalCodeSchema,
  PostalLocationSchema,
  type PostalCode,
  type IPostalLocation
} from './lib/PostalCode.schema.js';

/**
 * @section Dimensão de Formatação Atômica (Utility)
 * Motores puros para transmutação e higienização de rastro textual.
 */
export {
  TransmuteTextToSlug
} from './lib/formatters/TransmuteTextToSlug.js';

/**
 * @note Este aparato reside na camada Foundation (Leaf Library).
 * Ele não possui dependências internas e deve ser consumido por todos os Realms
 * para garantir a integridade dos dados que cruzam as fronteiras do sistema.
 *
 * Auditoria Neural: Monitorado para evitar a inclusão de dependências externas (Zero Coupling).
 */
