/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SyndicationEngineHub
 * @version 2.0.0
 * @protocol OEDP-V6.0 - Master Sovereignty SSOT
 * @description Ponto único de exposição para o motor de sindicação XML.
 */

/* --- ⚡ CAMADA OPERATIVA (HANDLERS) --- */
export { SovereignSyndicationEngine } from './lib/handlers/SovereignSyndicationEngine.js';

/* --- 🧬 CAMADA DE ADN (SCHEMAS) --- */
export {
  SyndicationXmlRastroSchema,
  SyndicationFeedInputSchema,
  SyndicationArticleSchema,
  type SyndicationXmlRastro,
  type ISyndicationFeedInput,
  type ISyndicationArticle
} from './lib/schemas/Syndication.schema.js';

/**
 * @note Auditoria Neural: Este Hub foi ativado e saneado.
 * Veredito: O rastro de distribuição editorial está agora inquebrável.
 */