/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus InternationalizationEngineHub
 * @version 2.4.1
 */

/**
 * @section Camada Operativa
 * CORREÇÃO ESM: Uso de extensões explícitas para garantir compatibilidade NodeNext.
 */
export {
  SovereignTranslationEngine
} from './lib/handlers/SovereignTranslationEngine.js';

export {
  TransmuteGeopoliticalId
} from './lib/handlers/TransmuteGeopoliticalId.js';

/**
 * @section Camada de Definição
 * Agora os membros 'LocaleSchema' e 'Locale' são encontrados corretamente.
 */
export {
  LocaleSchema,
  TranslationFragmentSchema,
  SovereignDictionarySchema,
  type Locale,
  type ISovereignDictionary
} from './lib/schemas/Internationalization.schema.js';
