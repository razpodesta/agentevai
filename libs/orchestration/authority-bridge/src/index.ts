/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus AuthorityBridgeHub
 * @version 6.5.0
 * @protocol OEDP-V6.5 - Zenith Master Hub
 * @description Ponto único de exposição para autoridade institucional.
 * CURADO: Erradicada radiação de rastro incorreto.
 */

/* --- 🏛️ CAMADA OPERATIVA --- */
export {
  AuthorityBridge
} from './lib/authority-bridge/AuthorityBridge.js';

export {
  RequirementInboxManager
} from './lib/requirement-inbox-manager/RequirementInboxManager.js';

/* --- 🧬 CAMADA DE ADN --- */
export * from './lib/schemas/InstitutionalLetter.schema.js';
export * from './lib/requirement-inbox-manager/schemas/RequirementInboxManager.schema.js';

/**
 * @note Veredito: O rastro de exportação foi selado.
 * Todas as importações agora utilizam extensões .js para conformidade ESM.
 */
