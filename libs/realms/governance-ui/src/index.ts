/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus GovernanceUIHub
 * @version 2.0.0
 * @protocol OEDP-V5.5.2 - Flat Export Sovereignty
 * @description Ponto único de exposição para o Reino de Governança.
 */

/* --- 🗳️ COMPONENTES DE APOIO POPULAR --- */
export { PopularSupportTrigger } from './lib/popular-support-trigger/PopularSupportTrigger.js';

/* --- 🧬 ADN E CONTRATOS --- */
export {
  SupportStatusSchema,
  PopularSupportTriggerInputSchema,
  type SupportStatus,
  type IPopularSupportTriggerInput
} from './lib/popular-support-trigger/schemas/PopularSupportTrigger.schema.js';

/**
 * @note Auditoria Neural: Todos os sub-componentes (KineticSheen, ActionContent, TrustFooter) 
 * são mantidos privados ao diretório do aparato para preservar o encapsulamento SRP.
 */