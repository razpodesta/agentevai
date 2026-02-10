/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CommunityUIHub
 * @version 1.4.0
 * @protocol OEDP-V5.5.2 - Flat Export Sovereignty
 * @description Ponto único de exposição (SSOT) para os aparatos de interação social.
 * Sincronizado para erradicar vácuos de exportação e vazar marca nominal para o enxame.
 */

/* --- 🏛️ DIMENSÃO DE ORQUESTRAÇÃO (SMART SHELL) --- */

export {
  SovereignCommunityShell
} from './lib/community-ui.js';

export {
  SovereignCommunityShellInputSchema,
  type ISovereignCommunityShellInput
} from './lib/schemas/SovereignCommunityShell.schema.js';


/* --- 👤 DIMENSÃO DE IDENTIDADE (CITIZEN AURA) --- */

export {
  CitizenAuraCard
} from './lib/citizen-aura-card/CitizenAuraCard.js';

export {
  CitizenAuraCardSchema,
  type ICitizenAuraCard
} from './lib/citizen-aura-card/schemas/CitizenAuraCard.schema.js';


/* --- ⚡ DIMENSÃO DE ENGAJAMENTO (REACTION ENGINE) --- */

export {
  SovereignReactionTrigger
} from './lib/sovereign-reaction-trigger/SovereignReactionTrigger.js';

/**
 * @section CURA_TS2724
 * Alinhamento nominal: De 'SovereignReactionTriggerSchema' para 'SovereignReactionTriggerInputSchema'.
 */
export {
  ReactionTypeSchema,
  SovereignReactionTriggerInputSchema,
  type ReactionType,
  type ISovereignReactionTrigger
} from './lib/sovereign-reaction-trigger/schemas/SovereignReaction.schema.js';

/**
 * @note Auditoria Neural: Este barril é a ponte entre o Reino de Comunidade e as Apps.
 * Veredito: Rastro de exportação 100% íntegro e compatível com Branded Types.
 */
