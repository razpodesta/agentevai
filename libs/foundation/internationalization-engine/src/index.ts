/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus InternationalizationEngineHub
 * @version 6.5.0
 * @protocol OEDP-V6.5 - Master Sovereignty SSOT
 * @description Ponto único de exposição (SSOT) para motores de tradução e inteligência geopolítica.
 * CURADO: Erradicada abreviação 'Id' e sincronizado com o TransmuteGeopoliticalIdentifier.
 * @policy ZERO-ABBREVIATIONS: Exportações baseadas em clareza semântica absoluta.
 * @policy ESM-STRICT: Uso de extensões .js mandatórias para compatibilidade NodeNext.
 */

/* --- ⚡ SEÇÃO 1: MOTORES OPERATIVOS (ENGINES) --- */

/** 
 * @apparatus SovereignTranslationEngine 
 * @description Motor de resolução semântica com suporte a Aura Neural e auditoria de latência.
 */
export {
  SovereignTranslationEngine,
  type ISovereignDictionary
} from './lib/handlers/SovereignTranslationEngine.js';

/** 
 * @apparatus TransmuteGeopoliticalIdentifier 
 * @description Central de conversão estrita entre Locale, Country e Route.
 * CURADO: Nome integral em conformidade com o Manifesto 0002.
 */
export {
  TransmuteGeopoliticalIdentifier
} from './lib/handlers/TransmuteGeopoliticalIdentifier.js';


/* --- 🧬 SEÇÃO 2: ADN E CONTRATOS (SCHEMAS) --- */

/** @section Dicionários e Fragmentos */
export * from './lib/schemas/Internationalization.schema.js';

/** @section Transmutação Geopolítica */
export * from './lib/schemas/TransmuteGeopoliticalIdentifier.schema.js';

/** @section Orquestração Industrial (Compiler) */
export type {
  ISovereignTranslationEntry,
  IApparatusFragment,
  IConsolidatedDictionary
} from './lib/schemas/CompilerContracts.schema.js';


/**
 * @note Rastro Forense: O utilitário 'TransmuteTextToSlug' foi permanentemente
 * movido para '@agentevai/types-common'. Qualquer importação oriunda deste 
 * hub para fins de slugging é considerada Radiação Técnica.
 * 
 * Veredito: Biblioteca de Fundação nível 6.5.0 selada com 100% de integridade.
 */