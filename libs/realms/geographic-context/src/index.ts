/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus GeographicContextHub
 * @version 1.2.0
 * @protocol OEDP-V5.5 - Territorial Intelligence
 * @description Ponto único de exposição para inteligência geográfica brasileira.
 * @policy ESM-STRICT: Uso de extensões .js para compatibilidade total com NodeNext.
 */

/**
 * @section Camada Operativa (Handlers)
 * Motores de resolução de IP e Tradução de CEP.
 */
export {
  LookupTerritorialAnchor
} from './lib/handlers/LookupTerritorialAnchor.js';

export {
  TranslatePostalCodeToMunicipality
} from './lib/TranslatePostalCodeToMunicipality.js';

/**
 * @section Camada de Gestão (Manager)
 */
export {
  TransmuteIbgeToMunicipality
} from './lib/GeographicContextManager.js';

/**
 * @section Camada de Definição (ADN & Schemas)
 */
export {
  BrazilianMunicipalitySchema,
  IbgeCodeSchema,
  BrazilianStateCodeSchema,
  type IBrazilianMunicipality,
  type IbgeCode,
  type BrazilianStateCode
} from './lib/schemas/GeographicRegion.schema.js';
