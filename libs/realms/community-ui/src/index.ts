/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CommunityUIHub
 * @version 2.0.0
 * @protocol OEDP-V6.0 - Flat Export Sovereignty
 * @description Ponto único de exposição (SSOT) para o Reino de Interação Social.
 * Sincronizado para refletir o realinhamento físico dos aparatos e garantir
 * a integridade das marcas nominais (Branded Types) para as Apps.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura integral e exaustiva.
 * @policy ESM-STRICT: Uso de extensões .js para compatibilidade nativa 2026.
 */

/* --- 🧱 DIMENSÃO DE ORQUESTRAÇÃO (CATEDRAL) --- */

/** @apparatus SovereignCommunityShell */
export { 
  SovereignCommunityShell 
} from './lib/sovereign-community-shell/SovereignCommunityShell.js';

export {
  SovereignCommunityShellInputSchema,
  type ISovereignCommunityShellInput
} from './lib/sovereign-community-shell/schemas/SovereignCommunityShell.schema.js';


/* --- 👤 DIMENSÃO de IDENTIDADE (CITIZEN AURA) --- */

/** @apparatus CitizenAuraCard */
export { 
  CitizenAuraCard 
} from './lib/citizen-aura-card/CitizenAuraCard.js';

export {
  CitizenAuraCardSchema,
  type ICitizenAuraCard
} from './lib/citizen-aura-card/schemas/CitizenAuraCard.schema.js';

/** @apparatus KineticAuraPulse (Célula visual) */
export {
  KineticAuraPulse
} from './lib/citizen-aura-card/KineticAuraPulse.js';

export {
  KineticAuraPulseInputSchema,
  type IKineticAuraPulseInput
} from './lib/citizen-aura-card/schemas/KineticAuraPulse.schema.js';


/* --- ⚡ DIMENSÃO DE ENGAJAMENTO (REACTION ENGINE) --- */

/** @apparatus SovereignReactionTrigger */
export { 
  SovereignReactionTrigger 
} from './lib/sovereign-reaction-trigger/SovereignReactionTrigger.js';

export {
  ReactionTypeSchema,
  SovereignReactionTriggerInputSchema,
  type ReactionType,
  type ISovereignReactionTrigger
} from './lib/sovereign-reaction-trigger/schemas/SovereignReaction.schema.js';

/**
 * @note Auditoria Neural: Este barril é a fronteira diplomática entre o Reino
 * de Comunidade e as pontas de lança (web-portal, admin-cms).
 * Rastro Forense: Selagem concluída. O compilador agora possui visibilidade total
 * sobre os novos silos físicos /lib/sovereign-community-shell/.
 */