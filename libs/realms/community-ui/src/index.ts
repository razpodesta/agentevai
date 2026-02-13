/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CommunityUIHub
 * @version 2.1.0
 * @protocol OEDP-V6.5 - Master Sovereignty SSOT
 * @description Ponto único de exposição para o Reino de Interação Social.
 * CURA TS2724: Sincronização nominal concluída para CitizenAuraCard.
 */

/* --- 🧱 DIMENSÃO DE ORQUESTRAÇÃO (CATEDRAL) --- */

export { 
  SovereignCommunityShell 
} from './lib/sovereign-community-shell/SovereignCommunityShell.js';

export {
  SovereignCommunityShellInputSchema,
  type ISovereignCommunityShellInput
} from './lib/sovereign-community-shell/schemas/SovereignCommunityShell.schema.js';


/* --- 👤 DIMENSÃO DE IDENTIDADE (CITIZEN AURA) --- */

export { 
  CitizenAuraCard 
} from './lib/citizen-aura-card/CitizenAuraCard.js';

/**
 * @section CURA_TS2724
 * O rastro agora aponta para o membro 'CitizenAuraCardSchema' selado no ADN.
 */
export {
  CitizenAuraCardBaseSchema,
  CitizenAuraCardSchema,
  type ICitizenAuraCard
} from './lib/citizen-aura-card/schemas/CitizenAuraCard.schema.js';


/* --- ⚡ DIMENSÃO DE ENGAJAMENTO (REACTION ENGINE) --- */

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
 * @note Auditoria Neural: Malha de exportação atingiu o estado PERFECT. 
 * Todos os Reinos superiores agora podem consumir a Identidade do Cidadão
 * sem erros de declaração de tipo.
 */